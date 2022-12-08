import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import UserModel from 'models/UserModel';
import RoleModel from 'models/RoleModel';
import dbConnect from 'lib/dbConnect';
import { checkPassword } from 'utility/common';

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await dbConnect();

        const user = await UserModel.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No user found!');
        }

        const isValid = await checkPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Could not log you in!');
        }

        const roles = await RoleModel.find();

        let listRoles = '';

        if (roles) {
          user.roles.forEach((userRole) => {
            roles.forEach((curRole) => {
              if (userRole._id.toString() === curRole._id.toString()) {
                listRoles += '"' + curRole.name + '",';
              }
            });
          });
        }

        const arrRols = `[${listRoles.slice(0, -1)}]`;

        return {
          email: user.email,
          name: user.username,
          image: `{roles: ${arrRols}}`,
        };
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
