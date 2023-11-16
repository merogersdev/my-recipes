import { type RequestHandler } from 'express';
import { CreateUserInputSchema } from '../schema/user';
import User from '../models/user';
import { hashString, randomString } from '../util/crypto';
import createError from 'http-errors';

const createUserHandler: RequestHandler = async (req, res, next) => {
  try {
    // User Input Validation
    CreateUserInputSchema.parse(req.body);

    // Check if user already is registered
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists !== null) return next(createError(400, 'User already exists'));

    // Create new User
    const salt = await randomString();
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashString(salt, req.body.password),
      salt,
      authorizationToken: '',
      refreshToken: '',
    });
    await newUser.save();

    // Return Response
    res.status(201).json({
      newUser: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(createError(500, 'Failed to Create user'));
  }
};

export default createUserHandler;
