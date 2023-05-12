import clientPromise from "../../lib/mongodb";
import cors from 'cors'

const corsMiddleware = cors({
  // Set the origin to allow requests from the specified domain
  origin: 'https://notesspace.netlify.app/'
});

export default async function handler(req, res) {
  // Apply the cors middleware to allow cross-origin requests
  corsMiddleware(req, res, async () => {
    const client = await clientPromise;
    const db = client.db("db");
    switch (req.method) {
      case "POST":
        let bodyObject = JSON.parse(req.body);
        let myPost = await db.collection("pdfs").insertOne(bodyObject);
        res.json(myPost);
        break;
      case "GET":
        const allPosts = await db.collection("pdfs").find({}).toArray();
        res.json({ status: 200, data: allPosts });
        break;
    }
  });
}
