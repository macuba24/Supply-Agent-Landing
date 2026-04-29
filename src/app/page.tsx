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
    ctaPartner: string;
    ctaOverview: string;
    ctaDeepDive: string;
    flowTitle: string;
    flowSteps: string[];
    deploymentGuarantee: string;
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
    ctaPartner: "Partner-Programm anfragen",
    ctaOverview: "Funktionsübersicht ansehen",
    ctaDeepDive: "Deep Dive anfragen",
    flowTitle: "Datenfluss auf einen Blick",
    flowSteps: ["Dokument/Anfrage", "KI-Extraktion", "Risiko-Engine", "SAP/ERP-Eintrag"],
    deploymentGuarantee: "Ready to deploy in your plant within 48 hours.",
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
    ctaPartner: "Get partner access",
    ctaOverview: "View feature overview",
    ctaDeepDive: "Request a Deep Dive",
    flowTitle: "Data flow at a glance",
    flowSteps: ["Document/Request", "AI extraction", "Risk engine", "SAP/ERP entry"],
    deploymentGuarantee: "Ready to deploy in your plant within 48 hours.",
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
    ctaPartner: "Demander acces partenaire",
    ctaOverview: "Voir les fonctionnalites",
    ctaDeepDive: "Request a Deep Dive",
    flowTitle: "Flux de donnees en un coup d'oeil",
    flowSteps: ["Document/Demande", "Extraction IA", "Moteur de risque", "Entree SAP/ERP"],
    deploymentGuarantee: "Ready to deploy in your plant within 48 hours.",
  },
  es: {
    headline: "Fin al caos manual de datos: Supply Agent para compras globales.",
    subline:
      "Captura documental con IA, analisis matematico de riesgo e integracion SAP fluida. Desarrollado con 20 anos de experiencia automotive para automatizar tu cadena desde PDF hasta ERP.",
    badges: [
      "✅ SAP listo (OData/OAuth)",
      "✅ Cumple RGPD e ISO 27001",
      "✅ Multi-idioma",
    ],
    ctaDemo: "Solicitar demo ahora",
    ctaPartner: "Solicitar programa partner",
    ctaOverview: "Ver resumen funcional",
    ctaDeepDive: "Solicitar Deep Dive",
    flowTitle: "Flujo de datos de un vistazo",
    flowSteps: ["Documento/Solicitud", "Extraccion IA", "Motor de riesgo", "Entrada SAP/ERP"],
    deploymentGuarantee: "Listo para implementarse en tu planta en 48 horas.",
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
    ctaPartner: "Solicitar acesso parceiro",
    ctaOverview: "Ver resumo funcional",
    ctaDeepDive: "Request a Deep Dive",
    flowTitle: "Fluxo de dados em resumo",
    flowSteps: ["Documento/Pedido", "Extracao IA", "Motor de risco", "Entrada SAP/ERP"],
    deploymentGuarantee: "Ready to deploy in your plant within 48 hours.",
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
    ctaPartner: "Richiedi accesso partner",
    ctaOverview: "Vedi panoramica funzioni",
    ctaDeepDive: "Request a Deep Dive",
    flowTitle: "Flusso dati in sintesi",
    flowSteps: ["Documento/Richiesta", "Estrazione IA", "Motore rischio", "Voce SAP/ERP"],
    deploymentGuarantee: "Ready to deploy in your plant within 48 hours.",
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
    ctaPartner: "파트너 액세스 요청",
    ctaOverview: "기능 개요 보기",
    ctaDeepDive: "Request a Deep Dive",
    flowTitle: "데이터 흐름 한눈에 보기",
    flowSteps: ["문서/요청", "AI 추출", "리스크 엔진", "SAP/ERP 입력"],
    deploymentGuarantee: "Ready to deploy in your plant within 48 hours.",
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
    ctaPartner: "申请合作伙伴访问",
    ctaOverview: "查看功能概览",
    ctaDeepDive: "Request a Deep Dive",
    flowTitle: "数据流一目了然",
    flowSteps: ["文档/请求", "AI 提取", "风险引擎", "SAP/ERP 入账"],
    deploymentGuarantee: "Ready to deploy in your plant within 48 hours.",
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
    expertTag: string;
    expertTitle: string;
    expertText: string;
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
    expertTag: "Built by Industry Experts",
    expertTitle: "20+ Jahre Automotive-Erfahrung im Produktkern",
    expertText:
      "Von Serienanlauf bis Lieferantensteuerung: Die Plattform ist aus realen Prozessen im DE-MEX-USA-Korridor gedacht und für industrielle Teams ausgelegt.",
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
    expertTag: "Built by Industry Experts",
    expertTitle: "20+ years of automotive expertise at the core",
    expertText:
      "From SOP ramp-up to supplier steering, the product reflects real-world processes across the DE-MEX-USA corridor for industrial teams.",
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
    expertTag: "Built by Industry Experts",
    expertTitle: "20+ ans d'expertise automotive au coeur du produit",
    expertText:
      "Du lancement serie au pilotage fournisseurs, la plateforme s'appuie sur des processus reels adaptes aux equipes industrielles.",
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
    expertTag: "Built by Industry Experts",
    expertTitle: "20+ anos de experiencia automotive en el nucleo",
    expertText:
      "Desde arranque de serie hasta gestion de proveedores: pensado para procesos reales del corredor DE-MEX-USA y equipos industriales.",
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
    expertTag: "Built by Industry Experts",
    expertTitle: "20+ anos de experiencia automotiva no nucleo",
    expertText:
      "Do ramp-up de producao a gestao de fornecedores: feito para fluxos reais de equipes industriais.",
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
    expertTag: "Built by Industry Experts",
    expertTitle: "20+ anni di esperienza automotive nel prodotto",
    expertText:
      "Dal ramp-up produttivo alla gestione fornitori: progettato su processi reali per team industriali.",
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
    expertTag: "Built by Industry Experts",
    expertTitle: "20년 이상 Automotive 경험 기반",
    expertText:
      "양산 전개부터 공급업체 운영까지, 실제 산업 프로세스를 반영해 설계되었습니다.",
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
    expertTag: "Built by Industry Experts",
    expertTitle: "核心产品融合 20+ 年汽车行业经验",
    expertText:
      "从量产爬坡到供应商协同，平台基于真实工业流程设计，适配跨区域团队协作。",
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

const addonCopyByLocale: Record<
  Locale,
  {
    tag: string;
    title: string;
    text: string;
    points: string[];
    cta: string;
    cardCta: string;
  }
> = {
  de: {
    tag: "Zusatztool",
    title: "Flow Agent ERP als Erweiterung für Supply Agent",
    text:
      "Das neue Zusatztool verbindet Dokumenten-Flow mit operativer ERP-Steuerung und SAP-Integration: von Predicted Bottlenecks bis Compliance-Audit-Log in einem durchgängigen Prozess.",
    points: [
      "SP Ready: Direkte SAP-Schnittstellen (S/4HANA via OData/OAuth)",
      "Global Settings: Region, Währung, Unit-System",
      "Predicted Bottlenecks mit Risk Score im Tracking",
      "Compliance & Audit Log mit Filtern, CSV-Export und SAP-relevanter Nachvollziehbarkeit",
    ],
    cta: "Flow Agent ERP live ansehen",
    cardCta: "Flow Agent öffnen",
  },
  en: {
    tag: "Add-on",
    title: "Flow Agent ERP extension for Supply Agent",
    text:
      "The new add-on links document intelligence with operational ERP execution and SAP integration: from predicted bottlenecks to compliance-ready audit logging in one flow.",
    points: [
      "SP Ready: direct SAP interfaces (S/4HANA via OData/OAuth)",
      "Global settings: region, currency, unit system",
      "Predicted bottlenecks with risk score in tracking",
      "Compliance & audit log with filters, CSV export, and SAP-ready traceability",
    ],
    cta: "Open live Flow Agent ERP",
    cardCta: "Open Flow Agent",
  },
  fr: {} as (typeof addonCopyByLocale)["de"],
  es: {
    tag: "Herramienta adicional",
    title: "Flow Agent ERP como extension de Supply Agent",
    text:
      "La nueva extension conecta el flujo documental con la ejecucion operativa ERP y la integracion SAP en un solo proceso continuo.",
    points: [
      "SP Ready: interfaces SAP directas (S/4HANA via OData/OAuth)",
      "Configuracion global: region, moneda y sistema de unidades",
      "Predicted bottlenecks con risk score en tracking",
      "Compliance y audit log con filtros, export CSV y trazabilidad SAP",
    ],
    cta: "Abrir Flow Agent ERP en vivo",
    cardCta: "Abrir Flow Agent",
  },
  pt: {} as (typeof addonCopyByLocale)["de"],
  it: {} as (typeof addonCopyByLocale)["de"],
  ko: {} as (typeof addonCopyByLocale)["de"],
  zh: {} as (typeof addonCopyByLocale)["de"],
};

for (const locale of ["fr", "pt", "it", "ko", "zh"] as const) {
  addonCopyByLocale[locale] = addonCopyByLocale.en;
}

const problemSolutionCopyByLocale: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    items: Array<{ problem: string; solution: string }>;
    tableTitle: string;
    tableHeaders: { before: string; after: string };
    tableRows: Array<{ before: string; after: string }>;
  }
> = {
  de: {
    title: "Probleme, die wir für Sie lösen",
    subtitle:
      "Nicht Features. Sondern konkrete Business-Probleme aus Einkauf, Logistik, IT und Qualität - mit messbarem Ergebnis.",
    items: [
      {
        problem:
          '1) Blindflug in der Logistik: Engpaesse werden erst sichtbar, wenn Bandstillstand oder Lieferausfall schon da ist.',
        solution:
          "Flow Agent liefert Echtzeit-Transparenz und kritischen Pfad live. Engpaesse werden bis zu 48 Stunden frueher erkannt.",
      },
      {
        problem:
          "2) Hoher Admin-Overhead: Ingenieure tippen Daten aus PDF, Excel und Frachtpapieren manuell in Systeme.",
        solution:
          "Supply Agent extrahiert Daten autonom. Manueller Aufwand sinkt um bis zu 85%, Teams gewinnen Zeit für echte Wertarbeit.",
      },
      {
        problem:
          "3) SAP-Komplexitaets-Falle: Kleine ERP-Anpassungen dauern Monate und erzeugen hohe Beratungskosten.",
        solution:
          "Agile Middleware statt Grossprojekt: Rollout in 48 Stunden statt 12 Monaten, auf Basis Ihrer bestehenden IT.",
      },
      {
        problem:
          "4) Audit-Risiko in Qualität: Reklamationen und 8D-Dokumente liegen verteilt, Nachweisführung ist lückenhaft.",
        solution:
          "Quality Agent als digitaler Quality-Twin: automatisierte 8D-Entwürfe plus lückenloser Audit-Trail für IATF-ready Audits.",
      },
      {
        problem:
          "5) Sprach- und Grenzbarrieren: Werke in DE/USA/MEX arbeiten mit unterschiedlichen Datenstaenden.",
        solution:
          "Native Synchronisation in DE/EN/ES: eine Plattform, eine Datenbasis, keine Informationsverluste zwischen Standorten.",
      },
    ],
    tableTitle: "Vorher vs. Nachher",
    tableHeaders: { before: "Status Quo (Alt)", after: "Mit Supply + Flow + Quality Agent (Neu)" },
    tableRows: [
      {
        before: "Manuelle Excel-Listen und Telefon-Terror",
        after: "Automatisierte Echtzeit-Dashboards",
      },
      {
        before: "Reaktive Krisenbewaeltigung",
        after: "Proaktive Risiko-Vermeidung",
      },
      {
        before: "Hohe Fixkosten durch Berater-Armeen",
        after: "Planbare SaaS-Kosten ohne IT-Ballast",
      },
    ],
  },
  en: {
    title: "Problems We Solve",
    subtitle:
      "Not feature lists - real operational bottlenecks across procurement, logistics, IT, and quality with measurable outcomes.",
    items: [
      {
        problem:
          "1) Logistics blind spot: shortages are discovered only when production or delivery is already impacted.",
        solution:
          "Flow Agent delivers live critical-path visibility and flags bottlenecks up to 48 hours earlier.",
      },
      {
        problem:
          "2) Heavy admin overhead: engineers spend time typing data from PDFs, spreadsheets, and shipping docs.",
        solution:
          "Supply Agent extracts data autonomously and can reduce manual effort by up to 85%.",
      },
      {
        problem:
          "3) SAP complexity trap: small ERP changes take months and burn consulting budgets.",
        solution:
          "Agile SAP middleware on top of your existing stack: go live in 48 hours, not 12 months, with direct S/4HANA connectivity.",
      },
      {
        problem:
          "4) Audit risk in quality: complaints and 8D files are fragmented, traceability is incomplete.",
        solution:
          "Quality Agent creates a digital quality twin with automated 8D drafts and immutable audit trails.",
      },
      {
        problem:
          "5) Language and border friction: DE/US/MX teams operate on inconsistent information.",
        solution:
          "Native DE/EN/ES synchronization on one shared source of truth.",
      },
    ],
    tableTitle: "Before vs. After",
    tableHeaders: { before: "Status Quo (Before)", after: "With Supply + Flow + Quality Agent (After)" },
    tableRows: [
      {
        before: "Manual Excel sheets and escalation calls",
        after: "Automated real-time dashboards",
      },
      {
        before: "Reactive firefighting",
        after: "Proactive risk prevention",
      },
      {
        before: "High fixed cost from consulting-heavy ERP changes",
        after: "Predictable SaaS cost without IT ballast",
      },
    ],
  },
  fr: {} as (typeof problemSolutionCopyByLocale)["de"],
  es: {
    title: "Problemas que resolvemos",
    subtitle:
      "No hablamos de features. Resolvemos cuellos de botella reales en compras, logistica, IT y calidad con impacto medible.",
    items: [
      {
        problem:
          "1) Punto ciego en logistica: los faltantes se detectan cuando la linea o la entrega ya estan afectadas.",
        solution:
          "Flow Agent da visibilidad del camino critico en tiempo real y detecta riesgos hasta 48 horas antes.",
      },
      {
        problem:
          "2) Sobrecarga administrativa: ingenieros capturan datos manualmente desde PDF, Excel y documentos de transporte.",
        solution:
          "Supply Agent extrae datos de forma autonoma y puede reducir trabajo manual hasta en 85%.",
      },
      {
        problem:
          "3) Trampa de complejidad SAP: cambios pequenos en ERP tardan meses y elevan el costo de consultoria.",
        solution:
          "Middleware SAP agil sobre su entorno actual: despliegue en 48 horas, no en 12 meses.",
      },
      {
        problem:
          "4) Riesgo de auditoria: reclamos y 8D dispersos en archivos aislados con trazabilidad incompleta.",
        solution:
          "Quality Agent crea un quality twin digital con borradores 8D y audit trail inmutable.",
      },
      {
        problem:
          "5) Friccion por idioma y frontera: equipos DE/USA/MEX trabajan con versiones distintas de la informacion.",
        solution:
          "Sincronizacion nativa DE/EN/ES sobre una unica fuente de verdad.",
      },
    ],
    tableTitle: "Antes vs. Despues",
    tableHeaders: { before: "Estado actual", after: "Con Supply + Flow + Quality Agent" },
    tableRows: [
      { before: "Excel manual y escalaciones por telefono", after: "Dashboards automatizados en tiempo real" },
      { before: "Gestion reactiva de crisis", after: "Prevencion proactiva de riesgos" },
      { before: "Costos fijos altos por consultoria", after: "Costos SaaS previsibles sin carga IT" },
    ],
  },
  pt: {} as (typeof problemSolutionCopyByLocale)["de"],
  it: {} as (typeof problemSolutionCopyByLocale)["de"],
  ko: {} as (typeof problemSolutionCopyByLocale)["de"],
  zh: {} as (typeof problemSolutionCopyByLocale)["de"],
};

for (const locale of ["fr", "pt", "it", "ko", "zh"] as const) {
  problemSolutionCopyByLocale[locale] = problemSolutionCopyByLocale.en;
}

const supplyAgentProblemCopyByLocale: Record<
  Locale,
  {
    title: string;
    items: string[];
  }
> = {
  de: {
    title: "Probleme, die wir für Sie lösen (Supply Agent)",
    items: [
      "Manuelle Datenerfassung aus PDF/Excel/Frachtpapieren -> bis zu 85% weniger manueller Aufwand durch KI-Extraktion.",
      "Intransparente Dokumentenstände zwischen Einkauf, Logistik und Qualität -> ein zentraler, durchgängiger Dokumenten-Flow.",
      "Langsame Angebots- und Freigabeprozesse -> schnellere Reaktion durch strukturierte, sofort nutzbare Daten.",
    ],
  },
  en: {
    title: "Problems we solve (Supply Agent)",
    items: [
      "Manual data capture from PDFs/spreadsheets/shipping documents -> up to 85% less manual workload through AI extraction.",
      "Fragmented document status across procurement, logistics, and quality -> one central, end-to-end document flow.",
      "Slow quotation and approval cycles -> faster response with structured, ready-to-use data.",
    ],
  },
  fr: {} as (typeof supplyAgentProblemCopyByLocale)["de"],
  es: {
    title: "Problemas que resolvemos (Supply Agent)",
    items: [
      "Captura manual desde PDF/Excel/documentos de envio -> hasta 85% menos esfuerzo manual con extraccion IA.",
      "Estado documental fragmentado entre compras, logistica y calidad -> un flujo documental centralizado de extremo a extremo.",
      "Ciclos lentos de oferta y aprobacion -> respuesta mas rapida con datos estructurados y listos para usar.",
    ],
  },
  pt: {} as (typeof supplyAgentProblemCopyByLocale)["de"],
  it: {} as (typeof supplyAgentProblemCopyByLocale)["de"],
  ko: {} as (typeof supplyAgentProblemCopyByLocale)["de"],
  zh: {} as (typeof supplyAgentProblemCopyByLocale)["de"],
};

for (const locale of ["fr", "pt", "it", "ko", "zh"] as const) {
  supplyAgentProblemCopyByLocale[locale] = supplyAgentProblemCopyByLocale.en;
}

const erpGapCopyByLocale: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    cards: Array<{
      problemIcon: string;
      solutionIcon: string;
      problemTitle: string;
      problemText: string;
      solutionTitle: string;
      solutionText: string;
      resultText: string;
      sapFooter: string;
    }>;
    deploymentBanner: string;
    deploymentCta: string;
    bridgeTitle: string;
    bridgeBody: string;
    bridgeNote: string;
    bridgeLeft: string;
    bridgeCenter: string;
    bridgeRight: string;
    engineerTag: string;
    engineerQuote: string;
    quickTitle: string;
    quickSubtitle: string;
    checks: { docs: string; claims: string; downtime: string };
    resultLabel: string;
    resultFast: string;
    resultMedium: string;
    resultLow: string;
  }
> = {
  de: {
    title: "Lassen Sie nicht zu, dass Legacy-Systeme Ihren Shopfloor ausbremsen.",
    subtitle:
      "Wir lösen die drei größten Pain Points in Automotive Supply Chains - ohne 12-Monats-IT-Projekt.",
    cards: [
      {
        problemIcon: "⚠️",
        solutionIcon: "⚡",
        problemTitle: "SUPPLY AGENT: Stop Typing. Start Engineering.",
        problemText:
          "20% der Engineering-Zeit geht durch manuelle Datenerfassung aus PDF- und Lieferantendokumenten verloren.",
        solutionTitle: "Unsere Lösung: KI-gestützte Datenextraktion.",
        solutionText:
          "Automatisierte Extraktion direkt in strukturierte operative Workflows.",
        resultText:
          "Das Ergebnis: Bis zu 85% weniger manueller Aufwand. Echtzeitverfügbarkeit für SAP/ERP.",
        sapFooter: "Auto-sync results directly to SAP MM/PP.",
      },
      {
        problemIcon: "🛑",
        solutionIcon: "🛰️",
        problemTitle: 'Der "Critical Path" Blindspot',
        problemText:
          `Fehlteile werden sichtbar, wenn die Linie bereits steht. SAP "Critical Path" ist oft Mythos statt Realitaet.`,
        solutionTitle: "Unsere Lösung: Predictive Tracking in Echtzeit.",
        solutionText:
          "Live-Critical-Path-Intelligence mit Frühwarnsignalen für Engpässe.",
        resultText:
          "Das Ergebnis: Engpaesse bis zu 48 Stunden frueher erkennen. Null ungeplante Stillstaende.",
        sapFooter: "Real-time SAP data enrichment for critical path visibility.",
      },
      {
        problemIcon: "🚨",
        solutionIcon: "🛡️",
        problemTitle: "Audit- und Haftungsrisiken",
        problemText:
          "Verteilte 8D-Reports, fehlende Compliance-Dokumente und Audit-Panik vor IATF-Checks.",
        solutionTitle: "Unsere Lösung: Digital Quality Twin.",
        solutionText:
          "Zentralisierte Qualitäts- und Compliance-Intelligence über die gesamte Organisation.",
        resultText:
          "Das Ergebnis: KI-generierte 8D-Entwürfe und ein belastbarer zentraler Audit-Trail für VW, MB und BMW.",
        sapFooter: "Automated 8D-Drafts based on SAP quality notifications.",
      },
    ],
    deploymentBanner:
      "Kein IT-Grossprojekt. Keine Berater-Armee. Deployment in 48 Stunden.",
    deploymentCta: "Jetzt Live-Demo starten",
    bridgeTitle: "Keine Datensilos",
    bridgeBody:
      "Integration: We speak SAP. (And OData, and SQL) Your ERP is the Brain. Flow Agent is the Nervous System. We connect seamlessly to your existing SAP landscape via OData or custom API - ensuring a single source of truth without manual synchronization.",
    bridgeNote:
      "We do not need write access to your core tables. We read requirements and inventory via API and give engineers the speed standard SAP GUI cannot provide.",
    bridgeLeft: "SAP ERP",
    bridgeCenter: "Bidirectional Real-Time Sync",
    bridgeRight: "Flow Agent",
    engineerTag: "Creado por un ingeniero",
    engineerQuote:
      "After 20 years in Automotive Engineering at ZF and Kautex -Textron, I realized that SCM tools were built for accountants, not for engineers. I built the Agent Apps to change that.",
    quickTitle: "Quick Check: Was kostet Sie ein manueller Prozess?",
    quickSubtitle: "Waehlen Sie Ihre aktuelle Situation aus und sehen Sie die erwartete Amortisationsdynamik.",
    checks: {
      docs: "10 Min. pro Frachtpapier",
      claims: "5 Reklamationen pro Monat",
      downtime: "1h Bandstillstand-Risiko",
    },
    resultLabel: "Ergebnis",
    resultFast: "Der Flow Agent amortisiert sich voraussichtlich in < 30 Tagen.",
    resultMedium: "Der Flow Agent amortisiert sich typischerweise in 30-60 Tagen.",
    resultLow: "Schon bei niedrigem Volumen entsteht messbarer ROI durch weniger Admin-Aufwand.",
  },
  en: {
    title: "Don't let Legacy Systems slow down your Shop Floor.",
    subtitle:
      "We solve the 3 biggest pain points in Automotive Supply Chains - without the 12-month IT project.",
    cards: [
      {
        problemIcon: "⚠️",
        solutionIcon: "⚡",
        problemTitle: "Manual Data Entry",
        problemText:
          "Your experts spend up to 20% of their time typing data from PDFs and freight documents into SAP.",
        solutionTitle: "Our Solution: AI-Powered Data Extraction.",
        solutionText:
          "Automated extraction directly into structured operational workflows.",
        resultText:
          "The Result: 85% less manual workload. Real-time data availability for SAP/ERP.",
        sapFooter: "Auto-sync results directly to SAP MM/PP.",
      },
      {
        problemIcon: "🛑",
        solutionIcon: "🛰️",
        problemTitle: 'The "Critical Path" Blindspot',
        problemText:
          `You find out about missing parts when the line stops. SAP "Critical Path" is a myth, not a reality.`,
        solutionTitle: "Our Solution: Real-Time Predictive Tracking.",
        solutionText:
          "Live critical-path intelligence with early-warning bottleneck signals.",
        resultText:
          "The Result: See bottlenecks 48 hours before they hit the assembly line. Zero unplanned downtime.",
        sapFooter: "Real-time SAP data enrichment for critical path visibility.",
      },
      {
        problemIcon: "🚨",
        solutionIcon: "🛡️",
        problemTitle: "Audit & Liability Risks",
        problemText:
          "Scattered 8D reports and incomplete documentation create risk in IATF and customer audits.",
        solutionTitle: "Our Solution: Digital Quality Twin.",
        solutionText:
          "Centralized quality and compliance intelligence across your organization.",
        resultText:
          "The Result: AI-generated 8D drafts and a centralized, bulletproof audit trail for VW, MB, and BMW.",
        sapFooter: "Automated 8D-Drafts based on SAP quality notifications.",
      },
    ],
    deploymentBanner:
      "No IT-Project. No Consultant-Army. Deployment in 48 Hours.",
    deploymentCta: "Start Live Demo now",
    bridgeTitle: "Zero Data Silos",
    bridgeBody:
      "Integration: We speak SAP. (And OData, and SQL) Your ERP is the Brain. Flow Agent is the Nervous System. We connect seamlessly to your existing SAP landscape via OData or custom API - ensuring a single source of truth without manual synchronization.",
    bridgeNote:
      "We do not need write access to your core tables. We read requirements and inventory via API and give engineers the speed standard SAP GUI cannot provide.",
    bridgeLeft: "SAP ERP",
    bridgeCenter: "Bidirectional Real-Time Sync",
    bridgeRight: "Flow Agent",
    engineerTag: "Entwickelt von einem Ingenieur",
    engineerQuote:
      "After 20 years in Automotive Engineering at ZF and Kautex -Textron, I realized that SCM tools were built for accountants, not for engineers. I built the Agent Apps to change that.",
    quickTitle: "Quick check: What does a manual process cost you?",
    quickSubtitle: "Select your current situation and get an instant payback signal.",
    checks: {
      docs: "10 min per shipping document",
      claims: "5 claims per month",
      downtime: "1h production downtime risk",
    },
    resultLabel: "Result",
    resultFast: "Flow Agent is likely to pay back in < 30 days.",
    resultMedium: "Flow Agent typically pays back within 30-60 days.",
    resultLow: "Even at low volume, ROI is measurable through reduced admin overhead.",
  },
  fr: {} as (typeof erpGapCopyByLocale)["de"],
  es: {
    title: "No dejes que los sistemas heredados frenen tu planta.",
    subtitle:
      "Resolvemos los 3 mayores problemas de la supply chain automotriz, sin proyectos IT de 12 meses.",
    cards: [
      {
        problemIcon: "⚠️",
        solutionIcon: "⚡",
        problemTitle: "SUPPLY AGENT: Deja de teclear. Vuelve a la ingeniería.",
        problemText:
          "20% del tiempo de ingenieria se pierde en captura manual de datos desde PDFs y documentos de proveedores.",
        solutionTitle: "Nuestra solución: extracción de datos impulsada por IA.",
        solutionText: "Extraccion automatizada en workflows operativos estructurados.",
        resultText: "Resultado: 85% menos carga manual. Disponibilidad de datos en tiempo real para SAP/ERP.",
        sapFooter: "Auto-sync results directly to SAP MM/PP.",
      },
      {
        problemIcon: "🛑",
        solutionIcon: "🛰️",
        problemTitle: 'Punto ciego del "Critical Path"',
        problemText:
          'Se detectan faltantes cuando la linea ya se detuvo. El "Critical Path" en SAP suele llegar tarde.',
        solutionTitle: "Nuestra solución: tracking predictivo en tiempo real.",
        solutionText: "Inteligencia de camino critico en vivo con alertas tempranas.",
        resultText:
          "Resultado: detecta cuellos de botella hasta 48 horas antes de impactar la línea. Cero paros no planificados.",
        sapFooter: "Real-time SAP data enrichment for critical path visibility.",
      },
      {
        problemIcon: "🚨",
        solutionIcon: "🛡️",
        problemTitle: "Riesgos de auditoría y responsabilidad",
        problemText:
          "8D y documentos de cumplimiento dispersos elevan el riesgo antes de auditorias IATF.",
        solutionTitle: "Nuestra solución: Digital Quality Twin.",
        solutionText: "Inteligencia de calidad centralizada en toda la organizacion.",
        resultText:
          "Resultado: borradores 8D generados por IA y audit trail centralizado y robusto para VW, MB y BMW.",
        sapFooter: "Automated 8D-Drafts based on SAP quality notifications.",
      },
    ],
    deploymentBanner: "Sin proyecto IT. Sin ejército de consultores. Implementación en 48 horas.",
    deploymentCta: "Iniciar demo en vivo ahora",
    bridgeTitle: "Cero silos de datos",
    bridgeBody:
      "Integration: We speak SAP. (And OData, and SQL) Your ERP is the Brain. Flow Agent is the Nervous System. We connect seamlessly to your existing SAP landscape via OData or custom API - ensuring a single source of truth without manual synchronization.",
    bridgeNote:
      "No requerimos permisos de escritura en tablas core. Leemos necesidades y stock por API y damos velocidad al equipo de ingenieria.",
    bridgeLeft: "SAP ERP",
    bridgeCenter: "Sincronización bidireccional en tiempo real",
    bridgeRight: "Flow Agent",
    engineerTag: "Creado por un ingeniero",
    engineerQuote:
      "After 20 years in Automotive Engineering at ZF and Kautex -Textron, I realized that SCM tools were built for accountants, not for engineers. I built the Agent Apps to change that.",
    quickTitle: "Quick check: ¿Cuánto te cuesta un proceso manual?",
    quickSubtitle: "Selecciona tu situacion actual y obtiene una senal inmediata de payback.",
    checks: {
      docs: "10 min por documento de envio",
      claims: "5 reclamaciones por mes",
      downtime: "1h riesgo de paro de linea",
    },
    resultLabel: "Resultado",
    resultFast: "Flow Agent se amortiza probablemente en < 30 dias.",
    resultMedium: "Flow Agent normalmente se amortiza en 30-60 dias.",
    resultLow: "Incluso con bajo volumen hay ROI medible por menor carga administrativa.",
  },
  pt: {} as (typeof erpGapCopyByLocale)["de"],
  it: {} as (typeof erpGapCopyByLocale)["de"],
  ko: {} as (typeof erpGapCopyByLocale)["de"],
  zh: {} as (typeof erpGapCopyByLocale)["de"],
};

for (const locale of ["fr", "pt", "it", "ko", "zh"] as const) {
  erpGapCopyByLocale[locale] = erpGapCopyByLocale.en;
}

const trustCopyByLocale: Record<
  Locale,
  {
    industrialTitle: string;
    industrialSubtitle: string;
    industrialKpis: Array<{ label: string; value: string }>;
    proofTitle: string;
    proofText: string;
    founderTitle: string;
    founderText: string;
    integrationTitle: string;
    integrationLink: string;
    hardCta: string;
    roiCta: string;
  }
> = {
  de: {
    industrialTitle: "Industrielle Robustheit, kein Baukasten",
    industrialSubtitle:
      "Ausgelegt für echte Produktionsdaten, nicht für Demo-Tabellen. Fokus: robuste Verarbeitung, klare Traceability, schnelle Entscheidungen im Shopfloor.",
    industrialKpis: [
      { label: "Dokumenttyp", value: "20-seitiges Bill of Lading" },
      { label: "Vorher", value: "45 Min. manuelle Erfassung" },
      { label: "Mit Supply Agent", value: "3 Min. Validierung" },
      { label: "Fehlerrate", value: "<0.1%" },
    ],
    proofTitle: "Proof statt Marketing-Blabla",
    proofText:
      "Beispiel: Verarbeitung eines 20-seitigen Bill of Lading. Vorher: 45 Minuten manuelle Erfassung. Mit Supply Agent: 3 Minuten Validierung. Fehlerquote: <0.1%.",
    founderTitle: "Warum wir das gebaut haben",
    founderText:
      "Nach 20 Jahren in Automotive-Werken in Deutschland und Mexiko habe ich gesehen, wie Teams in Papierarbeit untergehen. Ich habe die Agent Apps gebaut, um ihnen ihre Engineering-Zeit zurückzugeben.",
    integrationTitle: "Technisches Integrationsblatt",
    integrationLink: "Technisches Integrationsblatt öffnen",
    hardCta: "15-Minuten Live-Demo mit Ihrem eigenen PDF buchen",
    roiCta: "ROI jetzt berechnen",
  },
  en: {
    industrialTitle: "Industrial Strength, not a template",
    industrialSubtitle:
      "Built for real production data, not slideware. Focused on robust throughput, traceability, and shopfloor decision speed.",
    industrialKpis: [
      { label: "Document type", value: "20-page Bill of Lading" },
      { label: "Before", value: "45 minutes manual entry" },
      { label: "With Supply Agent", value: "3 minutes validation" },
      { label: "Error rate", value: "<0.1%" },
    ],
    proofTitle: "Proof, not buzzwords",
    proofText:
      "Example: Processing a 20-page Bill of Lading. Before: 45 Minutes manual entry. With Supply Agent: 3 Minutes validation. Error rate: <0.1%.",
    founderTitle: "Por que construimos esto",
    founderText:
      "After 20 years in automotive plants in Germany and Mexico, I saw my team drowning in paperwork. I built this to give them back their engineering time.",
    integrationTitle: "Technical Integration Sheet",
    integrationLink: "Open Technical Integration Sheet",
    hardCta: "Book a 15-minute Live Demo with your own PDF",
    roiCta: "Calculate your ROI now",
  },
  fr: {} as (typeof trustCopyByLocale)["de"],
  es: {
    industrialTitle: "Nivel industrial, no plantilla",
    industrialSubtitle:
      "Disenado para datos reales de planta, con trazabilidad robusta y velocidad de decision en shopfloor.",
    industrialKpis: [
      { label: "Tipo de documento", value: "Bill of Lading de 20 paginas" },
      { label: "Antes", value: "45 min captura manual" },
      { label: "Con Supply Agent", value: "3 min validacion" },
      { label: "Error", value: "<0.1%" },
    ],
    proofTitle: "Prueba, no buzzwords",
    proofText:
      "Example: Processing a 20-page Bill of Lading. Before: 45 Minutes manual entry. With Supply Agent: 3 Minutes validation. Error rate: <0.1%.",
    founderTitle: "Why we built this",
    founderText:
      "Después de 20 años en plantas automotrices en Alemania y México, vi a mi equipo ahogarse en papeleo. Construí las Agent Apps para devolverles su tiempo de ingeniería.",
    integrationTitle: "Ficha técnica de integración",
    integrationLink: "Abrir ficha técnica de integración",
    hardCta: "Reserva una demo en vivo de 15 minutos con tu propio PDF",
    roiCta: "Calcula tu ROI ahora",
  },
  pt: {} as (typeof trustCopyByLocale)["de"],
  it: {} as (typeof trustCopyByLocale)["de"],
  ko: {} as (typeof trustCopyByLocale)["de"],
  zh: {} as (typeof trustCopyByLocale)["de"],
};

for (const locale of ["fr", "pt", "it", "ko", "zh"] as const) {
  trustCopyByLocale[locale] = trustCopyByLocale.en;
}

const contextTabsCopyByLocale: Record<
  Locale,
  {
    title: string;
    supply: string;
    flow: string;
    quality: string;
  }
> = {
  de: {
    title: "Kontext-Navigation",
    supply: "Supply Agent Landingpage",
    flow: "Flow Agent Landingseite",
    quality: "Qualität / Integrationsblatt",
  },
  en: {
    title: "Navegador de contexto",
    supply: "Supply Agent Landing Page",
    flow: "Flow Agent Landing Page",
    quality: "Quality / Integration Sheet",
  },
  fr: {} as (typeof contextTabsCopyByLocale)["de"],
  es: {
    title: "Context Navigator",
    supply: "Landingpage Supply Agent",
    flow: "Landingpage Flow Agent",
    quality: "Ficha tecnica / Integracion",
  },
  pt: {} as (typeof contextTabsCopyByLocale)["de"],
  it: {} as (typeof contextTabsCopyByLocale)["de"],
  ko: {} as (typeof contextTabsCopyByLocale)["de"],
  zh: {} as (typeof contextTabsCopyByLocale)["de"],
};

for (const locale of ["fr", "pt", "it", "ko", "zh"] as const) {
  contextTabsCopyByLocale[locale] = contextTabsCopyByLocale.en;
}

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("de");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const t = copy[locale];
  const enterpriseHero = enterpriseHeroByLocale[locale];
  const addon = addonCopyByLocale[locale];
  const problemSolution = problemSolutionCopyByLocale[locale];
  const supplyProblems = supplyAgentProblemCopyByLocale[locale];
  const erpGap = erpGapCopyByLocale[locale];
  const trust = trustCopyByLocale[locale];
  const contextTabs = contextTabsCopyByLocale[locale];
  const [quickCheck, setQuickCheck] = useState({
    docs: false,
    claims: false,
    downtime: false,
  });

  useEffect(() => {
    const syncLocaleFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const raw = (params.get("lang") ?? "de").toLowerCase();
      if ((["de", "en", "fr", "es", "pt", "it", "ko", "zh"] as const).includes(raw as Locale)) {
        const nextLocale = raw as Locale;
        setLocale(nextLocale);
        if (params.get("lang") !== nextLocale) {
          params.set("lang", nextLocale);
          window.history.replaceState({}, "", `${pathname}?${params.toString()}`);
        }
      }
    };
    syncLocaleFromUrl();
    window.addEventListener("popstate", syncLocaleFromUrl);
    return () => window.removeEventListener("popstate", syncLocaleFromUrl);
  }, [pathname]);

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
      website: String(formData.get("website") ?? ""),
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

  const quickScore =
    Number(quickCheck.docs) + Number(quickCheck.claims) + Number(quickCheck.downtime);
  const quickResultText =
    quickScore >= 2 ? erpGap.resultFast : quickScore === 1 ? erpGap.resultMedium : erpGap.resultLow;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16">
        <div className="sticky top-4 z-30 flex justify-end rounded-2xl border border-slate-700/80 bg-slate-900/85 p-2 backdrop-blur">
          <LanguageSwitcher currentLocale={locale} onChange={handleLocaleChange} />
        </div>
        <nav className="rounded-2xl border border-cyan-500/35 bg-slate-900/85 p-3 shadow-xl">
          <div className="grid gap-2 sm:grid-cols-2">
            <a
              href={`/?lang=${locale}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-center text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-200"
            >
              <Image
                src="/app-logo-v2.png"
                alt="Supply Agent App"
                width={18}
                height={18}
                className="rounded-sm"
              />
              {locale === "es" ? "App Supply Agent" : "Supply Agent App"}
            </a>
            <a
              href={`/flow-agent?lang=${locale}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-400/70 bg-emerald-500/20 px-3 py-2 text-center text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/30"
            >
              <Image
                src="/flow-agent-logo.png"
                alt="Flow Agent App"
                width={18}
                height={18}
                className="rounded-sm"
              />
              {locale === "es" ? "App Flow Agent" : "Flow Agent App"}
            </a>
          </div>
        </nav>
        <section className="rounded-2xl border border-indigo-400/40 bg-indigo-500/10 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-200">
            {erpGap.engineerTag}
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-[96px_1fr] md:items-start">
            <Image
              src="/rainer-hampicke.png"
              alt="Rainer Hampicke"
              width={96}
              height={120}
              className="h-[120px] w-[96px] rounded-lg border border-indigo-300/40 object-cover object-top"
            />
            <p className="text-sm text-slate-100">{erpGap.engineerQuote}</p>
          </div>
          <a
            href="/technical-integration?lang=en"
            className="mt-4 inline-flex rounded-lg border border-cyan-400/60 bg-cyan-500/15 px-3 py-1.5 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-500/25"
          >
            {trust.integrationLink}
          </a>
          <a
            href={`/flow-agent?lang=${locale}`}
            className="mt-2 inline-flex rounded-lg border border-emerald-400/70 bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-500/30"
          >
            {locale === "es" ? "Landingpage Flow Agent" : locale === "de" ? "Flow Agent Landingseite" : "Flow Agent Landing Page"}
          </a>
        </section>
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
          <p className="mt-3 inline-flex rounded-lg border border-emerald-400/60 bg-emerald-500/15 px-3 py-1.5 text-sm font-semibold text-emerald-200">
            {enterpriseHero.deploymentGuarantee}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#testzugang"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              <Image src="/app-logo-v2.png" alt="Supply Agent" width={16} height={16} className="rounded-sm" />
              {trust.hardCta}
            </a>
            <a
              href="https://www.linkedin.com/in/rainer-hampicke/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-emerald-200 underline underline-offset-4 transition hover:text-emerald-100"
            >
              {enterpriseHero.ctaDeepDive}
            </a>
          </div>
          <p className="mt-3 text-sm font-semibold text-cyan-200">
            {locale === "es"
              ? "Desde USD 2.490/mes • Alcance piloto para una planta."
              : locale === "de"
                ? "Ab USD 2.490/Monat • Pilotumfang fuer ein Werk."
                : "Starting at USD 2,490/month • Pilot scope for one plant."}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {locale === "es"
              ? "Disenado para el corredor DE-MEX-USA (incluyendo operaciones de proveedores maquiladora/IMMEX)."
              : "Built for the DE-MEX-USA corridor (including maquiladora/IMMEX supplier operations)."}
          </p>
          <div id="vorteile" className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/70 p-4 md:p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{enterpriseHero.flowTitle}</p>
            <div className="-mx-1 mt-3 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1 text-sm md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
              {enterpriseHero.flowSteps.map((step, idx) => (
                <span key={step} className="inline-flex shrink-0 snap-start items-center gap-2">
                  <span className="rounded-lg border border-cyan-500/40 bg-slate-900 px-3 py-2 text-base font-medium text-slate-100 md:px-2.5 md:py-1 md:text-sm">
                    {step}
                  </span>
                  {idx < enterpriseHero.flowSteps.length - 1 ? (
                    <span className="text-lg font-semibold text-cyan-300 md:text-base">→</span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        </header>
        <section className="rounded-2xl border border-cyan-500/35 bg-slate-900/85 p-4 shadow-xl">
          <p className="text-xs uppercase tracking-[0.14em] text-cyan-300">{contextTabs.title}</p>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            <a
              href={`/?lang=${locale}`}
              className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-center text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-200"
            >
              {contextTabs.supply}
            </a>
            <a
              href={`https://flow-agent-erp.vercel.app/tracking?lang=${locale}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-cyan-400/60 bg-cyan-500/15 px-3 py-2 text-center text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/25"
            >
              {contextTabs.flow}
            </a>
            <a
              href={`/technical-integration?lang=${locale === "de" ? "de" : "en"}`}
              className="rounded-lg border border-indigo-400/60 bg-indigo-500/15 px-3 py-2 text-center text-sm font-semibold text-indigo-100 transition hover:bg-indigo-500/25"
            >
              {contextTabs.quality}
            </a>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-700 bg-slate-900/85 p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white">{trust.industrialTitle}</h2>
          <p className="mt-2 text-sm text-slate-300">{trust.industrialSubtitle}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {trust.industrialKpis.map((kpi) => (
              <article key={kpi.label} className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
                <p className="text-[11px] uppercase tracking-[0.1em] text-slate-400">{kpi.label}</p>
                <p className="mt-2 text-sm font-semibold text-cyan-200">{kpi.value}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 rounded-xl border border-cyan-500/45 bg-cyan-500/10 px-4 py-3 text-sm text-slate-100">
            <span className="font-semibold text-cyan-200">{trust.proofTitle}:</span> {trust.proofText}
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <article className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
              <p className="text-[11px] uppercase tracking-[0.1em] text-slate-400">
                {locale === "es" ? "Prueba social" : "Social Proof"}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-100">
                {locale === "es" ? "Proveedor Tier-1 (Baviera)" : "Tier-1 Supplier (Bayern)"}
              </p>
              <p className="mt-1 text-xs text-slate-300">
                {locale === "es"
                  ? "12.000 empleados • Onboarding multi-planta en progreso"
                  : "12,000 employees • Multi-plant onboarding in progress"}
              </p>
            </article>
            <article className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
              <p className="text-[11px] uppercase tracking-[0.1em] text-slate-400">
                {locale === "es" ? "Resultado piloto" : "Pilot Result"}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-100">
                {locale === "es" ? "45 min a 3 min por documento" : "45 min to 3 min per document"}
              </p>
              <p className="mt-1 text-xs text-slate-300">
                {locale === "es"
                  ? "Flujo basado en validación, sin doble captura de datos"
                  : "Validation-based workflow, no double data entry"}
              </p>
            </article>
            <article className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
              <p className="text-[11px] uppercase tracking-[0.1em] text-slate-400">
                {locale === "es" ? "Preparación para auditoría" : "Audit Readiness"}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-100">
                {locale === "es" ? "Trazabilidad lista para IATF" : "IATF-ready traceability"}
              </p>
              <p className="mt-1 text-xs text-slate-300">
                {locale === "es"
                  ? "Ruta de evidencia centralizada para auditorías OEM y de cliente"
                  : "Centralized evidence trail for OEM and customer audits"}
              </p>
            </article>
          </div>
        </section>

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
        <section className="rounded-2xl border border-cyan-500/30 bg-slate-900/70 p-5">
          <h3 className="text-base font-semibold text-cyan-200">{supplyProblems.title}</h3>
          <div className="mt-3 grid gap-2">
            {supplyProblems.items.map((item) => (
              <p key={item} className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-200">
                - {item}
              </p>
            ))}
          </div>
        </section>
        <section className="rounded-3xl border border-blue-500/35 bg-gradient-to-br from-slate-900 to-blue-950/25 p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white">{erpGap.title}</h2>
          <p className="mt-3 max-w-4xl text-sm text-slate-300">{erpGap.subtitle}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {erpGap.cards.map((card) => (
              <article key={card.problemTitle} className="rounded-2xl border border-slate-600 bg-slate-900 p-6 shadow-lg">
                <p className="text-sm font-semibold text-rose-300">
                  {card.problemIcon} {card.problemTitle}
                </p>
                <p className="mt-2 text-sm text-slate-300">{card.problemText}</p>
                <div className="mt-4 h-px w-full bg-slate-700" />
                <p className="mt-4 text-sm font-semibold text-cyan-300">
                  {card.solutionIcon} {card.solutionTitle}
                </p>
                <p className="mt-2 text-sm text-slate-200">{card.solutionText}</p>
                <p className="mt-2 text-sm font-semibold text-emerald-300">{card.resultText}</p>
                <p className="mt-3 text-xs font-semibold text-cyan-200">{card.sapFooter}</p>
              </article>
            ))}
          </div>
          <p className="mt-7 rounded-xl border border-emerald-400/60 bg-emerald-500/15 px-4 py-3 text-center text-sm font-bold text-emerald-200">
            {erpGap.deploymentBanner}
          </p>
          <div className="mt-4 flex justify-center">
            <a
              href="#testzugang"
              className="rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              {erpGap.deploymentCta}
            </a>
          </div>
          <article className="mt-7 rounded-2xl border border-cyan-400/45 bg-slate-950/75 p-5">
            <h3 className="text-lg font-semibold text-cyan-200">{erpGap.bridgeTitle}</h3>
            <p className="mt-2 text-sm text-slate-200">{erpGap.bridgeBody}</p>
            <div className="mt-4 grid gap-2 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <div className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-slate-200">
                {erpGap.bridgeLeft}
              </div>
              <div className="text-center text-xs font-semibold text-cyan-300">⇄ {erpGap.bridgeCenter}</div>
              <div className="rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-3 py-2 text-center text-sm font-semibold text-cyan-200">
                {erpGap.bridgeRight}
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-300">{erpGap.bridgeNote}</p>
          </article>
          <article className="mt-8 rounded-2xl border border-cyan-400/40 bg-slate-950/70 p-5">
            <h3 className="text-lg font-semibold text-cyan-200">{erpGap.quickTitle}</h3>
            <p className="mt-1 text-sm text-slate-300">{erpGap.quickSubtitle}</p>
            <div className="mt-4 grid gap-2 md:grid-cols-3">
              <label className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-200">
                <input
                  type="checkbox"
                  checked={quickCheck.docs}
                  onChange={(event) =>
                    setQuickCheck((prev) => ({ ...prev, docs: event.target.checked }))
                  }
                  className="h-4 w-4 accent-cyan-400"
                />
                {erpGap.checks.docs}
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-200">
                <input
                  type="checkbox"
                  checked={quickCheck.claims}
                  onChange={(event) =>
                    setQuickCheck((prev) => ({ ...prev, claims: event.target.checked }))
                  }
                  className="h-4 w-4 accent-cyan-400"
                />
                {erpGap.checks.claims}
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-200">
                <input
                  type="checkbox"
                  checked={quickCheck.downtime}
                  onChange={(event) =>
                    setQuickCheck((prev) => ({ ...prev, downtime: event.target.checked }))
                  }
                  className="h-4 w-4 accent-cyan-400"
                />
                {erpGap.checks.downtime}
              </label>
            </div>
            <p className="mt-4 rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-200">
              {erpGap.resultLabel}: {quickResultText}
            </p>
          </article>
        </section>
        <section className="rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-slate-900 to-emerald-950/30 p-8 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.16em] text-emerald-300">{addon.tag}</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{addon.title}</h2>
          <p className="mt-3 max-w-4xl text-sm text-slate-200">{addon.text}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {addon.points.map((point) => (
              <article key={point} className="rounded-2xl border border-emerald-400/30 bg-slate-950/60 p-4">
                <p className="text-sm text-emerald-100">- {point}</p>
                <a
                  href={`https://flow-agent-erp.vercel.app/tracking?lang=${locale}`}
                  className="mt-3 inline-flex items-center rounded-lg border border-emerald-400/70 bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-500/30"
                >
                  {addon.cardCta}
                </a>
              </article>
            ))}
          </div>
          <a
            href="https://flow-agent-erp.vercel.app/tracking?lang=de"
            className="mt-5 inline-flex items-center rounded-lg bg-emerald-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            {addon.cta}
          </a>
        </section>
        <section className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-slate-900 to-amber-950/20 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white">{problemSolution.title}</h2>
          <p className="mt-2 text-sm text-slate-200">{problemSolution.subtitle}</p>
          <div className="mt-5 grid gap-3">
            {problemSolution.items.map((item) => (
              <article key={item.problem} className="rounded-2xl border border-amber-400/30 bg-slate-950/60 p-4">
                <p className="text-sm font-semibold text-amber-200">{item.problem}</p>
                <p className="mt-1 text-sm text-slate-200">{item.solution}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-cyan-500/30 bg-slate-950/70 p-4">
            <p className="text-sm font-semibold text-cyan-200">{problemSolution.tableTitle}</p>
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead className="text-left text-slate-300">
                  <tr className="border-b border-slate-700">
                    <th className="px-2 py-2">{problemSolution.tableHeaders.before}</th>
                    <th className="px-2 py-2">{problemSolution.tableHeaders.after}</th>
                  </tr>
                </thead>
                <tbody>
                  {problemSolution.tableRows.map((row) => (
                    <tr key={row.before} className="border-b border-slate-800 text-slate-100">
                      <td className="px-2 py-2">{row.before}</td>
                      <td className="px-2 py-2 text-emerald-300">{row.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />
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
          <article className="mt-5 rounded-2xl border border-indigo-400/40 bg-indigo-500/10 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-indigo-200">{t.expertTag}</p>
            <h3 className="mt-2 text-base font-semibold text-indigo-100">{t.expertTitle}</h3>
            <p className="mt-2 text-sm text-slate-200">{t.expertText}</p>
          </article>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#testzugang"
              className="rounded-lg bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              {t.heroTrial}
            </a>
            <a
              href="#testzugang"
              className="rounded-lg border border-indigo-400/70 bg-indigo-500/20 px-5 py-2.5 font-semibold text-indigo-100 transition hover:bg-indigo-500/30"
            >
              {enterpriseHero.ctaPartner}
            </a>
            <a
              href="mailto:rainer.hampicke@gmail.com"
              className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-white"
            >
              {t.contactButton}
            </a>
          </div>
        </section>
        <p className="text-center text-sm text-slate-300">
          Direktkontakt:{" "}
          <a
            href="mailto:rainer.hampicke@gmail.com"
            className="font-semibold text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
          >
            rainer.hampicke@gmail.com
          </a>
        </p>
        <p className="text-center text-xs text-slate-400">{copyrightByLocale[locale]}</p>
      </section>
    </main>
  );
}
