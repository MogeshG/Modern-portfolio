import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { useTheme } from "../context/ThemeContext";

const ProjectsPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen pt-44 sm:pt-48 pb-24 px-4 transition-colors duration-500 ${theme === 'brutalist'
        ? 'bg-white bg-[linear-gradient(90deg,rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(rgba(0,0,0,.05)_1px,transparent_1px)] bg-[size:40px_40px]'
        : 'bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:30px_30px]'
      }`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <Link to="/" className={`mb-8 inline-block transition-all duration-500 ${theme === 'brutalist'
              ? 'font-sans font-black text-xl italic text-primary hover:bg-black hover:text-white px-2 border-2 border-black'
              : 'font-pixel text-[10px] text-primary hover:underline'
            }`}>
            {theme === 'brutalist' ? '← RETURN TO HUB' : '[ BACK TO BASE ]'}
          </Link>
          <h1 className={`mb-6 transition-all duration-500 ${theme === 'brutalist' ? 'text-6xl md:text-8xl font-sans font-black italic text-black uppercase' : 'text-4xl md:text-6xl font-pixel'
            }`}>
            MISSION <span className={theme === 'brutalist' ? 'bg-secondary text-white px-2' : 'text-neon-cyan'}>ARCHIVE</span>
          </h1>
          <p className={`max-w-2xl transition-all duration-500 ${theme === 'brutalist' ? 'font-sans font-bold text-black text-3xl' : 'font-retro text-2xl text-gray-400'
            }`}>
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
              className={`p-8 flex flex-col md:flex-row gap-8 group transition-all duration-500 ${theme === 'brutalist'
                  ? 'bg-white border-8 border-black shadow-[20px_20px_0px_#000]'
                  : 'pixel-box bg-black/80'
                }`}
              style={{ boxShadow: theme === 'retro' ? `12px 12px 0px var(--color-${project.color})` : undefined }}
            >
              <div className={`w-full md:w-1/2 aspect-video overflow-hidden border-4 ${theme === 'brutalist' ? 'border-black' : 'border-white'}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <h2 className={`mb-4 uppercase transition-all duration-500 ${theme === 'brutalist' ? 'font-sans font-black italic text-3xl text-black' : 'text-2xl font-pixel text-white'
                  }`}>
                  {project.title}
                </h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className={`px-2 py-1 transition-all duration-500 ${theme === 'brutalist' ? 'text-xs font-sans font-black bg-black text-white' : 'text-[8px] font-pixel text-black bg-white'
                      }`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p className={`leading-relaxed mb-8 flex-1 transition-all duration-500 ${theme === 'brutalist' ? 'font-sans font-bold text-black/60 text-lg' : 'font-retro text-xl text-gray-400'
                  }`}>
                  {project.description}
                </p>
                {project.link && project.link !== "" && project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="pixel-button w-fit"
                  >
                    {theme === 'brutalist' ? 'OPEN MISSION' : 'ACCESS PROJECT'}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
