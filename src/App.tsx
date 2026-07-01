import { useState, useEffect, useRef } from 'react';
import { Menu, X, Star, Camera, Aperture, Mail, MapPin, Phone } from 'lucide-react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const aboutRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const teamRef = useRef<HTMLElement | null>(null);
  const hasCountedRef = useRef(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const [stats, setStats] = useState({ shoots: 0, clients: 0, moments: 0 });

  const portfolioItems = [
    {
      title: 'Wedding Stories',
      category: 'Weddings',
      image: 'https://source.unsplash.com/900x1100/?wedding,photography,couple',
    },
    {
      title: 'Event Coverage',
      category: 'Events',
      image: 'https://source.unsplash.com/900x1100/?event,photography,celebration',
    },
    {
      title: 'Portrait Sessions',
      category: 'Portraits',
      image: 'https://source.unsplash.com/900x1100/?portrait,studio,photography',
    },
    {
      title: 'Product Frames',
      category: 'Products',
      image: 'https://source.unsplash.com/900x1100/?product,photography,luxury',
    },
    {
      title: 'Brand Campaigns',
      category: 'Commercial',
      image: 'https://source.unsplash.com/900x1100/?brand,photography,creative',
    },
    {
      title: 'Family Moments',
      category: 'Lifestyle',
      image: 'https://source.unsplash.com/900x1100/?family,photography,lifestyle',
    },
  ];

  const services = [
    'Wedding Photography',
    'Event Coverage',
    'Portrait Sessions',
    'Product Photography',
    'Brand & Commercial Shoots',
    'Professional Photo Editing',
  ];

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
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
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
      duration: number = 1900
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
      animateCounter(0, 120, (val) => setStats((s) => ({ ...s, shoots: val })));
      animateCounter(0, 75, (val) => setStats((s) => ({ ...s, clients: val })));
      animateCounter(0, 10, (val) => setStats((s) => ({ ...s, moments: val })));
    }, 400);

    return () => clearTimeout(timer);
  }, [visibleSections]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="site-shell min-h-screen text-white overflow-x-hidden scroll-smooth">
      <nav className="fixed top-0 w-full z-50 nav-glass">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-3">
            <img src="/sense-solutions/logo_1.png" alt="Sense Solutions" className="nav-logo" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="nav-link">About</a>
            <a href="#projects" className="nav-link">Portfolio</a>
            <a href="#team" className="nav-link">Studio</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>




          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden mobile-nav-button"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mobile-menu-enter mobile-menu-panel">
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
            <a href="#team" onClick={() => setIsMenuOpen(false)}>Studio</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
        )}
      </nav>

      <section id="home" className="hero-stage min-h-screen relative overflow-hidden">
        <div className="hero-photo hero-photo-one" />
        <div className="hero-photo hero-photo-two" />
        <div className="hero-photo hero-photo-three" />
        <div className="lens-ring lens-ring-one" />
        <div className="lens-ring lens-ring-two" />
        <div className="shutter-lines" />

        <div className="max-w-7xl mx-auto min-h-screen px-5 sm:px-6 pt-28 pb-16 grid lg:grid-cols-[1.08fr_0.92fr] gap-10 items-center relative z-10">
          <div className="hero-copy">
            <div className="hero-logo-wrap">
              <img
                src="/sense-solutions/logo_1.png"
                alt="Sense Solutions Logo"
                className="hero-logo-image animate-hero-logo"
              />
            </div>

            <div className="hero-kicker hero-title-load">
              <Camera size={18} />
              Sri Lankan Photography Studio
            </div>

            <h1 className="hero-title hero-title-load">
              CAPTURING MOMENTS THAT FEEL ALIVE
            </h1>

            <p className="hero-subtitle hero-copy-load">
              Wedding, event, portrait, product, and brand photography crafted with cinematic light,
              clean composition, and careful editing.
            </p>

            <div className="hero-actions hero-button-load">
              <a href="#projects" className="primary-button">View Portfolio</a>

            </div>
          </div>

          <div className="hero-showcase">
            <div className="camera-frame">
              <div className="camera-frame-image" />
              <div className="focus-corner focus-corner-one" />
              <div className="focus-corner focus-corner-two" />
              <div className="focus-corner focus-corner-three" />
              <div className="focus-corner focus-corner-four" />
              <div className="frame-caption">
                <span>01</span>
                <p>Golden-hour visual stories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        ref={aboutRef}
        data-index="0"
        className={`section-band reveal-section reveal-from-left ${visibleSections.has(0) ? 'is-visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 section-inner">
          <div className="section-heading reveal-child">
            <span>About the studio</span>
            <h2>Photography with mood, movement, and memory.</h2>
          </div>

          <div className="about-grid">
            <div className="about-copy reveal-child delay-150">
              <p>
                Sense Solutions is a Sri Lankan photography company focused on capturing weddings,
                events, portraits, product visuals, and brand stories with a polished editorial style.
              </p>

              <div className="company-details">
                <h3>Registered Company Details</h3>
                <div className="details-list">
                  <p><span>Registered Name</span>SENSE SOLUTIONS (PVT) LTD</p>
                  <p><span>Company Number</span>PV 00315784</p>
                  <p><span>Company Type</span>Private Limited Company</p>
                  <p><span>Incorporated</span>22 November 2024</p>
                  <p><span>Registered Office</span>No. 292/A, Meerigama Road, Wewagedara, Divulapitiya, 11250, Sri Lanka</p>
                  <p><span>Registered Under</span>Companies Act No. 7 of 2007</p>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <strong>{stats.shoots}+</strong>
                  <span>Shoots Completed</span>
                </div>

                <div className="stat-card delay-100">
                  <strong>{stats.clients}+</strong>
                  <span>Happy Clients</span>
                </div>

                <div className="stat-card delay-200">
                  <strong>{stats.moments}k+</strong>
                  <span>Moments Captured</span>
                </div>
              </div>
            </div>

            <div className="services-panel reveal-child delay-300">
              <div className="aperture-badge">
                <Aperture size={34} />
              </div>

              <h3>What We Shoot</h3>

              <ul>
                {services.map((item, i) => (
                  <li
                    key={item}
                    className="service-item"
                    style={{ transitionDelay: `${420 + i * 95}ms` }}
                  >
                    <Star size={18} />
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
        className={`portfolio-section reveal-section reveal-zoom ${visibleSections.has(1) ? 'is-visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 section-inner">
          <div className="section-heading center reveal-child">
            <span>Selected work</span>
            <h2>Portfolio frames built for feeling.</h2>
          </div>

          <div className="portfolio-grid">
            {portfolioItems.map((item, idx) => (
              <article
                key={item.title}
                className="portfolio-card reveal-child"
                style={{ transitionDelay: `${160 + idx * 100}ms` }}
              >
                <img src={item.image} alt={item.title} />
                <div className="project-card-shine" />
                <div className="portfolio-overlay">
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="team"
        ref={teamRef}
        data-index="2"
        className={`studio-section reveal-section reveal-from-right ${visibleSections.has(2) ? 'is-visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 section-inner">
          <div className="section-heading reveal-child">
            <span>Studio approach</span>
            <h2>From first call to final gallery.</h2>
          </div>

          <div className="workflow-grid">
            {[
              { number: '01', title: 'Plan the Mood', text: 'We discuss your date, location, style, outfit ideas, and must-have moments.' },
              { number: '02', title: 'Shoot with Direction', text: 'We guide poses, capture natural movement, and keep the session relaxed.' },
              { number: '03', title: 'Edit with Care', text: 'Final images are color-graded, refined, and prepared for sharing or printing.' },
            ].map((step, i) => (
              <div
                key={step.title}
                className="workflow-card reveal-child"
                style={{ transitionDelay: `${180 + i * 160}ms` }}
              >
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="footer-section">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 footer-grid">
          <div>
            <img src="/sense-solutions/logo_1.png" alt="Sense Solutions" className="footer-logo" />

            <p className="footer-text">
              Capturing weddings, events, portraits, products, and brand stories with care,
              creativity, and a clean cinematic finish.
            </p>
          </div>

          <div className="contact-grid">
            <div>
              <h4>Contact</h4>
              <p>Mrs. K.A.T.N. Jayasinghe</p>
              <p>SENSE SOLUTIONS (PVT) LTD</p>
              <p>Managing Director</p>
              <p><Mail size={16} /> thar4media@gmail.com</p>
              <p><Phone size={16} /> +9477 966 1606</p>
              <p><Phone size={16} /> +9470 403 5964</p>
            </div>

            <div>
              <h4>Location</h4>
              <p><MapPin size={16} /> No. 292/A, Meerigama Road</p>
              <p>Wewagedara, Divulapitiya</p>
              <p>11250, Sri Lanka</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; 2026 Sense Solutions. All Rights Reserved. • Designed & Developed by Dheeshani.Dev
        </div>
      </footer>


      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="scroll-to-top"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}

    </div>
  );
}

export default App;