import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title, subject, downloadUrl, type, createdAt } = req.body;

    if (!title || !subject || !downloadUrl || !type || !createdAt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const client = await clientPromise;
    const db = client.db('db'); // Change to your actual database name
    const collection = db.collection('pdfs');

    const result = await collection.insertOne({
      title,
      subject,
      downloadurl:downloadUrl,
      type:type=="application/pdf"?"pdf":type,
      createdAt,
    });

    res.status(201).json({ message: 'Data stored successfully', data: result });
  } catch (error) {
    console.error('MongoDB Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
