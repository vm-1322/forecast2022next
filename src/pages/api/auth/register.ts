import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'mongoose';

import UserModel from 'models/UserModel';
import { isValidEmail, isValidPassword, hashPassword } from 'utility/common';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return;

  const { username, email, password } = req.body;

  if (!username || !isValidEmail(email) || isValidPassword(password)) {
    res.status(422).json({
      message: 'Invalid user name or email or password.',
    });

    return;
  }

  const connection = await connect(process.env.DEVELOPMENT_DB);

  const userModel = UserModel;
  const user = await userModel.findOne({ email: email });

  if (user) {
    res.status(422).json({ message: 'User exists already!' });

    connection.disconnect();

    return;
  }
  const hashedPassword = await hashPassword(password);

  const result = await userModel.create({
    username: username,
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: 'Created user!' });

  connection.disconnect();
};

export default handler;
