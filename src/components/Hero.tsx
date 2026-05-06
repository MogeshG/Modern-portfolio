import { motion } from "framer-motion";
import PixelGame from "./PixelGame";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-4 overflow-hidden bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-center max-w-4xl"
      >
        <div className="inline-block p-2 bg-success text-black font-pixel text-[10px] mb-8 animate-bounce border-2 border-black">
          NEW PLAYER HAS JOINED!
        </div>
        
        <h1 
          className="text-3xl sm:text-4xl md:text-6xl font-pixel mb-8 leading-tight cursor-default"
        >
          BUILDING THE <br />
          <span className="text-neon-cyan">VIRTUAL WORLD</span>
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-3xl font-retro text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          I'm <span className="text-white font-bold underline decoration-primary decoration-4 underline-offset-4">MOGESH</span>. 
          A Full-Stack Developer creating pixel-perfect digital experiences.
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

      {/* Interactive Pixel Game Dashboard */}
      <motion.div
        id="game"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-4xl pixel-box bg-black p-1 sm:p-2 relative group animate-float"
      >
        <div className="absolute -top-10 left-4 bg-primary text-white font-pixel text-[10px] px-3 py-1 border-2 border-white z-10">
          GAME.EXE
        </div>
        <div className="w-full aspect-square sm:aspect-video bg-[#050505] overflow-hidden">
            <PixelGame />
        </div>
      </motion.div>

      {/* Retro Grid Background Element */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
