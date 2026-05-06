import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-3xl font-pixel mb-6">QUEST <span className="text-neon-pink">LOG</span></h2>
          <p className="font-retro text-2xl text-gray-400 max-w-md">
            ARCHIVE OF COMPLETED MISSIONS AND PROJECTS.
          </p>
        </div>
        <Link to="/projects" className="font-pixel text-[10px] text-secondary hover:underline">
          [ VIEW ALL MISSIONS ]
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`flex flex-col bg-surface border-4 border-white overflow-hidden group`}
            style={{ boxShadow: `10px 10px 0px var(--color-${project.color})` }}
          >
            <div className="aspect-[16/10] overflow-hidden relative border-b-4 border-white">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                {project.link && project.link !== "#" && (
                  <a href={project.link} className="pixel-button">
                    LAUNCH PROJECT
                  </a>
                )}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[8px] font-pixel text-black bg-white px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-pixel mb-4 text-white uppercase">{project.title}</h3>
              <p className="font-retro text-xl text-gray-400 leading-relaxed mb-6">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
