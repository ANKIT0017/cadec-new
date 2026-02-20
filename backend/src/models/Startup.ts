import mongoose, { Document, Schema } from 'mongoose';

export interface IStartup extends Document {
  name: string;
  description: string;
  logo?: string;
  founders: string[];
  status: 'Incubated' | 'Accelerated';
  website?: string;
  category: string;
  yearFounded: number;
  funding?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StartupSchema = new Schema<IStartup>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  logo: {
    type: String
  },
  founders: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['Incubated', 'Accelerated'],
    required: true
  },
  website: {
    type: String
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  yearFounded: {
    type: Number,
    required: true
  },
  funding: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IStartup>('Startup', StartupSchema);
