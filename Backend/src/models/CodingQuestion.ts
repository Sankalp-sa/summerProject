import mongoose from "mongoose";

const CodingQuestionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
    tags: [String],
    testCases: [{
        input: { type: String, required: true },
        output: { type: String, required: true },
    }],
    createdAt: { type: Date, default: Date.now }
});

const CodingQuestion = mongoose.model('CodingQuestion', CodingQuestionSchema);

export default CodingQuestion;

