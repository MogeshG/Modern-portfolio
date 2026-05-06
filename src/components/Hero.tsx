import { motion } from "framer-motion";
import PixelGame from "./PixelGame";
import BrutalistGame from "./BrutalistGame";
import { useTheme } from "../context/ThemeContext";

const Hero = () => {
  const { theme } = useTheme();

  return (
    <section className={`relative min-h-screen flex flex-col items-center justify-center pt-42 sm:pt-48 pb-16 px-4 overflow-hidden transition-colors duration-500 ${theme === 'brutalist'
      ? 'bg-white bg-[linear-gradient(90deg,rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(rgba(0,0,0,.05)_1px,transparent_1px)] bg-[size:40px_40px]'
      : 'bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px]'
      }`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-center max-w-4xl relative z-10"
      >
        <div className={`inline-block p-2 font-pixel text-[10px] mb-8 animate-bounce border-2 ${theme === 'brutalist'
          ? 'bg-secondary text-white border-black font-sans font-black italic text-lg'
          : 'bg-success text-black border-black'
          }`}>
          {theme === 'brutalist' ? 'BRUTALIST MODE ACTIVATED' : 'NEW PLAYER HAS JOINED!'}
        </div>

        <h1 className={`text-3xl sm:text-4xl md:text-6xl mb-8 leading-tight transition-all duration-500 ${theme === 'brutalist' ? 'font-sans font-black italic text-black' : 'font-pixel'
          }`}>
          {theme === 'brutalist' ? (
            <>DESIGNING THE <br /><span className="bg-primary text-white px-4">FUTURE</span></>
          ) : (
            <>BUILDING THE <br /><span className="text-neon-cyan">VIRTUAL WORLD</span></>
          )}
        </h1>

        <p className={`text-xl sm:text-2xl md:text-3xl mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-500 ${theme === 'brutalist' ? 'font-sans font-bold text-black' : 'font-retro text-gray-300'
          }`}>
          I'm <span className={`${theme === 'brutalist' ? 'bg-secondary text-white px-2' : 'text-white font-bold underline decoration-primary decoration-4 underline-offset-4'}`}>MOGESH</span>.
          A Full-Stack Developer creating {theme === 'brutalist' ? 'HIGH-IMPACT' : 'pixel-perfect'} digital experiences.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <a
            href="#projects"
            className="pixel-button scale-110 sm:scale-125 glint-effect"
          >
            LOAD PROJECTS
          </a>
        </div>
      </motion.div>

      {/* Interactive Game Dashboard */}
      <motion.div
        id="game"
        transition={{ delay: 0.5 }}
        className={`w-full max-w-4xl p-1 sm:p-2 relative group transition-all duration-500 ${theme === 'brutalist' ? 'border-8 border-black bg-white shadow-[20px_20px_0px_#000]' : 'pixel-box bg-black'
          }`}
      >
        <div className={`absolute -top-10 left-4 font-pixel text-[10px] px-3 py-1 border-2 z-10 transition-all ${theme === 'brutalist' ? 'bg-black text-white font-sans font-bold text-sm border-black' : 'bg-primary text-white border-white'
          }`}>
          {theme === 'brutalist' ? 'SKETCH.SYS' : 'GAME.EXE'}
        </div>
        <div className={`w-full aspect-square sm:aspect-video overflow-hidden transition-colors ${theme === 'brutalist' ? 'bg-white' : 'bg-[#050505]'
          }`}>
          {theme === 'retro' ? <PixelGame /> : <BrutalistGame />}
        </div>
      </motion.div>

      {/* Retro Grid Background Element */}
      <div className={`absolute bottom-0 left-0 w-full h-32 pointer-events-none transition-opacity duration-500 ${theme === 'brutalist' ? 'opacity-0' : 'bg-gradient-to-t from-primary/10 to-transparent opacity-100'
        }`} />
    </section>
  );
};

export default Hero;
