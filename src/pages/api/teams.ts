import type { NextApiRequest, NextApiResponse } from 'next';

import TeamModel from 'models/TeamModel';
import dbConnect from 'lib/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const teams = await TeamModel.find();

        res.status(200).json({ success: true, data: teams });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }

      break;
    default:
      res.status(400).json({ success: false });

      break;
  }
}
