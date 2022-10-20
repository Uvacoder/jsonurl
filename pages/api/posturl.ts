import type { NextApiRequest, NextApiResponse } from 'next';
import { insertRecord } from 'api/mongo';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method !== 'POST') {
        res.status(405).json({ name: 'Method Not Allowed' });
        return;
    }

    const result = await insertRecord(JSON.parse(req.body));
    if (!result.ok) {
        res.status(500).json({ name: 'Internal Server Error' });
        return;
    }
    if (!result.value) {
        res.status(404).json({ name: 'Not Found' });
        return;
    }
    res.status(200).json({ _id: result.value._id });
}
