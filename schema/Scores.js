import { models, model, Schema } from "mongoose";

const scoreSchema = new Schema({
  score: Number,
  date: String,
  email: String,
});

const ScoreModel = models.score || model("score", scoreSchema);

export default ScoreModel;
