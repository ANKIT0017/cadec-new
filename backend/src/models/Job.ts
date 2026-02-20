import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: string;
  company: string;
  description: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship';
  experienceLevel: string;
  applyLink: string;
  companyLogo?: string;
  salary?: string;
  requirements: string[];
  postedBy: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship'],
    required: true
  },
  experienceLevel: {
    type: String,
    required: true
  },
  applyLink: {
    type: String,
    required: true
  },
  companyLogo: {
    type: String
  },
  salary: {
    type: String
  },
  requirements: [{
    type: String,
    trim: true
  }],
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IJob>('Job', JobSchema);
