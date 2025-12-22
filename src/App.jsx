import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, Moon, Sun, Home, Briefcase, 
  MapPin, User, Send, Heart, Trophy, Users, Mic, Code, 
  Youtube, Play, Lightbulb, Cpu, ExternalLink, FileText,
  ArrowRight
} from 'lucide-react';

// ==================== CSS FOR HIDING SCROLLBAR ====================
const globalStyles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// ==================== CONSTANTS ====================
const PROFILE = {
  name: "Parag Sharma",
  role: "Product Engineer & Developer",
  tagline: "Engineering intelligence with pixel-perfect precision.",
  bio: "Final year B.Tech CSE student and Ex-President of Google Developer Groups (GDG) on Campus. I bridge the gap between complex AI logic and intuitive user experiences. Winner of Ideathon Taiwan 2025. Passionate about Anime, Content Creation, and Building Scalable Systems.",
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
    role: "President & Engineeing Lead",
    period: "Sept 2024 - July 2025",
    description: "Led a cross-functional team of 30+ engineers and designers to deliver 10+ production-grade web/AI projects. Directed project management workflows using Agile methodologies, ensuring on-time delivery of key milestones. Established rigorous code review protocols and Git-based version control standards across student teams. Owned end-to-end delivery of award-winning systems including Silent Voice (Ideathon Winner) and Orbcura."
  },
  {
    company: "TriColor Initiatives Pvt. Ltd.",
    role: "Software Engineer Intern (Salesforce Platform)",
    period: "May 2024 - Jun 2024",
    description: "Designed and implemented frontend interfaces and backend automation using Lightning Web Components and Apex. Improved operational efficiency by 25% by building scalable RESTful API integrations for secure data exchange. Developed analytics dashboards using Salesforce reporting and AI tools to improve data visibility for stakeholders. Collaborated on debugging, performance tuning, and production support for live CRM environments."
  }
];

const COMMUNITY_DATA = [
  {
    role: "Organizer",
    org: "GDG HACKS",
    period: "Dec 2024 - Apr 2025",
    description: "Orchestrated a national-level hackathon with 400+ participants and 150 teams. Managed logistics for an intense innovation challenge.",
    icon: Trophy,
    tags: ["Management", "Event Planning"],
  },
  {
    role: "Solution Challenge Facilitator",
    org: "Google Developer Student Clubs",
    period: "Dec 2024",
    description: "Guided student teams in building solutions for the UN Sustainable Development Goals using Google technologies.",
    icon: Lightbulb,
    tags: ["Mentorship", "UN SDGs"],
  },
  {
    role: "Student Coordinator",
    org: "GDG Hackureka",
    period: "Feb 2025",
    description: "Coordinated a 7-hour intense hackathon challenge. Successfully managed 400+ participants from across the country.",
    icon: Users,
    tags: ["Leadership", "Operations"],
  },
  {
    role: "Facilitator",
    org: "GDSC MM(DU) - GenAI",
    period: "May 2024",
    description: "Led a month-long GenAI Google Cloud program. Reviewed applications for 150 students and guided them through cloud concepts.",
    icon: Mic,
    tags: ["Mentorship", "GenAI"],
  },
  {
    role: "Co-Facilitator",
    org: "GDSC MM(DU) - Android",
    period: "Dec 2023 - Jan 2024",
    description: "Taught Android Development to 70-100 students under the 'Discover, Design and Develop' program.",
    icon: Code,
    tags: ["Teaching", "Android"],
  }
];

const PROJECTS = [
  {
    title: "LinkFluence",
    category: "Web Development & SaaS",
    description: "A collaborative marketplace bridging the gap between micro-influencers and brands. Features automated matchmaking and secure campaign management.",
    stats: "Building",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
    repo: "https://github.com/p09s/creator-brand" 
  },
  {
    title: "Orbcura",
    category: "Accessibility & AI",
    description: "Assistive app for the visually impaired featuring real-time AI image detection and voice-guided UPI payments.",
    stats: "Patent Published", 
    tech: ["Flutter", "ML Kit", "UPI API", "Firebase"],
    repo: "https://github.com/p09s/Orbcura-App" 
  },
  {
    title: "Silent Voice",
    category: "AI & Computer Vision",
    description: "AI-powered sign language translation system using computer vision and speech synthesis. Winner, Ideathon Taiwan 2025.",
    stats: "Winner, Ideathon Taiwan",
    tech: ["Python", "OpenCV", "TensorFlow", "Flutter"],
    repo: "https://github.com/p09s/SilentVoice" 
  },
  {
    title: "Aqua Watch",
    category: "Disaster Management",
    description: "Community-driven flood management system with crowd-sourced reporting and interactive risk mapping.",
    stats: "Real-time Analytics",
    tech: ["Flutter", "Google Maps API", "Firebase"],
    repo: "https://github.com/p09s/Aqua-Watch-App" 
  }
];

// ==================== THEME HOOK ====================
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
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

// ==================== COMPONENTS ====================

const SwipeHint = ({ isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="md:hidden absolute right-0 -bottom-10 z-10"
      >
        <motion.div 
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black shadow-lg"
        >
          <span className="text-xs font-bold uppercase tracking-wider">Swipe</span>
          <ArrowRight size={14} />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ThemeToggle = ({ theme, toggleTheme }) => (
  <motion.button
    onClick={toggleTheme}
    className="fixed top-6 right-6 z-50 p-3 rounded-full bg-gray-100 dark:bg-white/5 backdrop-blur-xl border border-gray-300 dark:border-white/10 shadow-sm"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      initial={false}
      animate={{ rotate: theme === 'dark' ? 0 : 180 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {theme === 'dark' ? (
        <Moon className="w-5 h-5 text-white" />
      ) : (
        <Sun className="w-5 h-5 text-gray-900" />
      )}
    </motion.div>
  </motion.button>
);

// ==================== NAVBAR (RESPONSIVE) ====================
const Navbar = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'hero', icon: Home, label: 'Home' },
    { id: 'work', icon: Briefcase, label: 'Work' },
    { id: 'journey', icon: MapPin, label: 'Journey' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'community', icon: Heart, label: 'Community' },
    { id: 'contact', icon: Send, label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 md:px-6 py-3 md:py-4 rounded-full bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-gray-300 dark:border-white/10 shadow-2xl max-w-[90vw] overflow-x-auto no-scrollbar"
    >
      <div className="flex items-center gap-1 md:gap-2">
        {navItems.map(({ id, icon: Icon, label }) => (
          <motion.button
            key={id}
            onClick={() => {
              setActiveSection(id);
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`p-2 md:p-3 rounded-xl transition-colors ${
              activeSection === id ? 'bg-gray-200 dark:bg-white/20' : 'hover:bg-gray-100 dark:hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.2, y: -8 }}
            whileTap={{ scale: 0.95 }}
            title={label}
          >
            <Icon className="w-4 h-4 md:w-5 md:h-5 text-gray-900 dark:text-gray-200" strokeWidth={1.5} />
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
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20 pb-10">
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
            className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-4 uppercase bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent leading-tight break-words"
            style={{ textShadow: '0 0 80px rgba(255,255,255,0.1)' }}
          >
            {PROFILE.name}
          </motion.h1>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-xl md:text-2xl lg:text-4xl font-light text-gray-600 dark:text-gray-500 mb-8"
          >
            {PROFILE.role}
          </motion.h2>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 text-xs md:text-sm font-mono text-gray-600 dark:text-gray-600"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Open to Work
            </span>
            <span className="hidden md:inline">•</span>
            <span>{PROFILE.location}</span>
            <span className="hidden md:inline">•</span>
            <span>{time}</span>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex flex-wrap justify-center gap-4 mt-12 items-center"
          >
            <motion.a
              href="/Parag_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-medium border border-transparent hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-5 h-5" />
              <span>Resume</span>
            </motion.a>

            {SOCIALS.map(({ name, url, icon: Icon }) => (
              <motion.a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
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

// ==================== WORK ====================
const Work = () => {
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const handleScroll = (e) => {
    if (e.target.scrollLeft < 20) {
      setShowSwipeHint(true);
    } else {
      setShowSwipeHint(false);
    }
  };

  return (
    <section id="work" className="min-h-screen py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold mb-12 md:mb-16 tracking-tight text-gray-900 dark:text-white"
        >
          Selected Work
        </motion.h2>

        <div className="relative">
          <div 
            onScroll={handleScroll}
            className="flex overflow-x-auto no-scrollbar gap-4 pb-8 -mx-6 px-6 snap-x snap-mandatory md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 md:mx-0 md:px-0"
          >
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[85vw] md:min-w-0 snap-center group relative p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">{project.category}</span>
                    {project.stats && (
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                        project.stats.includes("Patent") 
                          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                          : "bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white"
                      }`}>
                        {project.stats}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      {project.title}
                    </h3>
                    {project.repo && (
                      <a 
                        href={project.repo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors text-gray-900 dark:text-white"
                        title="View Source Code"
                      >
                        <Github size={18} />
                      </a>
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 overflow-hidden text-ellipsis">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-xs font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          <SwipeHint isVisible={showSwipeHint} />
        </div>
      </div>
    </section>
  );
};

// ==================== JOURNEY ====================
const Journey = () => (
  <section id="journey" className="min-h-screen py-20 md:py-32 px-6">
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl lg:text-7xl font-bold mb-12 md:mb-16 tracking-tight text-gray-900 dark:text-white"
      >
        Journey
      </motion.h2>

      <div className="relative">
        <div className="absolute left-1.5 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-gray-400 dark:from-white/20 via-gray-300 dark:via-white/10 to-transparent" />

        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="relative pl-12 pb-16 last:pb-0"
          >
            <div className="absolute left-1.5 -translate-x-1/2 top-2 w-3 h-3 rounded-full bg-gray-900 dark:bg-white shadow-lg shadow-gray-900/50 dark:shadow-white/50 ring-4 ring-white dark:ring-[#050505]" />
            
            <div className="text-sm text-gray-500 dark:text-gray-500 mb-2">{exp.period}</div>
            <h3 className="text-xl md:text-2xl font-bold mb-1 text-gray-900 dark:text-white">{exp.role}</h3>
            <div className="text-gray-600 dark:text-gray-400 mb-4">{exp.company}</div>
            <p className="text-gray-600 dark:text-gray-500 leading-relaxed text-sm md:text-base">{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ==================== ABOUT (UPDATED TEXT) ====================
const About = () => {
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const handleScroll = (e) => {
    if (e.target.scrollLeft < 20) {
      setShowSwipeHint(true);
    } else {
      setShowSwipeHint(false);
    }
  };

  return (
    <section id="about" className="min-h-screen py-20 md:py-32 px-6 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold mb-12 md:mb-16 tracking-tight text-gray-900 dark:text-white"
        >
          About
        </motion.h2>

        <div className="flex flex-col gap-6 md:grid md:grid-cols-12 relative">
          
          {/* 1. Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 p-6 md:p-8 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">The Person Behind the Code</h3>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {PROFILE.bio}
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm md:text-base">
              I believe that true engineering isn't just about writing functions—it's about crafting experiences. Whether it's organizing national hackathons or editing the perfect frame for an anime review, I obsess over the details.
            </p>
          </motion.div>

          {/* 2. Scrollable Section for Mobile */}
          <div 
            className="flex overflow-x-auto gap-4 pb-8 -mx-6 px-6 snap-x snap-mandatory no-scrollbar md:contents"
            onScroll={handleScroll}
          >
            {/* Photo Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="min-w-[85vw] md:min-w-0 md:col-span-4 md:row-span-2 relative rounded-3xl overflow-hidden min-h-[300px] md:min-h-[400px] border border-gray-200 dark:border-white/10 group snap-center"
            >
              <img 
                src="/pic.png" 
                alt="Parag Sharma" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-mono text-sm opacity-80">Based in</p>
                <p className="text-xl font-bold">{PROFILE.location}</p>
              </div>
            </motion.div>

            {/* Youtube Card (UPDATED TEXT) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="min-w-[85vw] md:min-w-0 md:col-span-4 p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 group relative overflow-hidden hover:border-red-500/30 hover:shadow-[0_0_30px_-10px_rgba(220,38,38,0.3)] transition-all duration-300 snap-center flex flex-col justify-center"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity text-red-500">
                <Youtube size={100} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gray-900 dark:bg-white rounded-lg text-white dark:text-black group-hover:text-red-600 transition-colors">
                    <Play size={20} fill="currentColor" />
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white tracking-wider text-sm">CONTENT CREATOR</span>
                </div>
                
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">DAEMON</h4>
                
                {/* --- CHANGED TEXT HERE --- */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Merging technical precision with anime culture. I create high-octane edits and deep-dive reviews for series like 
                  <span className="text-gray-900 dark:text-white font-medium"> Jujutsu Kaisen</span> and 
                  <span className="text-gray-900 dark:text-white font-medium"> Chainsaw Man</span>. 
                  This is where my engineering logic meets creative storytelling—analyzing frames with the same detail I apply to code.
                </p>
                
                <a 
                  href="https://youtube.com/@DaemonPOV" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors underline-offset-4 group/link"
                >
                  Visit Channel <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Tech Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="min-w-[85vw] md:min-w-0 md:col-span-4 p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 group hover:border-blue-500/30 hover:shadow-[0_0_30px_-10px_rgba(37,99,235,0.3)] transition-all duration-300 snap-center"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Cpu size={20} />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Tech Arsenal</h4>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {["C++", "Java", "Python", "JavaScript", "Flutter", "React.js", "Tailwind", "Node.js", "Firebase", "Git", "Salesforce CRM", "Jira", "Slack", "OpenCV", "TensorFlow", "AWS", "Apex", "Lightning Components"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-white dark:bg-white/10 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/5">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <SwipeHint isVisible={showSwipeHint} />
        </div>
      </div>
    </section>
  );
};

// ==================== COMMUNITY ====================
const Community = () => {
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const handleScroll = (e) => {
    // Logic updated to allow reappearing
    if (e.target.scrollLeft < 20) {
      setShowSwipeHint(true);
    } else {
      setShowSwipeHint(false);
    }
  };

  return (
    <section id="community" className="min-h-screen py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
            Community<br />Impact
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md text-lg text-right md:text-left">
            Empowering the next generation of developers through leadership, mentorship, and large-scale events.
          </p>
        </motion.div>

        <div className="relative">
          <div 
            onScroll={handleScroll}
            className="flex overflow-x-auto no-scrollbar gap-4 pb-8 -mx-6 px-6 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 md:mx-0 md:px-0"
          >
            {COMMUNITY_DATA.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[85vw] md:min-w-0 snap-center p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-all group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-full bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white">
                      <item.icon size={20} />
                    </div>
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-500">{item.period}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{item.role}</h3>
                  <div className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-4">{item.org}</div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 overflow-hidden text-ellipsis">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-md bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <SwipeHint isVisible={showSwipeHint} />
        </div>
      </div>
    </section>
  );
};

// ==================== CONTACT ====================
const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="min-h-screen py-20 md:py-32 px-6 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-8xl font-bold mb-8 tracking-tight text-gray-900 dark:text-white">
            Let's Create<br />Something Amazing
          </h2>

          <motion.button
            onClick={copyEmail}
            className="group relative px-8 md:px-12 py-4 md:py-6 text-sm md:text-2xl font-bold rounded-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-colors w-full md:w-auto overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="truncate">{PROFILE.email}</span>
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
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
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
  const [theme, toggleTheme] = useTheme();
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
      { threshold: 0.3 } 
    );

    ['hero', 'work', 'journey', 'about', 'community', 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-[#F5F5F7] transition-colors duration-500 overflow-x-hidden">
      <style>{globalStyles}</style>

      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <Hero />
      <Work />
      <Journey />
      <About />
      <Community />
      <Contact />

      <footer className="py-8 text-center text-sm text-gray-600 dark:text-gray-700 border-t border-gray-200 dark:border-white/5 px-6">
        <p>© 2025 Parag Sharma. Crafted with precision.</p>
      </footer>
    </div>
  );
}