import { FastifyInstance } from 'fastify';
import {
  sendMessageController,
  getMessagesController,
  getChatsController,
} from '../controllers/message.controller';
import { authenticate } from '../middlewares/auth.middleware';

export async function messageRoutes(app: FastifyInstance) {
  
  app.post('/message', { preHandler: [authenticate] }, sendMessageController);
  app.get('/messages', { preHandler: [authenticate] }, getMessagesController);
  app.get('/chats', { preHandler: [authenticate] }, getChatsController);
}