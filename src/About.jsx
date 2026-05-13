import { Link } from "react-router-dom";
import hermelaAvatar from "./assets-optimized/hermelaAvatar.webp";
import canva from "./assets-optimized/tools/Canva.webp";
import ps from "./assets-optimized/tools/PS.webp";
import figma from "./assets-optimized/tools/Figma.webp";
export default function About() {
  return (
    <section className="about">
      <div className="about-hero">
        <div className="about-left">
          <p className="about-label">About Me</p>

          <h1>
            Designer focused on bold visuals, branding, and clear communication.
          </h1>

          <p className="about-text">
            I’m Hermela, a graphic designer focused on branding, social media
            design, poster design, and visual storytelling. I create clean,
            energetic designs that are easy to understand and made to stand out.
          </p>

          <div className="about-tags">
            <Link to="/project/logo-projects">Branding</Link>
            <Link to="/project/social-media-posts">Social Media</Link>
            <Link to="/project/poster-projects">Poster Design</Link>
          </div>
        </div>

        <div className="about-right">
          <img className="floating-tool tool-one" src={canva} alt="Canva" />
          <img className="floating-tool tool-two" src={ps} alt="Photoshop" />
          <img className="floating-tool tool-three" src={figma} alt="Figma" />
          <img
            className="about-avatar"
            src={hermelaAvatar}
            alt="Hermela illustration"
          />
        </div>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3>What I Design</h3>
          <p>
            Logos, brand identity visuals, social media campaigns, posters, and
            promotional graphics.
          </p>
        </div>

        <div className="about-card">
          <h3>My Style</h3>
          <p>
            Bold typography, strong color choices, clean layouts, and visuals
            that grab attention without feeling messy.
          </p>
        </div>

        <div className="about-card">
          <h3>My Focus</h3>
          <p>
            I focus on clarity, hierarchy, consistency, and designs that work in
            real use.
          </p>
        </div>

        <div className="about-card">
          <h3>Tools</h3>
          <p>Canva, Photoshop, and Figma.</p>
        </div>
      </div>
    </section>
  );
}