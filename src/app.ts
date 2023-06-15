import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

import globalErrorHandling from './app/middleware/globalErrorHandling';

import { logger } from './shared/logger';
import router from './app/routes';
import httpStatus from 'http-status';

// to change the node env to production type in cli: $env:NODE_ENV = "production"

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', router);

logger.info(app.get('env'));

// gobal error handling
app.use(globalErrorHandling);

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
  next();
});

export default app;
