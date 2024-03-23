import express from 'express';

import authRoute from './authRoute.js';
import imageRouter from './imageRoute.js';
const rootRoute = express.Router();
rootRoute.use('/images', imageRouter);
rootRoute.use('/auth', authRoute);

export default rootRoute;
