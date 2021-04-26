import { connectToDatabase } from "./_connector";

export default async (req, res) => {
  const db = await connectToDatabase();

  if (req.body !== '' && req.body.link !== undefined && req.body.link !== '') {
    const collection = db.db('shorty').collection('links_collection')
    const entry = await collection.insertOne({ link: req.body.link });

    res.statusCode = 201;
    return res.json({ short_link: `https://${process.env.VERCEL_URL}/r/${entry.insertedId}` });
  }

  res.statusCode = 409;
  res.json({ error: 'no_link_found', error_description: 'No link found'})
}