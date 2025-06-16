// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['avatars.githubusercontent.com'],
//     remotePatterns:[{
//       protocol:'https',
//       hostname: 'novajobs.us'
//     }]
//   }
// }

// module.exports = nextConfig


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   basePath: '/airesume',
//   trailingSlash: true,
//   images: {
//     domains: ['avatars.githubusercontent.com'],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'novajobs.us',
//       },
//     ],
//   },
// }

// module.exports = nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   basePath: '/airesume',
//   trailingSlash: true,
//   images: {
//    domains: [
//       'avatars.githubusercontent.com',
//       'novajobs.us',              
//       'airesume.novajobs.us',
//       'marketplace.canva.com'      
//     ],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'airesume.novajobs.us', // ✅ fix here
//       },
//     ],
//   },
// }

// module.exports = nextConfig;


const nextConfig = {
  reactStrictMode: true,
  basePath: '/airesume',
  assetPrefix: '/airesume', // ✅ important
  images: {
    unoptimized: true, // ✅ Add this line
    domains: [
      'avatars.githubusercontent.com',
      'novajobs.us',
      'airesume.novajobs.us',
      'marketplace.canva.com',
    ],
  },
}

module.exports = nextConfig
