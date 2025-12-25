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
      title: "BrandsGateway E-commerce Platform",
      role: "Full-Stack Developer",
      period: "April 2024 - Present",
      description: "Enterprise B2B e-commerce platform managing 15+ international vendor integrations across Europe. Automated product synchronization processing 10,000+ products daily.",
      tech: ["PHP", "Laravel", "WordPress", "WooCommerce", "Node-RED", "MySQL", "AWS"],
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
    "Backend": ["PHP", "Laravel", "Java", "Spring Boot", ".NET", "Node.js"],
    "Frontend": ["React.js", "Vue.js", "JavaScript", "HTML5", "CSS3"],
    "E-commerce": ["WordPress", "WooCommerce", "OpenCart", "Mirakl"],
    "API & Integration": ["REST API", "Third-party Integration", "Webhooks"],
    "Databases": ["MySQL", "PostgreSQL", "SQLite"],
    "DevOps": ["Git", "GitHub", "AWS", "Node-RED", "Graylog"]
  };

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
          
          {/* Hamburger Menu Button */}
          <button 
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation Menu */}
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

      {/* Mobile Menu Overlay */}
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
            <h2 className="hero-subtitle">Backend Developer & Software Engineer</h2>
            <p className="hero-description">
              I build scalable B2B e-commerce solutions and enterprise-level applications.
              Specializing in WordPress/WooCommerce, API integrations, and process automation.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                View My Work
              </button>
              <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
                Get In Touch
              </button>
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
                <span className="window-title">developer.php</span>
              </div>
              <div className="window-content">
                <pre><code>{`class Developer {
  public function __construct() {
    $this->name = "Gligorco Gligorov";
    $this->role = "Backend Developer";
    $this->location = "Skopje, Macedonia";
  }

  public function getSpecialties() {
    return [
      'PHP & Laravel',
      'WordPress/WooCommerce',
      'API Integrations',
      'Process Automation',
      'E-commerce Solutions'
    ];
  }

  public function getCurrentWork() {
    return "Building enterprise B2B
            e-commerce platforms";
  }
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
                Results-driven Backend Developer with <strong>2+ years of professional experience</strong> specializing in B2B e-commerce solutions and enterprise-level WordPress/WooCommerce development.
              </p>
              <p>
                I have a proven track record of building and maintaining complex vendor integration systems, processing <strong>thousands of products daily</strong> through automated workflows. My expertise spans API integrations, process automation, and full-stack development.
              </p>
              <p>
                Currently working at BrandsGateway, where I architect and maintain an enterprise B2B platform managing <strong>15+ international vendor integrations</strong> across Europe, achieving <strong>99.5% system uptime</strong> and saving <strong>20+ hours/week</strong> through automation.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <div className="stat-number">2+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Vendor Integrations</div>
                </div>
                <div className="stat">
                  <div className="stat-number">10K+</div>
                  <div className="stat-label">Products Processed Daily</div>
                </div>
                <div className="stat">
                  <div className="stat-number">99.5%</div>
                  <div className="stat-label">System Uptime</div>
                </div>
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
                  <h3>Full-Stack Developer (Backend Focus)</h3>
                  <span className="timeline-period">April 2024 - Present</span>
                </div>
                <h4 className="timeline-company">BrandsGateway • Skopje, North Macedonia</h4>
                <ul className="timeline-achievements">
                  <li>Architected enterprise B2B e-commerce platform managing 15+ international vendor integrations</li>
                  <li>Developed automated product synchronization processing 10,000+ products daily, reducing manual data entry by 95%</li>
                  <li>Built custom WooCommerce REST API integrations for real-time inventory management</li>
                  <li>Implemented comprehensive logging infrastructure using Graylog, reducing debugging time by 60%</li>
                  <li>Successfully integrated 8 vendor APIs with different authentication methods (OAuth, API keys, tokens)</li>
                </ul>
                <div className="tech-tags">
                  <span>PHP</span>
                  <span>Laravel</span>
                  <span>WordPress</span>
                  <span>WooCommerce</span>
                  <span>Node-RED</span>
                  <span>MySQL</span>
                  <span>AWS</span>
                </div>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Teaching Assistant</h3>
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
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="project-header">
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-role">{project.role} • {project.period}</p>
                  </div>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link"
                      aria-label={`View ${project.title}`}
                    >
                      {project.github ? '→ GitHub' : project.live ? '→ Live Demo' : '→ Visit'}
                    </a>
                  )}
                </div>
                <p className="project-description">{project.description}</p>
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
              <a href="https://linkedin.com/in/gligorco-gligorov" target="_blank" rel="noopener noreferrer" className="social-link">
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
          <p>© 2024 Gligorco Gligorov. Built with React & passion for clean code.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;