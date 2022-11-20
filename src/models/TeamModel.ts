import { Schema, model } from 'mongoose';

import { ITeam } from '../types/index';

const TeamSchema = new Schema<ITeam>({
  code: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 3,
    uppercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  flag: {
    type: String,
    trim: true,
  },
  link: {
    type: String,
    trim: true,
  },
});

export default model('Team', TeamSchema);
