import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleStartGame = () => {
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        const gameSection = document.getElementById("game");
        gameSection?.scrollIntoView({ behavior: "smooth" });
        window.dispatchEvent(new CustomEvent("startGame"));
      }, 100);
    } else {
      const gameSection = document.getElementById("game");
      gameSection?.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("startGame"));
    }
  };

  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 bg-black border-b-4 border-white px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4"
    >
      <a href="/" className="text-xl font-pixel text-neon-pink">
        MOGESH
      </a>

      <div className="flex items-center gap-4 md:gap-8 overflow-x-auto max-w-full no-scrollbar">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={location.pathname === "/" ? link.href : `/${link.href}`}
            className="text-[10px] font-pixel text-white hover:text-secondary hover:underline underline-offset-8 transition-colors whitespace-nowrap"
          >
            [{link.name}]
          </a>
        ))}
      </div>

      <div className="hidden md:block">
        <button
          onClick={handleStartGame}
          className="pixel-button-cyan transition-transform hover:scale-110 active:scale-95"
        >
          START GAME
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
