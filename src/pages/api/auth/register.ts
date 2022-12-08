import { NextApiRequest, NextApiResponse } from 'next';

import UserModel from 'models/UserModel';
import dbConnect from 'lib/dbConnect';
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

  await dbConnect();

  const user = await UserModel.findOne({ email: email });

  if (user) {
    res.status(422).json({ message: 'User exists already!' });

    return;
  }
  const hashedPassword = await hashPassword(password);

  const result = await UserModel.create({
    username: username,
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: 'Created user!' });
};

export default handler;
