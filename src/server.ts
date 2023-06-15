import mongoose from 'mongoose';
import config from './config/index';
import app from './app';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

// uncaught exception
process.on('uncaughtException', error => {
  logger.error(`uncaught exception is detected, ${error}`);
  process.exit(1);
});

let server: Server;

const connector = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database is connected successfully');

    server = app.listen(config.port, () => {
      logger.info(`Application app listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(`failed to load data ${error}`);
  }

  process.on('unhandledRejection', error => {
    console.log(
      'unhandled rejection is detected, we are closing our server....'
    );
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

connector();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
