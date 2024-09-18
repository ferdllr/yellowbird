import mongoose, { Schema } from 'mongoose';

const postSchema = new mongoose.Schema({
  text: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  likes: [{type: Schema.Types.ObjectId, ref: 'Like', required: true}]
});

export const PostModel = mongoose.model('Post', postSchema);