import { useState, useEffect, useRef } from 'react';
import { Menu, X, Star } from 'lucide-react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const aboutRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const teamRef = useRef<HTMLElement | null>(null);
  const hasCountedRef = useRef(false);

  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const [stats, setStats] = useState({ projects: 0, clients: 0, years: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));

          if (entry.isIntersecting) {
            setVisibleSections((prev) => {
              const next = new Set(prev);
              next.add(index);
              return next;
            });
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -120px 0px',
      }
    );

    const sections = [aboutRef.current, projectsRef.current, teamRef.current];

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visibleSections.has(0) || hasCountedRef.current) return;

    const animateCounter = (
      start: number,
      end: number,
      setter: (val: number) => void,
      duration: number = 1800
    ) => {
      let startTimestamp: number | null = null;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;

        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easedProgress * (end - start) + start);

        setter(current);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setter(end);
        }
      };

      window.requestAnimationFrame(step);
    };

    hasCountedRef.current = true;

    const timer = setTimeout(() => {
      animateCounter(0, 50, (val) => setStats((s) => ({ ...s, projects: val })));
      animateCounter(0, 20, (val) => setStats((s) => ({ ...s, clients: val })));
      animateCounter(0, 8, (val) => setStats((s) => ({ ...s, years: val })));
    }, 500);

    return () => clearTimeout(timer);
  }, [visibleSections]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden scroll-smooth">
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-lg z-50 border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Sense Solutions" className="h-10 w-auto" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="hover:text-gray-400 transition">About</a>
            <a href="#projects" className="hover:text-gray-400 transition">Projects</a>
            <a href="#team" className="hover:text-gray-400 transition">Team</a>
            <a href="#contact" className="hover:text-gray-400 transition">Contact</a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-white/10 py-4 mobile-menu-enter">
            <div className="flex flex-col items-center gap-6 text-lg">
              <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a>
              <a href="#team" onClick={() => setIsMenuOpen(false)}>Team</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </nav>

      <section className="min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-black via-zinc-950 to-black relative overflow-hidden hero-stage">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="hero-pulse-grid" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="flex justify-center mb-8 hero-logo-wrap">
            <img
              src="/logo.png"
              alt="Sense Solutions Logo"
              className="h-32 md:h-48 w-auto drop-shadow-2xl animate-hero-logo"
            />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 hero-title-load">
            SENSE THE FUTURE
          </h1>

          <p className="text-2xl md:text-3xl text-gray-400 max-w-2xl mx-auto hero-copy-load">
            Innovative solutions that transform businesses
          </p>

          <div className="mt-12 hero-button-load">
            <a
              href="#about"
              className="inline-block bg-white text-black px-10 py-4 rounded-full font-semibold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
            >
              Discover More
            </a>
          </div>
        </div>
      </section>

      <section
        id="about"
        ref={aboutRef}
        data-index="0"
        className={`py-24 bg-zinc-950 reveal-section reveal-from-left ${visibleSections.has(0) ? 'is-visible' : ''
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 section-inner">
          <h2 className="text-5xl font-bold text-center mb-16 reveal-child">Our Story</h2>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal-child delay-150">
              <p className="text-lg text-gray-300 leading-relaxed">
                Sense Solutions is a forward-thinking company specializing in cutting-edge digital solutions,
                creative design, and technology-driven services...
              </p>

              <div className="mt-8 grid grid-cols-3 gap-8 text-center">
                <div className="stat-card">
                  <div className="text-5xl font-bold text-white">{stats.projects}+</div>
                  <div className="text-sm text-gray-500">Projects Delivered</div>
                </div>

                <div className="stat-card delay-100">
                  <div className="text-5xl font-bold text-white">{stats.clients}+</div>
                  <div className="text-sm text-gray-500">Happy Clients</div>
                </div>

                <div className="stat-card delay-200">
                  <div className="text-5xl font-bold text-white">{stats.years}</div>
                  <div className="text-sm text-gray-500">Years Experience</div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 p-8 rounded-3xl reveal-child delay-300 feature-panel">
              <h3 className="text-2xl font-semibold mb-6">What We Do</h3>

              <ul className="space-y-6">
                {['Digital Strategy', 'Brand Development', 'Web & App Development', 'Creative Design', 'Marketing Solutions'].map((item, i) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 service-item"
                    style={{ transitionDelay: `${450 + i * 110}ms` }}
                  >
                    <Star className="mt-1 text-yellow-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        ref={projectsRef}
        data-index="1"
        className={`py-24 bg-black reveal-section reveal-zoom ${visibleSections.has(1) ? 'is-visible' : ''
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 section-inner">
          <h2 className="text-5xl font-bold text-center mb-16 reveal-child">Our Projects</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i, idx) => (
              <div
                key={i}
                className="group bg-zinc-900 rounded-3xl overflow-hidden project-card reveal-child"
                style={{ transitionDelay: `${180 + idx * 120}ms` }}
              >
                <div className="h-64 bg-zinc-800 flex items-center justify-center relative overflow-hidden">
                  <div className="project-card-shine" />
                  <div className="text-6xl text-gray-700 group-hover:scale-110 transition-transform duration-500">
                    Project {i}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-2">Project Title {i}</h3>
                  <p className="text-gray-400">Innovative solution delivered with excellence.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="team"
        ref={teamRef}
        data-index="2"
        className={`py-24 bg-zinc-950 reveal-section reveal-from-right ${visibleSections.has(2) ? 'is-visible' : ''
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 section-inner">
          <h2 className="text-5xl font-bold text-center mb-16 reveal-child">Our Team</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: 'John Doe', role: 'Founder & CEO', initials: 'JD' },
              { name: 'Jane Smith', role: 'Creative Director', initials: 'JS' },
              { name: 'Alex Chen', role: 'Tech Lead', initials: 'AC' },
            ].map((member, i) => (
              <div
                key={member.name}
                className="text-center team-card reveal-child"
                style={{ transitionDelay: `${180 + i * 170}ms` }}
              >
                <div className="w-48 h-48 mx-auto mb-6 bg-zinc-800 rounded-full flex items-center justify-center text-5xl font-bold team-avatar">
                  {member.initials}
                </div>

                <h3 className="text-2xl font-semibold">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-black border-t border-white/10 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-15">
              <img src="/logo.png" alt="Logo" className="h-12" />
            </div>

            <p className="text-gray-400 max-w-md">
              Transforming ideas into impactful digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-6">Contact</h4>
              <p className="text-gray-400">info@sensesolutions.lk</p>
              <p className="text-gray-400">+94 77 123 4567</p>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Location</h4>
              <p className="text-gray-400">Colombo, Sri Lanka</p>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-16">
          (c) 2026 Sense Solutions. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;