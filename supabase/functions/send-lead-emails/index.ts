import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LeadData {
  plan_type: string;
  company_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  employee_count: string;
  message: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: LeadData = await req.json();
    const planLabel = data.plan_type === "monthly" ? "Monatliches Abo (4,99€/Monat)" : "Jahres-Abo (3,99€/Monat, 47,88€/Jahr)";

    // Send notification to partnerships team
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    if (RESEND_API_KEY) {
      // Notification email to partnerships
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Neotaste Corporate <noreply@neotaste.app>",
          to: ["partnerships@neotaste.app"],
          subject: `Neue Corporate Benefit Anfrage: ${data.company_name}`,
          html: `
            <h2>Neue Corporate Benefit Anfrage</h2>
            <table style="border-collapse:collapse;width:100%;">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Modell</td><td style="padding:8px;border:1px solid #ddd;">${planLabel}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:8px;border:1px solid #ddd;">${data.company_name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Ansprechpartner</td><td style="padding:8px;border:1px solid #ddd;">${data.first_name} ${data.last_name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">E-Mail</td><td style="padding:8px;border:1px solid #ddd;">${data.email}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Telefon</td><td style="padding:8px;border:1px solid #ddd;">${data.phone}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Mitarbeiter</td><td style="padding:8px;border:1px solid #ddd;">${data.employee_count}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Nachricht</td><td style="padding:8px;border:1px solid #ddd;">${data.message || "–"}</td></tr>
            </table>
          `,
        }),
      });

      // Confirmation email to customer
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Neotaste Corporate <noreply@neotaste.app>",
          to: [data.email],
          subject: "Ihre Neotaste Corporate Benefit Anfrage",
          html: `
            <h2>Vielen Dank für Ihre Anfrage, ${data.first_name}!</h2>
            <p>Wir haben Ihre Anfrage für das <strong>${planLabel}</strong> für <strong>${data.company_name}</strong> mit <strong>${data.employee_count} Mitarbeitern</strong> erhalten.</p>
            <p>Unser Partnerships-Team wird sich innerhalb von 24 Stunden bei Ihnen melden.</p>
            <br/>
            <p>Mit freundlichen Grüßen,<br/>Ihr Neotaste Team</p>
          `,
        }),
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
