import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const projects = [
    {
      title: "Inspekt",
      role: "Backend · Security · Open Source",
      period: "2026",
      featured: true,
      description: "Email threat-analysis service — POST a raw email and Inspekt queues it on Redis Streams, Go workers parse the MIME, extract artifacts and check SPF/DKIM/DMARC, then 29 signals produce a score, a verdict and the evidence behind it. Results land in MariaDB with Prometheus metrics and a Grafana dashboard. Ships with a demo, evaluation reports and design notes; CI is green on every commit.",
      pipeline: [
        { name: "Raw email", detail: "POST /v1/scans" },
        { name: "Redis Streams", detail: "queue · watchdog · DLQ" },
        { name: "Go workers", detail: "MIME · artifacts · auth" },
        { name: "29 signals", detail: "score · verdict · evidence" },
        { name: "MariaDB", detail: "results · Grafana" }
      ],
      tech: ["Go", "Python", "Redis Streams", "MariaDB", "Docker Compose", "Prometheus", "Grafana", "GitHub Actions", "Groq"],
      achievements: [
        "Fast and resilient — ~1,000 emails/s with p95 64 ms on a laptop, using Redis Streams consumer groups, a watchdog, dead-letter queue, idempotent writes and backpressure",
        "Detection measured, not assumed — on 6,202 public emails with an 80/20 dev/holdout split, holdout phishing recall rose from 20% to 39% at 96% precision, with false positives unchanged at 0.88%",
        "Found by testing — load and evaluation runs exposed four real bugs, each fixed with a regression test, including a Redis 7 Lua script that ignored maxmemory",
        "Safe LLM use — an optional Groq model reviews only borderline mail, can only add points, sees a data-minimised excerpt and runs under a shared cost cap"
      ],
      link: "https://github.com/GligorcoGligorov/inspekt",
      github: true
    },
    {
      title: "Signal",
      role: "Full-Stack SaaS · AI/LLM",
      period: "2026",
      description: "AI buyer-intent lead discovery for founders — paste your website and Signal finds people publicly asking for a product like yours across Hacker News, Bluesky, GitHub and Stack Overflow, scores their buying intent with an LLM and drafts a reply. Hot leads land in a pipeline and arrive as Telegram alerts; Signal never posts on the user's behalf.",
      tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4", "Supabase", "PostgreSQL", "Gemini API", "Node.js", "GitHub Actions", "Vitest", "PGlite", "Vercel"],
      achievements: [
        "TypeScript monorepo (web app, ingestion worker, shared scoring engine) on Supabase Postgres with row-level security and column-level grants, 85+ automated tests and hourly serverless scans on GitHub Actions",
        "Cost-bounded AI pipeline — one fetch per source shared by all customers, intent prefiltering with bot and noise filters, and batched Gemini scoring with structured output and a heuristic fallback so no single failure stops a run",
        "Hardened for production: global and per-user daily LLM caps, a rate-limited website reader with SSRF protection, an open-redirect fix and key rotation; seller and competitor posts filtered by three rule layers with regression tests"
      ],
      link: "https://signal-blond-phi-13.vercel.app",
      live: true
    },
    {
      title: "Pact",
      role: "Mobile + Full-Stack · AI/LLM",
      period: "2026",
      description: "Habit app for small crews of friends — up to eight people pick one habit, a fixed run of days and a stake (\"loser buys the coffees\"). Everyone checks in daily with a photo of that day's challenge, an AI judge flags anything odd, and a day only counts when the whole crew is in. At the end Pact reveals the results, hands out awards and names who pays. Expo app plus a Next.js API and public web pages, built in a 2-week trial.",
      tech: ["Expo SDK 55", "React Native", "TypeScript", "Next.js 15", "Prisma", "Supabase", "Zod", "TanStack Query", "NativeWind", "Groq", "Gemini", "PostHog", "Sentry"],
      achievements: [
        "One data path — the app never touches tables; every read and write goes through a Next.js API validated on both sides by a shared Zod contract in an npm-workspaces monorepo",
        "Non-blocking AI judge — check-ins return instantly as pending while Groq (Gemini fallback) writes the verdict in the background; it advises and never fails anyone",
        "Timezone-aware, DST-safe day math on the server for chains, streaks, awards and tie handling, pinned by tests, plus server-rendered share cards and OG link previews"
      ],
      link: "https://github.com/GligorcoGligorov/Pact",
      github: true
    },
    {
      title: "FitCheck",
      role: "Full-Stack Development · AI/LLM",
      period: "2026",
      description: "Production multilingual AI stylist — photograph the clothes you already own, a vision model tags and catalogues each piece, and the stylist then builds complete outfits drawn only from your own wardrobe, each one scored and explained. Live in English, German and Macedonian, with grammatically correct garment names in all three.",
      tech: ["Next.js 16", "React 19", "TypeScript", "Prisma 7", "PostgreSQL (Neon)", "Vercel AI SDK", "Groq", "Vercel Blob", "Tailwind CSS", "Zod", "sharp"],
      achievements: [
        "Two-pass AI architecture cutting inference cost ~10× — garments are tagged once at upload, and the stylist then reasons over a compact text catalogue instead of images",
        "Closed enum vocabulary eliminates LLM hallucination in garment naming, with adjective–noun gender agreement for German and Macedonian verified across 5,673 combinations",
        "Rolling-window quota with pseudonymous per-network rate limiting — IP addresses stored only as keyed SHA-256 digests, never raw"
      ],
      link: "https://thefitcheck.vercel.app",
      live: true
  },
    {
      title: "RentEase",
      role: "Full-Stack Development · Real-Time",
      period: "2026",
      description: "Production-grade property rental platform built from scratch — React + TypeScript frontend, Node.js/Express REST API, PostgreSQL (Supabase), real-time messaging via Socket.io, and full booking lifecycle management. Deployed to Vercel and Railway with CI/CD via GitHub.",
      tech: ["React", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Supabase", "Socket.io", "Zustand", "Tailwind CSS", "Vercel", "Railway"],
      achievements: [
        "Real-time bidirectional messaging between renters and owners via Socket.io with room-based architecture",
        "Booking system with PostgreSQL OVERLAPS date conflict detection and automatic price calculation",
        "JWT auth with access + refresh token rotation, bcrypt hashing, and rate limiting on auth routes"
      ],
      link: "https://assess-xi.vercel.app",
      live: true,
      githubLink: "https://github.com/GligorcoGligorov/assess"
  },
  {
    title: "CodeSensei",
    role: "Full-Stack Development · AI/LLM",
    period: "2026",
    description: "AI-powered coding interview prep platform with an in-browser code editor, automated test execution, and a GPT-4 agentic mentor system that delivers progressive hints based on your code and attempt history — without revealing the solution. Built end-to-end from architecture to production deployment.",
    tech: ["React", "TypeScript", "Node.js", "Express.js", "OpenAI GPT-4", "Supabase", "Monaco Editor", "Tailwind CSS", "Vercel", "Railway"],
    achievements: [
      "GPT-4 agentic hint system with prompt versioning, attempt-count logic, and IP-based rate limiting (10 req/hour)",
      "In-browser Monaco Editor with sandboxed test runner — instant pass/fail results across 8 coding challenges",
      "Full-stack deployment: React on Vercel, Express API on Railway, PostgreSQL on Supabase"
    ],
    link: "https://codesensei-three.vercel.app",
    live: true,
    github: false,
    githubLink: "https://github.com/GligorcoGligorov/CodeSensei"
  },
  {
    title: "VitalLink",
    role: "Mobile Development · Healthcare",
    period: "2026",
    description: "Full-stack React Native healthcare platform connecting patients with doctors through real-time vitals monitoring, medication management, and secure messaging. Features role-based auth — patients see vitals/meds dashboards, doctors manage patient requests and health data.",
    tech: ["React Native", "Expo SDK 54", "TypeScript", "Supabase", "Zustand", "React Navigation", "expo-secure-store"],
    achievements: [
      "Role-based auth (patient/doctor) with Supabase RLS and profile-based navigation",
      "Doctor-patient connection system with request/accept flow and junction table",
      "Real-time vitals logging, medication tracking, and live in-app chat"
    ],
    link: "https://github.com/GligorcoGligorov/VitalLink",
    github: true
  },
  {
    title: "MediTrack",
    role: "Mobile Development",
    period: "2026",
    description: "Full-stack healthcare medication reminder app built with React Native and Expo. Features user authentication, medication CRUD, daily taken/skipped tracking, streak counter, push notifications, and dark mode.",
    tech: ["React Native", "Expo", "TypeScript", "Supabase", "Zustand", "React Navigation", "expo-notifications"],
    achievements: [
      "Full auth flow with Supabase + SecureStore session management",
      "Daily medication tracking with streak counter",
      "Push notifications via expo-notifications"
    ],
    link: "https://github.com/GligorcoGligorov/MediTrack",
    github: true
  },
  {
    title: "BrandsGateway E-commerce Platform",
    role: "Full-Stack Developer",
    period: "April 2023 - Present",
    description: "Enterprise B2B e-commerce platform managing 15+ international vendor integrations across Europe. Automated product synchronization processing 10,000+ products daily.",
    tech: ["PHP", "Laravel", "WordPress", "WooCommerce", "Node-RED", "MySQL", "AWS", "GPT-4"],
    achievements: [
      "95% reduction in manual data entry",
      "99.5% system uptime",
      "20+ hours/week saved through automation"
    ],
    link: "https://brandsgateway.com"
  },
  {
    title: "ConcertTickets",
    role: "Full-Stack Development",
    period: "2023",
    description: "Event ticketing platform built with Clean Architecture (Onion Architecture), featuring secure payment integration and ticket verification.",
    tech: [".NET", "ASP.NET Core", "Entity Framework", "SQL Server"],
    link: "https://github.com/GligorcoGligorov/ConcertTickets",
    github: true
  },
  {
    title: "TinexChain",
    role: "Backend Development",
    period: "2023",
    description: "Retail inventory management system with procurement tracking, automated reorder calculations, and RESTful APIs for mobile/web integration.",
    tech: ["Java Spring Boot", "PostgreSQL", "REST API"],
    link: "https://github.com/GligorcoGligorov/Tinex-Store-Chain",
    github: true
  },
  {
    title: "BookApp",
    role: "Full-Stack Development",
    period: "2023",
    description: "E-commerce platform for online bookstore with shopping cart, payment processing, user authentication, and role-based access control.",
    tech: ["Java Spring Boot", "React.js", "PostgreSQL"],
    link: "https://github.com/GligorcoGligorov/Book-Application",
    github: true
  },
  {
    title: "UpTime Monitor",
    role: "Web Development",
    period: "2023",
    description: "Service monitoring application for tracking availability and uptime with automated alerts and performance analytics dashboard.",
    tech: ["Vue.js", "Node.js", "Vercel"],
    link: "https://uptime-pearl.vercel.app/",
    live: true
  }
];

  const skills = {
  "Languages": ["TypeScript", "Go", "Python", "JavaScript", "PHP", "Java", "C#", "SQL"],
  "Backend": ["Node.js", "Express", "Laravel", "Spring Boot", "ASP.NET Core", "Redis Streams", "Queues & workers", "REST", "Socket.io", "Node-RED"],
  "AI & LLM": ["Agentic pipelines", "GPT-4 / OpenAI", "Gemini", "Groq", "Vercel AI SDK", "Structured output", "RAG", "Evaluation", "Claude Code", "Cursor"],
  "Data": ["PostgreSQL", "MySQL / MariaDB", "SQLite", "SQL Server", "Supabase (RLS, Realtime)", "Prisma", "Neon"],
  "Frontend & Mobile": ["React", "Next.js", "React Native", "Expo", "Vue.js", "Tailwind CSS", "Zustand", "TanStack Query"],
  "Cloud & Quality": ["AWS (S3, Lambda)", "Docker", "GitHub Actions", "Linux", "Prometheus", "Grafana", "Graylog", "Sentry", "Vitest / Jest", "Vercel"],
  "Security": ["SPF / DKIM / DMARC", "MIME parsing", "SSRF hardening", "Row-level security", "JWT rotation", "Fuzz testing"],
  "E-commerce": ["WooCommerce", "WordPress", "Shopify", "OpenCart", "Mirakl"],
  };

  const strengths = [
    { title: "Production backend", text: "Node.js, TypeScript, Go, PHP/Laravel, Java Spring Boot. Queues, workers, REST APIs and 15+ third-party integrations (OAuth, API keys, tokens)." },
    { title: "Reliability by design", text: "Watchdogs, dead-letter queues, idempotent writes, backpressure, versioned rollback. 99.5% uptime; Graylog cut debugging time by 60%." },
    { title: "Applied AI & LLMs", text: "GPT-4, Gemini, Groq. Structured output, closed vocabularies, cost caps, fallbacks, and dev/holdout evaluation instead of guesswork." },
    { title: "Security mindset", text: "SPF/DKIM/DMARC, hostile-input parsing, SSRF hardening, row-level security, token rotation, data minimisation, fuzz testing." },
    { title: "Full product ownership", text: "Next.js, React, React Native/Expo, PostgreSQL, Supabase. From schema and API to UI, CI/CD, analytics and monitoring." },
    { title: "Healthcare domain", text: "Remote patient monitoring (vitals, medications, doctor-patient chat) and medication reminders, with RLS so each doctor sees only their patients." }
  ];

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      {/* Cursor follower */}
      <div 
        className="cursor-glow" 
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      />

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">GG</span>
          </div>
          
          <button 
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
              <li key={item}>
                <button
                  className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.toLowerCase())}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-line">Hi, I'm</span>
              <span className="title-name">Gligorco Gligorov</span>
            </h1>
            <h2 className="hero-subtitle">Backend & AI Engineer · Production Pipelines · Full-Stack & Mobile</h2>
            <p className="hero-description">
              I build systems that hold up in production — an agentic GPT-4 pipeline processing 10,000+ products a day at 99.5% uptime,
              an open-source email threat-analysis service in Go, and AI products on web and mobile. Open to remote, hybrid or relocation.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                View My Work
              </button>
              <a href="/Gligorco_Gligorov_CV.pdf" download className="btn btn-secondary">
                Download CV
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="code-window">
              <div className="window-header">
                <div className="window-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="window-title">developer.ts</span>
              </div>
              <div className="window-content">
                <pre><code>{`const developer = {
  name: "Gligorco Gligorov",
  role: "Backend & AI Engineer",
  location: "Skopje · remote / hybrid",

  stack: {
    backend: ["Node.js", "Go", "Laravel"],
    queues: ["Redis Streams", "workers"],
    ai: ["GPT-4", "Gemini", "Groq"],
    data: ["PostgreSQL", "MariaDB"],
    product: ["Next.js", "React Native"],
  },

  currentWork: () => (
    "Owning a production AI pipeline"
    + " — 10,000+ products/day, 99.5% up"
  )
}`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p className="lead">
                Backend engineer who builds systems that hold up in production. For <strong>3.5 years</strong> I have been the <strong>sole backend engineer at BrandsGateway</strong>, a B2B luxury fashion marketplace.
              </p>
              <p>
                There I designed and own an <strong>agentic GPT-4 pipeline</strong> that processes <strong>10,000+ untrusted vendor records a day</strong> across <strong>15+ integrations</strong>, with stuck-job recovery, per-item state isolation, versioned rollback and full observability.
              </p>
              <p>
                In 2026 I shipped, on my own, an open-source <strong>email threat-analysis service in Go and Python</strong>, an AI lead-discovery SaaS, an AI stylist, a social habit app and <strong>two healthcare apps</strong>. I treat cost, security and reliability as features, and work AI-native with Claude Code and Cursor while owning every line.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <div className="stat-number">3.5 yrs</div>
                  <div className="stat-label">Sole backend engineer</div>
                </div>
                <div className="stat">
                  <div className="stat-number">10K+</div>
                  <div className="stat-label">Products a day through my AI pipeline</div>
                </div>
                <div className="stat">
                  <div className="stat-number">99.5%</div>
                  <div className="stat-label">Uptime with self-healing</div>
                </div>
                <div className="stat">
                  <div className="stat-number">20+ hrs</div>
                  <div className="stat-label">Saved weekly · 95% less manual entry</div>
                </div>
                <div className="stat">
                  <div className="stat-number">8</div>
                  <div className="stat-label">Products shipped in 2026</div>
                </div>
              </div>
            </div>
            <div className="strengths">
              <h3 className="subsection-title">What I bring</h3>
              <div className="skills-grid">
                {strengths.map((item) => (
                  <div key={item.title} className="skill-category">
                    <h4 className="skill-category-title">✓ {item.title}</h4>
                    <p className="strength-text">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience section">
        <div className="container">
          <h2 className="section-title">Professional Experience</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Senior Software Engineer</h3>
                  <span className="timeline-period">April 2023 - Present</span>
                </div>
                <h4 className="timeline-company">BrandsGateway • Remote</h4>
                <p className="timeline-summary">Sole backend engineer for a B2B luxury fashion e-commerce marketplace serving retailers across Europe.</p>
                <ul className="timeline-achievements">
                  <li><strong>AI content pipeline.</strong> Designed and run an agentic GPT-4 pipeline in Node-RED that writes titles and descriptions for 10,000+ SKUs, with prompt versioning, category-aware classification and automated quality control.</li>
                  <li><strong>Reliability by design.</strong> Built a self-healing watchdog that recovers stuck jobs, per-product keyed state isolation and lock/completion tracking, keeping the platform at 99.5% uptime.</li>
                  <li><strong>Vendor platform.</strong> Architected the B2B platform behind 15+ international vendor integrations, including 8+ vendor APIs with OAuth, API-key and token auth, plus WooCommerce REST integrations for real-time inventory and orders.</li>
                  <li><strong>Automation at scale.</strong> Replaced manual imports with automated sync for 10,000+ products a day, cutting manual data entry by 95%; every feed passes schema-enforced validation with self-healing fallbacks.</li>
                  <li><strong>Safe rollback & observability.</strong> S3-backed version history with SQLite tracking (~2,000 records/s) reverts a bad import in minutes; Graylog across the platform cut debugging time by 60%, with Slack alerts for failures.</li>
                </ul>
                <div className="tech-tags">
                  <span>Node.js</span>
                  <span>Node-RED</span>
                  <span>PHP</span>
                  <span>Laravel</span>
                  <span>MySQL</span>
                  <span>PostgreSQL</span>
                  <span>SQLite</span>
                  <span>AWS S3</span>
                  <span>Graylog</span>
                  <span>GPT-4</span>
                  <span>WooCommerce</span>
                </div>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Laboratory Teaching Assistant</h3>
                  <span className="timeline-period">October 2023 - October 2025</span>
                </div>
                <h4 className="timeline-company">Faculty of Computer Science and Engineering (FINKI) • Skopje</h4>
                <ul className="timeline-achievements">
                  <li>Mentored students in programming fundamentals, web development, and software engineering</li>
                  <li>Conducted laboratory sessions and provided technical support</li>
                  <li>Assisted in course development for Advanced Web Design and Database Systems</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="credentials">
            <div className="skill-category">
              <h3 className="skill-category-title">Education</h3>
              <p className="credential-main">BSc Information Science, Applied IT</p>
              <p className="strength-text">FINKI, UKIM Skopje · 2020 – 2024 · GPA 8.68 / 10</p>
              <p className="credential-main">Certifications</p>
              <p className="strength-text">8x Playmakers Network · 2026<br />Vue.js, EESTEC Academy · 2021</p>
              <p className="credential-main">Languages</p>
              <p className="strength-text">Macedonian (native) · English (professional)</p>
            </div>
            <div className="skill-category">
              <h3 className="skill-category-title">Reference</h3>
              <blockquote className="reference-quote">
                "One of the most capable, reliable and genuinely driven engineers I have had on my team."
              </blockquote>
              <p className="credential-main">Trajce (TJ) Kralev</p>
              <p className="strength-text">Fractional CTO, BrandsGateway</p>
              <p className="strength-text reference-note">
                Systems thinker: failure modes and scale before the first line. AI-augmented, fully accountable, fast to learn new domains, and comfortable with clients, vendors and cross-team work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className={`project-card ${project.featured ? 'project-featured' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="project-header">
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-role">{project.role} • {project.period}</p>
                  </div>
                  {project.link && (
                    <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-link"
                        aria-label={`View ${project.title}`}
                      >
                        {project.github ? '→ GitHub' : project.live ? '→ Live Demo' : '→ Visit'}
                      </a>
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="project-link"
                        >
                          → GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <p className="project-description">{project.description}</p>
                {project.pipeline && (
                  <div className="project-pipeline">
                    {project.pipeline.map((step) => (
                      <div key={step.name} className="pipeline-step">
                        <div className="pipeline-name">{step.name}</div>
                        <div className="pipeline-detail">{step.detail}</div>
                      </div>
                    ))}
                  </div>
                )}
                {project.achievements && (
                  <ul className="project-achievements">
                    {project.achievements.map((achievement, i) => (
                      <li key={i}>✓ {achievement}</li>
                    ))}
                  </ul>
                )}
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills section">
        <div className="container">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-grid">
            {Object.entries(skills).map(([category, items], index) => (
              <div key={category} className="skill-category" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="skill-category-title">{category}</h3>
                <div className="skill-items">
                  {items.map((skill, i) => (
                    <span key={i} className="skill-item">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container">
          <div className="contact-content">
            <h2 className="section-title">Let's Work Together</h2>
            <p className="contact-description">
              I'm currently open to new opportunities and interesting projects.
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <div className="contact-methods">
              <a href="mailto:ggligorov1709@yahoo.com" className="contact-method">
                <div className="contact-icon">✉</div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">ggligorov1709@yahoo.com</div>
                </div>
              </a>
              <a href="tel:+38978875888" className="contact-method">
                <div className="contact-icon">📱</div>
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-value">+389 78 875 888</div>
                </div>
              </a>
              <div className="contact-method">
                <div className="contact-icon">📍</div>
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-value">Skopje, North Macedonia</div>
                </div>
              </div>
            </div>
            <div className="contact-social">
              <a href="https://github.com/GligorcoGligorov" target="_blank" rel="noopener noreferrer" className="social-link">
                GitHub
              </a>
              <a href="https://linkedin.com/in/gligorco-gligorov-11b282289" target="_blank" rel="noopener noreferrer" className="social-link">
                LinkedIn
              </a>
            </div>
            <a href="/Gligorco_Gligorov_CV.pdf" download className="btn btn-primary" style={{ marginTop: '2rem' }}>
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2026 Gligorco Gligorov. Built with React & passion for clean code.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
