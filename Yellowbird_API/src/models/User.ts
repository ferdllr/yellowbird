import mongoose, { Schema, Document } from 'mongoose';
  
  // Schema de Usuário
  const userSchema = new Schema({
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    Posts: [{
        type: Schema.Types.ObjectId,
        ref:'Post',
        required: true
    }],
    Likes: [{
      type: Schema.Types.ObjectId,
        ref:'Like',
        required: true
    }]
  });
  
  // Modelo de Usuário
  export const UserModel = mongoose.model('User', userSchema);