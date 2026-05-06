import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const skills = [
  { name: "React", color: "border-primary", bColor: "bg-primary" },
  { name: "TypeScript", color: "border-secondary", bColor: "bg-secondary" },
  { name: "Node.js", color: "border-success", bColor: "bg-success" },
  { name: "MySQL", color: "border-accent", bColor: "bg-accent" },
  { name: "Postgres", color: "border-white", bColor: "bg-white" },
  { name: "Electron", color: "border-success", bColor: "bg-success" },
  { name: "MongoDB", color: "border-accent", bColor: "bg-accent" },
  { name: "Express", color: "border-secondary", bColor: "bg-secondary" },
  { name: "AWS", color: "border-secondary", bColor: "bg-secondary" },
  { name: "Docker", color: "border-primary", bColor: "bg-primary" },
  { name: "AI", color: "border-white", bColor: "bg-white" },
  { name: "Next.js", color: "border-success", bColor: "bg-success" },
];

const Skills = () => {
  const { theme } = useTheme();

  return (
    <section id="skills" className={`py-24 px-4 transition-colors duration-500 ${theme === 'brutalist' ? 'bg-[#f0f0f0]' : 'bg-[#0a0a0a]'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className={`mb-6 transition-all duration-500 ${
            theme === 'brutalist' ? 'font-sans font-black italic text-6xl text-black' : 'text-2xl sm:text-3xl font-pixel text-white'
          }`}>
            TECH <span className="text-secondary">SKILLS</span>
          </h2>
          <p className={`transition-all duration-500 ${
            theme === 'brutalist' ? 'font-sans font-black text-black/50 text-2xl uppercase italic' : 'font-retro text-xl sm:text-2xl text-gray-400'
          }`}>
            {theme === 'brutalist' ? 'POWER-UP REPOSITORY' : 'UNLOCKED ABILITIES AND POWER-UPS'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              whileHover={{ scale: 1.05, rotate: theme === 'brutalist' ? -2 : 2 }}
              className={`p-6 sm:p-8 border-4 text-center group cursor-pointer transition-all duration-500 ${
                theme === 'brutalist' 
                  ? `border-black ${skill.bColor} shadow-[8px_8px_0px_#000]` 
                  : `bg-black ${skill.color}`
              }`}
              style={{ boxShadow: theme === 'retro' ? `6px 6px 0px white` : undefined }}
            >
              <div className={`transition-all duration-500 ${
                theme === 'brutalist' 
                  ? 'text-3xl font-sans font-black italic text-black group-hover:tracking-widest' 
                  : 'text-lg sm:text-xl font-pixel text-white group-hover:text-secondary'
              }`}>
                {skill.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
