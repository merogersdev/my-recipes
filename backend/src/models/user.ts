import mongoose from 'mongoose';

export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  salt: string;
  authorizationToken: string;
  refreshToken: string;
}

const UserSchema = new mongoose.Schema({
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

const User = mongoose.model('User', UserSchema);

export default User;
