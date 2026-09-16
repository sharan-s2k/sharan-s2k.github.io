export const person = {
  name: 'Sharan Saravanan',
  tagline: 'Systems engineer building the infrastructure underneath distributed, GPU-accelerated systems.',
  status: 'Open to 2027 roles',
}

export const about = {
  summary:
    "I'm a systems engineer finishing my Master's at the University of Washington, researching GPU-backed LLM inference and role-aware CPU scheduling. Before that, I spent three years at Juniper Networks writing C/C++ control-plane software for traffic-engineering systems — work where a memory leak or a race condition shows up as a customer's network going down at 3am. I like problems that sit close to the machine: consensus protocols, load balancers, kernel tracing, GPU kernels.",
  facts: [
    { label: 'Education', value: 'MS Computer Science & Software Engineering, University of Washington · 4.0 GPA · Expected Jun 2027' },
    { label: 'Prior degree', value: 'B.Tech Electronics & Communication Engineering, Amrita Vishwa Vidyapeetham · 2022' },
    { label: 'Experience', value: '3+ years, Software Development Engineer II, Juniper Networks' },
    { label: 'Focus areas', value: 'Distributed systems, networking, GPU computing, control-plane software' },
  ],
}

// githubUrl: real repo link when known. If null, the tile falls back to the GitHub profile link.
// school: true marks this as University of Washington coursework/research (shows a UW badge instead of a code button).
export const projects = [
  {
    name: 'Distributed Key-Value Store',
    tagline: 'A fault-tolerant Raft KV store over gRPC',
    description:
      'Quorum replication and WAL-backed recovery, with 221ms median leader re-election and recovery across partitions and stale-node restarts.',
    tags: ['C++', 'Raft', 'gRPC', 'Protocol Buffers', 'WAL'],
    githubUrl: null,
    school: false,
  },
  {
    name: 'L4 Load Balancer',
    tagline: 'A nonblocking TCP load balancer',
    description:
      'Health-aware routing, circuit breaking, and graceful draining — sustains 41K+ requests/second at 1,000 concurrent connections across 2M-request workloads.',
    tags: ['C++', 'TCP/IP', 'epoll', 'kqueue', 'Prometheus'],
    githubUrl: null,
    school: false,
  },
  {
    name: 'eBPF Network Observability Agent',
    tagline: 'A Linux tracing agent built on eBPF',
    description:
      'Traces process lifecycle and TCP behavior, sustaining 100K+ kernel events/sec through BPF ring buffers while exporting cardinality-controlled metrics.',
    tags: ['Go', 'eBPF', 'C', 'Linux', 'Prometheus'],
    githubUrl: null,
    school: false,
  },
  {
    name: 'GPU-Accelerated Image Pipeline',
    tagline: 'A CUDA-based image-processing pipeline',
    description:
      'Parallelized pixel-level operations for a 2.71x end-to-end speedup over CPU on 3024×4032 images (199ms vs. 539ms), and a 9.5x warp-kernel speedup.',
    tags: ['C++', 'CUDA', 'Image Processing'],
    githubUrl: null,
    school: false,
  },
  {
    name: 'AI-Powered Recipe & Cooking Platform',
    tagline: 'A microservices platform for cooking video search',
    description:
      'Asynchronously ingests cooking videos, extracts structured recipes, indexes them for search, and serves an interactive cook-mode with an LLM for Q&A.',
    tags: ['LLMs', 'OpenSearch', 'Kafka', 'Docker', 'FastAPI', 'React', 'TypeScript'],
    githubUrl: null,
    school: false,
  },
]

export const skillGroups = [
  { title: 'Languages', items: ['C', 'C++', 'Python', 'Go', 'Java', 'JavaScript', 'TypeScript', 'Bash'] },
  { title: 'Systems & Performance', items: ['Linux/Unix', 'POSIX Threads', 'Async I/O', 'Memory Management', 'GDB', 'Valgrind', 'AddressSanitizer', 'gprof'] },
  { title: 'Distributed Systems & Networking', items: ['TCP/IP', 'Socket Programming', 'gRPC', 'Raft', 'Consensus', 'Replication', 'Protocol State Machines'] },
  { title: 'Backend & Data', items: ['REST', 'GraphQL', 'Kafka', 'Redis', 'OpenSearch', 'Microservices', 'SQL', 'NoSQL'] },
  { title: 'Cloud & Infrastructure', items: ['AWS (EC2, S3, RDS, SQS, SNS, ElastiCache, EKS)', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Helm'] },
  { title: 'Parallel Computing', items: ['CUDA', 'GPU Programming', 'GPU Execution & Memory Model'] },
]

export const timeline = [
  {
    period: 'Jul 2026 — Present',
    role: 'Software Engineer Intern',
    org: 'Near Vision Institute',
    highlight: 'Cut onboarding processing failures 35% by improving async processing for student vision records.',
  },
  {
    period: 'Aug 2022 — Sep 2025',
    role: 'Software Development Engineer II',
    org: 'Juniper Networks',
    highlight: 'Built C/C++ control-plane services for traffic-engineering systems; cut Sev-1 time-to-root-cause 67% through new telemetry.',
  },
  {
    period: 'Feb 2022 — Jul 2022',
    role: 'Software Engineer Intern',
    org: 'Juniper Networks',
    highlight: 'Designed a memory leak detection and mitigation mechanism in C for a production networking daemon.',
  },
]

export const contact = {
  email: 'sharan2k@uw.edu',
  phone: '(425) 219-6032',
  phoneHref: '+14252196032',
  linkedin: 'linkedin.com/in/s-sharan',
  linkedinHref: 'https://linkedin.com/in/s-sharan',
  github: 'github.com/sharan-s2k',
  githubHref: 'https://github.com/sharan-s2k',
}
