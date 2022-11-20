import { Schema, model } from 'mongoose';

import { IMatch } from '../types/index';

const MatchSchema = new Schema<IMatch>({
  date: {
    type: Number,
    required: true,
  },
  team1Code: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 3,
  },
  team1: {
    type: Schema.Types.ObjectId,
    ref: 'team1',
  },
  team2Code: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 3,
  },
  team2: {
    type: Schema.Types.ObjectId,
    ref: 'team2',
  },
  result1: {
    type: String,
    trim: true,
    maxlength: 2,
  },
  result2: {
    type: String,
    trim: true,
    maxlength: 2,
  },
  stage: {
    kind: {
      type: String,
      trim: true,
    },
    groupRound: {
      type: String,
      trim: true,
    },
    round: {
      type: Number,
    },
  },
  matchStatus: {
    type: String,
    trim: true,
  },
  forecast: {
    type: Boolean,
  },
  linkToBet: {
    type: String,
    trim: true,
  },
});

export default model('Match', MatchSchema);
