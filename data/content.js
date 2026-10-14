// Hand-written content. Numbers come from data/github.js (scripts/build_data.py).
// Private repositories appear only as curated R&D projects or as counts.
window.CONTENT = {
  i18n: {
    es: {
      skip: "Saltar al contenido",
      "nav.player": "Ficha",
      "nav.skills": "Inventario",
      "nav.worlds": "Mundos",
      "nav.quests": "Open source",
      "nav.saves": "Partidas",
      "nav.contact": "Continuar",
      "hud.score": "Hi-score",
      "hud.lang": "Cambiar idioma a inglés",
      "title.class": "Investigador en ciberseguridad e inteligencia artificial",
      "title.start": "Pulsa start",
      "title.hd": "Ver en HD",
      "title.px": "Ver en 16 bits",

      "player.title": "Ficha de jugador",
      "player.intro": "Quién juega y con qué puntuación llega a esta partida.",
      "player.class": "Clase",
      "player.classValue": "Investigador ciber + IA",
      "player.guild": "Gremio",
      "player.base": "Base",
      "player.since": "En GitHub desde",
      "player.profile": "Ver perfil en GitHub",
      "player.bio": "Investigador sénior en BISITE (Universidad de Salamanca) y doctorando en Ingeniería Informática. Diseño plataformas de detección y respuesta, laboratorios de malware y agentes de IA que ayudan a los analistas de seguridad a decidir mejor y más rápido.",
      "stat.contributions": "Contribuciones",
      "stat.orgCommits": "Commits en proyectos de I+D",
      "stat.prs": "Pull requests",
      "stat.ossMerged": "PRs aceptados en open source",
      "stat.repos": "Repos con autoría",
      "stat.followers": "Seguidores",

      "skills.title": "Inventario",
      "skills.intro": "Lenguajes medidos por bytes de código en los repos donde he escrito, más el equipo con el que construyo.",
      "skills.langs": "Lenguajes",
      "skills.also": "También en la mochila",
      "skills.stack": "Equipo",

      "worlds.title": "Mapa de mundos",
      "worlds.intro": "Los proyectos de I+D donde paso la mayor parte de la partida. El código es privado; aquí va qué hacen y cuánto he aportado.",
      "worlds.private": "Repo privado",
      "worlds.commits": "commits",
      "worlds.prs": "PRs",
      "worlds.personal": "Cartuchos personales",
      "worlds.personalIntro": "repos propios privados, agrupados por temática:",
      "worlds.public": "Cartuchos públicos",
      "worlds.publicIntro": "Repos abiertos, del más reciente al más antiguo.",

      "quests.title": "Diario de misiones open source",
      "quests.intro": "Pull requests enviados a proyectos de otros: arreglos en motores de JavaScript, bases de datos, almacenamiento S3 y emuladores de AWS y GCP.",
      "quests.sent": "PRs enviados",
      "quests.merged": "aceptados",
      "quests.repos": "proyectos",
      "quests.stars": "estrellas en proyectos con PR aceptado",
      "quests.state.merged": "aceptado",
      "quests.state.open": "en revisión",
      "quests.state.closed": "cerrado",
      "quests.legend": "Cada casilla es un PR: verde aceptado, ámbar en revisión, gris cerrado sin fusionar.",

      "saves.title": "Partidas guardadas",
      "saves.intro": "Un punto de guardado por año, con las contribuciones de cada uno.",
      "saves.contrib": "contribuciones",
      "saves.heat": "Últimos 12 meses",
      "saves.less": "Menos",
      "saves.more": "Más",

      "contact.title": "¿Continuar?",
      "contact.intro": "Si quieres colaborar en un proyecto de ciberseguridad o IA, empieza por aquí.",
      "contact.email": "Sí, escríbeme",
      "contact.linkedin": "Conectar en LinkedIn",
      "contact.github": "Ver mi GitHub",
      "contact.bisite": "Mi ficha en BISITE",
      "contact.top": "Volver a la pantalla de título",
      "footer.data": "Datos generados desde la API de GitHub el",
      "noscript": "Esta página necesita JavaScript para pintar los datos de GitHub."
    },
    en: {
      skip: "Skip to content",
      "nav.player": "Player",
      "nav.skills": "Inventory",
      "nav.worlds": "Worlds",
      "nav.quests": "Open source",
      "nav.saves": "Saves",
      "nav.contact": "Continue",
      "hud.score": "Hi-score",
      "hud.lang": "Switch language to Spanish",
      "title.class": "Cybersecurity and artificial intelligence researcher",
      "title.start": "Press start",
      "title.hd": "View in HD",
      "title.px": "View in 16 bits",

      "player.title": "Player sheet",
      "player.intro": "Who is playing, and the score they bring to this run.",
      "player.class": "Class",
      "player.classValue": "Cyber + AI researcher",
      "player.guild": "Guild",
      "player.base": "Base",
      "player.since": "On GitHub since",
      "player.profile": "View GitHub profile",
      "player.bio": "Senior researcher at BISITE (University of Salamanca) and PhD candidate in Computer Engineering. I design detection-and-response platforms, malware labs and AI agents that help security analysts decide better and faster.",
      "stat.contributions": "Contributions",
      "stat.orgCommits": "Commits on R&D projects",
      "stat.prs": "Pull requests",
      "stat.ossMerged": "Open-source PRs merged",
      "stat.repos": "Repos authored",
      "stat.followers": "Followers",

      "skills.title": "Inventory",
      "skills.intro": "Languages measured in bytes of code across the repos I have written in, plus the gear I build with.",
      "skills.langs": "Languages",
      "skills.also": "Also in the backpack",
      "skills.stack": "Gear",

      "worlds.title": "World map",
      "worlds.intro": "The R&D projects where I spend most of the game. The code is private; here is what they do and how much I have put in.",
      "worlds.private": "Private repo",
      "worlds.commits": "commits",
      "worlds.prs": "PRs",
      "worlds.personal": "Personal cartridges",
      "worlds.personalIntro": "private repos of my own, grouped by theme:",
      "worlds.public": "Public cartridges",
      "worlds.publicIntro": "Open repos, newest first.",

      "quests.title": "Open-source quest log",
      "quests.intro": "Pull requests sent to other people's projects: fixes in JavaScript engines, databases, S3 storage and AWS and GCP emulators.",
      "quests.sent": "PRs sent",
      "quests.merged": "merged",
      "quests.repos": "projects",
      "quests.stars": "stars across projects with a merged PR",
      "quests.state.merged": "merged",
      "quests.state.open": "in review",
      "quests.state.closed": "closed",
      "quests.legend": "Each square is a PR: green merged, amber in review, grey closed without merging.",

      "saves.title": "Save files",
      "saves.intro": "One save point per year, with that year's contributions.",
      "saves.contrib": "contributions",
      "saves.heat": "Last 12 months",
      "saves.less": "Less",
      "saves.more": "More",

      "contact.title": "Continue?",
      "contact.intro": "If you want to team up on a cybersecurity or AI project, start here.",
      "contact.email": "Yes, email me",
      "contact.linkedin": "Connect on LinkedIn",
      "contact.github": "See my GitHub",
      "contact.bisite": "My BISITE profile",
      "contact.top": "Back to the title screen",
      "footer.data": "Data generated from the GitHub API on",
      "noscript": "This page needs JavaScript to draw the GitHub data."
    }
  },

  guild: "BISITE, AIR Institute",

  // Languages with real use outside the top bars (coursework, NiFi, installers, OSS PRs).
  languagesExtra: ["Scala", "C", "C++", "Java", "Go", "Rust", "PowerShell", "SQL", "Assembly", "Verilog"],
  languageNames: { TeX: "LaTeX" },
  base: { es: "Salamanca, España", en: "Salamanca, Spain" },

  worlds: [
    {
      id: "secursentry",
      name: "SecurSentry",
      funder: "INCIBE",
      big: true,
      es: "Plataforma de monitorización, detección y respuesta para pymes: ingesta de logs, reglas de correlación, SOAR, sandbox de malware, agente propio para Windows y Linux, y un asistente de IA para analistas.",
      en: "Monitoring, detection and response platform for SMEs: log ingestion, correlation rules, SOAR, malware sandbox, an in-house Windows and Linux agent, and an AI assistant for analysts.",
      tech: ["Python", "FastAPI", "Vue 3", "PostgreSQL", "Elasticsearch", "NiFi", "Kafka", "Prefect", "Suricata", "CAPE", ".NET 8", "gRPC", "RAG"]
    },
    {
      id: "vigia",
      name: "VIGIA",
      funder: "INCIBE",
      big: true,
      es: "Inteligencia de amenazas para el sector turístico: recoge indicadores de fuentes abiertas y detona muestras de malware en un laboratorio aislado para sacar reglas, familias e infraestructura C2.",
      en: "Threat intelligence for the tourism sector: it gathers indicators from open sources and detonates malware samples in an isolated lab to derive rules, families and C2 infrastructure.",
      tech: ["Python", "Dagster", "Elasticsearch", "Kibana", "MinIO", "Proxmox", "YARA", "capa", "MITRE ATT&CK", "Vue", "LLM"]
    },
    {
      id: "airsiem",
      name: "SOC con IA",
      nameEn: "AI-driven SOC",
      funder: "AIR Institute",
      es: "Prototipos de SOC virtual y SIEM que usan aprendizaje automático para detectar y priorizar amenazas.",
      en: "Virtual SOC and SIEM prototypes that use machine learning to detect and prioritise threats.",
      tech: ["Python", "Machine learning", "SIEM", "Jupyter"]
    },
    {
      ids: ["automotive", "valorh2", "agro"],
      name: "I+D aplicada",
      nameEn: "Applied R&D",
      funder: "AIR Institute",
      es: "Ciberseguridad en automoción (IDS para la pasarela de un vehículo), inteligencia de amenazas para la cadena de valor del hidrógeno y análisis de datos industriales.",
      en: "Automotive security (an IDS for a vehicle gateway), threat intelligence for the hydrogen value chain, and industrial data analysis.",
      tech: ["Python", "IDS", "Threat intel", "Jupyter"]
    }
  ],

  // Counts of the 40 private personal repos, grouped by hand.
  personal: [
    { n: 11, es: "IA, agentes LLM y herramientas de investigación", en: "AI, LLM agents and research tooling" },
    { n: 8, es: "Herramientas de aula y juegos", en: "Classroom tools and games" },
    { n: 7, es: "Ciberseguridad e inteligencia de amenazas", en: "Security and threat intelligence" },
    { n: 7, es: "Pipelines de datos (NiFi en Scala, parsers)", en: "Data pipelines (NiFi in Scala, parsers)" },
    { n: 5, es: "Apps móviles y robótica", en: "Mobile apps and robotics" },
    { n: 2, es: "Prácticas de la carrera", en: "University coursework" }
  ],

  stack: [
    { es: "Detección y respuesta", en: "Detection and response", items: ["Elasticsearch", "Kibana", "Suricata", "Sysmon", "Wazuh", "Sigma", "YARA", "capa", "CAPE", "MITRE ATT&CK"] },
    { es: "Datos y orquestación", en: "Data and orchestration", items: ["NiFi", "Kafka", "Prefect", "Dagster", "Celery", "MinIO", "PostgreSQL"] },
    { es: "Inteligencia artificial", en: "Artificial intelligence", items: ["Agentes LLM", "RAG", "QLoRA", "MCP", "Ollama", "Claude Agent SDK"], itemsEn: ["LLM agents", "RAG", "QLoRA", "MCP", "Ollama", "Claude Agent SDK"] },
    { es: "Construcción", en: "Building", items: ["FastAPI", "Flask", "Vue 3", ".NET 8", "gRPC", "Kotlin + Compose", "Docker", "GitHub Actions", "Proxmox"] }
  ],

  timeline: [
    { year: 2021, es: "Grado en Ingeniería Informática en la USAL. Sistemas operativos en C, ensamblador y Java: los primeros repos públicos.", en: "Computer Engineering degree at USAL. Operating systems in C, assembly and Java: the first public repos." },
    { year: 2022, es: "Pipelines de logs: procesadores de NiFi en Scala e instaladores de Sysmon, Winlogbeat y Filebeat para Windows.", en: "Log pipelines: NiFi processors in Scala and Sysmon, Winlogbeat and Filebeat installers for Windows." },
    { year: 2023, es: "Trabajo de fin de grado sobre SIEM y primeros proyectos de SOC con IA en AIR Institute.", en: "Bachelor's thesis on SIEM and first AI-driven SOC projects at AIR Institute." },
    { year: 2024, es: "Arrancan SecurSentry y VIGIA. Máster en Sistemas Inteligentes con un TFM sobre inteligencia de amenazas.", en: "SecurSentry and VIGIA kick off. Master's in Intelligent Systems with a thesis on threat intelligence." },
    { year: 2025, es: "Asistente de IA para analistas (RAG y QLoRA), SOC virtual y primer PR open source, en CAI.", en: "AI assistant for analysts (RAG and QLoRA), virtual SOC, and a first open-source PR, in CAI." },
    { year: 2026, es: "Doctorado en IA aplicada a ciberseguridad y temporada open source: PRs aceptados en SeaweedFS, ParadeDB, mruby, QuickJS, Boa y moto.", en: "PhD on AI for cybersecurity and an open-source season: PRs merged into SeaweedFS, ParadeDB, mruby, QuickJS, Boa and moto." }
  ]
};
