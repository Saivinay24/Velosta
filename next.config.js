/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'api.mapbox.com'],
    },
    transpilePackages: ['mapbox-gl'],
}

module.exports = nextConfig
