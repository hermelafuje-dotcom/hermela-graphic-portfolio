import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Hero from "./Hero";
import Projects from "./Projects";
import ProjectDetail from "./ProjectDetail";
import Contact from "./Contact";
import About from "./About";

function App() {
  const navigate = useNavigate();

const goToProjects = () => {
  navigate("/");

  setTimeout(() => {
    const projectsSection = document.getElementById("projects");

    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  }, 100);
};
  return (
    <div className="app">
      <header>
        <h2>Hermela</h2>

        <nav>
          <Link to="/">Home</Link>
        <button className="nav-link" onClick={goToProjects}> Projects</button>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <Routes>
    <Route
  path="/"
  element={
    <>
      <Hero />
      <Projects />
      <Contact />
    </>
  }
/>
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <footer className="footer"> 
  <p>Hermela © 2026</p>
  <span>Graphic Designer & Visual Storyteller</span>
</footer>
    </div>
  );
}

export default App;
