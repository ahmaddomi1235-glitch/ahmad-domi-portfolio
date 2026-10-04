import type { NextConfig } from "next";

const CANONICAL_HOST = "ahmaddomiedu.com";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async redirects() {
    return [
      // Old Arabic alias of the home page.
      { source: "/ar", destination: "/", permanent: true },
      // www → apex (the canonical host). Inert until www.ahmaddomiedu.com resolves to this project.
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${CANONICAL_HOST}` }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
