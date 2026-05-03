import Head from "next/head";
import About from "@/src/components/About";
import Contact from "@/src/components/Contact";
import Layout from "@/src/layouts/Layout";
import siteConfig from "@/src/data/siteConfig";

const { siteUrl, name } = siteConfig;
const ABOUT_DESC = "Learn more about Ejuan Henderson — multimedia artist from Kansas City. Illustration, motion design, brand identity, textile art, and everything in between.";

const AboutPage = () => {
  return (
    <Layout headerColor={"dark"}>
      <Head>
        <title>About — {name}</title>
        <meta name="description" content={ABOUT_DESC} />
        <link rel="canonical" href={`${siteUrl}/about`} />

        <meta property="og:type"        content="website" />
        <meta property="og:url"         content={`${siteUrl}/about`} />
        <meta property="og:title"       content={`About — ${name}`} />
        <meta property="og:description" content={ABOUT_DESC} />
        <meta property="og:image"       content={`${siteUrl}/static/img/Jumbled%20EJUAN%20logo%20-%20henderson%20outline%20-%2063.png`} />

        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={`About — ${name}`} />
        <meta name="twitter:description" content={ABOUT_DESC} />
        <meta name="twitter:image"       content={`${siteUrl}/static/img/Jumbled%20EJUAN%20logo%20-%20henderson%20outline%20-%2063.png`} />
        <meta name="twitter:creator"     content="@ohhej" />
      </Head>
      <About />
      <Contact />
    </Layout>
  );
};

export default AboutPage;
