import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { useTheme } from "../context/ThemeContext";

const Projects = () => {
  const { theme } = useTheme();

  return (
    <section id="projects" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className={`mb-6 transition-all duration-500 ${
            theme === 'brutalist' ? 'font-sans font-black italic text-4xl sm:text-5xl md:text-6xl text-black' : 'text-2xl sm:text-3xl font-pixel text-white'
          }`}>
            QUEST <span className="text-neon-pink">{theme === 'brutalist' ? 'LOG' : 'LOG'}</span>
          </h2>
          <p className={`max-w-md transition-all duration-500 ${
            theme === 'brutalist' ? 'font-sans font-bold text-black text-2xl' : 'font-retro text-2xl text-gray-400'
          }`}>
            ARCHIVE OF COMPLETED MISSIONS AND PROJECTS.
          </p>
        </div>
        <Link to="/projects" className={`transition-all duration-500 ${
          theme === 'brutalist' 
            ? 'font-sans font-black text-xl italic text-secondary hover:bg-black hover:text-white px-2 border-2 border-black' 
            : 'font-pixel text-[10px] text-secondary hover:underline'
        }`}>
          {theme === 'brutalist' ? 'EXPLORE ARCHIVE →' : '[ VIEW ALL MISSIONS ]'}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: index * 0.1 }}
            className={`flex flex-col overflow-hidden group transition-all duration-500 ${
              theme === 'brutalist' 
                ? 'bg-white border-8 border-black shadow-[15px_15px_0px_#000]' 
                : 'bg-surface border-4 border-white'
            }`}
            style={{ boxShadow: theme === 'retro' ? `10px 10px 0px var(--color-${project.color})` : undefined }}
          >
            <div className={`aspect-[16/10] overflow-hidden relative border-b-4 ${theme === 'brutalist' ? 'border-black' : 'border-white'}`}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                {project.link && project.link !== "" && project.link !== "#" && (
                  <a href={project.link} className="pixel-button">
                    {theme === 'brutalist' ? 'ACCESS' : 'LAUNCH PROJECT'}
                  </a>
                )}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className={`px-2 py-1 transition-all duration-500 ${
                    theme === 'brutalist' 
                      ? 'text-xs font-sans font-black bg-black text-white' 
                      : 'text-[8px] font-pixel text-black bg-white'
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className={`mb-4 uppercase transition-all duration-500 ${
                theme === 'brutalist' ? 'font-sans font-black italic text-3xl text-black' : 'text-lg font-pixel text-white'
              }`}>
                {project.title}
              </h3>
              <p className={`leading-relaxed mb-6 transition-all duration-500 ${
                theme === 'brutalist' ? 'font-sans font-bold text-black/60 text-lg' : 'font-retro text-xl text-gray-400'
              }`}>
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
