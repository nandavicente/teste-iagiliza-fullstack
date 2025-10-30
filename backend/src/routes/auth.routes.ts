import { FastifyInstance } from 'fastify';
import {
  registerController,
  loginController,
} from '../controllers/auth.controller';

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', registerController);
  app.post('/login', loginController);
}