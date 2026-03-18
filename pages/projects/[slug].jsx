import { useRouter } from "next/router";
import Layout from "@/src/layouts/Layout";
import projects from "@/src/data/projects";

const ProjectDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <Layout headerColor={"dark"}>
        <section
          className="section gray-bg"
          style={{ paddingTop: "140px", paddingBottom: "80px" }}
        >
          <div className="container">
            <h2>Project not found</h2>
            <p>This project page does not exist yet.</p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout headerColor={"dark"}>
      <section
        className="section gray-bg"
        style={{ paddingTop: "140px", paddingBottom: "80px" }}
      >
        <div className="container">
          {/* Title Area */}
          <div className="row sm-m-25px-b m-35px-b">
            <div className="col-md-12">
              <div className="section-title">
                <h3 className="dark-color text-uppercase">{project.title}</h3>
                <p className="text-uppercase small">{project.category}</p>
              </div>
              <p style={{ maxWidth: "760px", marginTop: "20px" }}>
                {project.intro}
              </p>
            </div>
          </div>

          {/* Main Media + Text */}
          <div
            className="row align-items-center"
            style={{ marginBottom: "60px" }}
          >
            <div className="col-lg-5 m-15px-tb">
              <div className="about-me-img box-shadow">
                {project.mainMediaType === "video" && project.mainVideo ? (
                  <video controls style={{ width: "100%", display: "block" }}>
                    <source src={project.mainVideo} type="video/mp4" />
                  </video>
                ) : (
                  <img src={project.mainImage} alt={project.title} />
                )}
              </div>
            </div>

            <div className="col-lg-7 m-15px-tb">
              <div className="about-me">
                <h4>{project.title}</h4>
                <h6>{project.category}</h6>

                <div className="row about-list">
                  <div className="col-md-6">
                    <div className="media">
                      <label>Overview</label>
                      <p>{project.overview}</p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="media">
                      <label>Process</label>
                      <p>{project.process}</p>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="media">
                      <label>Notes</label>
                      <p>{project.behindTheScenes}</p>
                    </div>
                  </div>
                </div>

                <div className="btn-bar">
                  <a className="m-btn m-btn-theme" href="/#work">
                    Back to Work
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="row" style={{ marginTop: "20px" }}>
              {project.galleryImages.map((img, index) => (
                <div key={index} className="col-md-4 m-15px-tb">
                  <img
                    src={img}
                    alt={`${project.title} gallery ${index + 1}`}
                    style={{
                      width: "100%",
                      display: "block",
                      borderRadius: "6px",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;