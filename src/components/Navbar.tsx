import { motion, useScroll, useSpring } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleMagic = () => {
    toggleTheme();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-500"
      style={{
        backgroundColor: theme === 'brutalist' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
        borderBottom: theme === 'brutalist' ? '6px solid #000' : '4px solid #fff',
        backdropFilter: 'blur(8px)'
      }}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className={`absolute bottom-0 left-0 h-1 z-[60] origin-left ${theme === 'brutalist' ? 'bg-primary' : 'bg-secondary shadow-[0_0_10px_#00ffff]'
          }`}
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center justify-between w-full md:w-auto">
          <a
            href="/"
            className={`text-2xl font-pixel transition-all duration-500 hover:tracking-widest ${theme === 'brutalist' ? 'text-black italic font-sans text-black underline decoration-primary decoration-8' : 'text-neon-pink'
              }`}
          >
            MOGESH<span className="animate-pulse">_</span>
          </a>

          {/* Mobile Theme Toggle */}
          <div className="md:hidden">
            <button
              onClick={handleMagic}
              className={`p-2 border-2 transition-all active:scale-90 ${theme === 'brutalist' ? 'border-black text-black' : 'border-secondary text-secondary'}`}
            >
              {theme === 'retro' ? '👾' : '🕹️'}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-4 overflow-x-auto max-w-full no-scrollbar py-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={location.pathname === "/" ? link.href : `/${link.href}`}
              className={`font-pixel transition-all duration-300 relative group whitespace-nowrap ${theme === 'brutalist' ? 'text-black font-sans italic uppercase' : 'text-white text-[10px] hover:text-secondary'
                }`}
            >
              <span className="relative z-10">[{link.name}]</span>
              <motion.div
                className={`absolute -inset-1 opacity-0 group-hover:opacity-20 transition-opacity ${theme === 'brutalist' ? 'bg-secondary' : 'bg-white'
                  }`}
              />
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button
            onClick={handleMagic}
            className="pixel-button-cyan transition-transform hover:scale-110 active:scale-95 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {theme === 'retro' ? '👾 GLITCH' : '🕹️ RETRO'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
