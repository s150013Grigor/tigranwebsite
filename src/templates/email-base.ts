/**
 * Base email layout wrapper — Tigran Media huisstijl
 * Dark theme, gold accent (#c8a96e), responsive
 */

export function emailBase(content: string): string {
  return `<!DOCTYPE html>
<html lang="nl" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Tigran Media</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#050505;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#0a0a0a;border:1px solid rgba(255,255,255,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid rgba(200,169,110,0.25);text-align:center;">
              <h1 style="margin:0;font-size:26px;font-weight:700;letter-spacing:4px;color:#ffffff;">TIGRAN <span style="color:#c8a96e;font-size:14px;font-weight:400;letter-spacing:6px;vertical-align:middle;">MEDIA</span></h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:36px 40px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <p style="margin:0 0 6px;font-size:13px;color:#888888;">Tigran Media — Content & Branding Fotografie</p>
              <p style="margin:0 0 12px;font-size:12px;color:#555555;">info@tigranmedia.be &nbsp;|&nbsp; +32 474 11 48 99</p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="padding:0 8px;">
                    <a href="https://www.instagram.com/tigran.media/" style="color:#c8a96e;font-size:12px;text-decoration:none;">Instagram</a>
                  </td>
                  <td style="padding:0 8px;">
                    <a href="https://www.linkedin.com/in/tigran-khachatryan-01b67a361/" style="color:#c8a96e;font-size:12px;text-decoration:none;">LinkedIn</a>
                  </td>
                  <td style="padding:0 8px;">
                    <a href="https://www.tigranmedia.be" style="color:#c8a96e;font-size:12px;text-decoration:none;">Website</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
