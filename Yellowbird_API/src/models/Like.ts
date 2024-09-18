import mongoose, { Schema } from 'mongoose';

const likeSchema = new mongoose.Schema({
  author: {type: Schema.Types.ObjectId, required: true},
  post: {type: Schema.Types.ObjectId, required: true}
});

export const LikeModel = mongoose.model('Like', likeSchema);