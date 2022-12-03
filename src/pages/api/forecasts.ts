import type { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'mongoose';

import ForecastModel from 'models/ForecastModel';
import TeamModel from 'models/TeamModel';
import { IForecast, ITeam } from 'types';

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
      .populate('user', 'username email')
      .populate(
        'match',
        'date team1 team1Code team2 team2Code result1 result2 matchStatus linlToBet'
      );

    const teamModel = TeamModel;
    const teams = await teamModel.find();

    const listForecasts: Array<IForecast> = [];

    forecasts.forEach((itemForecast: IForecast) => {
      const userJSON = JSON.parse(JSON.stringify(itemForecast.user));
      const matchJSON = JSON.parse(JSON.stringify(itemForecast.match));

      const team1 = teams.find(
        (item: ITeam) => item.code === matchJSON.team1Code
      );
      const team2 = teams.find(
        (item: ITeam) => item.code === matchJSON.team2Code
      );

      listForecasts.push({
        goal1: itemForecast.goal1,
        goal2: itemForecast.goal2,
        history: itemForecast.history,
        result: itemForecast.result,
        user: userJSON._id,
        match: matchJSON._id,
        matchDetails: {
          user: { username: userJSON.username, email: userJSON.email },
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

    listForecasts.sort((a, b) => a.history[0].date - b.history[0].date);

    res.status(200).json(listForecasts);

    connection.disconnect();
  } catch (error) {
    res.status(400).json(error);
  }
}
