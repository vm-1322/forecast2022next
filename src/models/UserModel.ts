import { Schema, model } from 'mongoose';

import { IUser } from '../types/index';

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
});

export default model<IUser>('User', UserSchema);
