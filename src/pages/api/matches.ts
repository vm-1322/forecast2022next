import type { NextApiRequest, NextApiResponse } from 'next';

import { connect } from 'mongoose';

import MatchModel from '../../models/MatchModel';
import TeamModel from '../../models/TeamModel';
import { IMatch, ITeam } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return;

  const forecast = req.body.forecast || false;

  try {
    const connection = await connect(process.env.DEVELOPMENT_DB);

    const matchModel = MatchModel;
    const matches = await matchModel.find(forecast ? { forecast: true } : null);

    const teamModel = TeamModel;
    const teams = await teamModel.find();

    const listMatches: Array<IMatch> = [];

    matches.forEach((itemMatch: IMatch) => {
      const team1 = teams.find(
        (item: ITeam) => item.code === itemMatch.team1Code
      );
      const team2 = teams.find(
        (item: ITeam) => item.code === itemMatch.team2Code
      );

      listMatches.push({
        date: itemMatch.date,
        team1Code: itemMatch.team1Code,
        team1: {
          code: team1.code,
          name: team1.name,
          flag: team1.flag,
          link: team1.link,
          _id: team1._id,
        },
        team2Code: itemMatch.team2Code,
        team2: {
          code: team2.code,
          name: team2.name,
          flag: team2.flag,
          link: team2.link,
          _id: team2._id,
        },
        result1: itemMatch.result1,
        result2: itemMatch.result2,
        stage: itemMatch.stage,
        matchStatus: itemMatch.matchStatus,
        forecast: itemMatch.forecast,
        linkToBet: itemMatch.linkToBet,
        _id: itemMatch._id,
      });
    });

    listMatches.sort((a, b) => a.date - b.date);

    res.status(200).json(listMatches);

    connection.disconnect();
  } catch (error) {
    res.status(400).json(error);
  }
}
