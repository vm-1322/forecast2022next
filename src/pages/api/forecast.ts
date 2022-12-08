import type { NextApiRequest, NextApiResponse } from 'next';
import { Types } from 'mongoose';

import ForecastModel from 'models/ForecastModel';
import UserModel from 'models/UserModel';
import dbConnect from 'lib/dbConnect';
import { DBAction } from 'types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return;

  const action = req.body.action || DBAction.Read;
  const matchId = new Types.ObjectId(req.body.matchId || '');
  const userEmail = req.body.userEmail || '';
  const goal1 = req.body.goal1 || 0;
  const goal2 = req.body.goal2 || 0;
  const result = req.body.result || '';

  if (!action || !matchId || !userEmail)
    return res.status(400).json({ message: 'No access to forecast' });

  try {
    await dbConnect();

    const userModel = UserModel;
    const user = await userModel.findOne({
      email: userEmail,
    });

    if (!user) {
      return res.status(400).json({ message: 'No acsess to user' });
    }

    const forecastModel = ForecastModel;
    const forecast = await forecastModel.findOne({
      match: matchId,
      user: user._id,
    });

    if (!forecast) {
      if (DBAction[action] === DBAction.Read) {
        return res.status(200).json({});
      }

      if (
        DBAction[action] === DBAction.Add ||
        DBAction[action] === DBAction.Update
      ) {
        return res.status(404).json({ message: 'Not found' });
      }

      // DBAction[action] === DBAction.Create

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

        return res.status(200).json({ newForecast });
      } catch (error) {
        return res.status(400).json(error);
      }
    }

    if (DBAction[action] === DBAction.Create) {
      return res.status(409).json({ message: 'Conflict' });
    }

    if (DBAction[action] === DBAction.Read) {
      return res.status(200).json({
        user: forecast.user,
        match: forecast.match,
        goal1: forecast.goal1,
        goal2: forecast.goal2,
        result: forecast.result,
        history: forecast.history,
      });
    }

    if (DBAction[action] === DBAction.Add) {
      forecast.history.push({
        date: Date.now(),
        goal1: goal1,
        goal2: goal2,
      });

      const updatedForecast = await forecastModel.findOneAndUpdate(
        {
          match: matchId,
          user: user._id,
        },
        {
          goal1: goal1,
          goal2: goal2,
          history: forecast.history,
        },
        {
          new: true,
        }
      );

      return res.status(200).json({ updatedForecast });
    }

    // DBAction[action] === DBAction.Update

    const updatedForecast = await forecastModel.findOneAndUpdate(
      {
        match: matchId,
        user: user._id,
      },
      {
        result: result,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({ updatedForecast });
  } catch (error) {
    res.status(400).json(error);
  }
}
