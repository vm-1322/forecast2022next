import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connect } from 'mongoose';

import UserModel from 'models/UserModel';
import RoleModel from 'models/RoleModel';
import { checkPassword } from 'utility/common';

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

        const roleModel = RoleModel;
        const roles = await roleModel.find();

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

        connection.disconnect();

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
