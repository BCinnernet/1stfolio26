import About from "@/src/components/About";
import Contact from "@/src/components/Contact";
import Layout from "@/src/layouts/Layout";

const AboutPage = () => {
  return (
    <Layout headerColor={"dark"}>
      <About />
      <Contact />
    </Layout>
  );
};

export default AboutPage;