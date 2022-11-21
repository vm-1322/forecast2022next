import type { NextApiRequest, NextApiResponse } from 'next';

import { connect } from 'mongoose';

import TeamModel from '../../models/TeamModel';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') return;

  try {
    const connection = await connect(process.env.DEVELOPMENT_DB);

    const teamModel = TeamModel;
    const teams = await teamModel.find();

    res.status(200).json(teams);

    connection.disconnect();
  } catch (error) {
    res.status(400).json(error);
  }
}
