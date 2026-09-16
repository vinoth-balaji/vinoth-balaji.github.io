// ─── Base types ───────────────────────────────────────────────────────────────

export interface AiSource {
  readonly label: string;
  readonly sectionId?: string;
}

export interface KnowledgeIntent {
  readonly id: string;
  readonly triggers: readonly string[];
  readonly response: string;
  readonly sources?: readonly AiSource[];
}

// ─── Structured data types ────────────────────────────────────────────────────

export interface Profile {
  readonly name: string;
  readonly role: string;
  readonly yearsExperience: string;
  readonly strengths: readonly string[];
  readonly primaryStack: readonly string[];
  readonly industries: readonly string[];
}

export interface ProjectDetail {
  readonly id: string;
  readonly name: string;
  readonly industry: string;
  readonly problem: string;
  readonly led: readonly string[];
  readonly engineeringChallenges: readonly string[];
  readonly stack: readonly string[];
  readonly outcomes: readonly string[];
}

export interface EarlyCareerItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
}

export interface LeadershipData {
  readonly teamSize: string;
  readonly principles: readonly string[];
  readonly aiPractice: string;
}

// ─── Structured facts (source of truth for all responses) ────────────────────

export const VINOTH_PROFILE: Profile = {
  name: 'Vinoth Balaji',
  role: 'Technical Lead & Associate Manager',
  yearsExperience: '8+',
  strengths: [
    'Enterprise full-stack engineering',
    'Generative AI',
    'Agentic AI',
    'Solution architecture',
    'Analytics',
    'Technical leadership',
    'Client engagement',
    'Team development',
  ],
  primaryStack: [
    'Angular', 'TypeScript', 'Python', 'FastAPI',
    'Databricks', 'Azure', 'LangGraph', 'PostgreSQL', 'Redis',
  ],
  industries: ['Aviation', 'BFSI', 'Retail'],
} as const;

export const VINOTH_PROJECTS: readonly ProjectDetail[] = [
  {
    id: 'aviation',
    name: 'Aviation Commercial Platform & AI Copilot',
    industry: 'Aviation',
    problem: 'RFPs, bids, contracts, and pricing decisions lived in disconnected systems and manual spreadsheets with no AI layer for negotiation intelligence.',
    led: [
      'Greenfield architecture from blank canvas to production',
      'Cross-functional team of 4–5 engineers',
      'Full-stack: Angular frontend, Python/FastAPI backend, Databricks analytics pipeline',
      'GenAI Copilot using RAG over contract, bid, and pricing history',
    ],
    engineeringChallenges: [
      'RAG pipeline design over unstructured bid and contract history',
      'Real-time offer tolerance and risk calculation at scale',
      'LangGraph agentic workflow orchestration for multi-step negotiation reasoning',
      'Redis caching for high-frequency commercial data access',
    ],
    stack: ['Angular', 'Python', 'FastAPI', 'PostgreSQL', 'Databricks', 'Azure', 'Redis', 'Power BI', 'LangGraph', 'Azure OpenAI'],
    outcomes: [
      'AI Copilot surfaces negotiation intelligence directly in the commercial workflow',
      'Reduced commercial decision cycle time',
      'Replaced offline spreadsheet analysis for bid pricing and route strategy',
    ],
  },
  {
    id: 'pricing',
    name: 'Pricing Analytics Dashboard',
    industry: 'BFSI',
    problem: 'Pricing data was fragmented across systems. Analysts relied on manual exports and static reports with no real-time analytics surface.',
    led: [
      'End-to-end product engineering from requirements to production',
      'Semantic search integration over enterprise pricing datasets',
      'Bi-directional filter system design',
      'Databricks-backed analytics layer',
    ],
    engineeringChallenges: [
      'Semantic instrument search with natural language query support',
      'Bi-directional filter state consistency across multiple dimensions',
      'Sub-second query performance at enterprise pricing data volumes via Databricks',
      'User-personalized dashboard layout persistence across sessions',
    ],
    stack: ['Angular', 'Python', 'Databricks', 'Azure', 'SQL', 'Entra ID', 'REST APIs'],
    outcomes: [
      'Self-serve analytics replaced manual reporting cycles',
      'Semantic search reduced instrument lookup from minutes to seconds',
      'Real-time pricing decisions enabled where only static reports existed before',
    ],
  },
  {
    id: 'cdp',
    name: 'CDP Excel Plugin & Web Application',
    industry: 'Retail',
    problem: 'Analysts spent hours manually extracting Databricks datasets into Excel, creating stale data, version conflicts, and delayed business decisions.',
    led: [
      'Dual-surface product: web application + Office.js Excel plugin',
      'Hierarchical dataset discovery system with access controls',
      'Databricks live connectivity from Excel',
    ],
    engineeringChallenges: [
      'Office.js plugin lifecycle management within Angular standalone context',
      'Persistent filter and metadata state shared across web and Excel surfaces',
      'Access-controlled dataset exposure with hierarchical permission scoping',
      'Live Databricks connectivity without leaving the spreadsheet',
    ],
    stack: ['Angular', 'TypeScript', 'Office.js', 'Databricks', 'Python', 'REST APIs', 'Azure'],
    outcomes: [
      'Eliminated manual data extraction workflows',
      'Dataset preparation reduced from hours to seconds',
      'Live data in Excel with one-click refresh',
    ],
  },
  {
    id: 'var',
    name: 'VaR Risk Analytics & Scenario Platform',
    industry: 'BFSI',
    problem: 'Risk teams lacked a unified, performant platform for real-time VaR, exposure analytics, and scenario modeling. Decisions were based on stale overnight batch data.',
    led: [
      'Full-stack VaR and exposure analytics platform',
      'Real-time Databricks recalculation pipeline for on-demand scenario runs',
      'Highcharts visualization for large multi-series risk datasets',
    ],
    engineeringChallenges: [
      'Highcharts performance optimization for enterprise-scale financial datasets without render lag',
      'Multidimensional filter state consistency across positions, curves, and legs',
      'UOM and data-quality validation layer for cross-asset consistency',
      'Real-time Databricks recalculation on scenario parameter changes',
    ],
    stack: ['Angular', 'Python', 'Databricks', 'SQL', 'Azure', 'Highcharts', 'REST APIs'],
    outcomes: [
      'Real-time risk visibility replaced a manual overnight batch process',
      'Enabled proactive risk management decisions before market open',
      'Scenario modeling became interactive instead of scheduled',
    ],
  },
  {
    id: 'myops',
    name: 'MyOps Operational Intelligence Suite',
    industry: 'Aviation',
    problem: 'Three fragmented operational tools — work order scheduling, case management, and action tracking — operated in isolation with no shared context or unified surface.',
    led: [
      'Three interconnected Angular applications under a shared design system',
      'Work Order Visualizer with network graph scheduling',
      'CATCH case management integrated with live SAP data',
      'RACE action planning and assignment system',
    ],
    engineeringChallenges: [
      'Work-center network graph rendering with D3.js and Angular integration',
      'Real-time SAP integration for work orders, equipment, and routing data',
      'Shared state and context preservation across three independently-deployed Angular apps',
      'Advanced multidimensional filtering with cross-app context propagation',
    ],
    stack: ['Angular', 'TypeScript', 'SAP Integration', 'REST APIs', 'Azure', 'D3.js'],
    outcomes: [
      'Three fragmented tools unified into one operational intelligence suite',
      'Real-time SAP data replaced manual status lookups',
      'Cross-application context eliminated duplicate data entry',
    ],
  },
] as const;

export const EARLY_CAREER: readonly EarlyCareerItem[] = [
  {
    id: 'performance',
    title: 'Application load time reduced by 70%',
    description: 'Profiled, diagnosed, and resolved performance bottlenecks that cut initial application loading time by 70% through bundle optimization, lazy loading, and render-critical path improvements.',
    tags: ['Performance', 'Angular', 'Optimization'],
  },
  {
    id: 'auth-sso',
    title: 'Azure AD SSO with JWT/OAuth',
    description: 'Implemented enterprise Single Sign-On using Azure Active Directory with JWT token validation and OAuth 2.0 authorization flows — establishing the auth pattern later used across multiple products.',
    tags: ['Azure AD', 'SSO', 'JWT', 'OAuth', 'Security'],
  },
  {
    id: 'realtime',
    title: 'WebSocket and Redis real-time features',
    description: 'Built real-time data delivery using WebSockets for live UI updates and Redis for session state and high-frequency data caching.',
    tags: ['WebSocket', 'Redis', 'Real-time'],
  },
  {
    id: 'visualization',
    title: 'Large-dataset visualization frameworks',
    description: 'Developed reusable visualization frameworks for handling large financial and operational datasets in the browser — without render lag or memory degradation.',
    tags: ['Data Visualization', 'Highcharts', 'D3.js', 'Performance'],
  },
  {
    id: 'docker',
    title: 'Docker containerization',
    description: 'Containerized application services with Docker, establishing reproducible build environments and consistent deployment pipelines.',
    tags: ['Docker', 'DevOps', 'Infrastructure'],
  },
  {
    id: 'security',
    title: 'Security audits and vulnerability remediation',
    description: 'Conducted security audits across application layers, identified vulnerabilities, and implemented fixes — covering input validation, auth boundary hardening, and dependency patching.',
    tags: ['Security', 'Audit', 'Vulnerability'],
  },
  {
    id: 'migration',
    title: 'jQuery to MEAN stack migration',
    description: 'Led the architectural migration from a legacy jQuery codebase to a modern MEAN (MongoDB, Express, Angular, Node.js) architecture — improving maintainability, testability, and developer velocity.',
    tags: ['Migration', 'Angular', 'MEAN', 'Modernization'],
  },
] as const;

export const LEADERSHIP: LeadershipData = {
  teamSize: '10+ engineers actively managed; 30+ engineers mentored',
  principles: [
    'Develop engineers into independent feature owners, not task executors',
    'Coach engineers to engage clients directly and confidently',
    'Teach constructive challenge — push back when there is a better approach',
    'Develop expectation management skills in every engineer',
    'Transfer business context so every technical decision has purpose',
    'Establish full accountability for outcomes, not just effort',
    'Promote asking questions over making assumptions',
    'Mentor engineers toward mentoring others',
    'Maintain a culture of AI-assisted engineering as a velocity multiplier',
  ],
  aiPractice: 'Promotes AI-assisted engineering across the team — for code generation, debugging, requirements analysis, and delivery acceleration.',
} as const;

// ─── Suggested prompts ────────────────────────────────────────────────────────

export const SUGGESTED_PROMPTS: readonly string[] = [
  "What's Vinoth's strongest technical skill?",
  'Tell me about the Aviation AI Copilot.',
  'How does he lead and mentor engineers?',
  'What AI systems has he built in production?',
  'What did he accomplish early in his career?',
  'Why would he be a strong Technical Lead hire?',
  'Tell me about the VaR risk analytics platform.',
] as const;

// ─── Knowledge intents ────────────────────────────────────────────────────────

export const KNOWLEDGE_BASE: readonly KnowledgeIntent[] = [

  // ── Identity & overview ──────────────────────────────────────────────────

  {
    id: 'overview',
    triggers: [
      'who is', 'tell me about vinoth', 'background', 'about him', 'about yourself',
      'overview', 'profile', 'summary', 'introduce', 'experience', 'who are you',
      'what does he do', 'what does vinoth do',
    ],
    response: `**Vinoth Balaji** is a Technical Lead and Associate Manager with **8+ years** of enterprise software engineering experience.

He specializes in building production-grade AI systems, enterprise analytics platforms, and full-stack products — while leading and developing engineering teams.

**Primary strengths:**
- Enterprise full-stack engineering (Angular, Python/FastAPI, Databricks)
- Generative AI and Agentic AI in production
- Solution architecture across complex enterprise domains
- Technical leadership and team development
- Client engagement and stakeholder management

**Five major products delivered:**
- Aviation Commercial Platform with a GenAI AI Copilot
- Pricing Analytics Dashboard with semantic search
- CDP Excel Plugin & Web Application for enterprise data access
- VaR Risk Analytics & Scenario Platform
- MyOps Operational Intelligence Suite with SAP integration

**Industries:** Aviation · BFSI · Retail`,
    sources: [
      { label: 'Featured Work', sectionId: 'projects' },
      { label: 'How I Build', sectionId: 'capabilities' },
    ],
  },

  // ── Technical strengths ──────────────────────────────────────────────────

  {
    id: 'strongest-technical',
    triggers: [
      'strongest', 'best technical', 'primary skill', 'core strength', 'specialty',
      'what he does best', 'specializes in', 'main skill', 'top skill',
    ],
    response: `Vinoth's strongest technical combination is **Angular enterprise frontend + Python/FastAPI backend + GenAI/Agentic AI** — end to end, in production.

**Why this combination is rare:**
Most engineers specialize in either the product layer or the AI layer. Vinoth does both — and leads a team while doing it.

**Angular (8+ years)** — Complex, data-dense enterprise UIs. Advanced state management, performance-critical visualizations, standalone component architecture (Angular 17–19), Office.js integration, and enterprise auth flows.

**Python / FastAPI** — REST API design for high-volume enterprise systems. GenAI service orchestration with LangGraph, RAG pipeline construction, Databricks integration, and authentication middleware (JWT, RBAC, Entra ID).

**GenAI / Agentic AI** — Production RAG pipelines, LangGraph agentic workflows, Azure OpenAI LLM integration. Not demos — these are shipping in enterprise products.

**Solution architecture** — Designs systems end-to-end: UI, APIs, data pipelines, AI services, and cloud infrastructure. No coordination overhead between layers.`,
    sources: [
      { label: 'How I Build', sectionId: 'capabilities' },
      { label: 'Featured Work', sectionId: 'projects' },
    ],
  },

  // ── Projects ─────────────────────────────────────────────────────────────

  {
    id: 'aviation',
    triggers: [
      'aviation', 'rfp', 'bid', 'contract', 'ai copilot', 'commercial platform',
      'airline', 'airport', 'negotiation', 'offer tolerance', 'route',
      'cargo', 'rag pipeline', 'langgraph',
    ],
    response: `The **Aviation Commercial Platform & AI Copilot** is a greenfield enterprise product for an aviation group.

**The problem:** RFPs, bids, contracts, and pricing decisions lived in disconnected systems and manual spreadsheets — with no AI layer for negotiation intelligence.

**What Vinoth led:**
- Greenfield architecture from blank canvas to production
- Cross-functional team of 4–5 engineers
- Full-stack: Angular frontend · Python/FastAPI · Databricks analytics pipeline
- GenAI Copilot using RAG over contract, bid, and pricing history

**AI Copilot capabilities:**
- Identify airports with cargo growth opportunities
- Determine if historical bids were priced too high or too low
- Forecast expected bid volume by route
- Evaluate offer tolerance risk with margin impact analysis
- Recommend negotiation strategies backed by historical data

**Engineering challenges:** RAG pipeline design, LangGraph agentic orchestration for multi-step reasoning, Redis caching for high-frequency commercial data, real-time Databricks analytics.

**Stack:** Angular · Python · FastAPI · PostgreSQL · Databricks · Azure · Redis · Power BI · LangGraph · Azure OpenAI`,
    sources: [{ label: 'Featured Work', sectionId: 'projects' }],
  },

  {
    id: 'pricing-analytics',
    triggers: [
      'pricing', 'instrument', 'semantic search', 'bi-directional', 'filter',
      'personalized dashboard', 'pricing analytics', 'pricing dashboard',
      'financial analytics', 'self-serve',
    ],
    response: `The **Pricing Analytics Dashboard** is an enterprise analytics product for a financial services client.

**The problem:** Pricing data was fragmented across systems. Analysts relied on manual exports and static reports — no real-time analytics, no unified surface.

**What Vinoth engineered:**
- **Semantic instrument search** — find instruments, sectors, or ask analytical questions in natural language
- **Bi-directional filters** — cross-dimension filter state with full consistency guarantees
- **Custom dashboards** — user-personalized layout persistence across sessions
- **Databricks analytics backend** — sub-second query performance at enterprise data volumes
- **SSO with Entra ID** and fine-grained role-based access control

**Engineering challenges:** Semantic search integration, bi-directional filter state consistency, Databricks performance at scale, personalized layout persistence.

**Stack:** Angular · Python · Databricks · Azure · SQL · Entra ID · REST APIs

**Outcome:** Self-serve analytics replaced manual reporting cycles. Semantic search reduced instrument lookup from minutes to seconds.`,
    sources: [{ label: 'Featured Work', sectionId: 'projects' }],
  },

  {
    id: 'cdp',
    triggers: [
      'cdp', 'excel', 'office.js', 'office js', 'plugin', 'spreadsheet',
      'dataset', 'hierarchical', 'excel plugin', 'add-in', 'retail',
    ],
    response: `The **CDP Excel Plugin & Web Application** solved a specific enterprise problem for a global retail client.

**The problem:** Analysts spent hours manually extracting Databricks datasets into Excel — creating stale data, version conflicts, and delayed decisions.

**Vinoth's dual-surface solution:**

**Web Application** — Hierarchical dataset discovery with access-controlled filters, metadata management, and dataset preview. Browse and configure data context before export.

**Office.js Excel Plugin** — Angular-powered Excel add-in with live Databricks connectivity, persistent filter state, and one-click data refresh. Live data in Excel, no manual extraction.

**Engineering challenges:**
- Office.js plugin lifecycle management within Angular standalone context (non-trivial)
- Persistent filter and metadata state shared across web and Excel surfaces
- Access-controlled dataset exposure with hierarchical permission scoping

**Stack:** Angular · TypeScript · Office.js · Databricks · Python · REST APIs · Azure

**Outcome:** Dataset preparation reduced from hours to seconds. Live data in Excel with one-click refresh.`,
    sources: [{ label: 'Featured Work', sectionId: 'projects' }],
  },

  {
    id: 'risk-analytics',
    triggers: [
      'var', 'value at risk', 'risk', 'risk analytics', 'scenario', 'exposure',
      'positions', 'curves', 'legs', 'financial risk', 'highcharts', 'scenario modeling',
    ],
    response: `The **VaR Risk Analytics & Scenario Platform** is a real-time risk management platform built for a financial institution.

**The problem:** Risk teams lacked a unified, performant platform for real-time VaR, exposure analytics, and scenario modeling. Decisions were made on stale overnight batch data.

**Technical scope:**
- Value at Risk (VaR) and exposure analytics with real-time recalculation
- Scenario modeling with configurable stress parameters
- Positions, curves, and legs — multidimensional filter composition
- Highcharts visualization optimized for large multi-series risk datasets without render lag
- UOM and data-quality validation for cross-asset consistency

**Engineering challenges solved:**
- Highcharts performance optimization for enterprise-scale financial datasets
- Multidimensional filter state consistency across positions/curves/legs combinations
- Real-time Databricks recalculation pipeline for on-demand scenario runs

**Stack:** Angular · Python · Databricks · SQL · Azure · Highcharts · REST APIs

**Outcome:** Real-time risk visibility replaced a manual overnight batch process — enabling proactive risk management decisions before market open.`,
    sources: [{ label: 'Featured Work', sectionId: 'projects' }],
  },

  {
    id: 'myops',
    triggers: [
      'myops', 'operations', 'maintenance', 'work order', 'catch', 'race',
      'sap', 'work order visualizer', 'scheduling', 'operational', 'network graph',
      'case management', 'action management',
    ],
    response: `**MyOps** is an operational intelligence suite for aviation maintenance teams — three interconnected Angular applications unified under a shared design system.

**Work Order Visualizer** — Network graph visualization of maintenance scheduling across work centers. D3.js-based graph UI for schedule optimization and conflict detection, with real-time SAP data.

**CATCH (Case Management)** — Case tracking, workflow management, and equipment action tracking integrated with live SAP data feeds.

**RACE (Action Management)** — Action planning, assignment, and tracking with cross-application context preservation.

**Engineering challenges:**
- Work-center network graph rendering via D3.js inside Angular
- Real-time SAP integration for work orders, equipment, and routing data
- Shared state and context preservation across three independently-deployed Angular apps
- Advanced multidimensional filtering with cross-app context propagation

**Stack:** Angular · TypeScript · SAP Integration · D3.js · REST APIs · Azure

**Outcome:** Three fragmented operational tools became one unified intelligence suite — reducing coordination overhead and improving scheduling accuracy.`,
    sources: [{ label: 'Featured Work', sectionId: 'projects' }],
  },

  // ── Leadership ───────────────────────────────────────────────────────────

  {
    id: 'teams-leadership',
    triggers: [
      'led teams', 'mentored', 'team', 'leadership', 'engineers', 'manage',
      'associate manager', 'people', 'mentor', 'has he led', 'coaching',
      'develop engineers', 'team lead',
    ],
    response: `Yes. Vinoth has mentored **30+ engineers** and actively manages a **10+ engineer team** — through technical guidance, regular 1:1 conversations, code reviews, and progressive ownership.

**Leadership philosophy:** Develop engineers into independent owners, not task executors.

**What he coaches engineers to do:**
- Own features end-to-end — from requirements to production
- Understand the business context behind every technical decision
- Engage clients directly and confidently
- Ask questions instead of making assumptions
- Challenge requirements constructively when there's a better approach
- Take full accountability for outcomes, not just effort
- Eventually mentor others themselves

**As Associate Manager**, he combines engineering depth with people leadership — setting technical direction, running architecture decisions, managing client relationships, and owning delivery end-to-end.

He actively promotes **AI-assisted engineering** as a team-wide practice for code generation, debugging, requirements analysis, and delivery acceleration.`,
    sources: [{ label: 'Leadership', sectionId: 'leadership' }],
  },

  {
    id: 'client-engagement',
    triggers: [
      'client', 'stakeholder', 'customer', 'client relationship', 'client facing',
      'requirements', 'expectation', 'engagement', 'business partner',
    ],
    response: `Client engagement is a core part of Vinoth's role as Technical Lead and Associate Manager.

**Client responsibilities:**
- Direct requirements gathering and solution architecture discussions
- Managing stakeholder expectations throughout delivery
- Constructively challenging requirements when there is a better technical approach
- Presenting progress, risks, and technical decisions to senior stakeholders

He applies the same philosophy to clients that he applies to developing his engineers — direct, informed, explains decisions clearly, doesn't make assumptions.

**A specific practice he coaches:** He trains engineers under him to engage clients directly rather than relaying communication through him. This develops client confidence across the team, not just at the lead level.

He has worked with clients across **Aviation, BFSI, and Retail** engagements.`,
    sources: [
      { label: 'Leadership', sectionId: 'leadership' },
      { label: 'Featured Work', sectionId: 'projects' },
    ],
  },

  // ── Technology areas ─────────────────────────────────────────────────────

  {
    id: 'enterprise-ai',
    triggers: [
      'enterprise ai', 'ai systems', 'generative ai', 'gen ai', 'langgraph', 'llm',
      'agentic', 'rag', 'ai built', 'production ai', 'what ai', 'agentic ai',
      'azure openai', 'rag pipeline', 'ai integration',
    ],
    response: `Vinoth has built **production AI systems** for enterprise clients — not prototypes or demos.

**Aviation AI Copilot** — RAG-based negotiation intelligence over bid, contract, and pricing history. Uses LangGraph for agentic multi-step reasoning. Surfaces airport growth opportunities, bid risk signals, and negotiation strategies directly in the commercial workflow.

**Semantic Search (Pricing Analytics)** — Semantic instrument search over enterprise pricing datasets. Natural language queries over structured financial data.

**AI-Assisted Engineering Practice** — Promotes GenAI tooling across engineering teams as a standard practice for code generation, debugging, requirements analysis, and delivery acceleration.

**Technical foundations:**
- **LangGraph** — agentic workflow orchestration and multi-step reasoning chains
- **RAG pipelines** — retrieval-augmented generation over enterprise document and data stores
- **Azure OpenAI** — production LLM integration with enterprise security
- **Databricks** — data backbone for AI context retrieval at scale

All production-grade, enterprise-secured with SSO and RBAC.`,
    sources: [
      { label: 'Featured Work', sectionId: 'projects' },
      { label: 'How I Build', sectionId: 'capabilities' },
    ],
  },

  {
    id: 'databricks',
    triggers: [
      'databricks', 'data pipeline', 'spark', 'lakehouse', 'analytics platform',
      'delta lake', 'data warehouse', 'databricks sql',
    ],
    response: `Databricks is central to Vinoth's enterprise analytics work — integrated across four of his five major products.

**Aviation Platform** — Real-time commercial analytics. Bid volume, win rate, and offer tolerance calculations at scale. Also serves as the data store for the GenAI Copilot's RAG retrieval layer.

**Pricing Analytics** — Sub-second query performance at enterprise pricing data volumes. The core analytics backbone for a financial services client.

**CDP Excel Plugin** — Databricks-backed dataset access with live connectivity from both web and Excel surfaces. Enables one-click data refresh without manual extraction.

**VaR Risk Platform** — Scenario modeling and real-time recalculation pipelines. Multidimensional positions, curves, and legs data processed for real-time risk views.

**Databricks experience includes:**
- SQL and pipeline performance optimization
- Secure REST API integration with Angular frontends
- Enterprise authentication and role-based access controls on datasets
- Incremental data refresh and partitioned dataset management`,
    sources: [
      { label: 'Featured Work', sectionId: 'projects' },
      { label: 'How I Build', sectionId: 'capabilities' },
    ],
  },

  {
    id: 'angular-frontend',
    triggers: [
      'angular', 'frontend', 'typescript', 'rxjs', 'component', 'ui', 'web app',
      'single page', 'spa', 'signals', 'standalone', 'angular 19',
    ],
    response: `Angular is Vinoth's primary frontend framework — **8+ years** of enterprise-grade development.

**Capabilities in practice:**
- Complex, data-dense enterprise UIs with performance-critical requirements
- Advanced standalone component architecture (Angular 17–19)
- State management at scale — signals, RxJS, custom observable patterns
- Integration with Databricks, Power BI, and AI/LLM backends
- Office.js integration (Angular running inside Excel) for the CDP plugin
- Enterprise auth flows with Microsoft Entra ID SSO
- Highcharts, D3.js, and custom SVG visualization systems

**Products built:**
- Commercial platform UI with RFP → Bid → Contract workflow state machine
- Real-time analytics dashboards with bi-directional filter systems
- Risk visualization platform with complex multi-series charting
- Operational network graph tool with D3.js integration
- AI Copilot chat interfaces with streaming-ready architecture

This portfolio itself was built with **Angular 19** — standalone components, signals, @for/@if control flow, zero NgModules.`,
    sources: [{ label: 'How I Build', sectionId: 'capabilities' }],
  },

  {
    id: 'python-backend',
    triggers: [
      'python', 'fastapi', 'backend', 'api', 'django', 'node.js', 'nodejs', 'server',
      'rest api', 'microservice', 'redis', 'api design', 'backend engineering',
    ],
    response: `On the backend, Vinoth works primarily with **Python (FastAPI)** — with Node.js and Django for specific integration patterns.

**Python / FastAPI:**
- REST API design for enterprise-scale applications with high data volumes
- GenAI service orchestration — LangGraph agentic workflows, RAG pipelines, LLM integration
- Databricks integration and data transformation services
- Authentication middleware (Entra ID, JWT, RBAC) across all enterprise products
- Async patterns for background tasks and real-time data processing

**Node.js:**
- Integration layer for Aviation commercial platform workflows
- Middleware services bridging Angular UIs and backend data pipelines

**Django:**
- Structured data management workflows in earlier products

**Supporting stack:**
- Redis — caching and session state (Aviation platform)
- PostgreSQL and SQL — relational data models
- Docker — containerized service deployments`,
    sources: [{ label: 'How I Build', sectionId: 'capabilities' }],
  },

  {
    id: 'azure-cloud',
    triggers: [
      'azure', 'cloud', 'microsoft', 'entra id', 'entra', 'sso', 'rbac',
      'infrastructure', 'deployment', 'devops', 'cloud native', 'app service',
    ],
    response: `Vinoth works primarily on **Microsoft Azure** for enterprise cloud deployments — all five major products are Azure-native.

**Azure experience:**
- Azure App Services and containerized API deployments
- **Microsoft Entra ID** — enterprise SSO across all major products
- **Azure OpenAI** — LLM integration for production AI systems
- Azure-native security, networking, and role-based access control
- CI/CD pipeline setup and deployment automation

**Enterprise Identity (SSO / RBAC):**
All five products include enterprise SSO with Entra ID — with role-based access controls, hierarchical permission scoping, and access-driven feature exposure. Identity and security are treated as first-class engineering requirements, not post-delivery additions.

Experience with Azure AD SSO and JWT/OAuth goes back to earlier in his career — it's a pattern he's applied consistently across every enterprise product since.`,
    sources: [{ label: 'How I Build', sectionId: 'capabilities' }],
  },

  {
    id: 'full-stack',
    triggers: [
      'full stack', 'full-stack', 'end to end', 'end-to-end', 'frontend backend',
      'complete product', 'ownership', 'entire product', 'all layers',
    ],
    response: `Vinoth's defining characteristic is **full-stack ownership** — the complete product lifecycle from first line of UI to cloud infrastructure.

**Frontend → APIs → Data → AI → Cloud → Production**

- **Angular** — enterprise UIs with complex state, visualizations, and auth
- **Python/FastAPI** — backend API services with authentication and data access
- **Databricks** — analytics pipelines and AI context retrieval at scale
- **LangGraph / Azure OpenAI** — agentic AI workflow orchestration
- **Azure** — cloud deployment, Entra ID SSO, and RBAC
- **Redis** — caching and real-time data access
- **PostgreSQL** — relational data modeling

**In practice:** When Vinoth leads a product, there are no seams between layers. The AI Copilot in the Aviation platform reads from the Databricks pipeline that feeds the Angular dashboard — he built all three, and they integrate directly.

This eliminates the coordination overhead that typically exists between separate frontend, backend, data, and AI teams.`,
    sources: [
      { label: 'How I Build', sectionId: 'capabilities' },
      { label: 'Featured Work', sectionId: 'projects' },
    ],
  },

  // ── Early career ─────────────────────────────────────────────────────────

  {
    id: 'early-career',
    triggers: [
      'early career', 'before', 'earlier work', 'beginnings', 'started out',
      'first jobs', 'previous work', 'career history', 'what else has he done',
      'earlier projects', 'accomplishments',
    ],
    response: `Before leading the five major enterprise products, Vinoth built a strong technical foundation across several impactful engineering problems.

**Performance engineering** — Reduced application initial loading time by **70%** through bundle optimization, lazy loading, and render-critical path improvements.

**Enterprise authentication** — Implemented Azure AD SSO using JWT and OAuth 2.0 — the auth pattern he now applies across every enterprise product.

**Real-time systems** — Built real-time data delivery using WebSockets for live UI updates and Redis for session state and high-frequency data caching.

**Data visualization** — Developed reusable large-dataset visualization frameworks capable of rendering complex financial and operational data without performance degradation.

**Infrastructure** — Containerized application services with Docker for reproducible builds and consistent deployment pipelines.

**Security** — Conducted security audits, identified vulnerabilities, and implemented fixes across application layers.

**Architecture modernization** — Led the migration from a legacy jQuery codebase to a modern MEAN stack (MongoDB, Express, Angular, Node.js), improving maintainability and developer velocity.

These aren't isolated tasks — they're the foundations that inform how he builds enterprise systems today.`,
    sources: [{ label: 'How I Build', sectionId: 'capabilities' }],
  },

  {
    id: 'performance-optimization',
    triggers: [
      '70%', 'loading time', 'performance', 'load time', 'initial load',
      'bundle', 'optimization', 'slow', 'render', 'page speed',
    ],
    response: `Early in his career, Vinoth reduced an application's initial loading time by **70%**.

This involved profiling the application to identify actual bottlenecks, then applying targeted fixes — bundle optimization, lazy loading of non-critical modules, and render-critical path improvements.

The same performance discipline carries through to his current work: Highcharts optimization for VaR risk datasets without render lag, Databricks query performance tuning for sub-second analytics, and Angular state management patterns that don't trigger unnecessary change detection cycles.

Performance is treated as a first-class engineering requirement, not a post-launch concern.`,
    sources: [{ label: 'How I Build', sectionId: 'capabilities' }],
  },

  {
    id: 'modernization-migration',
    triggers: [
      'jquery', 'mean stack', 'migration', 'modernization', 'legacy', 'refactor',
      'architecture upgrade', 'angular migration', 'rewrite',
    ],
    response: `Vinoth led a migration from a **legacy jQuery codebase to a modern MEAN stack** (MongoDB, Express, Angular, Node.js) earlier in his career.

This wasn't a cosmetic rewrite — it was an architectural transformation. Moving from jQuery's imperative DOM manipulation to a component-based, state-managed Angular architecture required careful decomposition of existing functionality, incremental delivery without regression, and establishing new patterns for the team to follow.

This experience directly informs how he approaches modernization projects today: understanding the risk of big-bang rewrites, the importance of incremental migration strategies, and how to maintain delivery momentum during architectural transition.`,
    sources: [{ label: 'How I Build', sectionId: 'capabilities' }],
  },

  {
    id: 'security-auth',
    triggers: [
      'security', 'auth', 'authentication', 'jwt', 'oauth', 'azure ad',
      'vulnerability', 'audit', 'sso implementation', 'token', 'oauth2',
    ],
    response: `Security and authentication have been recurring themes throughout Vinoth's career.

**Early career:**
- Implemented Azure AD SSO using **JWT and OAuth 2.0** — establishing the authentication pattern later used across all five major products
- Conducted security audits across application layers, identified vulnerabilities, and implemented fixes covering input validation, auth boundary hardening, and dependency patching

**Current products:**
All five major enterprise products include enterprise SSO with **Microsoft Entra ID** — with role-based access controls, hierarchical permission scoping, and access-driven feature exposure. These aren't bolt-ons — they're designed in from the start.

Security is treated as an engineering requirement, not a compliance checkbox.`,
    sources: [{ label: 'How I Build', sectionId: 'capabilities' }],
  },

  // ── Why hire ─────────────────────────────────────────────────────────────

  {
    id: 'why-hire',
    triggers: [
      'why hire', 'should i hire', 'good fit', 'technical lead', 'right person',
      'consider him', 'why vinoth', 'case for', 'recommend hiring', 'strengths as a hire',
    ],
    response: `Here is the case for Vinoth as a Technical Lead and Associate Manager:

**Engineering depth** — 8+ years across Angular, Python, FastAPI, Databricks, Azure, and GenAI. He can architect, code, review, and optimize across the full stack — no layer is a black box.

**AI leadership** — Built production RAG systems, agentic workflows with LangGraph, and LLM-powered enterprise copilots. This combination with deep product engineering experience is uncommon.

**Team development** — Grows engineers into independent owners who speak directly with clients. His mentoring approach transfers ownership and confidence, not just skills.

**Full-stack ownership** — UI → APIs → Data → AI → Cloud → Production. No coordination overhead between layers.

**Client partnership** — Direct client engagement across Aviation, BFSI, and Retail. Manages expectations, challenges requirements constructively, and explains technical decisions clearly.

**Solution architecture** — Designs systems with the full picture in mind: data flows, AI integration points, auth boundaries, and performance characteristics — before writing the first line of code.`,
    sources: [
      { label: 'Leadership', sectionId: 'leadership' },
      { label: 'How I Build', sectionId: 'capabilities' },
      { label: 'Featured Work', sectionId: 'projects' },
    ],
  },

] as const;

// ─── Fallback ─────────────────────────────────────────────────────────────────

export const FALLBACK_INTENT: KnowledgeIntent = {
  id: 'fallback',
  triggers: [],
  response: `I can answer questions about Vinoth's projects, technical skills, leadership experience, and engineering background.

Try asking:
- "Tell me about the Aviation AI Copilot"
- "What's his experience with GenAI and LangGraph?"
- "What did he accomplish early in his career?"
- "How does he lead and develop engineers?"
- "Why would he be a strong Technical Lead hire?"`,
};
