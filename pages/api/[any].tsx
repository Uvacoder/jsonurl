import type { NextApiRequest, NextApiResponse } from "next";
import { getRecord } from "api/mongo";

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

    // BEht is the sample json
    const record = await getRecord(req.url?.slice(1) || "BEht");
    try {
        return res.status(200).send(JSON.parse(record.body));
    } catch {
        return res.status(200).json({ in_development: true });
    }
}
