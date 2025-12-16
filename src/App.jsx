import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Moon, Sun, Home, Briefcase, MapPin, User, Send } from 'lucide-react';

// ==================== CONSTANTS ====================
const PROFILE = {
  name: "Parag Sharma",
  role: "Full Stack Developer & AI Engineer",
  tagline: "Engineering intelligence with pixel-perfect precision.",
  bio: "Final year B.Tech CSE student and President of Google Developer Groups (GDG) on Campus. I bridge the gap between complex AI logic and intuitive user experiences. Winner of Ideathon Taiwan 2025. Passionate about Anime, Content Creation, and Building Scalable Systems.",
  email: "sharmaparag2004@gmail.com",
  location: "India",
};

const SOCIALS = [
  { name: "GitHub", url: "https://github.com/p09s", icon: Github },
  { name: "LinkedIn", url: "https://linkedin.com/in/p09s", icon: Linkedin },
  { name: "Email", url: "mailto:sharmaparag2004@gmail.com", icon: Mail },
];

const EXPERIENCES = [
  {
    company: "Google Developer Groups (GDG) on Campus",
    role: "President",
    period: "Sept 2024 - Present",
    description: "Leading 30+ developers to build SD+AI projects. Organized tech workshops for 1000+ participants. Established Git-based workflows and Agile practices."
  },
  {
    company: "TriColor Initiatives Pvt. Ltd.",
    role: "Salesforce Intern",
    period: "May 2024 - Jun 2024",
    description: "Developed AI-powered customer insights dashboards and automated CRM flows using Apex and Lightning Components."
  }
];

const PROJECTS = [
  {
    title: "Silent Voice",
    category: "AI & Computer Vision",
    description: "AI-powered sign language translation system using computer vision and speech synthesis. Winner, Ideathon Taiwan 2025.",
    stats: "25% Latency Reduction",
    tech: ["OpenCV", "TensorFlow", "Flutter"],
    featured: true
  },
  {
    title: "Orbcura",
    category: "Accessibility",
    description: "Accessibility app for visually impaired users with AI image detection and intuitive 4-corner UPI transactions.",
    stats: "INNO-vation Nominee",
    tech: ["Flutter", "Firebase", "AI"],
    featured: true
  },
  {
    title: "Aqua Watch",
    category: "Disaster Mgmt",
    description: "Flood-alert system using geolocation APIs and community-sourced warnings. SIH Finalist.",
    stats: "< 2s Update Time",
    tech: ["REST API", "Geolocation", "React"],
    featured: false
  },
  {
    title: "HerSphere",
    category: "HealthTech",
    description: "Pregnancy health companion with ML-based trimester recommendations.",
    stats: "98% Uptime",
    tech: ["Python", "Analytics", "Firebase"],
    featured: false
  }
];

// ==================== HOOKS ====================
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return [theme, toggleTheme];
};

const useLiveTime = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

// ==================== THEME TOGGLE ====================
const ThemeToggle = ({ theme, toggleTheme }) => (
  <motion.button
    onClick={toggleTheme}
    className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-gray-300 dark:border-white/10"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      initial={false}
      animate={{ rotate: theme === 'dark' ? 0 : 180 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {theme === 'dark' ? <Moon className="w-5 h-5 text-white" /> : <Sun className="w-5 h-5 text-gray-900" />}
    </motion.div>
  </motion.button>
);

// ==================== NAVBAR (DOCK) ====================
const Navbar = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'hero', icon: Home, label: 'Home' },
    { id: 'work', icon: Briefcase, label: 'Work' },
    { id: 'journey', icon: MapPin, label: 'Journey' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'contact', icon: Send, label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-full bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-gray-300 dark:border-white/10 shadow-2xl"
    >
      <div className="flex items-center gap-2">
        {navItems.map(({ id, icon: Icon, label }) => (
          <motion.button
            key={id}
            onClick={() => {
              setActiveSection(id);
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`p-3 rounded-xl transition-colors ${
              activeSection === id ? 'bg-gray-200 dark:bg-white/20' : 'hover:bg-gray-100 dark:hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.2, y: -8 }}
            whileTap={{ scale: 0.95 }}
            title={label}
          >
            <Icon className="w-5 h-5 text-gray-900 dark:text-gray-200" strokeWidth={1.5} />
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

// ==================== HERO ====================
const Hero = () => {
  const time = useLiveTime();

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-7xl md:text-9xl font-bold tracking-tight mb-4 uppercase bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent leading-tight"
            style={{ textShadow: '0 0 80px rgba(255,255,255,0.1)' }}
          >
            {PROFILE.name}
          </motion.h1>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-2xl md:text-4xl font-light text-gray-600 dark:text-gray-500 mb-8"
          >
            {PROFILE.role}
          </motion.h2>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex items-center justify-center gap-4 text-sm font-mono text-gray-600 dark:text-gray-600"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Open to Work
            </span>
            <span>•</span>
            <span>{PROFILE.location}</span>
            <span>•</span>
            <span>{time}</span>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex justify-center gap-4 mt-12"
          >
            {SOCIALS.map(({ name, url, icon: Icon }) => (
              <motion.a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5 text-gray-900 dark:text-white" strokeWidth={1.5} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ==================== WORK (BENTO GRID) ====================
const Work = () => (
  <section id="work" className="min-h-screen py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-bold mb-16 tracking-tight"
      >
        Selected Work
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`group relative p-8 rounded-3xl bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 transition-all overflow-hidden ${
              project.featured ? 'md:col-span-2' : ''
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{project.title}</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-gray-200 dark:bg-white/10 text-xs font-mono text-gray-900 dark:text-white">{project.stats}</span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map(tech => (
                  <span key={tech} className="px-3 py-1 rounded-full bg-gray-200 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ==================== JOURNEY (TIMELINE) ====================
const Journey = () => (
  <section id="journey" className="min-h-screen py-32 px-6">
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-bold mb-16 tracking-tight"
      >
        Journey
      </motion.h2>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gray-400 dark:from-white/20 via-gray-300 dark:via-white/10 to-transparent" />

        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="relative pl-12 pb-16 last:pb-0"
          >
            <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-gray-900 dark:bg-white shadow-lg shadow-gray-900/50 dark:shadow-white/50" />
            
            <div className="text-sm text-gray-500 dark:text-gray-500 mb-2">{exp.period}</div>
            <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{exp.role}</h3>
            <div className="text-gray-600 dark:text-gray-400 mb-4">{exp.company}</div>
            <p className="text-gray-600 dark:text-gray-500 leading-relaxed">{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ==================== ABOUT ====================
const About = () => (
  <section id="about" className="min-h-screen py-32 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-bold mb-16 tracking-tight"
      >
        About
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            {PROFILE.bio}
          </p>
          <p className="text-gray-600 dark:text-gray-500 leading-relaxed">
            Beyond code, I explore creative pursuits through my YouTube channel <span className="text-gray-900 dark:text-white font-semibold">DAEMON</span>, 
            where I merge tech insights with anime culture. I believe the best interfaces are invisible—technology 
            should feel like magic, not machinery.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-square rounded-3xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 border border-gray-200 dark:border-white/10 overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-20 dark:opacity-10">
            👨‍💻
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// ==================== CONTACT ====================
const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="min-h-screen py-32 px-6 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight text-gray-900 dark:text-white">
            Let's Create<br />Something Amazing
          </h2>

          <motion.button
            onClick={copyEmail}
            className="group relative px-12 py-6 text-2xl font-bold rounded-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {PROFILE.email}
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: -50 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 top-0 px-4 py-2 bg-green-500 text-white text-sm rounded-lg whitespace-nowrap"
                >
                  Copied!
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <div className="flex justify-center gap-6 mt-12">
            {SOCIALS.map(({ name, url, icon: Icon }) => (
              <motion.a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, y: -4 }}
              >
                <Icon className="w-6 h-6" strokeWidth={1.5} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ==================== MAIN APP ====================
export default function App() {
  const [theme, setTheme] = useTheme();
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    ['hero', 'work', 'journey', 'about', 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-[#F5F5F7] transition-colors duration-500 overflow-x-hidden">
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <Hero />
      <Work />
      <Journey />
      <About />
      <Contact />

      <footer className="py-8 text-center text-sm text-gray-600 dark:text-gray-700 border-t border-white/5">
        <p>© 2025 Parag Sharma. Crafted with precision.</p>
      </footer>
    </div>
  );
}