// next.config.js
const nextConfig = {
  // Remove 'export' mode to enable API routes and server-side features
  // output: 'export', // Commented out for Amplify integration
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;