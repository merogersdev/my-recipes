import mongoose, { Document, Schema } from 'mongoose';

export interface UserType extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  salt: string;
  authorizationToken?: string;
  refreshToken?: string;
}

export interface UserDocument extends UserType, Document {
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  authorizationToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
});

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
