// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ListenOptions } from 'net';
import type { NextApiRequest, NextApiResponse } from 'next';
import { notion } from '../../lib/notion/client';

const databaseId = process.env.NOTION_DATABASE_ID;

interface Response {}

export default async function (req: NextApiRequest, res: NextApiResponse<Response>) {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  res.status(200).json({ response });
}
