import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { useTheme } from "../context/ThemeContext";

const About = () => {
  const { theme } = useTheme();

  const stats = [
    { label: "LEVEL", value: "23", color: theme === 'brutalist' ? "text-black" : "text-primary" },
    { label: "EXP", value: "2 YEARS", color: theme === 'brutalist' ? "text-black" : "text-secondary" },
    { label: "CLASS", value: "FULL-STACK", color: theme === 'brutalist' ? "text-black" : "text-success" },
    { label: "HP", value: "100/100", color: theme === 'brutalist' ? "text-black" : "text-accent" },
  ];

  return (
    <section id="about" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false }}
          className="flex-1 pixel-box p-6 sm:p-8 w-full hover-box-active group"
        >
          <h2 className={`text-xl sm:text-2xl mb-8 transition-all duration-500 ${theme === 'brutalist' ? 'font-sans text-black italic text-4xl group-hover:text-white' : 'font-pixel text-neon-pink'
            }`}>
            {theme === 'brutalist' ? 'IDENTITY' : 'PLAYER PROFILE'}
          </h2>
          <p className={`mb-6 leading-relaxed transition-all duration-500 ${theme === 'brutalist' ? 'font-sans font-bold text-black text-2xl group-hover:text-white' : 'font-retro text-xl sm:text-2xl text-gray-300'
            }`}>
            Armed with a keyboard and an unhealthy amount of caffeine, I navigate the
            complex dungeons of web development. My quest is to build software that
            is as functional as it is beautiful.
          </p>
          <p className={`leading-relaxed transition-all duration-500 ${theme === 'brutalist' ? 'font-sans font-bold text-black text-2xl group-hover:text-white' : 'font-retro text-xl sm:text-2xl text-gray-300'
            }`}>
            Specializing in modern tech stacks but always respecting the classics.
            I've conquered countless bugs and deployed empires of code.
          </p>

          <div className="mt-8 pt-8 border-t-2 border-white/10 flex gap-4">
            <div className="w-3 h-3 bg-primary animate-pulse" />
            <div className="w-3 h-3 bg-secondary animate-pulse [animation-delay:0.2s]" />
            <div className="w-3 h-3 bg-success animate-pulse [animation-delay:0.4s]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false }}
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`p-4 sm:p-6 flex flex-col items-center justify-center text-center hover-box-active group ${theme === 'brutalist' ? 'border-4 border-black bg-white shadow-[10px_10px_0px_#000]' : 'pixel-box-cyan'
                }`}
            >
              <span className={`mb-2 transition-colors ${theme === 'brutalist' ? 'font-sans font-black text-xs text-black/40 group-hover:text-white/60' : 'font-pixel text-[10px] text-gray-400'}`}>
                {stat.label}
              </span>
              <span className={cn(
                "transition-colors",
                theme === 'brutalist' ? "text-3xl font-sans font-black italic group-hover:text-white" : "text-xl sm:text-2xl font-pixel",
                stat.color
              )}>
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
