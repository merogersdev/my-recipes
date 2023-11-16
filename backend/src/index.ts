import 'dotenv/config';
import express, { type Application } from 'express';
import pc from 'picocolors';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env';
import connectDB from './config/db';
import errorHandler, { notFoundHandler } from './middleware/error';
import indexRouter from './routes';

const port = env.PORT || 5000;
const app: Application = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(helmet());

// Use Morgan in Development
if (env.NODE_ENV !== 'production') app.use(morgan('tiny'));

// API Routes
app.use('/api/v1/', indexRouter);

// 404 Errors
app.use('*', notFoundHandler);

// Error Handler
app.use(errorHandler);

// Listen
app.listen(port, () => {
  console.log(pc.blue(`> Server is running on port ${port}`));
});

/* --- Endpoints ---

--- Auth ---

# Login
POST /api/v1/auth | 200
  { User }

--- Health ---

# Health Check
GET /api/v1/health | 200

--- Users ---

# List of Users
GET /api/v1/users | 200
  { listOfUsers - No Passwords }

# User Details
GET /api/v1/user/id | 200
  { User }

# Create User
POST /api/v1/user | 201
  { newUser }

# Modify User
PATCH /api/v1/user | 200
  { modifiedUser }

#Delete User
DELETE /api/v1/user | 200

--- Recipes ---

GET /api/v1/recipes | 200
  { listOfRecipes }

GET /api/v1/recipe/id | 200
  { recipe }

POST /api/v1/recipe | 201
  { newRecipe }

PATCH /api/v1/recipe/id | 200
  { modifiedRecipe }

DELETE /api/v1/recipe/id | 200

--- 404 ---

ANY /notfound | 404
  { message: "Endpoint Not Found" }

*/
