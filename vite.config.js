import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function contactDevApiPlugin() {
  return {
    name: 'contact-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Method not allowed' }));
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const { name, email, message } = JSON.parse(body || '{}');

            if (!name?.trim() || !email?.trim() || !message?.trim()) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: 'Name, email, and message are required.' }));
            }

            // Reload env on request to pick up any changes in .env.local without server restart
            const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
            const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;

            if (!apiKey) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ 
                error: 'RESEND_API_KEY is not configured in .env.local. Please add your Resend API key to send messages.' 
              }));
            }

            const toEmail = env.RESEND_TO_EMAIL || process.env.RESEND_TO_EMAIL || 'skunaal57@gmail.com';
            const fromEmail = env.RESEND_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

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
              res.statusCode = response.status;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: data.message || 'Failed to send email via Resend' }));
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: true, id: data.id }));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
          }
        });
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), contactDevApiPlugin()],
  server: {
    port: 3000,
    open: false
  }
});
