const { MongoClient, ServerApiVersion } = require('mongodb');

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@jsonurl.bdigtqz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

export const insertRecord = async (collection: string, data: any) => {
    const db = client.db('jsonurl');
    await db.collection(collection).insertOne(data);
};

export const getRecord = async (id: string) => {
    const db = client.db('jsonurl');
    const record = await db.collection('urls').findOne({ _id: id });
    return record;
};
