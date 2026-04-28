"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LanguageSwitcher, type LandingLocale } from "@/components/language-switcher";

type Locale = LandingLocale;

const enterpriseHeroByLocale: Record<
  Locale,
  {
    headline: string;
    subline: string;
    badges: string[];
    ctaDemo: string;
    ctaPdf: string;
    flowTitle: string;
    flowSteps: string[];
  }
> = {
  de: {
    headline: "Schluss mit manuellem Daten-Chaos: Der Supply Agent für Ihren globalen Einkauf.",
    subline:
      "KI-gestützte Dokumentenerfassung, mathematische Risikoanalyse und nahtlose SAP-Integration. Entwickelt aus 20 Jahren Automotive-Projekterfahrung, um Ihre Supply Chain vom PDF bis zum ERP-Eintrag zu automatisieren.",
    badges: [
      "✅ SAP-ready (OData/OAuth)",
      "✅ DSGVO & ISO 27001 konform",
      "✅ Multi-Language",
    ],
    ctaDemo: "Jetzt Demo vereinbaren",
    ctaPdf: "Funktionsübersicht laden (PDF)",
    flowTitle: "Datenfluss auf einen Blick",
    flowSteps: ["Dokument/Anfrage", "KI-Extraktion", "Risiko-Engine", "SAP/ERP-Eintrag"],
  },
  en: {
    headline: "Stop manual data chaos: Supply Agent for your global procurement.",
    subline:
      "AI Document Extraction, Mathematical Risk Modeling, and Native SAP Integration. Built on 20 years of Automotive Expertise to turn your PDF chaos into structured ERP data in seconds.",
    badges: [
      "✅ SAP-ready (OData/OAuth)",
      "✅ GDPR & ISO 27001 compliant",
      "✅ Multi-Language",
    ],
    ctaDemo: "Book demo now",
    ctaPdf: "Download feature overview (PDF)",
    flowTitle: "Data flow at a glance",
    flowSteps: ["Document/Request", "AI extraction", "Risk engine", "SAP/ERP entry"],
  },
  fr: {
    headline: "Stop au chaos manuel des donnees : Supply Agent pour vos achats globaux.",
    subline:
      "Capture documentaire par IA, analyse mathematique des risques et integration SAP fluide. Concu avec 20 ans d'experience automotive pour automatiser votre supply chain du PDF a l'entree ERP.",
    badges: [
      "✅ SAP-ready (OData/OAuth)",
      "✅ Conforme RGPD & ISO 27001",
      "✅ Multi-Language",
    ],
    ctaDemo: "Planifier une demo",
    ctaPdf: "Telecharger les fonctionnalites (PDF)",
    flowTitle: "Flux de donnees en un coup d'oeil",
    flowSteps: ["Document/Demande", "Extraction IA", "Moteur de risque", "Entree SAP/ERP"],
  },
  es: {
    headline: "Fin al caos manual de datos: Supply Agent para compras globales.",
    subline:
      "Captura documental con IA, analisis matematico de riesgo e integracion SAP fluida. Desarrollado con 20 anos de experiencia automotive para automatizar tu cadena desde PDF hasta ERP.",
    badges: [
      "✅ SAP-ready (OData/OAuth)",
      "✅ Cumple RGPD e ISO 27001",
      "✅ Multi-Language",
    ],
    ctaDemo: "Solicitar demo ahora",
    ctaPdf: "Descargar resumen funcional (PDF)",
    flowTitle: "Flujo de datos de un vistazo",
    flowSteps: ["Documento/Solicitud", "Extraccion IA", "Motor de riesgo", "Entrada SAP/ERP"],
  },
  pt: {
    headline: "Fim do caos manual de dados: Supply Agent para compras globais.",
    subline:
      "Captura documental com IA, analise matematica de risco e integracao SAP fluida. Criado com 20 anos de experiencia automotive para automatizar a cadeia do PDF ao ERP.",
    badges: [
      "✅ SAP-ready (OData/OAuth)",
      "✅ Conforme RGPD & ISO 27001",
      "✅ Multi-Language",
    ],
    ctaDemo: "Agendar demo agora",
    ctaPdf: "Baixar resumo funcional (PDF)",
    flowTitle: "Fluxo de dados em resumo",
    flowSteps: ["Documento/Pedido", "Extracao IA", "Motor de risco", "Entrada SAP/ERP"],
  },
  it: {
    headline: "Basta caos dati manuale: Supply Agent per acquisti globali.",
    subline:
      "Acquisizione documentale con IA, analisi matematica del rischio e integrazione SAP fluida. Nato da 20 anni di esperienza automotive per automatizzare la supply chain dal PDF all'ERP.",
    badges: [
      "✅ SAP-ready (OData/OAuth)",
      "✅ Conforme GDPR & ISO 27001",
      "✅ Multi-Language",
    ],
    ctaDemo: "Prenota demo ora",
    ctaPdf: "Scarica panoramica funzioni (PDF)",
    flowTitle: "Flusso dati in sintesi",
    flowSteps: ["Documento/Richiesta", "Estrazione IA", "Motore rischio", "Voce SAP/ERP"],
  },
  ko: {
    headline: "수작업 데이터 혼선은 이제 끝: 글로벌 구매를 위한 Supply Agent.",
    subline:
      "AI 문서 추출, 수학 기반 리스크 분석, SAP 연동으로 PDF부터 ERP 입력까지 자동화합니다. 20년 automotive 프로젝트 경험으로 설계되었습니다.",
    badges: [
      "✅ SAP-ready (OData/OAuth)",
      "✅ GDPR & ISO 27001 준수",
      "✅ Multi-Language",
    ],
    ctaDemo: "지금 데모 예약",
    ctaPdf: "기능 개요 다운로드(PDF)",
    flowTitle: "데이터 흐름 한눈에 보기",
    flowSteps: ["문서/요청", "AI 추출", "리스크 엔진", "SAP/ERP 입력"],
  },
  zh: {
    headline: "告别手工数据混乱：面向全球采购的 Supply Agent。",
    subline:
      "AI 文档提取、数学风险分析与无缝 SAP 集成。基于 20 年 automotive 项目经验，打通从 PDF 到 ERP 的自动化流程。",
    badges: [
      "✅ SAP-ready (OData/OAuth)",
      "✅ 符合 GDPR 与 ISO 27001",
      "✅ Multi-Language",
    ],
    ctaDemo: "立即预约演示",
    ctaPdf: "下载功能概览（PDF）",
    flowTitle: "数据流一目了然",
    flowSteps: ["文档/请求", "AI 提取", "风险引擎", "SAP/ERP 入账"],
  },
};

const copy: Record<
  Locale,
  {
    langLabel: string;
    heroTitle: string;
    heroText: string;
    heroDemo: string;
    heroTrial: string;
    highlights: string[];
    stats: { kpi: string; label: string }[];
    advantagesTitle: string;
    advantagesText: string;
    advantages: { title: string; text: string }[];
    trialTitle: string;
    trialText: string;
    placeholders: { name: string; email: string; company: string; message: string };
    trialButton: string;
    trialSending: string;
    trustTag: string;
    trustTitle: string;
    trustText: string;
    contactButton: string;
  }
> = {
  de: {
    langLabel: "Sprache",
    heroTitle: "Die KI-gestützte Supply-Chain-Plattform für Dokumente, Risiken und Tracking",
    heroText:
      "Reduziere Medienbrüche, erkenne Lieferkettenrisiken frühzeitig und automatisiere Angebots- und Freigabeprozesse in einem zentralen Workflow.",
    heroDemo: "Live-Demo ansehen",
    heroTrial: "Testzugang anfragen",
    highlights: [
      "Dokument-Upload, Bearbeitung und Export in einem Flow",
      "Route-Risikoanalyse mit KPI-Tracking und Performance-Sicht",
      "Kunden- und Lieferantenprozesse inkl. Angebotsgenerierung",
    ],
    stats: [
      { kpi: "-35%", label: "weniger manueller Dokumentenaufwand" },
      { kpi: "+28%", label: "schnellere Angebotsreaktion" },
      { kpi: "-22%", label: "weniger Lieferkettenstörungen" },
      { kpi: "24/7", label: "Transparenz für Einkauf und Logistik" },
    ],
    advantagesTitle: "Alle Vorteile auf einen Blick",
    advantagesText:
      "Supply Agent verbindet operative Teams, Einkauf und Management auf einer gemeinsamen Datenbasis. So entstehen schnellere Entscheidungen, weniger Fehler und mehr Liefersicherheit.",
    advantages: [
      { title: "Zeitgewinn im Tagesgeschäft", text: "Automatisierte Workflows sparen manuelle Abstimmung in E-Mails, Excel und Einzeltools." },
      { title: "Weniger operative Risiken", text: "Routenrisiken und Störfaktoren werden früh erkannt statt erst im Eskalationsfall." },
      { title: "Bessere Lieferantensteuerung", text: "Tracking, KPI und Lieferantenvergleich schaffen Transparenz über Performance und Kosten." },
      { title: "Schnellere Angebotsprozesse", text: "Kundenangebote lassen sich direkt aus den aktuellen Datenlagen strukturiert erzeugen." },
      { title: "Saubere Dokumentation", text: "Dokumente werden zentral erfasst, bearbeitet und exportiert statt verteilt abgelegt." },
      { title: "Skalierbar für Wachstum", text: "Der Prozess bleibt auch bei mehr Lieferanten, mehr Routen und mehr Aufträgen stabil." },
      { title: "Management-Transparenz", text: "KPI-Dashboards zeigen den Status der Supply Chain in einer Entscheidungssicht." },
      { title: "Schneller Einstieg für Teams", text: "Klare Bedienlogik und geführte Testphase erleichtern die Einführung im Betrieb." },
    ],
    trialTitle: "Kostenlosen Test starten",
    trialText: "Hinterlasse deine Kontaktdaten. Du erhältst einen geführten Testzugang für dein Team.",
    placeholders: {
      name: "Name *",
      email: "E-Mail *",
      company: "Unternehmen *",
      message: "Optional: Anzahl Nutzer, aktueller Prozess...",
    },
    trialButton: "Testzugang anfragen",
    trialSending: "Sende Anfrage...",
    trustTag: "Vertrauen",
    trustTitle: "Erfahrung trifft Technologie",
    trustText:
      "Entwickelt von Rainer Hampicke mit 20 Jahren Automotive-Projektmanagement-Erfahrung. Supply Agent entsteht aus realen Herausforderungen in globalen Beschaffungs- und Logistikprozessen und ist auf messbare Prozesssicherheit statt auf Folienversprechen ausgelegt.",
    contactButton: "Kontakt aufnehmen",
  },
  en: {
    langLabel: "Language",
    heroTitle: "The AI-powered supply chain platform for documents, risk, and tracking",
    heroText:
      "Reduce media disruptions, detect supply risks earlier, and automate quotation and approval processes in one central workflow.",
    heroDemo: "View live demo",
    heroTrial: "Request trial access",
    highlights: [
      "Document upload, editing, and export in one flow",
      "Route risk analysis with KPI tracking and performance view",
      "Customer and supplier workflows incl. quote generation",
    ],
    stats: [
      { kpi: "-35%", label: "less manual document effort" },
      { kpi: "+28%", label: "faster quotation response" },
      { kpi: "-22%", label: "fewer supply chain disruptions" },
      { kpi: "24/7", label: "transparency for procurement and logistics" },
    ],
    advantagesTitle: "Key Benefits",
    advantagesText:
      "Built for ROI, speed, and scale by eliminating operational busy work across global procurement workflows.",
    advantages: [
      { title: "🚀 Boost Speed", text: "From receipt to SAP entry in < 10 seconds." },
      { title: "🛡️ Mitigate Risk", text: "Real-time route scoring with the R = (P * S) / (M + 1) algorithm." },
      { title: "🔗 Enterprise Ready", text: "Secure OData/OAuth connectivity for S/4HANA." },
      { title: "Faster quotation cycle", text: "Customer offers can be generated quickly from current data." },
      { title: "Clean documentation", text: "Documents are centrally captured, processed, and exported." },
      { title: "Scales with growth", text: "Processes stay stable with more suppliers, routes, and orders." },
      { title: "Management visibility", text: "KPI dashboards show supply chain status in a decision-ready view." },
      { title: "Fast team onboarding", text: "Clear UX and guided trial rollout simplify adoption." },
    ],
    trialTitle: "Start your free trial",
    trialText: "Leave your contact details and receive guided trial access for your team.",
    placeholders: {
      name: "Name *",
      email: "Email *",
      company: "Company *",
      message: "Optional: users, current process, goals...",
    },
    trialButton: "Request trial access",
    trialSending: "Sending request...",
    trustTag: "Trust",
    trustTitle: "Experience meets technology",
    trustText:
      "Built by Rainer Hampicke with 20 years of automotive project management experience. Supply Agent is shaped by real procurement and logistics challenges and focused on measurable process reliability.",
    contactButton: "Contact us",
  },
  fr: {
    langLabel: "Langue",
    heroTitle: "La plateforme supply chain pilotee par l'IA pour documents, risques et suivi",
    heroText:
      "Reduisez les ruptures de medias, anticipez les risques logistiques et automatisez les processus d'offre et de validation dans un workflow central.",
    heroDemo: "Voir la demo live",
    heroTrial: "Demander un acces test",
    highlights: [
      "Televersement, edition et export documentaire dans un seul flux",
      "Analyse de risque de route avec KPI et performance",
      "Processus clients et fournisseurs incluant generation d'offres",
    ],
    stats: [
      { kpi: "-35%", label: "moins d'effort manuel sur les documents" },
      { kpi: "+28%", label: "reponse commerciale plus rapide" },
      { kpi: "-22%", label: "moins de perturbations supply chain" },
      { kpi: "24/7", label: "visibilite pour achats et logistique" },
    ],
    advantagesTitle: "Tous les avantages en un coup d'oeil",
    advantagesText:
      "Supply Agent relie les operations, les achats et le management sur une base de donnees commune pour des decisions plus rapides et une meilleure fiabilite.",
    advantages: [
      { title: "Gain de temps operationnel", text: "Les workflows automatises reduisent les coordinations manuelles entre e-mails, Excel et outils isoles." },
      { title: "Moins de risques operationnels", text: "Les risques de route et signaux de perturbation sont detectes plus tot." },
      { title: "Pilotage fournisseur ameliore", text: "Le suivi, les KPI et les comparaisons fournisseurs donnent une vraie transparence cout/performance." },
      { title: "Cycle d'offre accelere", text: "Les offres clients sont produites rapidement a partir des donnees actuelles." },
      { title: "Documentation propre", text: "Les documents sont captes, traites et exportes de facon centralisee." },
      { title: "Scalable avec la croissance", text: "Le processus reste stable avec plus de fournisseurs, routes et commandes." },
      { title: "Visibilite management", text: "Les tableaux KPI donnent une vue claire pour la decision." },
      { title: "Adoption equipe rapide", text: "Une UX claire et une phase test guidee facilitent le deploiement." },
    ],
    trialTitle: "Demarrer un test gratuit",
    trialText: "Laissez vos coordonnees et recevez un acces test guide pour votre equipe.",
    placeholders: {
      name: "Nom *",
      email: "E-mail *",
      company: "Entreprise *",
      message: "Optionnel: utilisateurs, processus actuel, objectifs...",
    },
    trialButton: "Demander un acces test",
    trialSending: "Envoi en cours...",
    trustTag: "Confiance",
    trustTitle: "L'experience au service de la technologie",
    trustText:
      "Concu par Rainer Hampicke avec 20 ans d'experience en pilotage de projets automotive. Supply Agent repond a des enjeux reels d'achats et de logistique avec un objectif de fiabilite mesurable.",
    contactButton: "Nous contacter",
  },
  es: {
    langLabel: "Idioma",
    heroTitle: "La plataforma de supply chain con IA para documentos, riesgo y seguimiento",
    heroText:
      "Reduce rupturas de informacion, detecta riesgos logísticos antes y automatiza ofertas y aprobaciones en un flujo central.",
    heroDemo: "Ver demo en vivo",
    heroTrial: "Solicitar acceso de prueba",
    highlights: [
      "Carga, edicion y exportacion documental en un solo flujo",
      "Analisis de riesgo de rutas con KPI y vista de rendimiento",
      "Procesos de clientes y proveedores con generacion de ofertas",
    ],
    stats: [
      { kpi: "-35%", label: "menos esfuerzo manual en documentos" },
      { kpi: "+28%", label: "respuesta comercial mas rapida" },
      { kpi: "-22%", label: "menos interrupciones en la cadena" },
      { kpi: "24/7", label: "transparencia para compras y logistica" },
    ],
    advantagesTitle: "Todos los beneficios de un vistazo",
    advantagesText:
      "Supply Agent conecta operaciones, compras y direccion en una base de datos comun para decidir mas rapido y mejorar la confiabilidad.",
    advantages: [
      { title: "Ahorro de tiempo operativo", text: "Los flujos automatizados reducen la coordinacion manual entre correo, Excel y herramientas aisladas." },
      { title: "Menor riesgo operativo", text: "Los riesgos de ruta y señales de interrupcion se detectan antes." },
      { title: "Mejor gestion de proveedores", text: "Tracking, KPI y comparativas ofrecen transparencia en rendimiento y coste." },
      { title: "Ciclo comercial mas rapido", text: "Las ofertas se generan rapidamente con datos actualizados." },
      { title: "Documentacion ordenada", text: "Los documentos se capturan, procesan y exportan de forma centralizada." },
      { title: "Escalable al crecimiento", text: "El proceso se mantiene estable con mas proveedores, rutas y pedidos." },
      { title: "Visibilidad para direccion", text: "Los paneles KPI muestran el estado real de la supply chain." },
      { title: "Adopcion rapida del equipo", text: "Una experiencia clara y una prueba guiada aceleran la implantacion." },
    ],
    trialTitle: "Iniciar prueba gratuita",
    trialText: "Deja tus datos y recibe un acceso de prueba guiado para tu equipo.",
    placeholders: {
      name: "Nombre *",
      email: "Correo *",
      company: "Empresa *",
      message: "Opcional: usuarios, proceso actual, objetivos...",
    },
    trialButton: "Solicitar acceso de prueba",
    trialSending: "Enviando solicitud...",
    trustTag: "Confianza",
    trustTitle: "Experiencia y tecnologia",
    trustText:
      "Desarrollado por Rainer Hampicke con 20 anos de experiencia en gestion de proyectos automotive. Supply Agent nace de retos reales de compras y logistica con foco en fiabilidad medible.",
    contactButton: "Contactar",
  },
  pt: {
    langLabel: "Idioma",
    heroTitle: "A plataforma de supply chain com IA para documentos, risco e rastreamento",
    heroText:
      "Reduza rupturas de informação, identifique riscos logísticos mais cedo e automatize propostas e aprovações em um fluxo central.",
    heroDemo: "Ver demo ao vivo",
    heroTrial: "Solicitar acesso de teste",
    highlights: [
      "Upload, edição e exportação de documentos em um único fluxo",
      "Análise de risco de rota com KPI e visão de performance",
      "Processos de clientes e fornecedores com geração de propostas",
    ],
    stats: [
      { kpi: "-35%", label: "menos esforço manual com documentos" },
      { kpi: "+28%", label: "resposta comercial mais rápida" },
      { kpi: "-22%", label: "menos interrupções na cadeia" },
      { kpi: "24/7", label: "transparência para compras e logística" },
    ],
    advantagesTitle: "Todos os benefícios em um só lugar",
    advantagesText:
      "O Supply Agent conecta operações, compras e gestão em uma base comum para decisões mais rápidas e mais segurança de entrega.",
    advantages: [
      { title: "Ganho de tempo operacional", text: "Fluxos automatizados reduzem coordenação manual entre e-mail, Excel e ferramentas isoladas." },
      { title: "Menor risco operacional", text: "Riscos de rota e sinais de interrupção são identificados mais cedo." },
      { title: "Melhor gestão de fornecedores", text: "Tracking, KPI e comparativos dão transparência sobre custo e performance." },
      { title: "Ciclo comercial mais ágil", text: "Propostas podem ser geradas rapidamente com dados atualizados." },
      { title: "Documentação organizada", text: "Documentos são capturados, processados e exportados de forma centralizada." },
      { title: "Escala com o crescimento", text: "O processo permanece estável com mais fornecedores, rotas e pedidos." },
      { title: "Visibilidade gerencial", text: "Painéis de KPI mostram o status da supply chain para decisão." },
      { title: "Adoção rápida da equipe", text: "UX clara e teste guiado facilitam a implantação." },
    ],
    trialTitle: "Iniciar teste gratuito",
    trialText: "Deixe seus dados de contato e receba acesso de teste guiado para sua equipe.",
    placeholders: {
      name: "Nome *",
      email: "E-mail *",
      company: "Empresa *",
      message: "Opcional: usuários, processo atual, objetivos...",
    },
    trialButton: "Solicitar acesso de teste",
    trialSending: "Enviando solicitação...",
    trustTag: "Confiança",
    trustTitle: "Experiência e tecnologia",
    trustText:
      "Desenvolvido por Rainer Hampicke com 20 anos de experiência em gestão de projetos automotivos. O Supply Agent nasce de desafios reais em compras e logística com foco em confiabilidade mensurável.",
    contactButton: "Entrar em contato",
  },
  it: {
    langLabel: "Lingua",
    heroTitle: "La piattaforma supply chain con IA per documenti, rischio e tracking",
    heroText:
      "Riduci le rotture informative, individua i rischi logistici prima e automatizza offerte e approvazioni in un unico flusso centrale.",
    heroDemo: "Guarda demo live",
    heroTrial: "Richiedi accesso di prova",
    highlights: [
      "Upload, modifica ed export documenti in un unico flusso",
      "Analisi rischio rotta con KPI e vista performance",
      "Processi clienti e fornitori con generazione offerte",
    ],
    stats: [
      { kpi: "-35%", label: "meno lavoro manuale sui documenti" },
      { kpi: "+28%", label: "risposta commerciale più rapida" },
      { kpi: "-22%", label: "meno interruzioni della catena" },
      { kpi: "24/7", label: "trasparenza per acquisti e logistica" },
    ],
    advantagesTitle: "Tutti i vantaggi in sintesi",
    advantagesText:
      "Supply Agent collega operations, acquisti e management su una base dati comune per decisioni più rapide e maggiore affidabilità.",
    advantages: [
      { title: "Risparmio di tempo operativo", text: "I workflow automatizzati riducono il coordinamento manuale tra email, Excel e tool isolati." },
      { title: "Riduzione del rischio operativo", text: "Rischi di rotta e segnali di disservizio vengono rilevati prima." },
      { title: "Miglior controllo fornitori", text: "Tracking, KPI e confronti fornitori aumentano la trasparenza su costi e performance." },
      { title: "Ciclo offerte più veloce", text: "Le offerte si generano rapidamente dai dati aggiornati." },
      { title: "Documentazione pulita", text: "I documenti vengono acquisiti, elaborati ed esportati in modo centralizzato." },
      { title: "Scalabile con la crescita", text: "Il processo resta stabile con più fornitori, rotte e ordini." },
      { title: "Visibilità manageriale", text: "Dashboard KPI mostrano lo stato supply chain in ottica decisionale." },
      { title: "Adozione rapida del team", text: "UX chiara e test guidato facilitano il rollout." },
    ],
    trialTitle: "Avvia prova gratuita",
    trialText: "Lascia i tuoi contatti e ricevi un accesso di prova guidato per il tuo team.",
    placeholders: {
      name: "Nome *",
      email: "E-mail *",
      company: "Azienda *",
      message: "Opzionale: utenti, processo attuale, obiettivi...",
    },
    trialButton: "Richiedi accesso di prova",
    trialSending: "Invio richiesta...",
    trustTag: "Fiducia",
    trustTitle: "Esperienza e tecnologia",
    trustText:
      "Sviluppato da Rainer Hampicke con 20 anni di esperienza nel project management automotive. Supply Agent nasce da sfide reali in acquisti e logistica con focus su affidabilità misurabile.",
    contactButton: "Contattaci",
  },
  ko: {
    langLabel: "언어",
    heroTitle: "문서, 리스크, 추적을 위한 AI 기반 공급망 플랫폼",
    heroText:
      "정보 단절을 줄이고 물류 리스크를 조기에 감지하며 제안/승인 프로세스를 하나의 중앙 워크플로로 자동화합니다.",
    heroDemo: "라이브 데모 보기",
    heroTrial: "체험 계정 요청",
    highlights: [
      "문서 업로드, 편집, 내보내기를 하나의 흐름으로",
      "KPI 기반 경로 리스크 분석 및 성과 가시화",
      "고객/공급업체 프로세스와 제안서 생성 연계",
    ],
    stats: [
      { kpi: "-35%", label: "수작업 문서 처리 감소" },
      { kpi: "+28%", label: "견적 응답 속도 향상" },
      { kpi: "-22%", label: "공급망 중단 감소" },
      { kpi: "24/7", label: "구매/물류 투명성 확보" },
    ],
    advantagesTitle: "핵심 장점 한눈에 보기",
    advantagesText:
      "Supply Agent는 운영, 구매, 경영을 하나의 데이터 기반으로 연결해 더 빠른 의사결정과 더 높은 납기 안정성을 제공합니다.",
    advantages: [
      { title: "운영 시간 절감", text: "자동화 워크플로로 이메일, 엑셀, 분산 도구 간 수작업 조정을 줄입니다." },
      { title: "운영 리스크 감소", text: "경로 리스크와 중단 신호를 더 일찍 감지합니다." },
      { title: "공급업체 관리 고도화", text: "트래킹, KPI, 비교 기능으로 비용/성과 투명성을 확보합니다." },
      { title: "견적 프로세스 가속", text: "최신 데이터를 바탕으로 고객 제안서를 빠르게 생성합니다." },
      { title: "문서 관리 표준화", text: "문서를 중앙에서 수집, 처리, 내보내기 합니다." },
      { title: "성장 대응 확장성", text: "공급업체, 경로, 주문이 늘어나도 프로세스 안정성을 유지합니다." },
      { title: "경영 가시성 확보", text: "KPI 대시보드로 공급망 상태를 의사결정 관점에서 확인합니다." },
      { title: "빠른 팀 도입", text: "명확한 UX와 가이드형 테스트로 도입 속도를 높입니다." },
    ],
    trialTitle: "무료 체험 시작",
    trialText: "연락처를 남기면 팀을 위한 가이드형 체험 계정을 제공합니다.",
    placeholders: {
      name: "이름 *",
      email: "이메일 *",
      company: "회사명 *",
      message: "선택: 사용자 수, 현재 프로세스, 목표...",
    },
    trialButton: "체험 계정 요청",
    trialSending: "요청 전송 중...",
    trustTag: "신뢰",
    trustTitle: "경험과 기술의 결합",
    trustText:
      "Rainer Hampicke의 20년 자동차 프로젝트관리 경험을 바탕으로 개발되었습니다. Supply Agent는 실제 구매/물류 과제를 해결하기 위해 만들어졌고 측정 가능한 프로세스 안정성에 집중합니다.",
    contactButton: "문의하기",
  },
  zh: {
    langLabel: "语言",
    heroTitle: "面向文档、风险与追踪的 AI 供应链平台",
    heroText:
      "减少信息断层，提前识别物流风险，在一个统一流程中自动化报价与审批。",
    heroDemo: "查看在线演示",
    heroTrial: "申请试用",
    highlights: [
      "文档上传、编辑、导出一体化",
      "基于 KPI 的路线风险分析与绩效视图",
      "客户与供应商流程联动，支持自动报价",
    ],
    stats: [
      { kpi: "-35%", label: "文档人工工作量减少" },
      { kpi: "+28%", label: "报价响应速度提升" },
      { kpi: "-22%", label: "供应链中断减少" },
      { kpi: "24/7", label: "采购与物流全时透明" },
    ],
    advantagesTitle: "核心优势一览",
    advantagesText:
      "Supply Agent 将运营、采购与管理连接到同一数据底座，帮助更快决策并提升交付稳定性。",
    advantages: [
      { title: "提升运营效率", text: "自动化流程减少邮件、Excel 与孤立工具之间的手工协调。" },
      { title: "降低运营风险", text: "更早发现路线风险与中断信号，而非事后被动处理。" },
      { title: "强化供应商管理", text: "通过追踪、KPI 与对比分析提升成本与绩效透明度。" },
      { title: "加速报价流程", text: "基于最新数据快速生成客户报价。" },
      { title: "文档管理规范化", text: "文档集中采集、处理与导出，避免分散存放。" },
      { title: "可扩展支撑增长", text: "供应商、路线、订单增加时流程依然稳定。" },
      { title: "管理层可视化", text: "KPI 仪表盘提供可决策的供应链状态视图。" },
      { title: "团队快速上手", text: "清晰体验与引导式试用加速落地。" },
    ],
    trialTitle: "开始免费试用",
    trialText: "留下联系方式，我们将为你的团队开通引导式试用账号。",
    placeholders: {
      name: "姓名 *",
      email: "邮箱 *",
      company: "公司 *",
      message: "可选：用户数、当前流程、目标...",
    },
    trialButton: "申请试用",
    trialSending: "正在提交...",
    trustTag: "信任",
    trustTitle: "经验与技术结合",
    trustText:
      "由拥有 20 年汽车项目管理经验的 Rainer Hampicke 打造。Supply Agent 来自真实采购与物流场景，聚焦可量化的流程稳定性。",
    contactButton: "联系我们",
  },
};

const copyrightByLocale: Record<Locale, string> = {
  de: "© 2026 Supply Agent. Alle Rechte vorbehalten.",
  en: "© 2026 Supply Agent. All rights reserved.",
  fr: "© 2026 Supply Agent. Tous droits reserves.",
  es: "© 2026 Supply Agent. Todos los derechos reservados.",
  pt: "© 2026 Supply Agent. Todos os direitos reservados.",
  it: "© 2026 Supply Agent. Tutti i diritti riservati.",
  ko: "© 2026 Supply Agent. 모든 권리 보유.",
  zh: "© 2026 Supply Agent. 保留所有权利。",
};

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("de");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const t = copy[locale];
  const enterpriseHero = enterpriseHeroByLocale[locale];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = (params.get("lang") ?? "de").toLowerCase();
    if ((["de", "en", "fr", "es", "pt", "it", "ko", "zh"] as const).includes(raw as Locale)) {
      setLocale(raw as Locale);
    }
  }, []);

  const handleLocaleChange = (nextLocale: Locale) => {
    const params = new URLSearchParams(window.location.search);
    params.set("lang", nextLocale);
    router.replace(`${pathname}?${params.toString()}`);
    setLocale(nextLocale);
  };

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setFeedback("");

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      message: String(formData.get("message") ?? ""),
      lang: locale,
    };

    const res = await fetch("/api/demo-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json()) as { error?: string; message?: string };
    setLoading(false);

    if (!res.ok) {
      setFeedback(data.error ?? "Anfrage konnte nicht gesendet werden.");
      return;
    }
    setFeedback(data.message ?? "Anfrage erfolgreich gesendet.");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16">
        <nav className="sticky top-4 z-20 rounded-2xl border border-slate-700/80 bg-slate-900/80 p-3 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-3">
              <Image
                src="/app-logo-v2.png"
                alt="Supply Agent Logo"
                width={40}
                height={40}
                className="rounded-md"
                priority
              />
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-300">Supply Agent</p>
                <p className="text-sm text-slate-300">Industrial Supply Chain Intelligence</p>
              </div>
            </div>
            <LanguageSwitcher currentLocale={locale} onChange={handleLocaleChange} />
          </div>
        </nav>

        <header className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 to-cyan-950/40 p-8 shadow-2xl">
          <div className="inline-flex items-center gap-3 rounded-xl border border-slate-700/80 bg-slate-950/60 px-3 py-2">
            <Image
              src="/app-logo-v2.png"
              alt="Supply Agent Logo"
              width={34}
              height={34}
              className="rounded-md"
              priority
            />
            <span className="text-sm font-semibold tracking-wide text-cyan-100">Supply Agent</span>
          </div>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
            {enterpriseHero.headline}
          </h1>
          <p className="mt-4 max-w-4xl text-lg text-slate-300">{enterpriseHero.subline}</p>
          <div className="mt-5 grid gap-2 md:grid-cols-3">
            {enterpriseHero.badges.map((badge, index) => (
              <p
                key={badge}
                className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                  index === 0
                    ? "border-[#0f6cbd]/70 bg-[#0f6cbd]/20 text-[#9ed0ff]"
                    : "border-cyan-500/40 bg-cyan-500/10 text-cyan-100"
                }`}
              >
                {badge}
              </p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#testzugang"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              <Image src="/app-logo-v2.png" alt="Supply Agent" width={16} height={16} className="rounded-sm" />
              {enterpriseHero.ctaDemo}
            </a>
            <a
              href="#vorteile"
              className="rounded-lg border border-cyan-400/60 bg-cyan-500/10 px-5 py-2.5 font-medium text-cyan-100 transition hover:bg-cyan-500/20"
            >
              {enterpriseHero.ctaPdf}
            </a>
          </div>
          <div id="vorteile" className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{enterpriseHero.flowTitle}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              {enterpriseHero.flowSteps.map((step, idx) => (
                <span key={step} className="inline-flex items-center gap-2">
                  <span className="rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-slate-200">{step}</span>
                  {idx < enterpriseHero.flowSteps.length - 1 ? <span className="text-cyan-300">→</span> : null}
                </span>
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {t.highlights.map((item) => (
            <article
              key={item}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg"
            >
              <p className="text-sm text-slate-200">- {item}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          {t.stats.map((item) => (
            <article key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-center shadow-lg">
              <p className="text-3xl font-bold text-cyan-300">{item.kpi}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-slate-400">{item.label}</p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-cyan-500/30 bg-slate-900/90 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold">{t.advantagesTitle}</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">{t.advantagesText}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {t.advantages.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <h3 className="text-sm font-semibold text-cyan-200">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="testzugang" className="rounded-3xl border border-cyan-500/30 bg-slate-900/90 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold">{t.trialTitle}</h2>
          <p className="mt-2 text-sm text-slate-300">{t.trialText}</p>

          <form
            action={handleSubmit}
            className="mt-6 grid gap-4 md:grid-cols-2"
          >
            <input
              name="name"
              placeholder={t.placeholders.name}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none ring-cyan-400 focus:ring"
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t.placeholders.email}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none ring-cyan-400 focus:ring"
              required
            />
            <input
              name="company"
              placeholder={t.placeholders.company}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none ring-cyan-400 focus:ring"
              required
            />
            <input
              name="message"
              placeholder={t.placeholders.message}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none ring-cyan-400 focus:ring"
            />
            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 rounded-lg bg-cyan-400 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
            >
              {loading ? t.trialSending : t.trialButton}
            </button>
          </form>
          {feedback ? <p className="mt-3 text-sm text-cyan-200">{feedback}</p> : null}
        </section>

        <section className="rounded-3xl border border-slate-700/70 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">{t.trustTag}</p>
          <h2 className="mt-2 text-2xl font-semibold">{t.trustTitle}</h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-300">{t.trustText}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#testzugang"
              className="rounded-lg bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              {t.heroTrial}
            </a>
            <a
              href="mailto:kontakt@supply-agent.de"
              className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-white"
            >
              {t.contactButton}
            </a>
          </div>
        </section>
        <p className="text-center text-xs text-slate-400">{copyrightByLocale[locale]}</p>
      </section>
    </main>
  );
}
