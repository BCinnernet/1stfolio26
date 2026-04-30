import projects from "@/src/data/projects";
import siteConfig from "@/src/data/siteConfig";

const STATIC_PAGES = [
  { path: "",       priority: "1.0", changefreq: "monthly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
];

function buildSitemap(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
}

function url(loc, priority, changefreq) {
  return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const base = siteConfig.siteUrl;

  const staticUrls = STATIC_PAGES.map((p) =>
    url(`${base}${p.path}`, p.priority, p.changefreq)
  );

  const projectUrls = projects
    .filter((p) => p.slug !== "various-projects")
    .map((p) => url(`${base}/projects/${p.slug}`, "0.7", "monthly"));

  const sitemap = buildSitemap([...staticUrls, ...projectUrls]);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}
