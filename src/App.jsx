import { useEffect, useRef } from 'react'

const projects = [
  {
    title: 'Distributed Key-Value Store with Raft Consensus',
    description:
      'Fault-tolerant C++ key-value store using Raft consensus, gRPC/Protobuf for node communication, and a write-ahead log for recovery.',
    metric: '221 ms',
    metricLabel: 'median leader re-election',
    skills: ['C++', 'Raft', 'gRPC', 'Protocol Buffers', 'WAL'],
    github: 'https://github.com/sharan-s2k/distributed-key-value-store',
  },
  {
    title: 'High-Performance Layer 4 Load Balancer',
    description:
      'TCP Layer 4 load balancer using epoll/kqueue for high-concurrency nonblocking I/O, with health-aware routing, circuit breaking, graceful draining, and connection limits.',
    metric: '41K+ req/s',
    metricLabel: '1,000 concurrent connections · 2M-request workloads',
    skills: ['C++', 'TCP/IP', 'epoll', 'kqueue', 'Prometheus'],
    github: 'https://github.com/sharan-s2k/L4-Load-Balancer',
  },
  {
    title: 'eBPF Network Observability Agent',
    description:
      'Linux observability agent for diagnosing process and TCP issues using eBPF/C, BPF ring buffers, Go, and Prometheus.',
    metric: '100K+ events/s',
    metricLabel: 'end-to-end kernel event handling',
    skills: ['Go', 'eBPF', 'C', 'Linux', 'Prometheus'],
    uw: true,
  },
  {
    title: 'GPU-Accelerated Image Preprocessing Pipeline',
    description:
      'High-resolution image-stitching pipeline using CUDA to parallelize pixel-level warping and blending.',
    metric: '2.71× faster',
    metricLabel: '539 ms → 199 ms on 3024×4032 images · 9.5× warp-kernel speedup',
    skills: ['C++', 'CUDA', 'GPU Programming', 'Image Processing'],
    github: 'https://github.com/sharan-s2k/gpu-accelerated-image-stitching',
  },
  {
    title: 'AI-Powered Recipe & Cooking Platform',
    description:
      'React-based AI cooking platform that converts YouTube videos into searchable recipes using LLMs, OpenSearch, Kafka, and an interactive cook-mode chat.',
    skills: ['LLMs', 'OpenSearch', 'Kafka', 'Docker', 'FastAPI', 'React', 'TypeScript'],
    github: 'https://github.com/sharan-s2k/MyCookbook',
  },
]

const skillGroups = [
  {
    title: 'Programming',
    items: 'C · C++ · Python · Go · Java · JavaScript · TypeScript · Bash',
  },
  {
    title: 'Systems & Performance',
    items:
      'Linux/Unix · POSIX Threads · Multithreading · Async I/O · Memory Management · GDB · Valgrind · ASan · gprof · Performance Profiling',
  },
  {
    title: 'Distributed Systems & Networking',
    items:
      'TCP/IP · Socket Programming · gRPC · Raft · Consensus · Replication · Failure Recovery · Fault Tolerance · Protocol State Machines',
  },
  {
    title: 'Backend & Data',
    items: 'REST · GraphQL · Kafka · Redis · OpenSearch · Microservices · SQL · NoSQL',
  },
  {
    title: 'Cloud & Infrastructure',
    items: 'AWS · GCP · Docker · Kubernetes · Terraform · Helm · EKS · SQS · Lambda · RDS',
  },
  {
    title: 'Parallel Computing',
    items: 'CUDA · GPU Programming · GPU Execution & Memory Model',
  },
]

const experience = [
  {
    date: 'JUL 2026 — AUG 2026',
    company: 'NEAR VISION INSTITUTE',
    title: 'Software Engineer Intern',
    description:
      'Built a student vision-care intake pipeline with React.js/GraphQL, Python on AWS Lambda, SQS, and RDS to automate consent, medical intake, and first-visit record creation.',
  },
  {
    date: 'AUG 2022 — SEP 2025',
    company: 'JUNIPER NETWORKS',
    title: 'Software Development Engineer II',
    description:
      'Built and debugged production C/C++ networking systems, implemented protocol features, created high-scale simulation tooling for 10K+ concurrent network objects, and instrumented telemetry that reduced time-to-root-cause for SEV-1 incidents by 67%.',
  },
  {
    date: 'FEB 2022 — JUL 2022',
    company: 'JUNIPER NETWORKS',
    title: 'Software Engineer Intern',
    description:
      'Developed a C-based memory leak detection and mitigation mechanism for a production networking daemon, improving stability of long-running services.',
  },
]

function HeroAnimation() {
  const canvasRef = useRef(null)
  const heroRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const hero = heroRef.current
    if (!canvas || !hero) return

    const ctx = canvas.getContext('2d')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = 1
    let frameId
    let particles = []

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY

    const onMouseMove = (event) => {
      const rect = hero.getBoundingClientRect()
      targetX = event.clientX - rect.left
      targetY = event.clientY - rect.top
    }

    const resize = () => {
      const rect = hero.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const area = width * height
      const count = Math.max(75, Math.min(145, Math.floor(area / 11500)))

      particles = Array.from({ length: count }, (_, i) => {
        const depth = 0.35 + Math.random() * 0.65
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (0.16 + depth * 0.26),
          vy: (Math.random() - 0.5) * (0.12 + depth * 0.22),
          r: 0.8 + depth * 1.9,
          blue: i % 5 === 0,
        }
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      hero.style.setProperty('--mouse-x', `${currentX}px`)
      hero.style.setProperty('--mouse-y', `${currentY}px`)

      for (const p of particles) {
        if (!reducedMotion) {
          p.x += p.vx
          p.y += p.vy

          if (p.x < -20) p.x = width + 20
          if (p.x > width + 20) p.x = -20
          if (p.y < -20) p.y = height + 20
          if (p.y > height + 20) p.y = -20
        }

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4.5)
        glow.addColorStop(0, p.blue ? 'rgba(120,201,255,.18)' : 'rgba(180,156,255,.18)')
        glow.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4.5, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = p.blue ? 'rgba(166,216,255,.85)' : 'rgba(219,208,255,.82)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      const maxDist = 112
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15
            ctx.strokeStyle =
              a.blue || b.blue
                ? `rgba(120,201,255,${alpha})`
                : `rgba(180,156,255,${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      if (!reducedMotion) frameId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    hero.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('resize', resize, { passive: true })

    return () => {
      hero.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div ref={heroRef} className="hero-animation">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-orbit" />
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="cursor-glow" />
    </div>
  )
}

function App() {
  useEffect(() => {
    const header = document.getElementById('site-header')
    const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 15)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header id="site-header">
        <div className="shell nav">
          <a className="brand" href="#home">
            <span className="brand-mark" aria-hidden="true" />
            <span>Sharan Saravanan</span>
          </a>

          <nav aria-label="Primary navigation">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <HeroAnimation />

          <div className="shell hero-inner">
            <div className="availability">Looking for 2027 software engineering opportunities</div>

            <h1>
              Sharan Saravanan
              <span className="hero-role">Software Engineer · M.S. CSSE @ University of Washington</span>
            </h1>

            <p className="hero-copy">
              Software engineer with 3+ years of industry experience building reliable,
              scalable software across backend systems, distributed infrastructure,
              networking, cloud, and GPU workloads.
            </p>

            <div className="hero-actions">
              <a className="button primary" href="#projects">View Projects ↓</a>
              <a className="button secondary" href="#contact">Contact Me</a>
            </div>

            <div className="social-row">
              <a href="https://github.com/sharan-s2k" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/s-sharan" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="shell">
            <div className="section-head">
              <div className="section-no">01 / ABOUT</div>
              <h2>Software engineer with a strong systems foundation.</h2>
            </div>

            <div className="about-layout">
              <article className="about-main glass">
                <p>
                  I’m a software engineer and graduate student at the University of Washington,
                  with professional experience spanning C/C++ systems software, backend services,
                  cloud infrastructure, networking, and application development.
                </p>

                <p>
                  Before graduate school, I spent more than three years at Juniper Networks,
                  where I worked on production networking systems, protocol implementations,
                  debugging, performance, reliability, and large-scale simulation. I’ve also
                  worked on full-stack and cloud workflows at Near Vision Institute.
                </p>

                <p>
                  My background is rooted in systems/software engineering, but I’m interested in
                  solving strong engineering problems across backend, infrastructure, AI/ML systems,
                  full-stack development, and reliability.
                </p>

                <a className="button primary" href="#contact">Let’s Connect →</a>
              </article>

              <aside className="education-card glass">
                <p className="edu-kicker">Education</p>
                <h3>University of Washington</h3>
                <p>
                  M.S. Computer Science & Software Engineering<br />
                  Expected Jun 2027 · GPA 4.0/4.0
                </p>
                <p>
                  High Performance Computing · Distributed Computing · Software Design & Architecture · Machine Learning
                </p>

                <div className="edu-divider" />

                <h3>Amrita Vishwa Vidyapeetham</h3>
                <p>
                  B.Tech Electronics & Communication Engineering<br />
                  Graduated Aug 2022
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="shell">
            <div className="section-head">
              <div className="section-no">02 / PROJECTS</div>
              <h2>Selected projects.</h2>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <article className="project glass" key={project.title}>
                  <div className="project-top">
                    {project.uw ? (
                      <div className="uw-badge" aria-label="University of Washington project">
                        <span className="uw-mark">W</span>
                        <span>UW Project</span>
                      </div>
                    ) : (
                      <>
                        <span className="project-type">Public Repository</span>
                        <a
                          className="github-button"
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                        >
                          GitHub ↗
                        </a>
                      </>
                    )}
                  </div>

                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  {project.metric && (
                    <div className="metric">
                      {project.metric}
                      <small>{project.metricLabel}</small>
                    </div>
                  )}

                  <div className="project-skills">
                    {project.skills.map((skill) => (
                      <span className="skill-chip" key={skill}>{skill}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="shell">
            <div className="section-head">
              <div className="section-no">03 / SKILLS</div>
              <h2>Technical skills and professional experience.</h2>
            </div>

            <div className="skills-grid">
              {skillGroups.map((group) => (
                <article className="skill-card glass" key={group.title}>
                  <h3>{group.title}</h3>
                  <p>{group.items}</p>
                </article>
              ))}
            </div>

            <h3 className="experience-title">Professional Experience Highlights</h3>

            <div className="timeline">
              {experience.map((item) => (
                <article className="timeline-item" key={`${item.company}-${item.date}`}>
                  <span className="timeline-dot" />
                  <p className="timeline-meta">{item.date} · {item.company}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="shell">
            <div className="section-head">
              <div className="section-no">04 / CONTACT</div>
              <h2>Let’s connect.</h2>
            </div>

            <div className="contact-grid">
              <article className="contact-card glass">
                <h3>Contact</h3>

                <div className="contact-list">
                  <a className="contact-link" href="mailto:sharan2k@uw.edu">
                    <span>Email</span>
                    <span>sharan2k@uw.edu</span>
                  </a>

                  <a className="contact-link" href="tel:+14252196032">
                    <span>Phone</span>
                    <span>(425) 219-6032</span>
                  </a>

                  <a
                    className="contact-link"
                    href="https://www.linkedin.com/in/s-sharan"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>LinkedIn</span>
                    <span>linkedin.com/in/s-sharan ↗</span>
                  </a>

                  <a
                    className="contact-link"
                    href="https://github.com/sharan-s2k"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>GitHub</span>
                    <span>github.com/sharan-s2k ↗</span>
                  </a>
                </div>
              </article>

              <article className="opportunity-card glass">
                <p className="edu-kicker">Looking for 2027 opportunities</p>
                <h3>Areas I’m interested in.</h3>

                <p>
                  I’m interested in software engineering teams solving meaningful problems across
                  product development, systems, backend infrastructure, AI platforms, and reliability.
                </p>

                <div className="opportunity-list">
                  <div className="opportunity">Software Engineering</div>
                  <div className="opportunity">Systems Software Engineering</div>
                  <div className="opportunity">Backend Development</div>
                  <div className="opportunity">Full Stack Development</div>
                  <div className="opportunity">ML / AI Infrastructure</div>
                  <div className="opportunity">Site Reliability Engineering</div>
                </div>

                <a className="button primary" href="mailto:sharan2k@uw.edu">Reach Out →</a>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell footer-inner">
          <span>© {new Date().getFullYear()} Sharan Saravanan</span>
          <span className="footer-note">Software Engineer · Looking for 2027 opportunities</span>
        </div>
      </footer>
    </>
  )
}

export default App
