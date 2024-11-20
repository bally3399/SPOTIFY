import type { NextConfig } from "next";
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 't.scdn.co',
                pathname: '/**',
            },

            {
                protocol: 'https',
                hostname: 'charts-images.scdn.co',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'concerts.spotifycdn.com',
                pathname: '/**',
            },


        ],
    },
};

export default nextConfig;

