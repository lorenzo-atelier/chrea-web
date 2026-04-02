import { Resend } from "resend";

// Lazy instantiation — avoid Resend constructor throwing at build time if no API key
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    // Resend requires a non-empty key starting with "re_" — use a dummy if not configured
    const key = process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes("placeholder")
      ? process.env.RESEND_API_KEY
      : "re_unconfigured_key_000000000000000000";
    _resend = new Resend(key);
  }
  return _resend;
}

// Welcome email HTML — matches CHRÉA brand: obsidian bg, gold accents, Cormorant Garamond
const welcomeEmailHtml = (email: string) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenida al flock — CHRÉA</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400&display=swap');
    body { margin: 0; padding: 0; background-color: #FAF7F2; font-family: 'Jost', system-ui, sans-serif; }
    .wrapper { max-width: 560px; margin: 0 auto; }
    .header { background-color: #2C3227; padding: 3rem 2.5rem; text-align: center; }
    .logo { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2.5rem; font-weight: 300; letter-spacing: 0.2em; color: #FAF7F2; margin: 0; }
    .logo-accent { color: #B8975A; }
    .divider { width: 3rem; height: 1px; background: #B8975A; margin: 1.5rem auto; }
    .tagline { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 0.9rem; font-style: italic; color: #C4B49A; letter-spacing: 0.1em; margin: 0; }
    .body { background-color: #F5F0E8; padding: 3rem 2.5rem; }
    .headline { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2rem; font-weight: 300; color: #2C3227; line-height: 1.2; margin: 0 0 1.5rem; }
    .headline em { color: #B8975A; font-style: italic; }
    .text { font-size: 0.95rem; line-height: 1.8; color: #3D4035; margin: 0 0 1.25rem; }
    .cta-wrap { text-align: center; margin: 2.5rem 0; }
    .cta { display: inline-block; background: #2C3227; color: #FAF7F2; font-family: 'Jost', system-ui, sans-serif; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; padding: 0.875rem 2.25rem; }
    .bird { text-align: center; margin: 2rem 0 0; font-size: 1.5rem; opacity: 0.4; }
    .footer { background-color: #2C3227; padding: 2rem 2.5rem; text-align: center; }
    .footer-brand { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.2rem; letter-spacing: 0.2em; color: #FAF7F2; margin: 0 0 0.75rem; }
    .footer-text { font-size: 0.72rem; letter-spacing: 0.1em; color: #7C7870; margin: 0; }
    .footer-link { color: #B8975A; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <p class="logo">CHR<span class="logo-accent">É</span>A</p>
      <div class="divider"></div>
      <p class="tagline">Un universo para volver a ti.</p>
    </div>
    <div class="body">
      <h1 class="headline">Bienvenida al <em>flock.</em></h1>
      <p class="text">
        Llegaste. Y no fue por accidente.
      </p>
      <p class="text">
        CHRÉA es un espacio construido para mujeres como tú — que saben que hay algo más.
        Más profundidad. Más verdad. Más vida.
      </p>
      <p class="text">
        Aquí vas a encontrar conversaciones que encienden algo. Contenido que te mueve.
        Y un lugar donde regresar a ti deja de ser una idea… y se convierte en práctica.
      </p>
      <div class="cta-wrap">
        <a class="cta" href="${process.env.NEXT_PUBLIC_APP_URL || 'https://chrea.co'}">
          → Explorar CHRÉA
        </a>
      </div>
      <p class="text" style="font-size: 0.85rem; color: #7C7870; font-style: italic; text-align: center;">
        "El lugar en donde todo empieza a hacer sentido."
      </p>
      <div class="bird">✦</div>
    </div>
    <div class="footer">
      <p class="footer-brand">CHRÉA</p>
      <p class="footer-text">
        Recibiste este email porque te suscribiste en <a class="footer-link" href="${process.env.NEXT_PUBLIC_APP_URL || 'https://chrea.co'}">chrea.co</a><br/>
        <a class="footer-link" href="${process.env.NEXT_PUBLIC_APP_URL || 'https://chrea.co'}/unsubscribe?email=${encodeURIComponent(email)}">Darte de baja</a>
      </p>
    </div>
  </div>
</body>
</html>
`;

export async function sendWelcomeEmail(email: string): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith("re_placeholder")) {
    console.log("[email] RESEND_API_KEY not configured, skipping email send");
    return { success: true }; // graceful degradation
  }

  try {
    const { error } = await getResend().emails.send({
      from: "CHRÉA <hola@chrea.co>",
      to: [email],
      subject: "✦ Bienvenida al flock, querida.",
      html: welcomeEmailHtml(email),
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("[email] Unexpected error:", err);
    return { success: false, error: String(err) };
  }
}
