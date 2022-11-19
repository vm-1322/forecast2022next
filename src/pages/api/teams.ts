import type { NextApiRequest, NextApiResponse } from 'next';

import { connect } from 'mongoose';

import TeamModel from '../../models/TeamModel';
import { ITeam } from '../../types';
import { connected } from 'process';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const connection = await connect(process.env.DEVELOPMENT_DB);

      const teamModel = TeamModel;
      const teams = await teamModel.find();

      console.log(teams);

      res.status(200).json(
        teams.map((item) => ({
          code: item.code,
          name: item.name,
          flag: item.flag,
          link: item.link,
          _id: item._id as string,
        }))
      );

      connection.disconnect();
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
