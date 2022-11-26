import { Schema, model } from 'mongoose';

import { IForecast } from '../types/index';

const ForecastSchema = new Schema<IForecast>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  match: {
    type: Schema.Types.ObjectId,
    ref: 'Match',
  },
  goal1: {
    type: Number,
    min: 0,
  },
  goal2: {
    type: Number,
    min: 0,
  },
  history: [
    {
      date: {
        type: Number,
        required: true,
      },
      goal1: {
        type: Number,
        min: 0,
      },
      goal2: {
        type: Number,
        min: 0,
      },
    },
  ],
  result: {
    type: String,
    trim: true,
    maxlength: 2,
  },
});

export default model<IForecast>('Forecast', ForecastSchema);
