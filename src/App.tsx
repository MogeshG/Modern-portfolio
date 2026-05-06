import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ProjectsPage from "./pages/ProjectsPage";
import { useTheme } from "./context/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}

function App() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 relative overflow-x-hidden transition-colors duration-500">
      <ScrollToTop />
      {theme === 'retro' && (
        <>
          <div className="scanlines" />
          <div className="scanline-move" />
        </>
      )}
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </main>

      <footer className={`py-6 px-4 border-t-4 text-center font-pixel text-[10px] transition-all duration-500 ${theme === 'brutalist' ? 'bg-black text-white border-black font-sans font-bold text-sm' : 'bg-transparent text-gray-400 border-white'
        }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p>© 2026 MOGESH. ALL RIGHTS RESERVED.</p>
          <p className={theme === 'brutalist' ? 'text-accent' : 'text-secondary'}>
            ENGINE: {theme === 'brutalist' ? 'RAW REACT' : 'REACT'}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
