import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';


import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
import { messageRoutes } from './routes/message.routes';

dotenv.config();

const app = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'development' ? 'info' : 'error',
  },
});

async function registerPlugins() {
  await app.register(cors, {
    origin: true, 
    credentials: true,
  });
}

async function registerRoutes() {
  app.get('/', async () => {
    return {
      message: 'IAgiliza Chat API is running!',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  });

  await app.register(authRoutes);
  await app.register(userRoutes);
  await app.register(messageRoutes);
}

async function start() {
  try {
    await registerPlugins();
    await registerRoutes();

    const PORT = Number(process.env.PORT) || 3333;
    const HOST = '0.0.0.0';

    await app.listen({ port: PORT, host: HOST });

    console.log('');
    console.log(' Server is running!');
    console.log(` API: http://localhost:${PORT}`);
    console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('');
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

const signals = ['SIGINT', 'SIGTERM'];

signals.forEach((signal) => {
  process.on(signal, async () => {
    console.log('');
    console.log(`Received ${signal}, closing server...`);
    await app.close();
    process.exit(0);
  });
});

start();
