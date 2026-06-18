import { useState } from 'react';
import { Menu, X, Star } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Sense Solutions"
              className="h-10 w-auto"
            />
            <div>
              <div className="text-2xl font-bold tracking-tighter">SENSE</div>
              <div className="text-[10px] text-gray-400 -mt-1">SOLUTIONS</div>
            </div>
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
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-white/10 py-4">
            <div className="flex flex-col items-center gap-6 text-lg">
              <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a>
              <a href="#team" onClick={() => setIsMenuOpen(false)}>Team</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-black via-zinc-950 to-black relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <img
              src="/logo.png"
              alt="Sense Solutions Logo"
              className="h-32 md:h-48 w-auto drop-shadow-2xl"
            />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
            SENSE THE FUTURE
          </h1>
          <p className="text-2xl md:text-3xl text-gray-400 max-w-2xl mx-auto">
            Innovative solutions that transform businesses
          </p>
          <div className="mt-12">
            <a href="#about" className="inline-block bg-white text-black px-10 py-4 rounded-full font-semibold hover:bg-gray-200 transition">
              Discover More
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-lg text-gray-300 leading-relaxed">
                Sense Solutions is a forward-thinking company specializing in cutting-edge digital solutions,
                creative design, and technology-driven services. Inspired by the elegance and precision of our logo,
                we deliver clarity and impact in everything we do.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold">50+</div>
                  <div className="text-sm text-gray-500">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">20+</div>
                  <div className="text-sm text-gray-500">Happy Clients</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">8</div>
                  <div className="text-sm text-gray-500">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="bg-zinc-900 p-8 rounded-3xl">
              <h3 className="text-2xl font-semibold mb-6">What We Do</h3>
              <ul className="space-y-6">
                {["Digital Strategy", "Brand Development", "Web & App Development", "Creative Design", "Marketing Solutions"].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <Star className="mt-1 text-yellow-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">Our Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group bg-zinc-900 rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300">
                <div className="h-64 bg-zinc-800 flex items-center justify-center">
                  <div className="text-6xl text-gray-700">Project {i}</div>
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

      {/* Team Section */}
      <section id="team" className="py-24 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: "John Doe", role: "Founder & CEO" },
              { name: "Jane Smith", role: "Creative Director" },
              { name: "Alex Chen", role: "Tech Lead" },
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-48 h-48 mx-auto mb-6 bg-zinc-800 rounded-full flex items-center justify-center text-6xl">
                  👤
                </div>
                <h3 className="text-2xl font-semibold">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-black border-t border-white/10 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <img src="/logo.png" alt="Logo" className="h-12" />
              <div>
                <div className="text-3xl font-bold">SENSE</div>
                <div className="text-xs tracking-[4px]">SOLUTIONS</div>
              </div>
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
          © 2026 Sense Solutions. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;