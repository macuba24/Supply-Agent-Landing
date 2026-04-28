import { NextResponse } from "next/server";

type DemoPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  website?: string;
  lang?: "de" | "en" | "fr" | "es" | "pt" | "it" | "ko" | "zh";
};

const requestLog = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(req: Request) {
  const body = (await req.json()) as DemoPayload;
  const name = body.name?.trim();
  const email = body.email?.trim();
  const company = body.company?.trim();
  const message = body.message?.trim() ?? "";
  const website = body.website?.trim() ?? "";
  const lang = body.lang ?? "de";
  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();

  const errorByLang = {
    de: "Bitte Name, E-Mail und Unternehmen ausfüllen.",
    en: "Please fill in name, email, and company.",
    fr: "Veuillez renseigner le nom, l'e-mail et l'entreprise.",
    es: "Por favor completa nombre, correo y empresa.",
    pt: "Por favor preencha nome, e-mail e empresa.",
    it: "Inserisci nome, e-mail e azienda.",
    ko: "이름, 이메일, 회사명을 입력해 주세요.",
    zh: "请填写姓名、邮箱和公司。",
  } as const;

  const successByLang = {
    de: "Danke! Deine Testanfrage ist eingegangen. Wir melden uns kurzfristig mit den Zugangsdaten.",
    en: "Thanks! Your trial request has been received. We will contact you shortly with access details.",
    fr: "Merci ! Votre demande d'essai est bien recue. Nous revenons vers vous rapidement avec les acces.",
    es: "Gracias. Hemos recibido tu solicitud de prueba. Te contactaremos pronto con los accesos.",
    pt: "Obrigado! Recebemos seu pedido de teste. Em breve enviaremos os dados de acesso.",
    it: "Grazie! Abbiamo ricevuto la tua richiesta di prova. Ti contatteremo a breve con gli accessi.",
    ko: "감사합니다. 체험 요청이 접수되었습니다. 곧 접속 정보를 안내드리겠습니다.",
    zh: "感谢提交，您的试用申请已收到。我们将尽快发送访问方式。",
  } as const;

  const rateLimitErrorByLang = {
    de: "Zu viele Anfragen in kurzer Zeit. Bitte später erneut versuchen.",
    en: "Too many requests in a short time. Please try again later.",
    fr: "Trop de demandes en peu de temps. Veuillez reessayer plus tard.",
    es: "Demasiadas solicitudes en poco tiempo. Intenta de nuevo mas tarde.",
    pt: "Muitas solicitacoes em pouco tempo. Tente novamente mais tarde.",
    it: "Troppe richieste in poco tempo. Riprova piu tardi.",
    ko: "짧은 시간에 요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
    zh: "短时间请求过多，请稍后再试。",
  } as const;

  // Honeypot field: should stay empty for real users.
  if (website.length > 0) {
    return NextResponse.json({ ok: true, message: successByLang[lang] });
  }

  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((ts) => now - ts < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return NextResponse.json({ error: rateLimitErrorByLang[lang] }, { status: 429 });
  }
  recent.push(now);
  requestLog.set(ip, recent);

  if (!name || !email || !company) {
    return NextResponse.json(
      { error: errorByLang[lang] },
      { status: 400 },
    );
  }

  if (message.length > 1200) {
    return NextResponse.json(
      { error: errorByLang[lang] },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: successByLang[lang],
  });
}
