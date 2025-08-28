import { useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/*********************************
  ULTRA-INTERACTIVE PORTFOLIO
  Theme: "Holographic Aurora + Glass" ✨
  - Animated aurora background
  - Magnetic navbar + cursor glow
  - Page transitions (Framer Motion)
  - Parallax orbs & tilt cards
  - Subtle particle sparkles (no lib)
**********************************/

/*********
 Utilities
**********/
const cn = (...cls) => cls.filter(Boolean).join(" ");

/*********************************
  Global Animated Background
**********************************/
function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Soft gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-black" />

      {/* Animated aurora ribbons */}
      <div className="absolute -inset-[20%] blur-3xl opacity-60 mix-blend-screen">
        <div className="aurora aurora-a" />
        <div className="aurora aurora-b" />
        <div className="aurora aurora-c" />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute size-44 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-cyan-400/20 blur-2xl"
            style={{ top: `${(i * 13) % 90}%`, left: `${(i * 19) % 90}%` }}
            animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
            transition={{ duration: 12 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Tiny sparkles */}
      <Sparkles />

      {/* Extra CSS for aurora keyframes */}
      <style>{`
        .aurora{position:absolute;inset:0;background:conic-gradient(from 0deg at 50% 50%, rgba(0,255,255,0.25), rgba(255,0,255,0.25), rgba(0,255,200,0.25), rgba(0,120,255,0.25), rgba(0,255,255,0.25));}
        .aurora-a{animation:auroraMove 24s linear infinite;}
        .aurora-b{animation:auroraMove 32s linear infinite reverse;mix-blend:screen;}
        .aurora-c{animation:auroraMove 28s linear infinite;filter:hue-rotate(40deg);}
        @keyframes auroraMove{0%{transform:translate3d(-5%,0,0) rotate(0deg)}50%{transform:translate3d(5%,0,0) rotate(180deg)}100%{transform:translate3d(-5%,0,0) rotate(360deg)}}
      `}</style>
    </div>
  );
}

function Sparkles() {
  const [dots] = useState(() => Array.from({ length: 60 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: Math.random() * 2 + 0.5,
    d: Math.random() * 6 + 3,
  })));
  return (
    <div className="absolute inset-0">
      {dots.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white/50 shadow-[0_0_10px_#fff6]"
          style={{ width: p.s, height: p.s, top: `${p.y}%`, left: `${p.x}%` }}
          animate={{ opacity: [0, 1, 0], y: [0, -12, 0] }}
          transition={{ duration: p.d, repeat: Infinity, delay: i * 0.13 }}
        />)
      )}
    </div>
  );
}

/*********************************
  Layout + Navigation
**********************************/
function MagneticLink({ to, children }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  return (
    <Link
      to={to}
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setPos({ x: e.clientX - (r.left + r.width / 2), y: e.clientY - (r.top + r.height / 2) });
      }}
      onMouseLeave={() => {
        setPos({ x: 0, y: 0 });
        setHover(false);
      }}
      onMouseEnter={() => setHover(true)}
      className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full overflow-hidden"
      style={{ transform: `translate(${pos.x * 0.08}px, ${pos.y * 0.08}px)` }}
    >
      <span className={cn(
        "absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-full transition",
        hover && "bg-white/10 border-white/20"
      )} />
      <span className="relative z-10 text-sm uppercase tracking-wide text-white/90">{children}</span>
    </Link>
  );
}

function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          <Link to="/" className="group inline-flex items-center gap-2">
           <img src="/images/Logo.png" alt="Logo" className="w-18 h-12 rounded-lg" /> 
            
            <span className="text-white font-semibold tracking-wide group-hover:opacity-90">Fatima Butt</span>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <MagneticLink to="/">Home</MagneticLink>
            <MagneticLink to="/about">About</MagneticLink>
            <MagneticLink to="/projects">Projects</MagneticLink>
            <MagneticLink to="/skills">Skills</MagneticLink>
            <MagneticLink to="/contact">Contact</MagneticLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-10 text-center text-white/60">
        <div className="mb-2 flex justify-center gap-4">
          <a href="mailto:fatimabutt2k23@gmail.com" className="hover:text-white">Email</a>
          <a href="https://www.linkedin.com/in/fatima-shahzad-bb31a529b/" target="_blank" className="hover:text-white">LinkedIn</a>
          <a href="https://github.com/Fatimabutt786" className="hover:text-white">GitHub</a>
        </div>
        <p> © {new Date().getFullYear()} Fatima Butt</p>
      </div>
    </footer>
  );
}

/*********************************
  Page Transition Wrapper
**********************************/
function PageContainer({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mx-auto mt-28 max-w-7xl px-6"
    >
      {children}
    </motion.main>
  );
}

/*********************************
  Fancy Reusable Components
**********************************/
function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mb-10">
      <p className="text-xs uppercase tracking-[0.3em] text-white/60">{eyebrow}</p>
      <h2 className="mt-2 bg-gradient-to-r from-fuchsia-300 via-cyan-200 to-indigo-200 bg-clip-text text-3xl font-extrabold text-transparent md:text-5xl">
        {title}
      </h2>
      {desc && <p className="mt-4 max-w-2xl text-white/80">{desc}</p>}
    </div>
  );
}

function TiltCard({ children }) {
  const ref = useRef(null);
  const [t, setT] = useState({ rX: 0, rY: 0 });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        setT({ rX: (py - 0.5) * -10, rY: (px - 0.5) * 10 });
      }}
      onMouseLeave={() => setT({ rX: 0, rY: 0 })}
      style={{ transform: `perspective(900px) rotateX(${t.rX}deg) rotateY(${t.rY}deg)` }}
      className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-transform duration-150"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100" style={{ background: "radial-gradient(600px circle at var(--x) var(--y), rgba(255,255,255,0.08), transparent 40%)" }} />
      {children}
    </div>
  );
}

/*********************************
  Pages
**********************************/
function Home() {
  return (
    <PageContainer>
      <div className="grid items-center gap-10 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <p className="text-sm uppercase tracking-[0.35em] text-white/60">Aspiring Software Engineer</p>
          <h1 className="mt-3 text-5xl font-black leading-tight text-white md:text-7xl">
            Fatima builds <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">joyful</span> web experiences.
          </h1>
          <p className="mt-5 max-w-xl text-white/80">
            Web Developer (Wix + HTML/CSS/JS) learning MERN. 200+ DSA problems. Focused on performance, UX, and animations.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/projects" className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(0,200,255,.35)] hover:scale-[1.02] active:scale-95 transition">Explore Projects</Link>
            <Link to="/contact" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white/90 backdrop-blur hover:bg-white/20 transition">Contact</Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative">
  <div className="relative aspect-square w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl mx-auto overflow-hidden">

    {/* Gradient Box / Background */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-fuchsia-500/30 via-cyan-400/20 to-indigo-500/30" />

    {/* Your Image with transparent background */}
    <img 
      src="/images/Me.png"   // PNG with background removed
      alt="Fatima" 
      className="absolute inset-0 h-full w-full object-cover rounded-2xl z-10" 
    />

    {/* Animated blobs on top of image */}
    <motion.div 
      className="absolute -left-6 -top-6 size-24 rounded-full bg-fuchsia-500/30 blur-2xl z-20" 
      animate={{ y: [0, -10, 0] }} 
      transition={{ duration: 5, repeat: Infinity }} 
    />
    <motion.div 
      className="absolute -right-8 -bottom-6 size-28 rounded-full bg-cyan-400/30 blur-2xl z-20" 
      animate={{ y: [0, 12, 0] }} 
      transition={{ duration: 6, repeat: Infinity }} 
    />
  </div>
</motion.div>

      </div>
      
      

      {/* Highlights */}
      <section className="mt-24 bg-white/5 backdrop-blur-xl py-16 px-6 md:px-20 rounded-3xl">
  <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-12">
    🌟 My Skills & Highlights
  </h2>

  <div className="grid gap-12 md:grid-cols-3">
    {[
      { 
        k: "Web Development", 
        v: "💻 I create responsive, beautiful, and interactive websites using HTML, CSS, JS, Wix, and Tailwind. Focused on performance and UX!" 
      },
      { 
        k: "Programming", 
        v: "🖊️ Proficient in C, C++, Python, and Java. I solve complex problems, build algorithms, and enjoy coding challenges." 
      },
      { 
        k: "Problem Solving", 
        v: "🧩 Completed 120+ LeetCode problems (Arrays, DP). I love tackling challenging problems and optimizing solutions." 
      },
    ].map((it, index) => (
      <motion.div
        key={it.k}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 * index, type: "spring", stiffness: 120 }}
        whileHover={{ scale: 1.08 }}
      >
        <TiltCard className="relative rounded-3xl p-10 cursor-pointer bg-gradient-to-br from-fuchsia-500/20 via-cyan-400/20 to-indigo-500/20 
                               overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
          
          {/* Animated background glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-400/30 to-blue-400/30 blur-xl opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Text content */}
          <div className="relative z-10">
            <h3 className="text-white text-2xl font-bold mb-3">{it.k}</h3>
            <p className="text-white/80 text-md">{it.v}</p>
          </div>
        </TiltCard>
      </motion.div>
    ))}
  </div>
</section>

<section className="mt-24 bg-white/5 backdrop-blur-xl py-12 px-6 md:px-20 rounded-3xl text-center">
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
      🚀 Want to Collaborate?
    </h2>
    <p className="text-white/80 max-w-2xl mx-auto mb-6">
      I'm always excited to work on interesting projects, solve challenging problems, and create amazing web experiences. Let's build something awesome together!
    </p>
    <div className="flex flex-wrap justify-center gap-4">
      <Link 
        to="/contact" 
        className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg hover:scale-[1.05] active:scale-95 transition"
      >
        Get in Touch
      </Link>
      <Link 
        to="/projects" 
        className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white/90 backdrop-blur hover:bg-white/20 transition"
      >
        View Projects
      </Link>
    </div>
  </motion.div>
</section>
    </PageContainer>
  );
}

function About() {
  const timeline = [
    { year: "2023–2027", title: "BSCS — Govt. University, Lahore", body: "Current CGPA 3.1 | Deepening CS & Advanced Calculus" },
    { year: "2024", title: "Frontend Focus", body: "Responsive sites with Wix + HTML/CSS/JS" },
    { year: "2025", title: "MERN Journey", body: "Building full‑stack apps, authentication & REST APIs" },
  ];
  return (
    <PageContainer>
      <SectionTitle eyebrow="Who Am I" title="Crafting delightful, performant UIs" desc="I merge aesthetics with logic — animations that serve usability." />
      <div className="grid gap-10 md:grid-cols-[1.1fr,0.9fr]">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          {/* Animated timeline */}
          <ol className="relative border-l border-white/10 pl-6">
            {timeline.map((t, i) => (
              <motion.li key={t.year} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="mb-10">
                <div className="absolute -left-[11px] mt-1 size-5 rounded-full bg-gradient-to-br from-fuchsia-400 to-cyan-400 shadow-[0_0_20px_rgba(168,85,247,0.6)]" />
                <h4 className="text-white font-semibold">{t.title}</h4>
                <p className="text-xs uppercase tracking-widest text-white/60">{t.year}</p>
                <p className="mt-2 text-white/80">{t.body}</p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <TiltCard>
            <h3 className="text-xl font-bold text-white">What I love</h3>
            <ul className="mt-3 space-y-2 text-white/85">
              <li>⚡ Micro‑interactions that make UI feel alive</li>
              <li>🎨 Design systems, glassmorphism & vibrant gradients</li>
              <li>🧠 DSA mindset for performant code</li>
            </ul>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm text-white/80">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">Wix</div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">Tailwind</div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">React</div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">Node</div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">Mongo</div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">C++ / OOP</div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </PageContainer>
  );
}

function Projects() {
  const list = useMemo(
    () => [
      {
        title: "Portfolio (Bootstrap)",
        desc: "Responsive portfolio website.",
        tech: ["Bootstrap", "HTML", "CSS"],
        code: "https://github.com/Fatimabutt786/My-portfolio-using-bootstrap",
        img: "/images/portfolio.webp", // Add image path
      },
      {
        title: "Rock‑Paper‑Scissors (C++)",
        desc: "Console game with clean logic.",
        tech: ["C++", "OOP"],
        code: "https://github.com/Fatimabutt786/Rock-paper-scissor-game-in-c-",
        img: "/images/Rock.jpg",
      },
      {
        title: "Random Joke Generator",
        desc: "Fetch jokes, playful UI.",
        tech: ["JavaScript"],
        code: "https://github.com/Fatimabutt786/Random-joke-generator",
        img: "/images/joke.jpg",
      },
      {
        title: "Music_Player (Java)",
        desc: "OOP‑based library manager.",
        tech: ["Java", "OOP"],
        code: "https://github.com/Fatimabutt786/Music_Player",
        img: "/images/music.webp",
      },
      {
        title: "MERN Real‑Estate",
        desc: "Listings, auth, Firebase hosting.",
        tech: ["Mongo", "Express", "React", "Node", "Firebase"],
        code: "https://github.com/Fatimabutt786/Mern-Real-Estate",
        img: "/images/mern estate.jpg",
      },
      {
        title: "Prescripto — Doctor Booking App",
        desc: "Book appointments and manage schedules.",
        tech: ["React", "Node", "Mongo", "Express", "Tailwind"],
        code: "https://github.com/Fatimabutt786/Prescripto",
        img: "/images/presc.png",
      },
    ],
    []
  );

  return (
    <PageContainer>
      <SectionTitle eyebrow="My Projects" title="Projects with playful polish"  />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <motion.article key={p.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
            <TiltCard>
              {/* Project Image */}
              <img src={p.img} alt={p.title} className="aspect-video w-full rounded-xl object-cover" />

              <h3 className="mt-4 text-white text-lg font-semibold">{p.title}</h3>
              <p className="mt-1 text-white/80">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">{t}</span>
                ))}
              </div>
              <div className="mt-4 flex gap-3">
                {/* Only Code button */}
                <a href={p.code} target="_blank" className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10">Code</a>
              </div>
            </TiltCard>
          </motion.article>
        ))}
      </div>
            <div className="mt-12 text-center">
        <a
          href="https://github.com/Fatimabutt786"
          target="_blank"
          className="inline-block rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-8 py-3 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
        >
          Visit My GitHub 🚀
        </a>
      </div>

    </PageContainer>
  );
}

function Skills() {
  const skills = [
    { name: "HTML/CSS", v: 95 },
    { name: "JavaScript", v: 85 },
    { name: "Wix", v: 90 },
    { name: "React", v: 80 },
    { name: "C++ (OOP/DSA)", v: 88 },
    { name: "Python", v: 70 },
  ];
  return (
    <PageContainer>
      <SectionTitle  title="Skills with motion"  desc="A curated set of tools and technologies I rely on daily to craft interactive, high-performance, and visually engaging web experiences."  />
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((s, i) => (
          <motion.div key={s.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-white font-medium">{s.name}</span>
              <span className="text-white/70">{s.v}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-white/10">
              <motion.div className="h-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400" initial={{ width: 0 }} whileInView={{ width: `${s.v}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />
            </div>
          </motion.div>
        ))}
      </div>
    </PageContainer>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("⚠️ Please fill in all the required fields.");
      return;
    }

    setError("");
    setSent(true);
    e.target.reset();
    setFormData({ name: "", email: "", message: "" });

    // Simulate message sending
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <PageContainer>
      <SectionTitle
        eyebrow="Say Salaam"
        title="Let’s build something joyful"
        desc="I’m open to freelance and internships. Drop a message, and I’ll get back to you soon!"
      />

      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <label className="block text-sm text-white/80">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            placeholder="Your name"
          />

          <label className="mt-4 block text-sm text-white/80">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="you@example.com"
          />

          <label className="mt-4 block text-sm text-white/80">Message</label>
          <textarea
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Write your message..."
          />

          {error && (
            <p className="mt-3 text-red-400 text-sm font-medium">{error}</p>
          )}

          <button className="mt-5 w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(0,200,255,.35)] hover:scale-[1.02] active:scale-95 transition">
            Send Message
          </button>

          {sent && (
            <p className="mt-3 text-center text-emerald-300 font-medium">
              ✅ Your message has been{" "}
              <span className="font-bold">simulated as sent</span>! (Backend not
              integrated)
            </p>
          )}
        </form>

        {/* Quick Links */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
          <h3 className="text-white text-2xl font-bold mb-6">Quick Links</h3>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-fuchsia-500/10 to-cyan-400/10 hover:scale-[1.02] transition-transform">
              📧{" "}
              <a
                href="mailto:fatimabutt2k23@gmail.com"
                className="text-white hover:text-white/80 transition"
              >
                fatimabutt2k23@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-fuchsia-500/10 to-cyan-400/10">
              📍 Lahore, Pakistan
            </li>
            <li className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-fuchsia-500/10 to-cyan-400/10">
              🔗{" "}
              <a
                href="https://www.linkedin.com/in/fatima-shahzad-bb31a529b/"
                target="_blank"
                className="text-white hover:text-white/80 transition"
              >
                LinkedIn
              </a>
            </li>
            <li className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-fuchsia-500/10 to-cyan-400/10">
              💻{" "}
              <a
                href="https://github.com/Fatimabutt786"
                target="_blank"
                className="text-white hover:text-white/80 transition"
              >
                GitHub
              </a>
            </li>
            <li className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-fuchsia-500/10 to-cyan-400/10">
              📄{" "}
              <a
                href="/images/Fatima Butt.pdf"
                target="_blank"
                className="text-white hover:text-white/80 transition"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      </div>
    </PageContainer>
  );
}


/*********************************
  Router + App Shell
**********************************/
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen text-white selection:bg-fuchsia-500/30 selection:text-fuchsia-50">
      <AuroraBackground />
      <Router>
        <ScrollToTop />
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </Router>
    </div>
  );
}
