import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connect } from 'mongoose';

import { checkPassword } from '../../../utility/common';
import UserModel from '../../../models/UserModel';

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const connection = await connect(process.env.DEVELOPMENT_DB);
        const userModel = UserModel;

        const user = await userModel.findOne({ email: credentials.email });

        if (!user) {
          connection.disconnect();

          throw new Error('No user found!');
        }

        const isValid = await checkPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          connection.disconnect();

          throw new Error('Could not log you in!');
        }

        connection.disconnect();

        return { email: user.email, name: user.username };
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token;
    },
  },
};

export default NextAuth(authOptions);
