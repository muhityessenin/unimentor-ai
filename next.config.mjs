/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  }
  ,
  // When multiple package-lock files exist in parent workspaces Next.js may infer wrong root.
  // Set turbopack.root to the current project to avoid warnings and ensure correct workspace resolution.
  turbopack: {
    // Use project-relative root. Avoid __dirname because this file is ESM and __dirname may be undefined.
    root: './'
  }
}

// Proxy /api and /auth requests to external API in development to avoid CORS issues.
// If NEXT_PUBLIC_API_URL is set to an absolute URL, lib/api.ts will use it directly.
nextConfig.rewrites = async () => {
  return [
    {
      source: '/api/:path*',
      destination: 'https://unimentor-api.pp.ua/api/:path*',
    },
    {
      source: '/auth/:path*',
      destination: 'https://unimentor-api.pp.ua/auth/:path*',
    },
  ]
}

export default nextConfig
