import type { NextApiRequest, NextApiResponse } from 'next';

import ScoreTableModel from 'models/ScoreTableModel';
import { DBAction } from 'types';
import dbConnect from 'lib/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { method } = req;

  const action = req.body.action || DBAction.Read;
  const arrScoreTable = req.body.scoreTable || [];

  switch (method) {
    case 'POST':
      try {
        switch (action) {
          case DBAction.Read:
            const scoreTable = await ScoreTableModel.find().populate(
              'user',
              'username email'
            );

            res.status(201).json({ success: true, data: scoreTable });

            break;
          case DBAction.Update:
            const arrScoreTablePromise = [];

            arrScoreTable.forEach((curRow) => {
              arrScoreTablePromise.push(
                ScoreTableModel.findOneAndUpdate(
                  {
                    user: curRow.user,
                  },
                  {
                    points: curRow.points,
                    progress: 0,
                    date: curRow.dateForecast,
                    numberForecasts: curRow.numberForecasts,
                    effectiveForecasts: curRow.effectiveForecasts,
                    canceledForecasts: curRow.canceledForecasts,
                    expectedForecasts: curRow.expectedForecasts,
                  },
                  {
                    upsert: true,
                  }
                )
              );
            });

            Promise.allSettled(arrScoreTablePromise).then(() =>
              res
                .status(200)
                .json({ success: true, message: 'ScoreTable was updated.' })
            );

            res.status(201).json({ success: true });

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
