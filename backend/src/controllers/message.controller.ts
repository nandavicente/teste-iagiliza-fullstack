import { FastifyRequest, FastifyReply } from 'fastify';
import {
  sendMessage,
  getMessagesHistory,
  getUserChats,
} from '../services/message.service';
import { sendMessageSchema } from '../schemas/message.schema';

export async function sendMessageController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = request.userId;

    const data = sendMessageSchema.parse(request.body);

    const result = await sendMessage(userId, data);

    return reply.status(201).send({
      message: 'Message sent successfully',
      data: result,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return reply.status(400).send({
        error: 'Validation Error',
        message: error.errors,
      });
    }

    return reply.status(400).send({
      error: 'Send Message Failed',
      message: error.message,
    });
  }
}

export async function getMessagesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = request.userId;
    const { chatId } = request.query as { chatId?: string };

    const messages = await getMessagesHistory(userId, chatId);

    return reply.status(200).send({
      message: 'Messages retrieved successfully',
      data: messages,
    });
  } catch (error: any) {
    return reply.status(400).send({
      error: 'Get Messages Failed',
      message: error.message,
    });
  }
}

export async function getChatsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = request.userId;

    const chats = await getUserChats(userId);

    return reply.status(200).send({
      message: 'Chats retrieved successfully',
      data: chats,
    });
  } catch (error: any) {
    return reply.status(400).send({
      error: 'Get Chats Failed',
      message: error.message,
    });
  }
}
