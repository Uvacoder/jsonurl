import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

const urlIsJson = (url: string): boolean => {
    const decodedUrl = decodeURI(url);
    if (decodedUrl.startsWith("/{")) return true;
    if (decodedUrl.startsWith("/[")) return true;
    return false;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    if (urlIsJson(req.url || "")) {
        return res.status(200).send(req.query?.any || {});
    }
    res.status(200).json({ in_development: true });
}
