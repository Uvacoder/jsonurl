/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: "/:path*",
                destination: "/api/:path*",
            },
        ];
    },
};

module.exports = nextConfig;
