import type { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'mongoose';

import MatchModel from 'models/MatchModel';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return;

  const create = req.body.create || false;
  const match = req.body.match;

  try {
    const connection = await connect(process.env.DEVELOPMENT_DB);

    const matchModel = MatchModel;
    let newMatch = null;

    if (create) {
      newMatch = await matchModel.create({
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
      newMatch = await matchModel.findOneAndUpdate(
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

    res.status(200).json(newMatch);

    connection.disconnect();
  } catch (error) {
    res.status(400).json(error);
  }
}
