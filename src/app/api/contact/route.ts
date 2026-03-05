import { NextRequest, NextResponse } from 'next/server';
import { buildClientAutoReply, buildPhotographerNotification } from '@/templates';
import { getProjectTypeInfo } from '@/templates/project-types';

/**
 * POST /api/contact
 *
 * Ontvangt contactformulier data, stuurt twee e-mails:
 * 1. Gepersonaliseerde bevestiging naar de klant
 * 2. Overzicht met alle gegevens naar info@tigranmedia.be
 *
 * Gebruikt Nodemailer met Hostinger SMTP.
 * Env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL
 *
 * NOTE: Deze route werkt alleen als het project NIET met `output: 'export'`
 * draait. Tijdens development (`next dev`) werkt het altijd. Voor productie
 * moet je ofwel output: 'export' verwijderen, ofwel deze logica deployen
 * als Lambda (kopieer de templates naar /lambda/contact-form/).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message, projectDescription, preferredDate } = body;

    // Validatie
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Naam, e-mail en bericht zijn verplicht.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Ongeldig e-mailadres.' },
        { status: 400 }
      );
    }

    // Dynamisch importeren zodat nodemailer niet in de client bundle belandt
    // eslint-disable-next-line @typescript-eslint/no-require-imports
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

    const contactEmail = process.env.CONTACT_EMAIL || 'info@tigranmedia.be';
    const senderEmail = process.env.SMTP_USER || 'info@tigranmedia.be';
    const typeInfo = getProjectTypeInfo(service);

    // Genereer HTML e-mails
    const clientHtml = buildClientAutoReply({
      name,
      service,
      message,
      projectDescription,
      preferredDate,
    });

    const notificationHtml = buildPhotographerNotification({
      name,
      email,
      phone,
      service,
      message,
      projectDescription,
      preferredDate,
    });

    // Plaintext fallback voor de klant
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
    ]
      .filter(Boolean)
      .join('\n');

    // Plaintext fallback voor de fotograaf
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
    ]
      .filter(Boolean)
      .join('\n');

    // Verstuur beide e-mails parallel
    await Promise.all([
      transporter.sendMail({
        from: `"Tigran Media" <${senderEmail}>`,
        to: email,
        subject: `Bedankt voor je aanvraag — ${typeInfo.label} — Tigran Media`,
        html: clientHtml,
        text: clientPlaintext,
      }),
      transporter.sendMail({
        from: `"Tigran Media Website" <${senderEmail}>`,
        replyTo: email,
        to: contactEmail,
        subject: `Nieuwe aanvraag: ${name} — ${typeInfo.label}`,
        html: notificationHtml,
        text: notifPlaintext,
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Bericht succesvol verstuurd! Je ontvangt een bevestiging per e-mail.',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Er is een serverfout opgetreden. Probeer het later opnieuw of mail naar info@tigranmedia.be.',
      },
      { status: 500 }
    );
  }
}
