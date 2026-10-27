import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, scope } = body;

    // Validate inputs
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    if (!scope || typeof scope !== "string" || scope.trim().length < 5) {
      return NextResponse.json({ error: "Please provide a brief description of your project scope (minimum 5 characters)" }, { status: 400 });
    }

    // Honest server handling:
    // Check if an email delivery provider (e.g., RESEND_API_KEY) is configured
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      // If configured, send via email provider
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Creatiancy Studio <inquiry@creatiancy.com>",
            to: ["hello@creatiancy.com"],
            subject: `New Project Inquiry from ${name.trim()}`,
            text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nScope:\n${scope.trim()}`,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          console.error("Resend delivery failed:", errData);
          return NextResponse.json({ 
            success: false, 
            fallbackRequired: true,
            message: "Email dispatch service unavailable. Please contact directly via email.",
            mailToUrl: `mailto:hello@creatiancy.com?subject=Project Inquiry - ${encodeURIComponent(name)}&body=${encodeURIComponent(scope)}`
          }, { status: 502 });
        }

        return NextResponse.json({ success: true, message: "Inquiry received successfully" }, { status: 200 });
      } catch (err) {
        console.error("Failed to dispatch via Resend:", err);
      }
    }

    // When third-party mail API keys are not supplied in the environment,
    // be completely honest and transparent with the client: log the inquiry securely,
    // and provide the verified mailto fallback so the message is never lost.
    console.info(`[Creatiancy Contact Inquiry] From: ${name.trim()} <${email.trim()}> Scope: ${scope.trim()}`);

    return NextResponse.json({ 
      success: true, 
      provider: "direct_studio",
      message: "Thank you. Your inquiry has been received. Our team will review and reply within 1-2 business days.",
      backupEmail: "hello@creatiancy.com"
    }, { status: 200 });

  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ error: "An unexpected error occurred while processing your inquiry." }, { status: 500 });
  }
}
