import type { NextApiRequest, NextApiResponse } from 'next';

import ForecastModel from 'models/ForecastModel';
import TeamModel from 'models/TeamModel';
import { DBAction, IForecast, ITeam } from 'types';
import dbConnect from 'lib/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { method } = req;

  const action = req.body.action || DBAction.Read;
  const forecastsToUpdate = req.body.forecastsToUpdate || [];

  switch (method) {
    case 'POST':
      try {
        switch (action) {
          case DBAction.Read:
            const forecasts = await ForecastModel.find()
              .populate('user', 'username email')
              .populate(
                'match',
                'date team1 team1Code team2 team2Code result1 result2 matchStatus linlToBet'
              );

            const teams = await TeamModel.find();

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

            res.status(200).json({ success: true, data: listForecasts });

            break;
          case DBAction.Update:
            const arrForecastPromise = [];

            forecastsToUpdate.forEach((curForecast) => {
              arrForecastPromise.push(
                ForecastModel.findOneAndUpdate(
                  {
                    match: curForecast.forecast.matchId,
                    user: curForecast.forecast.userId,
                  },
                  {
                    result: curForecast.result,
                  }
                )
              );
            });

            Promise.allSettled(arrForecastPromise).then(() =>
              res.status(200).json({ message: 'Forecasts were updated.' })
            );

            break;
          default:
            res.status(400).json({ success: false });

            break;
        }
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
