import { FastifyInstance } from 'fastify';
import {
  getProfileController,
  updateProfileController,
} from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

export async function userRoutes(app: FastifyInstance) {

  app.get('/me', { preHandler: [authenticate] }, getProfileController);
  app.patch('/me', { preHandler: [authenticate] }, updateProfileController);
}