import { Schema, model } from 'mongoose';

import { IScoreTable } from 'types';

const ScoreTableSchema = new Schema<IScoreTable>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  points: {
    type: Number,
    min: 0,
  },
  progress: {
    type: Number,
    min: 0,
  },
  date: {
    type: Number,
    min: 0,
  },
  numberForecasts: {
    type: Number,
    min: 0,
  },
  effectiveForecasts: {
    type: Number,
    min: 0,
  },
  canceledForecasts: {
    type: Number,
    min: 0,
  },
  expectedForecasts: {
    type: Number,
    min: 0,
  },
});

export default model<IScoreTable>('ScoreTable', ScoreTableSchema);
