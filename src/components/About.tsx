import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const About = () => {
  const stats = [
    { label: "LEVEL", value: "23", color: "text-primary" },
    { label: "EXP", value: "2 YEARS", color: "text-secondary" },
    { label: "CLASS", value: "FULL-STACK", color: "text-success" },
    { label: "HP", value: "100/100", color: "text-accent" },
  ];

  return (
    <section id="about" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="flex-1 pixel-box p-6 sm:p-8 bg-black/50 w-full"
        >
          <h2 className="text-xl sm:text-2xl font-pixel mb-8 text-neon-pink">PLAYER PROFILE</h2>
          <p className="font-retro text-xl sm:text-2xl text-gray-300 leading-relaxed mb-6">
            Armed with a keyboard and an unhealthy amount of caffeine, I navigate the 
            complex dungeons of web development. My quest is to build software that 
            is as functional as it is beautiful.
          </p>
          <p className="font-retro text-xl sm:text-2xl text-gray-300 leading-relaxed">
            Specializing in modern tech stacks but always respecting the classics. 
            I've conquered countless bugs and deployed empires of code.
          </p>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="pixel-box-cyan p-4 sm:p-6 flex flex-col items-center justify-center text-center"
            >
              <span className="text-[10px] font-pixel text-gray-400 mb-2">{stat.label}</span>
              <span className={cn("text-xl sm:text-2xl font-pixel", stat.color)}>{stat.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
