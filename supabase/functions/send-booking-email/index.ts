import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { Resend } from "https://esm.sh/resend@1.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    // Get the request body
    const { record } = await req.json();

    // Validate the request
    if (!record?.client_email) {
      throw new Error("Missing required booking information");
    }

    // Format the date and time for display
    const meetingDate = new Date(record.meeting_date);
    const formattedDate = meetingDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Send confirmation email to client
    await resend.emails.send({
      from: "Raynbows Meetings <onboarding@resend.dev>", // Use verified domain in production
      to: record.client_email,
      subject: "Meeting Confirmation",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a1a1a;">Your Meeting is Confirmed!</h1>
          <p>Dear ${record.client_name},</p>
          <p>Your meeting has been successfully scheduled.</p>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1a1a1a; margin-top: 0;">Meeting Details</h2>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 10px;"><strong>Date:</strong> ${formattedDate}</li>
              <li style="margin-bottom: 10px;"><strong>Time:</strong> ${record.meeting_time}</li>
              <li style="margin-bottom: 10px;"><strong>Purpose:</strong> ${record.meeting_purpose}</li>
              <li><strong>Timezone:</strong> ${record.timezone}</li>
            </ul>
          </div>
          
          <p>We look forward to meeting with you!</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          
          <p style="color: #6b7280; font-size: 14px;">
            If you need to make any changes to this booking, please contact us directly.
          </p>
        </div>
      `,
    });

    // Send notification to team
    await resend.emails.send({
      from: "Raynbows Meetings <onboarding@resend.dev>", // Use verified domain in production
      to: "team@yourdomain.com", // Replace with actual team email
      subject: "New Meeting Scheduled",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a1a1a;">New Meeting Scheduled</h1>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1a1a1a; margin-top: 0;">Client Details</h2>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 10px;"><strong>Name:</strong> ${record.client_name}</li>
              <li style="margin-bottom: 10px;"><strong>Email:</strong> ${record.client_email}</li>
            </ul>
            
            <h2 style="color: #1a1a1a; margin-top: 20px;">Meeting Details</h2>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 10px;"><strong>Date:</strong> ${formattedDate}</li>
              <li style="margin-bottom: 10px;"><strong>Time:</strong> ${record.meeting_time}</li>
              <li style="margin-bottom: 10px;"><strong>Purpose:</strong> ${record.meeting_purpose}</li>
              <li><strong>Timezone:</strong> ${record.timezone}</li>
            </ul>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
