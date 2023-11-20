import { type RequestHandler } from 'express';
import { CreateUserInputSchema, UserIdSchema } from '../schema/user';
import User from '../models/user';
import { hashString, randomString } from '../util/crypto';
import createError from 'http-errors';

// type Jwt = {
//   id: string;
//   iat: number;
//   exp: number;
// };

// interface TokenRequest extends Request {
//   user: Jwt;
// }

// interface TokenResponse extends Response {
//   user: Jwt;
// }

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
    next(error);
  }
};

export const readUserHandler: RequestHandler = async (req, res, next) => {
  try {
    // Make sure Params are correct is of the right type
    UserIdSchema.parse(req.params);

    const userExists = await User.findOne({ _id: req.params.id });
    if (userExists === null) return next(createError(404, 'User not found'));

    res.status(200).json({
      user: {
        firstName: userExists.firstName,
        lastName: userExists.lastName,
        email: userExists.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const allUsersHandler: RequestHandler = async (_req, res, next) => {
  try {
    // Return Users with no sensitive data
    const users = await User.find().select(['-password', '-salt', '-authorizationToken', '-refreshToken']);
    if (users === null) return next(createError(404, 'No Users found'));

    res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserHandler: RequestHandler = async (req, res, next) => {
  try {
    UserIdSchema.parse(req.params);
    // TODO: Add Body Validation
    const userExists = await User.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    if (userExists === null) return next(createError(404, 'User not found'));
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const deleteUserHandler: RequestHandler = async (req, res, next) => {
  try {
    UserIdSchema.parse(req.params);

    const userExists = await User.findOne({ _id: req.params.id });
    if (userExists === null) return next(createError(404, 'User not found'));
    await User.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export default createUserHandler;
