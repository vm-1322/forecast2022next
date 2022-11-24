import type { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'mongoose';

import ForecastModel from '../../models/ForecastModel';

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
      .populate({ path: 'user', select: 'username -_id' });

    forecasts.sort((a, b) => a.history[0].date - b.history[0].date);

    res.status(200).json(forecasts);

    connection.disconnect();
  } catch (error) {
    res.status(400).json(error);
  }
}
