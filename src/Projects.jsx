import { Link } from "react-router-dom";
import projectsData from "./projectsData";

function Projects() {
  return (
    <section id="projects" className="projects">
      <h2>Selected Projects</h2>

      <div className="project-list">
        {projectsData.map((project) => (
          <Link
            to={`/project/${project.slug}`}
            className="project-card"
            key={project.slug}
          >
            <img src={project.image} alt={project.title} />

            <div className="project-content">
              <span>{project.type}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Projects;