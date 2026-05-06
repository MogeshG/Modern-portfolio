import { motion } from "framer-motion";

const skills = [
  { name: "React", color: "border-primary", shadow: "shadow-primary" },
  { name: "TypeScript", color: "border-secondary", shadow: "shadow-secondary" },
  { name: "Node.js", color: "border-success", shadow: "shadow-success" },
  { name: "MySQL", color: "border-accent", shadow: "shadow-accent" },
  { name: "Postgres", color: "border-white", shadow: "shadow-white" },
  { name: "Electron", color: "border-success", shadow: "shadow-success" },
  { name: "MongoDB", color: "border-accent", shadow: "shadow-accent" },
  { name: "Express", color: "border-secondary", shadow: "shadow-secondary" },
  { name: "AWS", color: "border-secondary", shadow: "shadow-secondary" },
  { name: "Docker", color: "border-primary", shadow: "shadow-primary" },
  { name: "AI", color: "border-white", shadow: "shadow-white" },
  { name: "Next.js", color: "border-success", shadow: "shadow-success" },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-2xl sm:text-3xl font-pixel mb-6">TECH <span className="text-secondary">SKILLS</span></h2>
          <p className="font-retro text-xl sm:text-2xl text-gray-400">UNLOCKED ABILITIES AND POWER-UPS</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className={`p-6 sm:p-8 bg-black border-4 ${skill.color} text-center group cursor-pointer transition-transform`}
              style={{ boxShadow: `6px 6px 0px white` }}
            >
              <div className="text-lg sm:text-xl font-pixel text-white group-hover:text-secondary whitespace-nowrap">
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
