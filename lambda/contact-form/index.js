const nodemailer = require('nodemailer');
const { getProjectTypeInfo, buildClientAutoReply, buildPhotographerNotification } = require('./templates');

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
    const { name, email, phone, service, message, projectDescription, preferredDate } = body;

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
    const typeInfo = getProjectTypeInfo(service);

    // Generate HTML emails from templates
    const notificationHtml = buildPhotographerNotification({
      name, email, phone, service, message, projectDescription, preferredDate,
    });

    const confirmationHtml = buildClientAutoReply({
      name, service, message, projectDescription, preferredDate,
    });

    // Plaintext fallbacks
    const notifPlaintext = [
      `Nieuwe aanvraag: ${name} — ${typeInfo.label}`,
      '',
      `Naam: ${name}`,
      `E-mail: ${email}`,
      phone ? `Telefoon: ${phone}` : '',
      `Type: ${typeInfo.label}`,
      preferredDate ? `Gewenste datum: ${preferredDate}` : '',
      '',
      projectDescription ? `Projectbeschrijving:\n${projectDescription}` : '',
      '',
      message ? `Aanvullend bericht:\n${message}` : '',
    ].filter(Boolean).join('\n');

    const clientPlaintext = [
      `Beste ${name},`,
      '',
      `Bedankt voor je aanvraag voor ${typeInfo.label}. Ik heb je bericht goed ontvangen en neem binnen 24 uur contact op voor een vrijblijvend kennismakingsgesprek.`,
      '',
      projectDescription ? `Jouw projectbeschrijving: "${projectDescription}"` : '',
      preferredDate ? `Gewenste datum/periode: ${preferredDate}` : '',
      '',
      'Met vriendelijke groeten,',
      'Tigran Media',
      'info@tigranmedia.be | +32 474 11 48 99',
    ].filter(Boolean).join('\n');

    // Send both emails via Hostinger SMTP
    await Promise.all([
      transporter.sendMail({
        from: `"Tigran Media Website" <${senderEmail}>`,
        replyTo: email,
        to: contactEmail,
        subject: `Nieuwe aanvraag: ${name} — ${typeInfo.label}`,
        html: notificationHtml,
        text: notifPlaintext,
      }),
      transporter.sendMail({
        from: `"Tigran Media" <${senderEmail}>`,
        to: email,
        subject: `Bedankt voor je aanvraag — ${typeInfo.label} — Tigran Media`,
        html: confirmationHtml,
        text: clientPlaintext,
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
