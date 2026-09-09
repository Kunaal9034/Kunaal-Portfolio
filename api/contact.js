export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'RESEND_API_KEY is not configured on the server. Please add your Resend API key to environment variables.' 
    });
  }

  try {
    const toEmail = process.env.RESEND_TO_EMAIL || 'skunaal57@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email.trim(),
        subject: `New Portfolio Contact — ${name.trim()}`,
        text: `Subject: New Portfolio Contact — ${name.trim()}\n\nName: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #10b981; padding-bottom: 8px;">New Portfolio Contact</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 80px;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${name.trim()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px;"><a href="mailto:${email.trim()}" style="color: #06b6d4; text-decoration: none;">${email.trim()}</a></td>
              </tr>
            </table>
            <div style="margin-top: 16px;">
              <strong style="color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Message:</strong>
              <div style="margin-top: 8px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #10b981; border-radius: 4px; color: #1e293b; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message.trim()}</div>
            </div>
          </div>
        `
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Failed to send email via Resend' });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
