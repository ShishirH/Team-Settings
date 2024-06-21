/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.pravatar.cc'],
    },
    async rewrites() {
        return [
            {
                source: '/members/:path*',
                destination: '/api/members/:path*',
            },
        ];
    }
};

export default nextConfig;
