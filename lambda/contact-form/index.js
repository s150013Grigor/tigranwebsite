const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'info@tigranmedia.be',
    pass: process.env.SMTP_PASS,
  },
});

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight
  if (event.requestContext?.http?.method === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { name, email, phone, service, message } = body;

    // Validation
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Naam, email en bericht zijn verplicht.',
        }),
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Ongeldig emailadres.',
        }),
      };
    }

    const contactEmail = process.env.CONTACT_EMAIL || 'info@tigranmedia.be';
    const senderEmail = process.env.SMTP_USER || 'info@tigranmedia.be';

    // Send notification email to photographer
    const notificationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 30px; border-radius: 10px;">
        <div style="border-bottom: 2px solid #c8a97e; padding-bottom: 15px; margin-bottom: 20px;">
          <h1 style="color: #c8a97e; margin: 0; font-size: 24px;">Tigran Media</h1>
          <p style="color: #888; margin: 5px 0 0; font-size: 14px;">Nieuw bericht via contactformulier</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #c8a97e; font-weight: bold; width: 120px;">Naam:</td>
            <td style="padding: 10px 0; color: #fff;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #c8a97e; font-weight: bold;">Email:</td>
            <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #c8a97e;">${email}</a></td>
          </tr>
          ${phone ? `<tr>
            <td style="padding: 10px 0; color: #c8a97e; font-weight: bold;">Telefoon:</td>
            <td style="padding: 10px 0;"><a href="tel:${phone}" style="color: #c8a97e;">${phone}</a></td>
          </tr>` : ''}
          ${service ? `<tr>
            <td style="padding: 10px 0; color: #c8a97e; font-weight: bold;">Dienst:</td>
            <td style="padding: 10px 0; color: #fff;">${service}</td>
          </tr>` : ''}
        </table>
        
        <div style="margin-top: 20px; padding: 15px; background: #1a1a1a; border-left: 3px solid #c8a97e; border-radius: 5px;">
          <p style="color: #c8a97e; margin: 0 0 10px; font-weight: bold;">Bericht:</p>
          <p style="color: #ccc; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        
        <p style="color: #666; font-size: 12px; margin-top: 20px; text-align: center;">
          Dit bericht is verstuurd via het contactformulier op tigranmedia.be
        </p>
      </div>
    `;

    // Send confirmation email to visitor
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 30px; border-radius: 10px;">
        <div style="text-align: center; border-bottom: 2px solid #c8a97e; padding-bottom: 20px; margin-bottom: 20px;">
          <h1 style="color: #c8a97e; margin: 0; font-size: 28px;">Tigran Media</h1>
          <p style="color: #888; margin: 5px 0 0;">Photography Studio</p>
        </div>
        
        <h2 style="color: #fff; font-size: 20px;">Beste ${name},</h2>
        <p style="color: #ccc; line-height: 1.6;">Bedankt voor je bericht! We hebben je aanvraag goed ontvangen en nemen zo snel mogelijk contact met je op, meestal binnen 24 uur.</p>
        
        <div style="margin: 25px 0; padding: 15px; background: #1a1a1a; border-radius: 5px;">
          <p style="color: #c8a97e; font-weight: bold; margin: 0 0 10px;">Je bericht:</p>
          <p style="color: #aaa; margin: 0; font-style: italic; line-height: 1.5;">"${message}"</p>
        </div>
        
        <p style="color: #ccc; line-height: 1.6;">In tussentijd kun je onze <a href="https://www.tigranmedia.be/portfolio" style="color: #c8a97e;">portfolio</a> bekijken of ons volgen op social media.</p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
          <p style="color: #888; font-size: 13px; margin: 0;">Tigran Media — Professionele Fotografie</p>
          <p style="color: #666; font-size: 12px; margin: 5px 0 0;">info@tigranmedia.be | +32 474 11 48 99</p>
        </div>
      </div>
    `;

    // Send both emails via Hostinger SMTP
    await Promise.all([
      transporter.sendMail({
        from: `"Tigran Media Website" <${senderEmail}>`,
        replyTo: email,
        to: contactEmail,
        subject: `Nieuw contactformulier: ${name}${service ? ` — ${service}` : ''}`,
        html: notificationHtml,
        text: `Nieuw contactformulier bericht\n\nNaam: ${name}\nEmail: ${email}\n${phone ? `Telefoon: ${phone}\n` : ''}${service ? `Dienst: ${service}\n` : ''}\nBericht:\n${message}`,
      }),
      transporter.sendMail({
        from: `"Tigran Media" <${senderEmail}>`,
        to: email,
        subject: 'Bedankt voor je bericht — Tigran Media',
        html: confirmationHtml,
        text: `Beste ${name},\n\nBedankt voor je bericht! We hebben je aanvraag goed ontvangen en nemen zo snel mogelijk contact met je op, meestal binnen 24 uur.\n\nMet vriendelijke groeten,\nTigran Media\ninfo@tigranmedia.be | +32 474 11 48 99`,
      }),
    ]);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Bericht succesvol verstuurd! We nemen zo snel mogelijk contact met je op.',
      }),
    };
  } catch (error) {
    console.error('Contact form error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Er is een serverfout opgetreden. Probeer het later opnieuw of neem rechtstreeks contact op via info@tigranmedia.be.',
      }),
    };
  }
};
