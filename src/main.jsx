import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Command,
  Copy,
  Mail,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import "./style.css";

const projects = [
  {
    id: "health",
    type: "Frontend · Healthcare",
    year: "2026 — now",
    name: "Care, measured.",
    title: "Healthcare simulation & attribution",
    text: "A healthcare analytics platform for running PCP attribution simulations and turning the results into clear, actionable reports.",
    stack: ["React", "TypeScript", "Ant Design", "Boomi", "GenAI"],
    impact: "Reusable UI patterns · API-connected workflows",
    mark: "01",
    color: "mint",
  },
  {
    id: "billing",
    type: "Full stack · Enterprise",
    year: "2024 — 2026",
    name: "Billing without the backlog.",
    title: "Enterprise billing system",
    text: "Robust Spring Boot services and a guided billing workflow that brought data from multiple source systems together.",
    stack: ["React", "Spring Boot", "Java", "REST API", "Copilot"],
    impact: "40% fewer manual entry errors · 35% better billing accuracy",
    mark: "02",
    color: "violet",
  },
  {
    id: "tickets",
    type: "Frontend · Productivity",
    year: "2022 — 2023",
    name: "Support, in motion.",
    title: "Ticketing platform",
    text: "A desktop-friendly support app that streamlined ticket creation, live chat and progress tracking for busy operations teams.",
    stack: ["React", "Electron", "TypeScript", "ServiceNow"],
    impact: "35% faster response · 50% lower resolution time",
    mark: "03",
    color: "orange",
  },
  {
    id: "incidents",
    type: "Frontend · Operations",
    year: "2022",
    name: "Make incidents visible.",
    title: "Incident management dashboard",
    text: "A real-time dashboard that helped teams filter, prioritize and act on incidents using visual signals and live data.",
    stack: ["React", "Chart.js", "TypeScript", "ServiceNow"],
    impact: "Live operational visibility · Faster decisions",
    mark: "04",
    color: "blue",
  },
];
const filters = ["All work", "Full stack", "Frontend"];

function App() {
  const [dark, setDark] = useState(false),
    [filter, setFilter] = useState("All work"),
    [active, setActive] = useState(null),
    [menu, setMenu] = useState(false),
    [toast, setToast] = useState(""),
    [palette, setPalette] = useState(false),
    [term, setTerm] = useState("");
  const visible = projects.filter(
    (p) =>
      filter === "All work" ||
      p.type.toLowerCase().startsWith(filter.toLowerCase()),
  );
  const ping = (msg) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 2200);
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("shivampandey91198@gmail.com");
      ping("Email copied to clipboard");
    } catch {
      window.location.href = "mailto:shivampandey91198@gmail.com";
    }
  };
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((v) => !v);
      }
      if (e.key === "Escape") {
        setPalette(false);
        setActive(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.dataset.theme = dark ? "dark" : "light";
  }, [dark]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.14 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const headings = document.querySelectorAll(
      ".stage h2, .stage h3, .hero-title-line",
    );
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            "headline-in-view",
            entry.isIntersecting,
          );
        }),
      { threshold: 0.4, rootMargin: "-8% 0px -12% 0px" },
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
        document.documentElement.style.setProperty(
          "--scroll-progress",
          progress + "%",
        );
        const viewportCenter = window.innerHeight / 2;
        const parallaxScale = window.innerWidth <= 600 ? 0.55 : 1;
        document.querySelectorAll(".stage").forEach((section) => {
          const bounds = section.getBoundingClientRect();
          const position = Math.max(
            -1.25,
            Math.min(
              1.25,
              (bounds.top + bounds.height / 2 - viewportCenter) /
                window.innerHeight,
            ),
          );
          section.style.setProperty(
            "--parallax-bg",
            (position * -40 * parallaxScale).toFixed(1) + "px",
          );
          section.style.setProperty(
            "--parallax-mid",
            (position * 18 * parallaxScale).toFixed(1) + "px",
          );
          section.style.setProperty(
            "--parallax-front",
            (position * -30 * parallaxScale).toFixed(1) + "px",
          );
        });
        frame = 0;
      });
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  const jump = (id) => {
    setPalette(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };
  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />
      <header className="topbar wrap">
        <a className="wordmark" href="#top" aria-label="Shivam Pandey home">
          SP<span>✳</span>
        </a>
        <nav className={menu ? "nav open" : "nav"}>
          <a href="#work" onClick={() => setMenu(false)}>
            Selected work
          </a>
          <a href="#about" onClick={() => setMenu(false)}>
            Objective
          </a>
          <a href="#ai" onClick={() => setMenu(false)}>
            AI workflow
          </a>
          <a href="#skills" onClick={() => setMenu(false)}>
            Skills
          </a>
          <a href="#experience" onClick={() => setMenu(false)}>
            Experience
          </a>
          <a href="#education" onClick={() => setMenu(false)}>
            Education
          </a>
          <a href="#contact" onClick={() => setMenu(false)}>
            Contact
          </a>
        </nav>
        <div className="top-actions">
          <button
            className="icon-btn theme-btn"
            onClick={() => setDark(!dark)}
            aria-label="Toggle color theme"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a
            href="/Shivam-Pandey-Resume.pdf"
            className="resume-link"
            target="_blank"
            rel="noreferrer"
          >
            Resume <ArrowUpRight size={14} />
          </a>
          <button
            className="icon-btn mobile-menu"
            onClick={() => setMenu(!menu)}
            aria-label="Toggle menu"
          >
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      <main id="top">
        <section className="hero wrap stage reveal is-visible">
          <div className="hero-copy">
            {/* <div className="eyebrow">
              <span className="status-dot" /> AVAILABLE FOR FREELANCE &
              COLLABORATION <span className="eyebrow-loc">· INDIA</span>
            </div> */}
            <h1>
              <span className="hero-title-line">
                <span className="title-word word-ideas">Ideas</span>{" "}
                <span className="title-word word-into">into</span>
              </span>
              <span className="hero-title-line">
                <span className="title-word word-useful">
                  <em className="useful-word">useful</em>
                </span>{" "}
                <span className="title-word word-software">software</span>
                <span className="title-word word-period period">.</span>
              </span>
            </h1>
            <p className="hero-intro">
              I’m <strong>Shivam Pandey</strong> — a full-stack developer who
              turns complex workflows into useful, dependable software. I pair
              product thinking with modern engineering and AI-assisted coding.
            </p>
            <div className="hero-ctas">
              <a className="button button-primary" href="#work">
                Explore my work <ArrowDown size={16} />
              </a>
              <a className="text-link" href="#contact">
                Let’s talk <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="hero-foot">
              <span>
                <b>05+</b> years building for the web
              </span>
              <span className="foot-sep">/</span>
              <span>
                React <i>×</i> Java <i>×</i> good questions
              </span>
            </div>
          </div>
          <div
            className="hero-art parallax-layer parallax-front"
            aria-label="Decorative interactive engineering card"
          >
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="orbit-core">
              <span>SP</span>
              <i>✳</i>
            </div>
            <div className="float-card card-top">
              <span className="tiny-label">CURRENT MODE</span>
              <b>
                Builder<span className="cursor">_</span>
              </b>
              <span className="card-caption">
                <span className="status-dot" /> in the flow
              </span>
            </div>
            <div className="float-card card-bottom">
              <span className="tiny-label">A GOOD DAY LOOKS LIKE</span>
              <div className="day-icons">
                <span>⌘</span>
                <span>✳</span>
                <span>↗</span>
              </div>
              <b>Ship something useful.</b>
            </div>
            <div className="art-note note-left">
              thoughtful
              <br />
              by design <span>↗</span>
            </div>
            <div className="art-note note-right">
              less busywork,
              <br />
              more progress <span>✳</span>
            </div>
            <div className="art-coordinate">
              19°04′ N<br />
              72°52′ E
            </div>
          </div>
          <button className="command-hint" onClick={() => setPalette(true)}>
            <Command size={14} /> Find something <kbd>⌘ K</kbd>
          </button>
        </section>
        <section className="ticker" aria-label="Skills">
          <div className="ticker-track">
            {[0, 1].map((n) => (
              <div className="ticker-line" key={n}>
                <span>FRONTEND CRAFT</span>
                <i>✳</i>
                <span>REACT & TYPESCRIPT</span>
                <i>✳</i>
                <span>JAVA & SPRING BOOT</span>
                <i>✳</i>
                <span>AI-ASSISTED BUILDING</span>
                <i>✳</i>
                <span>PRODUCT THINKING</span>
                <i>✳</i>
              </div>
            ))}
          </div>
        </section>
        <section className="objective-section stage reveal" id="about">
          <div className="wrap objective-grid">
            <div className="objective-copy">
              <div className="eyebrow">MY OBJECTIVE</div>
              <h2>
                Build things
                <br />
                that make work <em>better.</em>
              </h2>
              <p>
                I want to shape digital products that solve real problems, feel
                clear to use, and stay dependable as they grow. I bring a
                full-stack mindset from the first sketch to the final API
                response.
              </p>
              <a className="text-link" href="#work">
                See what I’ve built <ArrowDown size={16} />
              </a>
            </div>
            <div className="objective-art parallax-layer parallax-front">
              <span className="objective-orbit orbit-a" />
              <span className="objective-orbit orbit-b" />
              <div className="objective-center">
                <Sparkles size={32} />
                <b>
                  Make it
                  <br />
                  meaningful.
                </b>
              </div>
              <span className="objective-caption">
                PEOPLE FIRST <i>✳</i> BUILT TO LAST
              </span>
            </div>
          </div>
          <span className="section-number">01 / OBJECTIVE</span>
        </section>
        <section className="ai-section stage reveal" id="ai">
          <div className="wrap ai-grid">
            <div className="ai-copy">
              <div className="eyebrow">
                <Sparkles size={14} /> AI-ASSISTED DEVELOPMENT
              </div>
              <h2>
                AI makes me
                <br />
                <em>faster.</em> Judgment
                <br />
                makes it good.
              </h2>
              <p>
                I use GitHub Copilot as a practical engineering partner: to
                explore approaches, generate code, debug, refactor, and create
                tests. I review the output, verify behavior, and stay
                accountable for the code that ships.
              </p>
              <div className="ai-tools">
                <span>GITHUB COPILOT</span>
                <span>PROMPT ENGINEERING</span>
                <span>TEST GENERATION</span>
                <span>CODE REFACTORING</span>
              </div>
            </div>
            <div className="ai-console parallax-layer parallax-front">
              <div className="console-head">
                <span>
                  <i /> BUILD WORKFLOW
                </span>
                <span>HUMAN IN THE LOOP</span>
              </div>
              <div className="console-step">
                <span>01</span>
                <div>
                  <b>Understand the problem</b>
                  <p>Map the user need and constraints.</p>
                </div>
                <span className="step-mark">↘</span>
              </div>
              <div className="console-step ai-step">
                <span>02</span>
                <div>
                  <b>Accelerate with AI</b>
                  <p>Explore, draft, refactor and test.</p>
                </div>
                <span className="step-mark">✳</span>
              </div>
              <div className="console-step">
                <span>03</span>
                <div>
                  <b>Review & make it reliable</b>
                  <p>Check edge cases. Own the result.</p>
                </div>
                <span className="step-mark">✓</span>
              </div>
              <div className="console-footer">
                <span className="status-dot" /> ASSISTED BY AI. ENGINEERED BY
                ME.
              </div>
            </div>
          </div>
          <span className="section-number">02 / HOW I BUILD</span>
        </section>
        <section
          className="work-section wrap section-pad stage reveal"
          id="work"
        >
          <div className="section-head">
            <div>
              <div className="eyebrow">A FEW THINGS I’VE HELPED MAKE</div>
              <h2>
                Selected <em>work</em>
                <span className="period">.</span>
              </h2>
            </div>
            <div className="work-side-note">
              Real products, real teams.
              <br />
              Details kept intentionally human.
            </div>
          </div>
          <div className="filter-row">
            <div className="filters">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={filter === f ? "filter active" : "filter"}
                >
                  {f}
                  <span>
                    {f === "All work" ? "04" : f === "Full stack" ? "01" : "03"}
                  </span>
                </button>
              ))}
            </div>
            <span className="count-label">
              {String(visible.length).padStart(2, "0")} PROJECTS
            </span>
          </div>
          <div className="project-grid parallax-layer parallax-mid">
            {visible.map((p, i) => (
              <button
                className={`project-card ${p.color}`}
                key={p.id}
                onClick={() => setActive(p)}
                style={{ "--delay": `${i * 80}ms` }}
              >
                <div className="project-visual">
                  <span className="project-index">PROJECT / {p.mark}</span>
                  <span className="visual-year">{p.year}</span>
                  <div className={`visual-shape shape-${p.id}`}>
                    <span>
                      {p.id === "health"
                        ? "care"
                        : p.id === "billing"
                          ? "$"
                          : p.id === "tickets"
                            ? "↗"
                            : "◎"}
                    </span>
                  </div>
                  <span className="visual-word">{p.name}</span>
                  <span className="card-arrow">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
                <div className="project-meta">
                  <span className="project-type">{p.type}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <div className="project-bottom">
                    <div className="tags">
                      {p.stack.slice(0, 3).map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                    <span className="impact">{p.impact}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="private-note">
            <Sparkles size={16} />
            <span>
              Some of the best work lives behind a login. Happy to walk you
              through the details.
            </span>
            <a href="#contact">
              Ask me about it <ArrowRight size={14} />
            </a>
          </div>
          <span className="section-number">03 / SELECTED WORK</span>
        </section>
        <section className="skills-section stage reveal" id="skills">
          <div className="wrap skills-layout">
            <div className="skills-intro">
              <div className="eyebrow">THE TOOLKIT</div>
              <h2>
                One stack.
                <br />
                <em>Many layers.</em>
              </h2>
              <p>
                Comfortable moving from a user interface to the services and
                integrations behind it.
              </p>
              <a
                className="button button-outline"
                href="/Shivam-Pandey-Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Full resume <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="about-right parallax-layer parallax-front">
              <div className="skill-group">
                <div className="skill-number">01</div>
                <div>
                  <h3>Make it feel right</h3>
                  <p>
                    React · TypeScript · JavaScript · Redux · Ant Design ·
                    Material UI · HTML/CSS
                  </p>
                </div>
                <span className="skill-glyph">⌘</span>
              </div>
              <div className="skill-group">
                <div className="skill-number">02</div>
                <div>
                  <h3>Make it hold up</h3>
                  <p>
                    Java · Spring Boot · REST APIs · Microservices · Python ·
                    FastAPI · SQL
                  </p>
                </div>
                <span className="skill-glyph">{}</span>
              </div>
              <div className="skill-group">
                <div className="skill-number">03</div>
                <div>
                  <h3>Make the work flow</h3>
                  <p>
                    Git · GitLab · Postman · Swagger · JUnit · CI/CD · Agile
                    collaboration
                  </p>
                </div>
                <span className="skill-glyph">↗</span>
              </div>
              <div className="skill-group">
                <div className="skill-number">04</div>
                <div>
                  <h3>Use AI with intent</h3>
                  <p>
                    GitHub Copilot · prompt engineering · code generation ·
                    refactoring · test generation
                  </p>
                </div>
                <span className="skill-glyph">✳</span>
              </div>
              <div className="cred-row">
                <span>ALSO PROUD OF</span>
                <b>CSA</b>
                <b>Azure Fundamentals</b>
                <b>Claude Architecture Foundation</b>
                <span className="awards">4× customer awards</span>
              </div>
            </div>
          </div>
          <span className="section-number">04 / SKILLS</span>
        </section>
        <section className="experience-section stage reveal" id="experience">
          <div className="wrap experience-layout">
            <div className="experience-intro">
              <div className="eyebrow">THE PATH SO FAR</div>
              <h2>
                Experience
                <br />
                that <em>adds up.</em>
              </h2>
              <p>
                Five years building and improving software with cross-functional
                teams.
              </p>
            </div>
            <div className="timeline parallax-layer parallax-front">
              <article className="timeline-item">
                <div className="timeline-date">FEB 2026 — PRESENT</div>
                <div>
                  <h3>Cognizant</h3>
                  <span className="timeline-role">
                    Associate Projects · Frontend Developer
                  </span>
                  <p>
                    Building user interfaces for a healthcare analytics and PCP
                    attribution platform; collaborating across product and Boomi
                    backend teams.
                  </p>
                  <div className="tags">
                    <span>React</span>
                    <span>TypeScript</span>
                    <span>Ant Design</span>
                    <span>GenAI</span>
                  </div>
                </div>
              </article>
              <article className="timeline-item">
                <div className="timeline-date">OCT 2021 — JAN 2026</div>
                <div>
                  <h3>Sopra Steria</h3>
                  <span className="timeline-role">
                    Senior Software Engineer · Full Stack
                  </span>
                  <p>
                    Delivered billing, ticketing, and incident management
                    products for enterprise operations.
                  </p>
                  <div className="tags">
                    <span>React</span>
                    <span>Java</span>
                    <span>Spring Boot</span>
                    <span>ServiceNow</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <span className="section-number">05 / EXPERIENCE</span>
        </section>
        <section className="education-section stage reveal" id="education">
          <div className="wrap education-layout">
            <div className="eyebrow">FOUNDATIONS & MILESTONES</div>
            <h2>
              Learn, build,
              <br />
              <em>make an impact.</em>
            </h2>
            <div className="education-columns">
              <article className="education-card">
                <span className="eyebrow">EDUCATION</span>
                <h3>Bachelor of Computer Application</h3>
                <p>Veer Bahadur Singh Purvanchal University</p>
                <span className="education-date">JUL 2017 — NOV 2020</span>
              </article>
              <article className="education-card award-card">
                <span className="eyebrow">RECOGNITION</span>
                <h3>Customer & team awards</h3>
                <ul>
                  <li>
                    Team Falcon Award · early delivery and backlog resolution
                  </li>
                  <li>
                    Customer Delight Award · billing onboarding contribution
                  </li>
                  <li>Pinnacle Award · billing onboarding contribution</li>
                  <li>
                    Einstein Award · operational efficiency and innovation
                  </li>
                </ul>
                <div className="education-date">2023 — 2025</div>
              </article>
            </div>
            <div className="cert-row">
              <span>CERTIFICATIONS</span>
              <b>ServiceNow CSA</b>
              <b>Microsoft Azure Fundamentals</b>
              <b>Anthropic Claude Architecture Foundation</b>
            </div>
          </div>
          <span className="section-number">06 / EDUCATION & ACHIEVEMENTS</span>
        </section>
        <section className="contact-section wrap stage reveal" id="contact">
          <div className="contact-inner parallax-layer parallax-front">
            <div className="eyebrow">
              <span className="status-dot" /> OPEN TO THE RIGHT NEXT THING
            </div>
            <h2>
              Have a good
              <br />
              <em>one in mind?</em>
            </h2>
            <p>
              Whether it’s a product to build, a tricky workflow to untangle, or
              a team that needs another thoughtful engineer — I’d love to hear
              about it.
            </p>
            <div className="contact-actions">
              <a
                className="button button-primary"
                href="mailto:shivampandey91198@gmail.com?subject=Let%E2%80%99s%20build%20something"
              >
                Start a conversation <ArrowUpRight size={16} />
              </a>
              <button className="button button-outline" onClick={copyEmail}>
                <Copy size={15} /> Copy my email
              </button>
            </div>
            <div className="contact-details">
              <a href="mailto:shivampandey91198@gmail.com">
                <Mail size={15} /> shivampandey91198@gmail.com
              </a>
              <a href="tel:+916386764255">+91 63867 64255</a>
              <span>Based in India · Working everywhere</span>
            </div>
            <span className="contact-stamp">
              LET’S
              <br />
              MAKE IT
              <br />
              MATTER <i>✳</i>
            </span>
          </div>
        </section>
      </main>
      <footer className="footer wrap">
        <a className="wordmark" href="#top">
          SP<span>✳</span>
        </a>
        <span>Designed with care. Built to be useful.</span>
        <div className="footer-links">
          <a href="mailto:shivampandey91198@gmail.com">
            Email <ArrowUpRight size={12} />
          </a>
          <a href="#top">Back to top ↑</a>
        </div>
        <span className="copyright">
          © {new Date().getFullYear()} SHIVAM PANDEY
        </span>
      </footer>
      {active && (
        <div className="modal-backdrop" onClick={() => setActive(null)}>
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close icon-btn"
              onClick={() => setActive(null)}
              aria-label="Close project details"
            >
              <X size={20} />
            </button>
            <div className={`modal-art ${active.color}`}>
              <span>PROJECT / {active.mark}</span>
              <div className={`visual-shape shape-${active.id}`}>
                <span>
                  {active.id === "health"
                    ? "care"
                    : active.id === "billing"
                      ? "$"
                      : active.id === "tickets"
                        ? "↗"
                        : "◎"}
                </span>
              </div>
              <small>{active.year}</small>
            </div>
            <div className="modal-copy">
              <div className="eyebrow">{active.type}</div>
              <h2 id="modal-title">
                {active.title}
                <span className="period">.</span>
              </h2>
              <p>{active.text}</p>
              <div className="modal-impact">
                <span>THE OUTCOME</span>
                <b>{active.impact}</b>
              </div>
              <div className="modal-stack">
                <span>TOOLS IN THE MIX</span>
                <div className="tags">
                  {active.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
              <a
                className="text-link"
                href="#contact"
                onClick={() => setActive(null)}
              >
                Let’s talk about a similar project <ArrowRight size={15} />
              </a>
            </div>
          </section>
        </div>
      )}
      {palette && (
        <div className="palette-overlay" onClick={() => setPalette(false)}>
          <div
            className="palette"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="palette-search">
              <Command size={17} />
              <input
                autoFocus
                placeholder="Where would you like to go?"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
              <kbd>ESC</kbd>
            </div>
            {[
              ["Selected work", "work"],
              ["Objective", "about"],
              ["AI-assisted development", "ai"],
              ["Skills", "skills"],
              ["Experience", "experience"],
              ["Education & achievements", "education"],
              ["Get in touch", "contact"],
            ]
              .filter(([label]) =>
                label.toLowerCase().includes(term.toLowerCase()),
              )
              .map(([label, id], i) => (
                <button
                  key={id}
                  className="palette-item"
                  onClick={() => jump(id)}
                >
                  <span className="palette-num">0{i + 1}</span>
                  {label}
                  <ArrowUpRight size={15} />
                </button>
              ))}
            <div className="palette-hint">
              A LITTLE SHORTCUT FOR THE CURIOUS <span>↵ select</span>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div className="toast">
          <Check size={16} />
          {toast}
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
