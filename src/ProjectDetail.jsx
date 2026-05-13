import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import projectsData from "./projectsData";

function ProjectDetail() {
  const { slug } = useParams();

  const [showAll, setShowAll] = useState({});
  const [modalImages, setModalImages] = useState([]);
  const [modalIndex, setModalIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const project = projectsData.find((item) => item.slug === slug);
  const currentIndex = projectsData.findIndex((item) => item.slug === slug);

const previousProject =
  currentIndex > 0 ? projectsData[currentIndex - 1] : null;

const nextProject =
  currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  useEffect(() => {
    if (modalImages.length > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalImages]);

  if (!project) {
    return (
      <div className="project-detail">
        <h1>Project not found</h1>
        <Link to="/">Back Home</Link>
      </div>
    );
  }

  const openModal = (images, index) => {
    setModalImages(images);
    setModalIndex(index);
    setZoomLevel(1);
  };

  const closeModal = () => {
    setModalImages([]);
    setModalIndex(0);
    setZoomLevel(1);
  };

  const prevImage = () => {
    setModalIndex((prev) =>
      prev === 0 ? modalImages.length - 1 : prev - 1
    );
    setZoomLevel(1);
  };

  const nextImage = () => {
    setModalIndex((prev) => (prev + 1) % modalImages.length);
    setZoomLevel(1);
  };

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2));
  };

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 1));
  };

  const resetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <div className="project-detail">
      <Link to="/" className="back-link">
        ← Back
      </Link>

      <span className="detail-tag">{project.type}</span>

      <h1>{project.title}</h1>

      <img
        className="project-hero-image"
        src={project.image}
        alt={project.title}
        onClick={() => openModal([project.image], 0)}
      />

      <p className="main-description">{project.details}</p>

      {project.sections &&
        project.sections.map((section, index) => {
          const imagesToShow =
            section.images && !showAll[index]
              ? section.images.slice(0, 4)
              : section.images;

          return (
            <div key={index} className="detail-section">
              <div className="section-header">
                {section.title && <h3>{section.title}</h3>}

                {section.images && (
                  <span className="image-count">
                    {String(
                      showAll[index]
                        ? section.images.length
                        : Math.min(4, section.images.length)
                    ).padStart(2, "0")}
                    {" / "}
                    {String(section.images.length).padStart(2, "0")}
                  </span>
                )}
              </div>

              <p>{section.text}</p>

              {section.images && (
                <>
                  <div className="section-gallery">
                    {imagesToShow.map((img, i) => (
                      <div
                        className="gallery-item"
                        key={i}
                        onClick={() => openModal(section.images, i)}
                      >
                        <img src={img} alt={`${section.title} ${i + 1}`} />
                      </div>
                    ))}
                  </div>

                  {section.images.length > 4 && (
                    <button
                      className="view-more-btn"
                      onClick={() =>
                        setShowAll((prev) => ({
                          ...prev,
                          [index]: !prev[index],
                        }))
                      }
                    >
                      {showAll[index] ? "Show Less" : "View More"}
                    </button>
                  )}
                </>
              )}

              {section.pdf && (
                <a
                  href={section.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn"
                >
                  Download Full Brand Guidelines
                </a>
              )}
            </div>
          );
        })}
<div className="project-navigation">
  {previousProject ? (
    <Link
      to={`/project/${previousProject.slug}`}
      className="project-nav-link"
    >
      <span>Previous</span>
      <strong>{previousProject.title}</strong>
    </Link>
  ) : (
    <div></div>
  )}

  {nextProject ? (
    <Link
      to={`/project/${nextProject.slug}`}
      className="project-nav-link next"
    >
      <span>Next</span>
      <strong>{nextProject.title}</strong>
    </Link>
  ) : (
    <div></div>
  )}
</div>

      {modalImages.length > 0 && (
        <div className="image-modal">
          <button className="modal-close" onClick={closeModal}>
            ×
          </button>

          <div className="zoom-controls">
  <button onClick={zoomOut} className="zoom-icon">
    −
  </button>

  <input
    type="range"
    min="1"
    max="2"
    step="0.1"
    value={zoomLevel}
    onChange={(e) => setZoomLevel(Number(e.target.value))}
    className="zoom-slider"
  />

  <button onClick={zoomIn} className="zoom-icon">
    +
  </button>

  <button onClick={resetZoom} className="zoom-reset">
    {Math.round(zoomLevel * 100)}%
  </button>
</div>

          {modalImages.length > 1 && (
            <button className="modal-arrow modal-prev" onClick={prevImage}>
              ‹
            </button>
          )}

          <div className="modal-image-wrapper">
            <img
              className="modal-image"
              src={modalImages[modalIndex]}
              alt="Preview"
              style={{
                transform: `scale(${zoomLevel})`,
              }}
            />
          </div>

          {modalImages.length > 1 && (
            <button className="modal-arrow modal-next" onClick={nextImage}>
              ›
            </button>
          )}

          {modalImages.length > 1 && (
            <p className="modal-count">
              {modalIndex + 1} / {modalImages.length}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;