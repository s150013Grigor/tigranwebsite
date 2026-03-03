import { emailBase } from './email-base';
import { getProjectTypeInfo } from './project-types';

export interface NotificationEmailData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  projectDescription?: string;
  preferredDate?: string;
}

/**
 * Genereer notificatiemail voor de fotograaf (info@tigranmedia.be)
 * met alle ingevulde gegevens overzichtelijk samengevat.
 */
export function buildPhotographerNotification(data: NotificationEmailData): string {
  const info = getProjectTypeInfo(data.service);

  const rows = [
    { label: 'Naam', value: data.name },
    { label: 'E-mail', value: `<a href="mailto:${data.email}" style="color:#c8a96e;text-decoration:none;">${data.email}</a>` },
    ...(data.phone ? [{ label: 'Telefoon', value: `<a href="tel:${data.phone}" style="color:#c8a96e;text-decoration:none;">${data.phone}</a>` }] : []),
    { label: 'Type project', value: `<strong style="color:#c8a96e;">${info.label}</strong>` },
    ...(data.preferredDate ? [{ label: 'Gewenste datum', value: data.preferredDate }] : []),
  ];

  const rowsHtml = rows
    .map(
      (r) => `
      <tr>
        <td style="padding:10px 16px 10px 0;color:#c8a96e;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;vertical-align:top;white-space:nowrap;width:140px;">${r.label}</td>
        <td style="padding:10px 0;color:#ffffff;font-size:14px;line-height:1.5;">${r.value}</td>
      </tr>`
    )
    .join('');

  const content = `
    <div style="margin:0 0 8px;padding:4px 12px;background-color:#c8a96e;display:inline-block;">
      <p style="margin:0;font-size:11px;font-weight:700;color:#0a0a0a;text-transform:uppercase;letter-spacing:3px;">Nieuwe aanvraag</p>
    </div>
    <h2 style="margin:12px 0 24px;font-size:22px;color:#ffffff;font-weight:600;">${data.name} — ${info.label}</h2>

    <!-- Gegevens tabel -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      ${rowsHtml}
    </table>

    ${data.projectDescription ? `
    <!-- Projectbeschrijving -->
    <div style="margin:0 0 20px;padding:20px;background-color:#111111;border-left:3px solid #c8a96e;">
      <p style="margin:0 0 8px;font-size:12px;color:#c8a96e;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Projectbeschrijving</p>
      <p style="margin:0;font-size:14px;color:#cccccc;line-height:1.6;white-space:pre-wrap;">${data.projectDescription}</p>
    </div>
    ` : ''}

    ${data.message ? `
    <!-- Bericht -->
    <div style="margin:0 0 20px;padding:20px;background-color:#111111;border-left:3px solid rgba(255,255,255,0.15);">
      <p style="margin:0 0 8px;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Aanvullend bericht</p>
      <p style="margin:0;font-size:14px;color:#cccccc;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
    </div>
    ` : ''}

    <!-- Quick actions -->
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding-right:12px;">
          <a href="mailto:${data.email}" style="display:inline-block;padding:12px 24px;background-color:#c8a96e;color:#0a0a0a;font-size:12px;font-weight:600;text-decoration:none;text-transform:uppercase;letter-spacing:2px;">Beantwoorden</a>
        </td>
        ${data.phone ? `
        <td>
          <a href="tel:${data.phone}" style="display:inline-block;padding:12px 24px;border:1px solid rgba(200,169,110,0.4);color:#c8a96e;font-size:12px;font-weight:600;text-decoration:none;text-transform:uppercase;letter-spacing:2px;">Bellen</a>
        </td>
        ` : ''}
      </tr>
    </table>
  `;

  return emailBase(content);
}
