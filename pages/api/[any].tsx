import type { NextApiRequest, NextApiResponse } from "next";

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
    if (urlIsJson(req.url || "")) {
        return res.status(200).send(req.query?.any || {});
    }
    res.status(200).json({ in_development: true });
}
