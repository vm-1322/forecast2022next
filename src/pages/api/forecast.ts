import type { NextApiRequest, NextApiResponse } from 'next';
import { connect, Types } from 'mongoose';

import ForecastModel from '../../models/ForecastModel';
import UserModel from '../../models/UserModel';
import { ForecastAction } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return;

  const forecastAction = req.body.forecastAction || ForecastAction.Read;
  const matchId = new Types.ObjectId(req.body.matchId || '');
  const userEmail = req.body.userEmail || '';
  const goal1 = req.body.goal1 || 0;
  const goal2 = req.body.goal2 || 0;

  if (!forecastAction || !matchId || !userEmail)
    return res.status(400).json({ message: 'No access to forecast' });

  try {
    const connection = await connect(process.env.DEVELOPMENT_DB);

    const userModel = UserModel;
    const user = await userModel.findOne({
      email: userEmail,
    });

    if (!user) {
      connection.disconnect();

      return res.status(400).json({ message: 'No acsess to user' });
    }

    const forecastModel = ForecastModel;
    const forecast = await forecastModel.findOne({
      match: matchId,
      user: user._id,
    });

    if (!forecast) {
      if (ForecastAction[forecastAction] === ForecastAction.Read) {
        connection.disconnect();

        return res.status(200).json({});
      }

      if (ForecastAction[forecastAction] === ForecastAction.Write) {
        connection.disconnect();

        return res.status(404).json({ message: 'Not found' });
      }

      // ForecastAction.Create

      try {
        const newForecast = await forecastModel.create({
          match: matchId,
          user: user._id,
          goal1: goal1,
          goal2: goal2,
          history: [
            {
              date: Date.now(),
              goal1: goal1,
              goal2: goal2,
            },
          ],
          result: '',
        });

        connection.disconnect();

        return res.status(200).json({ newForecast });
      } catch (error) {
        connection.disconnect();

        return res.status(400).json(error);
      }
    }

    if (ForecastAction[forecastAction] === ForecastAction.Create) {
      connection.disconnect();

      return res.status(409).json({ message: 'Conflict' });
    }

    if (ForecastAction[forecastAction] === ForecastAction.Read) {
      connection.disconnect();

      return res.status(200).json({
        user: forecast.user,
        match: forecast.match,
        goal1: forecast.goal1,
        goal2: forecast.goal2,
        history: forecast.history,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
}
