import { emailBase } from './email-base';
import { getProjectTypeInfo } from './project-types';

export interface ClientEmailData {
  name: string;
  service: string;
  message: string;
  projectDescription?: string;
  preferredDate?: string;
}

/**
 * Genereer gepersonaliseerde bevestigingsmail voor de klant,
 * op basis van het gekozen projecttype.
 */
export function buildClientAutoReply(data: ClientEmailData): string {
  const info = getProjectTypeInfo(data.service);

  const workflowHtml = info.workflow
    .map(
      (step, i) => `
      <tr>
        <td style="padding:8px 12px 8px 0;vertical-align:top;color:#c8a96e;font-size:14px;font-weight:700;width:28px;">${String(i + 1).padStart(2, '0')}</td>
        <td style="padding:8px 0;color:#cccccc;font-size:14px;line-height:1.6;">${step}</td>
      </tr>`
    )
    .join('');

  const content = `
    <h2 style="margin:0 0 8px;font-size:20px;color:#ffffff;font-weight:600;">Beste ${data.name},</h2>
    <p style="margin:0 0 24px;font-size:15px;color:#aaaaaa;line-height:1.6;">
      Bedankt voor je aanvraag voor <strong style="color:#c8a96e;">${info.label}</strong>. Ik heb je bericht goed ontvangen en neem binnen 24 uur contact met je op voor een vrijblijvend kennismakingsgesprek.
    </p>

    <!-- Workflow -->
    <div style="margin:0 0 28px;padding:24px;background-color:#111111;border-left:3px solid #c8a96e;">
      <p style="margin:0 0 16px;font-size:13px;color:#c8a96e;text-transform:uppercase;letter-spacing:3px;font-weight:600;">Zo werken we samen</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${workflowHtml}
      </table>
    </div>

    ${data.projectDescription ? `
    <!-- Project beschrijving echo -->
    <div style="margin:0 0 24px;padding:16px 20px;background-color:#111111;border-radius:4px;">
      <p style="margin:0 0 8px;font-size:12px;color:#c8a96e;text-transform:uppercase;letter-spacing:2px;">Jouw projectbeschrijving</p>
      <p style="margin:0;font-size:14px;color:#999999;font-style:italic;line-height:1.6;">"${data.projectDescription}"</p>
    </div>
    ` : ''}

    ${data.preferredDate ? `
    <p style="margin:0 0 24px;font-size:14px;color:#cccccc;line-height:1.6;">
      📅 Gewenste datum/periode: <strong style="color:#ffffff;">${data.preferredDate}</strong>
    </p>
    ` : ''}

    <!-- CTA -->
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
      <tr>
        <td style="background-color:#c8a96e;padding:14px 28px;">
          <a href="${info.portfolioUrl}" style="color:#0a0a0a;font-size:13px;font-weight:600;text-decoration:none;text-transform:uppercase;letter-spacing:2px;">${info.portfolioLabel}</a>
        </td>
      </tr>
    </table>

    <!-- Next step -->
    <div style="margin:0 0 8px;padding:20px;background-color:#0f0f0f;border:1px solid rgba(200,169,110,0.15);border-radius:4px;">
      <p style="margin:0 0 6px;font-size:14px;color:#ffffff;font-weight:600;">Volgende stap</p>
      <p style="margin:0;font-size:14px;color:#aaaaaa;line-height:1.6;">Ik neem binnen 24 uur contact op om een vrijblijvend kennismakingsgesprek in te plannen. Je kunt me ook altijd direct bereiken via <a href="tel:+32474114899" style="color:#c8a96e;text-decoration:none;">+32 474 11 48 99</a> of <a href="https://wa.me/message/3X4O23SGBQNCC1" style="color:#c8a96e;text-decoration:none;">WhatsApp</a>.</p>
    </div>
  `;

  return emailBase(content);
}
