import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the response interface
interface IResponse extends Document {
  testId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  score : Number;
  responses: {
    questionId: mongoose.Types.ObjectId;
    answer: Number;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
  given: Boolean;
}

// Define the response schema
const responseSchema = new Schema<IResponse>({
  testId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Test'
  },
  studentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Student'
  },
  score: {
    type: Number,
  },
  responses: [{
    questionId: {
      type: Schema.Types.ObjectId,
      ref: 'Question'
    },
    answer: {
      type: Number,
    }
  }],
  given: {
    type: Boolean,
    default: false
  }
  
}, {
  timestamps: true
});

// Create a composite unique index on testId and studentId
responseSchema.index({ testId: 1, studentId: 1 }, { unique: true });

// Create the model
const StudentResponse: Model<IResponse> = mongoose.model<IResponse>('StudentResponse', responseSchema);

export default StudentResponse;
