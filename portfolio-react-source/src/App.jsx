import { useEffect, useState } from 'react'
import { Mail, Phone, Link2, Terminal as CodeIcon, GraduationCap, ArrowUpRight } from 'lucide-react'
import { person, about, projects, skillGroups, timeline, contact } from './data.js'
import NetworkField from './components/CircuitField.jsx'
import HeroStats from './components/HeroStats.jsx'

const SECTIONS = ['home', 'about', 'projects', 'skills', 'contact']

export default function App() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observers = SECTIONS.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(id),
        { rootMargin: '-45% 0px -50% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o && o.disconnect())
  }, [])

  return (
    <>
      <Nav active={active} />
      <Home />
      <main className="page">
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="footer">sharansaravanan.github.io</footer>
    </>
  )
}

function Nav({ active }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#home" className="nav-brand">SS</a>
        <div className="nav-links">
          {SECTIONS.filter((s) => s !== 'home').map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

function Home() {
  return (
    <section id="home" className="hero">
      <NetworkField />
      <HeroStats />
      <div className="hero-content">
        <span className="chip">{person.status}</span>
        <h1>{person.name}</h1>
        <p className="hero-tagline">{person.tagline}</p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">Let's connect</a>
          <a href="#projects" className="btn btn-ghost">See my work</a>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <div className="section-inner about-grid">
        <div>
          <h2>About</h2>
          <p className="lead">{about.summary}</p>
          <a href="#contact" className="btn btn-primary">Let's connect</a>
        </div>
        <div className="fact-card">
          {about.facts.map((f, i) => (
            <div className="fact-row" key={i}>
              <span className="fact-label">{f.label}</span>
              <span className="fact-value">{f.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <h2>Projects</h2>
        <div className="project-grid">
          {projects.map((p, i) => (
            <article className="project-card" key={i}>
              <h3>{p.name}</h3>
              <p className="project-tagline">{p.tagline}</p>
              <p className="project-desc">{p.description}</p>
              <div className="tag-row">
                {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
              <div className="project-foot">
                {p.school ? (
                  <span className="uw-badge"><GraduationCap size={15} /> University of Washington</span>
                ) : (
                  <a
                    className="code-link"
                    href={p.githubUrl || contact.githubHref}
                    target="_blank"
                    rel="noopener"
                  >
                    <CodeIcon size={15} /> View code <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <h2>Skills</h2>
        <div className="skill-grid">
          {skillGroups.map((g, i) => (
            <div className="skill-tile" key={i}>
              <h3>{g.title}</h3>
              <div className="tag-row">
                {g.items.map((s) => <span className="tag" key={s}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>

        <h3 className="sub-heading">Experience highlights</h3>
        <div className="timeline">
          {timeline.map((t, i) => (
            <div className="timeline-item" key={i}>
              <div className="timeline-dot" />
              <div className="timeline-body">
                <div className="timeline-period">{t.period}</div>
                <div className="timeline-role">{t.role} <span className="org">· {t.org}</span></div>
                <p className="timeline-highlight">{t.highlight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="section-inner contact-inner">
        <h2>Contact</h2>
        <span className="chip">{person.status}</span>
        <p className="lead" style={{ marginTop: 14 }}>
          I'm looking for full-time roles starting 2027 — systems, distributed systems, or infrastructure engineering. Reach out any of these ways.
        </p>
        <div className="contact-grid">
          <a className="contact-card" href={`mailto:${contact.email}`}>
            <Mail size={18} />
            <div><span className="contact-label">Email</span><span className="contact-value">{contact.email}</span></div>
          </a>
          <a className="contact-card" href={`tel:${contact.phoneHref}`}>
            <Phone size={18} />
            <div><span className="contact-label">Phone</span><span className="contact-value">{contact.phone}</span></div>
          </a>
          <a className="contact-card" href={contact.linkedinHref} target="_blank" rel="noopener">
            <Link2 size={18} />
            <div><span className="contact-label">LinkedIn</span><span className="contact-value">{contact.linkedin}</span></div>
          </a>
          <a className="contact-card" href={contact.githubHref} target="_blank" rel="noopener">
            <CodeIcon size={18} />
            <div><span className="contact-label">GitHub</span><span className="contact-value">{contact.github}</span></div>
          </a>
        </div>
      </div>
    </section>
  )
}
