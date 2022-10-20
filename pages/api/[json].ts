import type { NextApiRequest, NextApiResponse } from 'next';
import { getRecord } from 'api/mongo';

const urlIsJson = (url: string): boolean => {
    const decodedUrl = decodeURI(url);
    if (decodedUrl.startsWith('/{')) return true;
    if (decodedUrl.startsWith('/[')) return true;
    return false;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    console.log(req.query);
    if (urlIsJson(req.url || '')) {
        // return res.status(200).send(req.query?.json || {});

        setTimeout(
            () => {
                res.status(200).send(req.query?.json || {});
            },
            req.query?.delay ? parseInt(`${req.query?.delay}000`) : 0
        );
        return;
    }

    // BEht is the sample json
    const record = await getRecord((req.query?.json as string) || 'BEht');

    if (record?.python && !record?.body) {
        let code = record.python;
        code = code.replace(/print\(.*\)/gi, '');
        code = code + `\nprint(${record.variable})`;

        const data = { language: 'python', source: code };
        const response = await fetch('https://emkc.org/api/v1/piston/execute', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        const result = await response.json();
        const output = result.output;
        console.log(result);
        if (!output) {
            return res.status(500).send(result);
        }
        try {
            JSON.parse(output);
            return res.status(200).send(JSON.parse(output));
        } catch (error) {
            return res.status(200).send(output);
        }
    }

    try {
        setTimeout(
            () => {
                res.status(200).send(JSON.parse(record.body));
            },
            record.delay ? parseInt(`${record?.delay}000`) : 0
        );
    } catch (e) {
        return res.status(404).json({ name: 'Not Found' });
    }
}
