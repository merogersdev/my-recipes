import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import { hashString } from '../util/crypto';
import { LoginInputSchema } from '../schema/user';
import User from '../models/user';
import createError from 'http-errors';

export const loginHandler: RequestHandler = async (req, res, next) => {
  try {
    // Make sure user data is correct
    LoginInputSchema.parse(req.body);

    // Get User from DB and check password
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists === null) return next(createError(400, 'User not found'));
    const expectedHash = hashString(userExists.salt, req.body.password);
    if (userExists.password !== expectedHash) return next(createError(401, "Password doesn't match"));

    // Generate & Update Tokens
    const authorizationToken = jwt.sign({ id: userExists.id }, env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: userExists.id }, env.JWT_SECRET, { expiresIn: '1d' });
    await User.findByIdAndUpdate(userExists.id, { refreshToken });

    // Generate Response
    res.header('Authorization', authorizationToken);
    res.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      user: {
        id: userExists.id,
        firstName: userExists.firstName,
        lastName: userExists.lastName,
        email: userExists.email,
      },
      authorizationToken,
    });
  } catch (error) {
    next(error);
  }
};

export default loginHandler;
