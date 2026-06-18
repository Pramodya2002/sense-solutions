import { useState } from 'react';
import { Menu, X, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "backOut" }
  }
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="public\logo.png"
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
      <section className="min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-black via-zinc-950 to-black relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="max-w-5xl mx-auto px-6 text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0.6, rotate: -8 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "backOut" }}
            className="flex justify-center mb-8"
          >
            <img
              src="public\logo.png"
              alt="Sense Solutions Logo"
              className="h-32 md:h-48 w-auto drop-shadow-2xl"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-6"
          >
            SENSE THE FUTURE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-2xl md:text-3xl text-gray-400 max-w-2xl mx-auto"
          >
            Innovative solutions that transform businesses
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12"
          >
            <a href="#about" className="inline-block bg-white text-black px-10 py-4 rounded-full font-semibold hover:bg-gray-200 transition">
              Discover More
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-5xl font-bold text-center mb-16"
          >
            Our Story
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp}>
              <p className="text-lg text-gray-300 leading-relaxed">
                Sense Solutions is a forward-thinking company specializing in cutting-edge digital solutions,
                creative design, and technology-driven services. Inspired by the elegance and precision of our logo,
                we deliver clarity and impact in everything we do.
              </p>
              <motion.div
                variants={staggerContainer}
                className="mt-8 grid grid-cols-3 gap-8 text-center"
              >
                {[50, 20, 8].map((num, i) => (
                  <motion.div key={i} variants={scaleUp}>
                    <div className="text-4xl font-bold">{num}+</div>
                    <div className="text-sm text-gray-500">
                      {["Projects Delivered", "Happy Clients", "Years Experience"][i]}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-zinc-900 p-8 rounded-3xl"
            >
              <h3 className="text-2xl font-semibold mb-6">What We Do</h3>
              <motion.ul
                variants={staggerContainer}
                className="space-y-6"
              >
                {["Digital Strategy", "Brand Development", "Web & App Development", "Creative Design", "Marketing Solutions"].map((item, i) => (
                  <motion.li
                    key={i}
                    variants={fadeInUp}
                    className="flex items-start gap-4"
                  >
                    <Star className="mt-1 text-yellow-400" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-5xl font-bold text-center mb-16"
          >
            Our Projects
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                variants={scaleUp}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group bg-zinc-900 rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300"
              >
                <div className="h-64 bg-zinc-800 flex items-center justify-center">
                  <div className="text-6xl text-gray-700">Project {i}</div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-2">Project Title {i}</h3>
                  <p className="text-gray-400">Innovative solution delivered with excellence.</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-5xl font-bold text-center mb-16"
          >
            Our Team
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-10"
          >
            {[
              { name: "John Doe", role: "Founder & CEO" },
              { name: "Jane Smith", role: "Creative Director" },
              { name: "Alex Chen", role: "Tech Lead" },
            ].map((member, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -15, scale: 1.03 }}
                className="text-center group"
              >
                <motion.div
                  className="w-48 h-48 mx-auto mb-6 bg-zinc-800 rounded-full flex items-center justify-center text-6xl overflow-hidden"
                  whileHover={{ rotate: 8 }}
                >
                  👤
                </motion.div>
                <h3 className="text-2xl font-semibold">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
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