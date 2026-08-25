import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const resendApiKey = process.env.RESEND_API_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const admin = supabaseUrl && serviceRoleKey ? createSupabaseClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } }) : null;

function formatCurrency(amount:number|null|undefined,currency:string|null|undefined){return new Intl.NumberFormat("en-US",{style:"currency",currency:(currency||"usd").toUpperCase()}).format(Number(amount??0)/100)}
function escapeHtml(value:string){return value.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
function getErrorMessage(error:unknown){if(error instanceof Error)return error.message;if(typeof error==="string")return error;try{return JSON.stringify(error)}catch{return"Unknown error"}}

export async function POST(request:Request){
 if(!stripe||!webhookSecret)return NextResponse.json({error:"Stripe webhook is not configured."},{status:500});
 const signature=request.headers.get("stripe-signature");if(!signature)return NextResponse.json({error:"Missing Stripe signature."},{status:400});
 const rawBody=await request.text();let event:Stripe.Event;try{event=stripe.webhooks.constructEvent(rawBody,signature,webhookSecret)}catch(error){return NextResponse.json({error:"Invalid Stripe webhook signature.",detail:getErrorMessage(error)},{status:400})}
 if(event.type!=="checkout.session.completed")return NextResponse.json({received:true,ignored:event.type});
 try{
  const eventSession=event.data.object as Stripe.Checkout.Session;
  const session=await stripe.checkout.sessions.retrieve(eventSession.id);
  const lineItems=await stripe.checkout.sessions.listLineItems(session.id,{limit:10});
  const firstLineItem=lineItems.data[0];
  const customerName=session.customer_details?.name?.trim()||"Not provided";
  const customerEmail=(session.customer_details?.email||session.customer_email||"").trim().toLowerCase();
  const customerPhone=session.customer_details?.phone?.trim()||"Not provided";
  const productName=firstLineItem?.description||"LinkedIn Optimization Guide";
  const purchaseComplete=session.status==="complete"&&(session.payment_status==="paid"||session.payment_status==="no_payment_required");
  if(!purchaseComplete||!customerEmail)return NextResponse.json({error:"Checkout is incomplete or missing an email."},{status:400});

  let entitlementQueued=false;
  if(admin){
   const{error:grantError}=await admin.from("member_entitlement_grants").upsert({email:customerEmail,entitlement:"linkedin_guide",source:"stripe_checkout",external_reference:session.id},{onConflict:"email,entitlement,external_reference"});
   if(grantError)throw new Error(`Unable to queue guide access: ${grantError.message}`);
   entitlementQueued=true;
   const{data:users,error:userError}=await admin.auth.admin.listUsers({page:1,perPage:1000});
   if(!userError){const match=users.users.find(u=>u.email?.toLowerCase()===customerEmail);if(match){const{error:e}=await admin.from("member_entitlements").upsert({user_id:match.id,entitlement:"linkedin_guide",source:"stripe_checkout"},{onConflict:"user_id,entitlement"});if(e)throw new Error(`Unable to grant guide access: ${e.message}`);await admin.from("member_entitlement_grants").update({claimed_by:match.id,claimed_at:new Date().toISOString()}).eq("email",customerEmail).eq("entitlement","linkedin_guide").eq("external_reference",session.id)}}
  }else{
   console.error("SUPABASE_SERVICE_ROLE_KEY is missing; Stripe purchase access could not be queued.",{sessionId:session.id,customerEmail});
  }

  const subtotal=formatCurrency(session.amount_subtotal,session.currency),discountAmount=formatCurrency(session.total_details?.amount_discount,session.currency),totalPaid=formatCurrency(session.amount_total,session.currency),discountLabel=Number(session.total_details?.amount_discount??0)>0?"Discount or promotion applied":"No discount",paymentDescription=session.payment_status==="no_payment_required"?"Free checkout, no payment required":"Paid",checkoutDate=new Date(Number(session.created)*1000).toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short",timeZone:"America/New_York"});
  let emailId:string|null=null;
  if(resend){const emailResult=await resend.emails.send({from:"JGO Hire Purchases <website@jgohire.com>",to:["jen@jgohire.com"],subject:session.payment_status==="no_payment_required"?`New free LinkedIn Guide signup from ${customerName}`:`New LinkedIn Guide purchase from ${customerName}`,text:["New LinkedIn Optimization Guide order","",`Customer: ${customerName}`,`Email: ${customerEmail}`,`Phone: ${customerPhone}`,`Product: ${productName}`,`Subtotal: ${subtotal}`,`Discount: ${discountAmount}`,`Promotion: ${discountLabel}`,`Total paid: ${totalPaid}`,`Payment status: ${paymentDescription}`,`Checkout date: ${checkoutDate}`,`Stripe session: ${session.id}`,`Guide access queued: ${entitlementQueued?"Yes":"No"}`].join("\n"),html:`<div style="background:#f4f1ea;padding:32px;font-family:Arial,sans-serif;color:#223028"><div style="max-width:680px;margin:auto;background:#fff;border:1px solid #e2ddd3;border-radius:20px;padding:36px"><p style="color:#637a5b;font-size:12px;font-weight:700;letter-spacing:1.5px">JGO HIRE PURCHASE</p><h1>New LinkedIn Guide order</h1><p><strong>Customer:</strong> ${escapeHtml(customerName)}</p><p><strong>Email:</strong> ${escapeHtml(customerEmail)}</p><p><strong>Total:</strong> ${escapeHtml(totalPaid)}</p><p><strong>Access:</strong> ${entitlementQueued?"Queued/granted":"Needs configuration"}</p><p><strong>Stripe Session:</strong> ${escapeHtml(session.id)}</p></div></div>`},{idempotencyKey:`stripe-purchase-notification/${event.id}`});if(emailResult.error)console.error("Resend purchase notification failed",emailResult.error);else emailId=emailResult.data?.id??null}
  console.log("Stripe guide purchase processed",{eventId:event.id,sessionId:session.id,customerEmail,entitlementQueued,emailId});
  return NextResponse.json({received:true,entitlementQueued,emailSent:Boolean(emailId),emailId});
 }catch(error){const detail=getErrorMessage(error);console.error("Unable to process Stripe purchase webhook",detail);return NextResponse.json({error:"Webhook processing failed.",detail},{status:500})}
}
