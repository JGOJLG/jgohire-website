import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CourseLessonShell from "../components/CourseLessonShell";
import { courseLessons } from "../data/courseLessons";
import "../lesson.css";

type CourseLessonPageProps={params:Promise<{slug:string}>};
export function generateStaticParams(){return courseLessons.map(lesson=>({slug:lesson.slug}))}
export default async function CourseLessonPage({params}:CourseLessonPageProps){const supabase=await createClient();const{data:{user}}=await supabase.auth.getUser();if(!user)redirect("/login?next=/course");await supabase.rpc("claim_member_entitlements");const{data:access}=await supabase.from("member_entitlements").select("id").eq("user_id",user.id).eq("entitlement","linkedin_guide").maybeSingle();if(!access)redirect("/portal");const{slug}=await params;const lessonIndex=courseLessons.findIndex(lesson=>lesson.slug===slug);if(lessonIndex===-1)notFound();return <CourseLessonShell lesson={courseLessons[lessonIndex]} lessonIndex={lessonIndex}/>}
