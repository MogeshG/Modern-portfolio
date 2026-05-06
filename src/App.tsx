import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ProjectsPage from "./pages/ProjectsPage";

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
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 relative overflow-x-hidden">
      <div className="scanlines" />
      <div className="scanline-move" />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </main>

      <footer className="py-6 px-4 border-t-4 border-white text-center text-gray-400 font-pixel text-[10px]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p>© 2026 MOGESH. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">[PRIVACY]</a>
            <a href="#" className="hover:text-primary transition-colors">[TERMS]</a>
          </div>
          <p className="text-secondary">ENGINE: REACT</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
