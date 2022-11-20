import { Schema, model } from 'mongoose';

import { IRole } from '../types/index';

const RoleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

export default model('Role', RoleSchema);
