"use client";

import { useState } from "react";

export default function PayPageClient() {
  const [zelleOpen, setZelleOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyZelleNumber() {
    const number = "9084775032";

    try {
      await navigator.clipboard.writeText(number);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = number;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    }
  }

  return (
    <section className="jgo-pay-page">
      <div className="jgo-pay-hero">
        <div className="jgo-pay-symbol">⌁</div>
        <div className="jgo-pay-pill">JGO Hire Client Payments</div>
        <h1>Make a Payment</h1>
        <p>Choose the payment option that works best for you.</p>
      </div>

      <div className="jgo-pay-wrap">
        <p className="jgo-pay-intro">
          Zelle and Venmo are available as fee-free payment options. If you prefer to pay by card, the Stripe total includes a 3% processing fee.
        </p>

        <div className="jgo-payment-grid">
          <a className="jgo-pay-card" href="https://venmo.com/u/jengordon" target="_blank" rel="noopener noreferrer">
            <div className="jgo-card-top">
              <div className="jgo-pay-icon">V</div>
              <span className="jgo-badge">No processing fee</span>
              <h2>Venmo</h2>
              <p>Pay via Venmo at <strong>@jengordon</strong>. Please include your name in the memo.</p>
            </div>
            <div className="jgo-card-bottom">Pay with Venmo <span className="jgo-arrow">→</span></div>
          </a>

          <button className="jgo-pay-card" type="button" onClick={() => setZelleOpen(true)}>
            <div className="jgo-card-top">
              <div className="jgo-pay-icon">Z</div>
              <span className="jgo-badge">Preferred • No fee</span>
              <h2>Zelle</h2>
              <p>Open instructions to send payment through your banking app. Please include your name in the memo.</p>
            </div>
            <div className="jgo-card-bottom">View Zelle Instructions <span className="jgo-arrow">→</span></div>
          </button>

          <a className="jgo-pay-card" href="https://buy.stripe.com/3cI6oHgC38vda783kSabK00" target="_blank" rel="noopener noreferrer">
            <div className="jgo-card-top">
              <div className="jgo-pay-icon">$</div>
              <span className="jgo-badge">3% card fee included</span>
              <h2>Card</h2>
              <p>Pay securely by card through Stripe. Total includes the card processing fee.</p>
            </div>
            <div className="jgo-card-bottom">Pay by Card <span className="jgo-arrow">→</span></div>
          </a>
        </div>

        <div className="jgo-info-box"><strong>Payment reminder:</strong> Please include your name so your payment can be matched correctly.</div>
        <p className="jgo-disclaimer">Credit card processing fees are disclosed before payment. Please review the total before completing checkout.</p>
      </div>

      {zelleOpen && (
        <div className="jgo-modal show" role="dialog" aria-modal="true" aria-labelledby="zelle-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setZelleOpen(false); }}>
          <div className="jgo-modal-box">
            <button className="jgo-modal-close" type="button" aria-label="Close Zelle instructions" onClick={() => setZelleOpen(false)}>×</button>
            <div className="jgo-modal-icon">Z</div>
            <h2 id="zelle-title">Zelle Instructions</h2>
            <p>Open your banking app, select Zelle, and send payment using the phone number below.</p>
            <div className="jgo-zelle-detail">Send Zelle payment to:<span className="jgo-zelle-number">908-477-5032</span></div>
            <p>Please include your name in the payment memo so your payment can be matched correctly.</p>
            <button className="jgo-modal-button" type="button" onClick={() => void copyZelleNumber()}>Copy Zelle Number</button>
            {copied && <div className="jgo-copy-message show">Zelle number copied: 908-477-5032</div>}
          </div>
        </div>
      )}
    </section>
  );
}
