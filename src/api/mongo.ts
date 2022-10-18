const { MongoClient, ServerApiVersion } = require('mongodb');

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@jsonurl.bdigtqz.mongodb.net/?retryWrites=true&w=majority`;

export const insertRecord = async (collection: string, data: any) => {
    const client = await new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
    });

    const db = client.db('jsonurl');
    await db.collection(collection).insertOne(data);
    client.close();
};

export const getRecord = async (id: string) => {
    const client = await new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
    });

    const db = client.db('jsonurl');
    const record = await db.collection('urls').findOne({ _id: id });
    client.close();
    return record;
};
