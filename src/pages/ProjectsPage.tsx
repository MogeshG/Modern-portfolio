import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:30px_30px]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <Link to="/" className="font-pixel text-[10px] text-primary hover:underline mb-8 inline-block">
            [ BACK TO BASE ]
          </Link>
          <h1 className="text-4xl md:text-6xl font-pixel mb-6">MISSION <span className="text-neon-cyan">ARCHIVE</span></h1>
          <p className="font-retro text-2xl text-gray-400 max-w-2xl">
            A COMPLETE RECORD OF ALL DEPLOYED SYSTEMS AND DIGITAL ARTIFACTS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="pixel-box p-8 bg-black/80 flex flex-col md:flex-row gap-8 group"
              style={{ boxShadow: `12px 12px 0px var(--color-${project.color})` }}
            >
              <div className="w-full md:w-1/2 aspect-video overflow-hidden border-4 border-white">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <h2 className="text-2xl font-pixel mb-4 text-white uppercase">{project.title}</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[8px] font-pixel text-black bg-white px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="font-retro text-xl text-gray-400 leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>
                {project.link && project.link !== "#" && (<a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="pixel-button w-fit"
                >
                  ACCESS PROJECT
                </a>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
