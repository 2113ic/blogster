import mongoose, { Schema } from 'mongoose';
import type { Document } from 'mongoose'

export interface UserDocument extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema({
  username: String,
  password: String,
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
