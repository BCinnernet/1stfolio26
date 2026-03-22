const About = () => {
  return (
    <section
  id="about"
  className="section gray-bg"
  style={{ paddingTop: "140px", paddingBottom: "80px" }}
>
      <div className="container">
        <div className="row sm-m-25px-b m-35px-b">
          <div className="col-md-12">
            <div className="section-title">
              <h3 className="dark-color text-uppercase">.</h3>
              <p className="text-uppercase small">
                .
              </p>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-5 m-15px-tb">
            <div className="about-me-img box-shadow">
              <img src="static/img/about-us.jpg" alt="image" />
              <div className="nav social-icon">
                <a href="#">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#">
                  <i className="fab fa-instagram" />
                </a>
                <a href="#">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-7 m-15px-tb">
            <div className="about-me">
              <h4>I'M EJUAN</h4> 
              <h6>
                I care <span className="theme-color">A LOOOOOOTTT </span> about creativity and the art of art. <span className="theme-color"></span>
              </h6>
              <p>
              A lot of what I do starts with trying to understand how something should feel before figuring out how it should look. 
              I naturally step into other perspectives, translating thoughts, moods, and intentions into something tangible. 
              Whether it’s visual, motion, or concept-driven work, I’m always focused on bringing ideas to life in a way that feels honest and human.
              
              That mindset carries into everything I do. 
              I enjoy getting inside an idea, understanding where it’s coming from, and helping shape it into something clear and real. 
              A big part of my strength is being able to step into someone else’s vision, build on it, and bring it to life in a way that feels aligned and intentional.
              I also really value collaboration. Some of the best work comes from shared energy, bouncing ideas, refining them, and building something better together than you could alone. 
              At the end of the day, I just genuinely love the process of creating — taking something abstract and turning it into something people can see, feel, and connect with.
              </p>
              
              <div className="btn-bar">
                <a className="m-btn m-btn-theme" href="#work">
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
