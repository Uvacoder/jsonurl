/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // async headers() {
    //     return [
    //         { key: "Access-Control-Allow-Credentials", value: "true" },
    //         { key: "Access-Control-Allow-Origin", value: "*" }, // Change this to specific domain for better security
    //         {
    //             key: "Access-Control-Allow-Methods",
    //             value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    //         },
    //         {
    //             key: "Access-Control-Allow-Headers",
    //             value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    //         },
    //     ],
    // },

    // async headers() {
    //     return [
    //         {
    //             source: "/:path*",
    //             headers: [
    //                 { key: "Access-Control-Allow-Origin", value: "*" },
    //                 {
    //                     key: "Access-Control-Allow-Methods",
    //                     value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    //                 },
    //                 {
    //                     key: "Access-Control-Allow-Headers",
    //                     value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    //                 },
    //             ],
    //         },
    //         {
    //             source: "/api/:path*",
    //             headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
    //         },
    //     ];
    // },
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
