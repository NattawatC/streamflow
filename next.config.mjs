/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aqiicwjuhmbsjxsdmzhp.supabase.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
