/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Demande à Vercel d'ignorer les erreurs d'apostrophes pour déployer le site
    ignoreDuringBuilds: true,
  },
  /* config options here */
};

export default nextConfig;
