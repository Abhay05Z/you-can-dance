import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import barba from "@barba/core";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import {
  ArrowDown,
  Building2,
  MessageCircle,
  CalendarCheck,
  CalendarDays,
  Clock3,
  CreditCard,
  Film,
  Gift,
  Home,
  Instagram,
  Mail,
  Menu,
  MapPin,
  Music2,
  Palette,
  Phone,
  PlayCircle,
  Sparkles,
  Star,
  UserRound,
  Users,
  X
} from "lucide-react";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const routes = ["home", "about", "classes", "team", "studio", "events", "contact", "dashboard"];
const themes = [
  { id: "royal", label: "Royal", swatch: "#d4af37" },
  { id: "electric", label: "Electric", swatch: "#00e5ff" },
  { id: "velvet", label: "Velvet", swatch: "#ff4fa3" },
  { id: "mint", label: "Mint", swatch: "#9be46d" },
  { id: "black", label: "Black", swatch: "#e5e5e5" }
];

const classes = [
  {
    title: "Classical & Semi-Classical",
    image: "/images/classical.jpg",
    preview: "/videos/class1.mp4",
    text: "Grace, discipline, abhinaya and expressive storytelling shaped for stage confidence.",
    detail: "Technique, mudras, posture, expressions, stage blocking and semi-classical choreography.",
    level: "Beginner"
  },
  {
    title: "Bollywood & Commercial",
    image: "/images/bollywood.jpg",
    preview: "/videos/class2.mp4",
    text: "High-energy choreography, screen-ready presence and rhythm that fills the room.",
    detail: "Filmi expression, hook-step performance, commercial grooves and camera-friendly movement.",
    level: "All"
  },
  {
    title: "Contemporary",
    image: "/images/contemporary.jpg",
    preview: "/videos/studio.mp4",
    text: "Fluid movement, floor work and emotional phrasing for dancers who want depth.",
    detail: "Release technique, flow, lifts, partner work, musical phrasing and expressive improvisation.",
    level: "Intermediate"
  },
  {
    title: "Hip-Hop",
    image: "/images/hiphop.jpg",
    preview: "/videos/cta.mp4",
    text: "Grooves, foundations, musicality and battle-ready performance drills.",
    detail: "Foundations, isolations, grooves, freestyle prompts, stamina and choreography retention.",
    level: "Advanced"
  },
  {
    title: "Fitness Training",
    image: "/images/fitness.jpg",
    preview: "/videos/class1.mp4",
    text: "Dance-led conditioning, stamina, mobility and strength with infectious momentum.",
    detail: "Cardio choreography, strength circuits, mobility, endurance and body confidence.",
    level: "Beginner"
  }
];

const team = [
  {
    name: "Nimisha",
    role: "PR Manager & Head Instructor",
    image: "https://source.unsplash.com/800x1000/?dance,coach,woman&sig=11",
    bio: "Builds confident artists through precise training, warmth and performance polish.",
    reel: "/videos/class1.mp4"
  },
  {
    name: "Anusree & Tansuree",
    role: "Tollywood",
    image: "https://source.unsplash.com/800x1000/?dance,teacher,women&sig=12",
    bio: "Bring expressive Tollywood styling, camera presence and joyful stage vocabulary.",
    reel: "/videos/class2.mp4"
  },
  {
    name: "Dinesh",
    role: "Hip-Hop",
    image: "https://source.unsplash.com/800x1000/?hiphop,instructor,man&sig=13",
    bio: "Leads foundations, grooves and choreography with athletic clarity.",
    reel: "/videos/studio.mp4"
  },
  {
    name: "Madhuri",
    role: "Bollywood & Fitness",
    image: "https://source.unsplash.com/800x1000/?fitness,dance,coach,woman&sig=14",
    bio: "Combines fitness intensity with filmi expression for magnetic group sessions.",
    reel: "/videos/cta.mp4"
  }
];

const events = [
  ["Signature Workshops", "Weekend intensives for choreography, technique and performance confidence."],
  ["Corporate Sessions", "Team-building dance experiences tailored for energy, rhythm and connection."],
  ["Creative Collaborations", "Shoots, showcases and artist-led projects that move beyond the studio."]
];

const timetable = [
  ["Monday", "Classical Basics", "6:00 PM - 7:00 PM", "Beginner"],
  ["Tuesday", "Hip-Hop Foundation", "6:30 PM - 7:30 PM", "Intermediate"],
  ["Wednesday", "Bollywood Choreo", "7:00 PM - 8:00 PM", "All Levels"],
  ["Thursday", "Contemporary Flow", "6:00 PM - 7:00 PM", "Intermediate"],
  ["Friday", "Fitness Dance", "7:00 PM - 8:00 PM", "Beginner"],
  ["Saturday", "Performance Lab", "5:00 PM - 7:00 PM", "Advanced"]
];

const testimonials = [
  ["Aarohi", "I joined for fitness and now I perform on stage confidently."],
  ["Ritwik", "Best choreography coaching and very supportive instructors."],
  ["Neha", "The studio energy is premium and the training quality is serious."],
  ["Soham", "My stamina and stage confidence improved within the first month."],
  ["Pooja", "Every class feels focused, premium and genuinely motivating."]
];

const stories = [
  ["From shy to stage-ready", "A beginner batch student now leads group performances in showcases."],
  ["Weight loss and confidence", "A fitness learner lost 9kg and moved into Bollywood performance class."],
  ["College fest winner", "One of our teens trained 4 months and won inter-college solo dance."]
];

const paymentPlans = [
  ["Starter", "2 classes/week", "₹2,500 / month"],
  ["Performer", "4 classes/week", "₹4,500 / month"],
  ["Pro Unlimited", "Unlimited batches", "₹6,900 / month"]
];

const galleryItems = [
  { category: "Class", src: "/images/classical.jpg" },
  { category: "Class", src: "/images/bollywood.jpg" },
  { category: "Team", src: "/images/team1.jpg" },
  { category: "Team", src: "/images/team2.jpg" },
  { category: "Studio", src: "/images/studio1.jpg" },
  { category: "Studio", src: "/images/studio2.jpg" }
];

const translations = {
  en: {
    premium: "Premium dance studio",
    heroLine: "Where Passion Meets Expression",
    call: "Call Us Now",
    whatsapp: "WhatsApp",
    book: "Book Trial"
  },
  hi: {
    premium: "Premium dance studio",
    heroLine: "Jahan Junoon Banta Hai Expression",
    call: "Call Us Now",
    whatsapp: "WhatsApp",
    book: "Book Trial"
  }
};

const randomThings = [
  ["Daily practice prompts", "5-minute warmup + 5-minute groove drill for home practice."],
  ["Studio culture", "Respect, discipline, consistency and confidence in every batch."],
  ["Performance prep", "Camera presence, formation awareness and stage confidence."],
  ["Weekend vibe", "Open practice jams, freestyle circles and feedback drills."]
];

function getRouteFromHash() {
  const clean = window.location.hash.replace(/^#\/?/, "") || "home";
  return routes.includes(clean) ? clean : "home";
}

function useRoute() {
  const [route, setRoute] = useState(getRouteFromHash);

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("ycd-theme") || "royal");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ycd-theme", theme);
  }, [theme]);

  return [theme, setTheme];
}

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}

function useBarba() {
  useEffect(() => {
    barba.init({
      preventRunning: true,
      transitions: [
        {
          name: "cinematic-fade",
          once({ next }) {
            gsap.from(next.container, { opacity: 0, y: 28, duration: 0.8, ease: "power3.out" });
          },
          leave({ current }) {
            return gsap.to(current.container, { opacity: 0, y: -24, duration: 0.45, ease: "power2.inOut" });
          },
          enter({ next }) {
            return gsap.from(next.container, { opacity: 0, y: 24, duration: 0.65, ease: "power3.out" });
          }
        }
      ]
    });
    return () => barba.destroy();
  }, []);
}

function ParticleField() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const count = 900;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.024,
      transparent: true,
      opacity: 0.66,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let pointerX = 0;
    let pointerY = 0;
    const onMove = (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 0.8;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 0.5;
    };
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", onResize);

    let frame;
    const animate = () => {
      const particle = getComputedStyle(document.documentElement).getPropertyValue("--particle").trim() || "#d4af37";
      material.color.set(particle);
      particles.rotation.y += 0.0018;
      particles.rotation.x += 0.0008;
      camera.position.x += (pointerX - camera.position.x) * 0.035;
      camera.position.y += (-pointerY - camera.position.y) * 0.035;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="particle-field" ref={mountRef} aria-hidden="true" />;
}

function ThemeSwitcher({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  return (
    <aside className="theme-dock" aria-label="Theme switcher">
      <button className="theme-toggle" onClick={() => setOpen((prev) => !prev)} aria-label="Toggle theme panel">
        <Palette size={18} />
      </button>
      <div className={open ? "theme-options open" : "theme-options"}>
        {themes.map((item) => (
          <button
            className={theme === item.id ? "theme-chip active" : "theme-chip"}
            key={item.id}
            onClick={() => {
              setTheme(item.id);
              setOpen(false);
            }}
            style={{ "--chip": item.swatch }}
            aria-label={`Use ${item.label} theme`}
            title={item.label}
          >
            <span />
          </button>
        ))}
      </div>
    </aside>
  );
}

function Nav({ route }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["home", "Home", Home],
    ["about", "About", Sparkles],
    ["classes", "Classes", Music2],
    ["team", "Team", UserRound],
    ["studio", "Studio", Building2],
    ["events", "Events", CalendarCheck],
    ["contact", "Contact", Mail],
    ["dashboard", "Dashboard", CalendarDays]
  ];

  useEffect(() => {
    setOpen(false);
  }, [route]);

  return (
    <nav className="nav">
      <a href="#/home" className="brand">You Can Dance</a>
      <div className="nav-links">
        {links.map(([id, label, Icon]) => (
          <a href={`#/${id}`} className={route === id ? "active" : ""} key={id}>
            <Icon size={15} />
            {label}
          </a>
        ))}
      </div>
      <button className="menu-toggle" onClick={() => setOpen((prev) => !prev)} aria-label="Toggle menu">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <div className={open ? "mobile-menu open" : "mobile-menu"}>
        {links.map(([id, label, Icon]) => (
          <a href={`#/${id}`} className={route === id ? "active" : ""} key={`mobile-${id}`}>
            <Icon size={15} />
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function PageShell({ route, eyebrow, title, subtitle, children }) {
  const words = title.split(" ");

  return (
    <main className={`page page-${route}`} data-barba="container" data-barba-namespace={route}>
      <section className="page-hero">
        <video className="hero-video hero-video-sub" src="/videos/hero.mp4" autoPlay muted loop playsInline preload="metadata" />
        <div className="hero-overlay" />
        <ParticleField />
        <div className="hero-content compact">
          <p className="eyebrow hero-meta"><Sparkles size={16} /> {eyebrow}</p>
          <h1>
            {words.map((word) => (
              <span className="word-mask" key={`${route}-${word}`}>
                <span className="hero-word">{word}</span>
              </span>
            ))}
          </h1>
          <p className="hero-copy">{subtitle}</p>
        </div>
      </section>
      <section className="section vibe-strip">
        <div className="vibe-grid">
          {randomThings.map(([head, text]) => (
            <article className="vibe-card reveal" key={`${route}-${head}`}>
              <h3>{head}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      {children}
    </main>
  );
}

function ClassCard({ item, onOpenVideo }) {
  const message = encodeURIComponent(`Hi You Can Dance, I want details for ${item.title}.`);
  return (
    <article
      className="class-card"
      onClick={() => onOpenVideo(item.preview)}
      onMouseEnter={(event) => event.currentTarget.querySelector("video")?.play()}
      onMouseLeave={(event) => {
        const video = event.currentTarget.querySelector("video");
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      }}
    >
      <video src={item.preview} muted loop playsInline preload="auto" />
      <div className="card-shade" />
      <div className="class-content">
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <span className="text-link">Play video with sound</span>
        <a className="text-link" href={`https://wa.me/919999999999?text=${message}`} target="_blank" rel="noreferrer">WhatsApp this class</a>
      </div>
    </article>
  );
}

function HomePage({ t }) {
  const titleWords = ["You", "Can", "Dance"];

  return (
    <main className="page page-home" data-barba="container" data-barba-namespace="home">
      <section className="hero" id="home">
        <video className="hero-video" src="/videos/hero.mp4" autoPlay muted loop playsInline preload="metadata" />
        <div className="hero-overlay" />
        <ParticleField />
        <div className="hero-content">
          <p className="eyebrow hero-meta"><Sparkles size={16} /> {t.premium}</p>
          <h1>
            {titleWords.map((word) => (
              <span className="word-mask" key={word}>
                <span className="hero-word">{word}</span>
              </span>
            ))}
          </h1>
          <p className="hero-copy">{t.heroLine}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="tel:+919999999999">{t.call}</a>
            <a className="btn btn-ghost" href="https://wa.me/919999999999" target="_blank" rel="noreferrer">{t.whatsapp}</a>
            <a className="btn btn-ghost" href="#/classes">{t.book}</a>
          </div>
        </div>
        <a href="#/about" className="scroll-indicator" aria-label="Open about page">
          <span className="scroll-dot" />
          <ArrowDown size={18} />
        </a>
      </section>
      <AboutSection />
      <ClassesSection />
      <TeamSection />
      <StudioSection />
      <EventsSection />
      <TestimonialsSection />
      <StoriesSection />
      <PaymentPlansSection />
      <TrialBookingSection />
      <CtaSection />
    </main>
  );
}

function AboutSection() {
  return (
    <section className="section about" id="about">
      <div className="section-kicker reveal">About the studio</div>
      <div className="about-grid">
        <div className="about-copy">
          <h2>
            <span className="line-wrap"><span className="split-line">A studio built for</span></span>
            <span className="line-wrap"><span className="split-line">expression, courage</span></span>
            <span className="line-wrap"><span className="split-line">and stage presence.</span></span>
          </h2>
          <p className="reveal">
            You Can Dance was created for students who want more than routines. Every session blends technique,
            performance psychology, musicality and the pure joy of movement.
          </p>
          <p className="reveal">
            Founded by artists who believe dance can change how people carry themselves, the studio nurtures
            discipline without losing warmth.
          </p>
          <blockquote className="reveal">"We don't just teach steps-we nurture artists."</blockquote>
        </div>
        <figure className="about-image reveal">
          <img src="/images/about.jpg" alt="You Can Dance studio performer" loading="lazy" />
        </figure>
      </div>
    </section>
  );
}

function ClassesSection() {
  const [level, setLevel] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState("");
  const filtered = classes.filter((item) => level === "All" || item.level === level || item.level === "All");

  return (
    <section className="section classes" id="classes">
      <div className="section-heading reveal">
        <p className="section-kicker">Classes</p>
        <h2>Choose your rhythm.</h2>
      </div>
      <div className="difficulty-filter reveal">
        {["All", "Beginner", "Intermediate", "Advanced"].map((item) => (
          <button
            key={item}
            className={item === level ? "chip active" : "chip"}
            onClick={() => setLevel(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="classes-grid">
        {filtered.map((item) => <ClassCard item={item} onOpenVideo={setSelectedVideo} key={item.title} />)}
      </div>
      {selectedVideo && (
        <div className="video-modal" onClick={() => setSelectedVideo("")}>
          <div className="video-modal-inner" onClick={(event) => event.stopPropagation()}>
            <button className="video-close" onClick={() => setSelectedVideo("")} aria-label="Close video">Close</button>
            <video src={selectedVideo} controls autoPlay playsInline preload="auto" />
          </div>
        </div>
      )}
    </section>
  );
}

function TeamSection() {
  return (
    <section className="section team" id="team">
      <div className="section-heading reveal">
        <p className="section-kicker">Team</p>
        <h2>Mentors with performance in their bones.</h2>
      </div>
      <div className="team-grid">
        {team.map((member) => (
          <article className="team-card" key={member.name}>
            <img src={member.image} alt={member.name} loading="lazy" />
            <div className="team-info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
            <div className="team-bio">
              <p>{member.bio}</p>
              <a className="text-link" href={member.reel} target="_blank" rel="noreferrer">Watch Reel</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StudioSection() {
  return (
    <section className="studio-experience" id="studio">
      <div className="studio-intro">
        <p className="section-kicker">Studio experience</p>
        <h2>Mirrors, space and training energy that feels cinematic.</h2>
      </div>
      <div className="studio-track">
        {[
          ["Mirrors", "/images/studio1.jpg"],
          ["Spacious hall", "/images/studio2.jpg"],
          ["Training environment", "/images/studio3.jpg"]
        ].map(([label, image]) => (
          <figure className="studio-panel" key={label}>
            <img src={image} alt={label} loading="lazy" />
            <figcaption>{label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function EventsSection() {
  return (
    <section className="section events" id="events">
      <div className="section-heading reveal">
        <p className="section-kicker">Workshops / Events</p>
        <h2>More ways to move together.</h2>
      </div>
      <div className="events-grid">
        {events.map(([title, text]) => (
          <article className="event-card" key={title}>
            <CalendarCheck size={24} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="cta" id="cta">
      <div className="cta-overlay" />
      <div className="cta-content reveal">
        <p className="section-kicker">Your first beat starts here</p>
        <h2>Start Your Dance Journey Today</h2>
        <div className="hero-actions">
          <a className="btn btn-primary pulse" href="tel:+919999999999">Call Us Now</a>
          <a className="btn btn-ghost" href="https://wa.me/919999999999" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

function TrialBookingSection() {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    localStorage.setItem("ycd-trial-booking", JSON.stringify(data));
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <section className="section feature-grid">
      <article className="contact-panel reveal">
        <h2>Book Trial Class</h2>
        <form className="stack-form" onSubmit={onSubmit}>
          <input name="name" placeholder="Your Name" required />
          <select name="style" defaultValue="" required>
            <option value="" disabled>Select dance style</option>
            {classes.map((item) => <option key={item.title} value={item.title}>{item.title}</option>)}
          </select>
          <select name="slot" defaultValue="" required>
            <option value="" disabled>Select slot</option>
            {timetable.map((row) => <option key={row[0] + row[2]} value={`${row[0]} ${row[2]}`}>{row[0]} {row[2]}</option>)}
          </select>
          <button className="btn btn-primary" type="submit">Confirm Trial</button>
        </form>
        {submitted && <p className="status">Trial request saved. Our team will contact you shortly.</p>}
      </article>
      <article className="event-card reveal">
        <Clock3 size={24} />
        <h3>Weekly Timetable</h3>
        <div className="table-list">
          {timetable.map((row) => (
            <p key={row[0] + row[1]}><strong>{row[0]}</strong> {row[1]} - {row[2]} ({row[3]})</p>
          ))}
        </div>
      </article>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="section">
      <div className="section-heading reveal">
        <p className="section-kicker">Testimonials</p>
        <h2>Students who transformed with us.</h2>
      </div>
      <div className="testimonial-list">
        {testimonials.map(([name, text]) => (
          <article className="event-card reveal testimonial" key={name}>
            <Star size={24} />
            <h3>{name}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StoriesSection() {
  return (
    <section className="section story-grid">
      {stories.map(([title, text]) => (
        <article className="event-card reveal" key={title}>
          <Film size={24} />
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </section>
  );
}

function PaymentPlansSection() {
  return (
    <section className="section">
      <div className="section-heading reveal">
        <p className="section-kicker">Plans & Payments</p>
        <h2>Simple plans for every dancer.</h2>
      </div>
      <div className="events-grid">
        {paymentPlans.map(([name, details, price]) => (
          <article className="event-card reveal" key={name}>
            <CreditCard size={24} />
            <h3>{name}</h3>
            <p>{details}</p>
            <p><strong>{price}</strong></p>
            <a className="btn btn-ghost" href="#/contact">Pay Now</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function GallerySection() {
  const [filter, setFilter] = useState("All");
  const visible = galleryItems.filter((item) => filter === "All" || item.category === filter);
  return (
    <section className="section">
      <div className="section-heading reveal">
        <p className="section-kicker">Gallery</p>
        <h2>Studio moments.</h2>
      </div>
      <div className="difficulty-filter reveal">
        {["All", "Class", "Team", "Studio"].map((item) => (
          <button key={item} className={item === filter ? "chip active" : "chip"} onClick={() => setFilter(item)}>{item}</button>
        ))}
      </div>
      <div className="gallery-grid">
        {visible.map((item, idx) => (
          <img key={item.src + idx} src={item.src} alt={item.category} loading="lazy" />
        ))}
      </div>
    </section>
  );
}

function EventRegistrationSection() {
  const [done, setDone] = useState(false);
  const onSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    localStorage.setItem("ycd-event-registration", JSON.stringify(data));
    setDone(true);
    event.currentTarget.reset();
  };
  return (
    <section className="section feature-grid">
      <article className="contact-panel reveal">
        <h2>Event Registration</h2>
        <form className="stack-form" onSubmit={onSubmit}>
          <input name="name" placeholder="Your Name" required />
          <select name="event" defaultValue="" required>
            <option value="" disabled>Select event</option>
            {events.map(([title]) => <option key={title} value={title}>{title}</option>)}
          </select>
          <input name="phone" placeholder="Phone Number" required />
          <button className="btn btn-primary" type="submit">Register</button>
        </form>
        {done && <p className="status">Event registration saved successfully.</p>}
      </article>
      <article className="event-card reveal">
        <CalendarDays size={24} />
        <h3>Upcoming Sessions</h3>
        <p>Workshops, corporate events and collaborations happen every month. Register early for priority access.</p>
      </article>
    </section>
  );
}

function PrivateSessionSection() {
  const [done, setDone] = useState(false);
  const onSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    localStorage.setItem("ycd-private-session", JSON.stringify(data));
    setDone(true);
    event.currentTarget.reset();
  };
  return (
    <section className="section feature-grid">
      <article className="contact-panel reveal">
        <h2>Book Private Session</h2>
        <form className="stack-form" onSubmit={onSubmit}>
          <input name="name" placeholder="Your Name" required />
          <select name="goal" defaultValue="" required>
            <option value="" disabled>Session goal</option>
            <option value="Wedding choreography">Wedding choreography</option>
            <option value="Competition prep">Competition prep</option>
            <option value="Fitness">Fitness</option>
          </select>
          <input name="preferred_time" placeholder="Preferred time" required />
          <button className="btn btn-primary" type="submit">Book Private Session</button>
        </form>
        {done && <p className="status">Private session request saved.</p>}
      </article>
      <article className="event-card reveal">
        <PlayCircle size={24} />
        <h3>Instructor 1:1</h3>
        <p>Personalized corrections, focused choreography and quick confidence growth in every one-on-one session.</p>
      </article>
    </section>
  );
}

function ReferralSection() {
  const code = "YCD" + Math.floor(1000 + Math.random() * 9000);
  return (
    <section className="section">
      <article className="event-card reveal">
        <Gift size={24} />
        <h3>Referral Rewards</h3>
        <p>Invite a friend and get discounted sessions when they join. Your referral code:</p>
        <p><strong>{code}</strong></p>
      </article>
    </section>
  );
}

function StudioTourSection() {
  return (
    <section className="section feature-grid">
      <article className="event-card reveal tour-copy">
        <h3>360 Studio Tour</h3>
        <p>Explore the training floor, mirrors and practice setup in detail.</p>
        <p>The studio is designed for strong visibility, correction-friendly angles and comfortable spacing.</p>
        <p>Every corner supports technique work, choreography retention and performance confidence.</p>
        <p>Best for: regular classes, private sessions, and rehearsal before events.</p>
      </article>
      <article className="about-image reveal">
        <video src="/videos/studio.mp4" controls loop playsInline preload="metadata" />
      </article>
    </section>
  );
}

function AboutPage() {
  return (
    <PageShell route="about" eyebrow="Founder story" title="About You Can Dance" subtitle="A premium training space for courage, culture and expression.">
      <AboutSection />
      <section className="section story-grid">
        {["Begin with confidence", "Train with discipline", "Perform with soul"].map((title, index) => (
          <article className="event-card reveal" key={title}>
            <Sparkles size={24} />
            <h3>{title}</h3>
            <p>{["Beginner-friendly batches, careful corrections and a studio culture where every student is seen.", "Technique, stamina, musicality and stage presence are trained as one complete craft.", "Each dancer is guided to discover emotion, identity and presence inside movement."][index]}</p>
          </article>
        ))}
      </section>
      <CtaSection />
    </PageShell>
  );
}

function ClassesPage() {
  return (
    <PageShell route="classes" eyebrow="Training menu" title="Dance Classes" subtitle="Pick the style that matches your fire, then let the studio sharpen it.">
      <ClassesSection />
      <PaymentPlansSection />
      <section className="section syllabus-grid">
        {classes.map((item) => (
          <article className="detail-card reveal" key={item.title}>
            <img src={item.image} alt={item.title} loading="lazy" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <a className="text-link" href="#/contact">Book this class</a>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}

function TeamPage() {
  return (
    <PageShell route="team" eyebrow="Instructors" title="Meet The Team" subtitle="Artists, coaches and mentors who know how to turn practice into presence.">
      <TeamSection />
      <TestimonialsSection />
      <section className="section manifesto reveal">
        <h2>Every instructor teaches technique, confidence and the courage to be watched.</h2>
      </section>
    </PageShell>
  );
}

function StudioPage() {
  return (
    <PageShell route="studio" eyebrow="Inside the studio" title="Studio Experience" subtitle="Mirrors, movement, lights and the focused energy of a serious dance room.">
      <StudioSection />
      <StudioTourSection />
      <GallerySection />
      <section className="section events-grid">
        {["Mirror-led correction", "Spacious movement floor", "Performance environment"].map((title) => (
          <article className="event-card reveal" key={title}>
            <Building2 size={24} />
            <h3>{title}</h3>
            <p>Designed for repetition, correction and cinematic practice moments that make students want to stay longer.</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}

function EventsPage() {
  return (
    <PageShell route="events" eyebrow="Workshops" title="Events Workshops" subtitle="Special sessions for students, corporates and creative collaborators.">
      <EventsSection />
      <EventRegistrationSection />
      <section className="section timeline">
        {events.map(([title, text], index) => (
          <article className="timeline-item reveal" key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell route="contact" eyebrow="Join now" title="Start Your Dance Journey" subtitle="Book a trial, ask about batches, or begin with a workshop.">
      <TrialBookingSection />
      <PrivateSessionSection />
      <ReferralSection />
      <section className="section contact-layout">
        <article className="contact-panel reveal">
          <h2>Book a Trial</h2>
          <p>Tell us your dance style, current level and preferred batch time. We will help you start with the right class.</p>
          <div className="hero-actions">
            <a className="btn btn-primary pulse" href="tel:+919999999999">Call Now</a>
            <a className="btn btn-ghost" href="https://wa.me/919999999999" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </article>
        <article className="contact-panel reveal">
          <h2>Studio Details</h2>
          <p><Phone size={18} /> +91 99999 99999</p>
          <p><Mail size={18} /> hello@youcandance.studio</p>
          <p><MapPin size={18} /> Dance studio, India</p>
        </article>
      </section>
    </PageShell>
  );
}

function DashboardPage() {
  const trial = JSON.parse(localStorage.getItem("ycd-trial-booking") || "{}");
  const privateSession = JSON.parse(localStorage.getItem("ycd-private-session") || "{}");
  const eventReg = JSON.parse(localStorage.getItem("ycd-event-registration") || "{}");
  return (
    <PageShell route="dashboard" eyebrow="Student Dashboard" title="Progress Dashboard" subtitle="Track attendance, growth and next bookings in one place.">
      <section className="section events-grid">
        <article className="event-card reveal">
          <h3>Attendance</h3>
          <p>Current month: <strong>82%</strong></p>
        </article>
        <article className="event-card reveal">
          <h3>Performance Score</h3>
          <p>Technique: <strong>78%</strong> | Expression: <strong>84%</strong></p>
        </article>
        <article className="event-card reveal">
          <h3>Next Class</h3>
          <p>{trial.slot || "No trial slot booked yet"}</p>
        </article>
      </section>
      <section className="section feature-grid">
        <article className="event-card reveal">
          <h3>Latest Event Registration</h3>
          <p>{eventReg.event || "No event registered yet"}</p>
        </article>
        <article className="event-card reveal">
          <h3>Private Session Goal</h3>
          <p>{privateSession.goal || "No private session requested yet"}</p>
        </article>
      </section>
    </PageShell>
  );
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div>
        <h2>You Can Dance</h2>
        <p>Where Passion Meets Expression</p>
      </div>
      <div className="footer-links">
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram size={18} /> Instagram</a>
        <a href="mailto:hello@youcandance.studio"><Mail size={18} /> hello@youcandance.studio</a>
        <a href="tel:+919999999999"><Phone size={18} /> +91 99999 99999</a>
        <span><MapPin size={18} /> Dance studio, India</span>
      </div>
      <div className="footer-bottom">
        <span><Users size={16} /> Trials, workshops and private training available.</span>
        <span>© 2026 You Can Dance</span>
      </div>
    </footer>
  );
}

function App() {
  const route = useRoute();
  const [theme, setTheme] = useTheme();
  const t = translations.en;

  useLenis();
  useBarba();

  const CurrentPage = useMemo(() => ({
    home: () => <HomePage t={t} />,
    about: AboutPage,
    classes: ClassesPage,
    team: TeamPage,
    studio: StudioPage,
    events: EventsPage,
    contact: ContactPage,
    dashboard: DashboardPage
  }[route]), [route, t]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const ctx = gsap.context(() => {
      gsap.from(".hero-word", {
        yPercent: 105,
        opacity: 0,
        duration: 1.05,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.05
      });
      gsap.from(".hero-copy, .hero-actions, .hero-meta", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.42
      });
      gsap.to(".hero-video", {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero, .page-hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 28,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 94%",
            once: true
          }
        });
      });
      gsap.utils.toArray(".split-line").forEach((line, index) => {
        gsap.from(line, {
          yPercent: 105,
          duration: 0.72,
          delay: index * 0.03,
          ease: "power3.out",
          scrollTrigger: {
            trigger: line,
            start: "top 88%"
          }
        });
      });
      gsap.from(".class-card, .team-card, .event-card, .detail-card, .timeline-item, .contact-panel", {
        clearProps: "all"
      });
      gsap.utils.toArray(".class-card, .team-card, .event-card, .detail-card, .timeline-item, .contact-panel").forEach((element) => {
        gsap.from(element, {
          y: 32,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 94%",
            once: true
          }
        });
      });

      const track = document.querySelector(".studio-track");
      if (track) {
        // Keep this animation stable across devices: avoid pinned black frames.
        if (window.innerWidth >= 1200) {
          const travel = () => Math.max(-(track.scrollWidth - window.innerWidth + 48), -220);
          gsap.to(track, {
            x: travel,
            ease: "none",
            scrollTrigger: {
              trigger: ".studio-experience",
              start: "top 75%",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true
            }
          });
        } else {
          gsap.set(track, { clearProps: "transform" });
        }
        gsap.to(".studio-panel img", {
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: ".studio-experience",
            start: "top 82%",
            end: "bottom top",
            scrub: 0.5
          }
        });
      }

      if (document.querySelector(".cta-media")) {
        gsap.to(".cta-media", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: ".cta",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
      gsap.to(".scroll-dot", {
        y: 18,
        opacity: 0.3,
        repeat: -1,
        yoyo: true,
        duration: 0.9,
        ease: "power1.inOut"
      });
    });

    setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => ctx.revert();
  }, [route]);

  return (
    <>
      <Nav route={route} />
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
      <CurrentPage />
      <div className="quick-contact">
        <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="quick-btn">
          <MessageCircle size={16} /> WhatsApp
        </a>
        <a href="tel:+919999999999" className="quick-btn">
          <Phone size={16} /> Call Us Now
        </a>
      </div>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
