/** @type {import('next').NextConfig} */

// ─────────────────────────────────────────────────────────────────────────────
// SECURITY HEADERS
// These are sent with every page response to protect visitors on your site.
// They don't change anything visual — they just add a layer of safety.
// ─────────────────────────────────────────────────────────────────────────────
const securityHeaders = [

  {
    // Stops other websites from embedding your site inside an <iframe>.
    // Prevents "clickjacking" — where someone tricks a user into clicking
    // something on your site while it's hidden inside another page.
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },

  {
    // Tells the browser to trust the file type you declare, not guess it.
    // Prevents attackers from tricking a browser into running a file
    // (e.g. an image) as a script.
    key: "X-Content-Type-Options",
    value: "nosniff",
  },

  {
    // Controls what URL information is shared when a visitor clicks a link
    // leaving your site. "strict-origin-when-cross-origin" means external
    // sites only see your domain name, not the full page path.
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },

  {
    // Disables browser features your portfolio doesn't use.
    // Prevents any embedded content from quietly accessing a visitor's
    // camera, microphone, or location — even if they somehow got onto your page.
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },

  {
    // Tells browsers to always use HTTPS for future visits, even if someone
    // types plain "http://" in the address bar.
    // max-age=63072000 = 2 years (standard recommended value).
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },

];

const nextConfig = {
  reactStrictMode: true,

  // Apply the security headers to every route on the site
  async headers() {
    return [
      {
        source: "/(.*)", // matches all pages
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
