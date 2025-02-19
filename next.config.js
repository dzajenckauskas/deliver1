/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    experimental: {
        optimizeFonts: true,
    },
    images: {
        domains: ["154.49.136.99:4000", "154.49.136.99", "154.49.136.99:1344", "flagcdn.com", 'api.deliver1.co.uk'],
    },
    // images: {
    //     remotePatterns: [
    //         // {
    //         //     protocol: 'http',
    //         //     hostname: '154.49.136.99',
    //         //     pathname: 'uploads/**',
    //         // },
    //         {
    //             protocol: 'http',
    //             hostname: '154.49.136.99',
    //             port: '1344',
    //             pathname: '/uploads/**',
    //         }
    //     ],
    // },
};

module.exports = nextConfig;
