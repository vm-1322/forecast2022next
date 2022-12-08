import type { NextApiRequest, NextApiResponse } from 'next';

import MatchModel from 'models/MatchModel';
import dbConnect from 'lib/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { method } = req;

  const create = req.body.create || false;
  const match = req.body.match;

  switch (method) {
    case 'POST':
      try {
        let newMatch = null;

        if (create) {
          newMatch = await MatchModel.create({
            date: match.date,
            team1: match.team1,
            team1Code: match.team1Code,
            team2: match.team2,
            team2Code: match.team2Code,
            result1: match.result1 ? match.result1 : '',
            result2: match.result2 ? match.result1 : '',
            stage: match.stage,
            forecast: match.forecast,
            matchStatus: match.matchStatus,
            linkToBet: match.linkToBet,
          });
        } else {
          newMatch = await MatchModel.findOneAndUpdate(
            { _id: match._id },
            {
              date: match.date,
              team1: match.team1,
              team1Code: match.team1Code,
              team2: match.team2,
              team2Code: match.team2Code,
              result1: match.result1 ? match.result1 : '',
              result2: match.result2 ? match.result2 : '',
              stage: match.stage,
              forecast: match.forecast,
              matchStatus: match.matchStatus,
              linkToBet: match.linkToBet,
            }
          );
        }

        res.status(200).json({ success: true, data: newMatch });
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
