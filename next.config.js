/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost:3000'
            },
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
            },
        ]
    },
}

module.exports = nextConfig
