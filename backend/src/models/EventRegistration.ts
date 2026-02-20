import mongoose, { Document, Schema } from 'mongoose';

export interface IEventRegistration extends Document {
  eventId: string;
  userId: mongoose.Types.ObjectId;
  answers: {
    questionId: string;
    question: string;
    answer: string;
    questionType: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox';
    options?: string[];
  }[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: mongoose.Types.ObjectId;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventRegistrationSchema = new Schema<IEventRegistration>({
  eventId: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: [{
    questionId: {
      type: String,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    questionType: {
      type: String,
      enum: ['text', 'textarea', 'select', 'radio', 'checkbox'],
      required: true
    },
    options: [{
      type: String
    }]
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  reviewedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

// Ensure one registration per user per event
EventRegistrationSchema.index({ eventId: 1, userId: 1 }, { unique: true });

export default mongoose.model<IEventRegistration>('EventRegistration', EventRegistrationSchema);

