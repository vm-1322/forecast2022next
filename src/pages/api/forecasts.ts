import type { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'mongoose';

import ForecastModel from '../../models/ForecastModel';
import TeamModel from '../../models/TeamModel';
import { IForecast, ITeam } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return;

  try {
    const connection = await connect(process.env.DEVELOPMENT_DB);

    const forecasthModel = ForecastModel;
    const forecasts = await forecasthModel
      .find()
      .populate({ path: 'user', select: 'username email' })
      .populate({
        path: 'match',
        select: 'date team1Code team2Code result1 result2 matchStatus',
      });

    forecasts.sort((a, b) => a.history[0].date - b.history[0].date);

    const listForecasts: Array<IForecast> = [];

    const teamModel = TeamModel;
    const teams = await teamModel.find();

    forecasts.forEach((itemForecast: IForecast) => {
      const matchJSON = JSON.parse(JSON.stringify(itemForecast.match));

      const team1 = teams.find(
        (item: ITeam) => item.code === matchJSON.team1Code
      );
      const team2 = teams.find(
        (item: ITeam) => item.code === matchJSON.team2Code
      );

      listForecasts.push({
        match: itemForecast.match,
        user: itemForecast.user,
        goal1: itemForecast.goal1,
        goal2: itemForecast.goal2,
        history: itemForecast.history,
        result: itemForecast.result,
        matchDetails: {
          date: matchJSON.date,
          result1: matchJSON.result1,
          result2: matchJSON.result2,
          team1: {
            code: team1.code,
            name: team1.name,
            flag: team1.flag,
          },
          team2: {
            code: team2.code,
            name: team2.name,
            flag: team2.flag,
          },
          matchStatus: matchJSON.matchStatus,
          _id: matchJSON._id,
        },
      });
    });

    res.status(200).json(listForecasts);

    connection.disconnect();
  } catch (error) {
    res.status(400).json(error);
  }
}
