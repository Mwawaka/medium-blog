import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2022-03-25",
  useCdn: process.env.NODE_ENV === "production",
};

const client = sanityClient(config);

export default async function createComment(
  // typescript 
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, comment } = JSON.parse(req.body);
  try {
    await client.create({
      // creates a new document in sanity cms 
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id
      },
      name,
      email,
      comment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Could not submit comment", error });
  }
  console.log("Comment submitted");
  return res.status(200).json({ message: "Comment submitted" }) //required to solve the error 
}
