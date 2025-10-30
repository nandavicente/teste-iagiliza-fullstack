import { prisma } from '../config/database';
import { generateAIResponse } from '../utils/ai.util';
import type { SendMessageInput } from '../schemas/message.schema';

export async function sendMessage(userId: string, data: SendMessageInput) {
  let chatId = data.chatId;

  if (!chatId) {
    const newChat = await prisma.chat.create({
      data: {
        userId,
        title: 'New Chat',
      },
    });
    chatId = newChat.id;
  } else {
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId,
      },
    });

    if (!chat) {
      throw new Error('Chat not found or access denied');
    }
  }

  const userMessage = await prisma.message.create({
    data: {
      content: data.content,
      role: 'user',
      userId,
      chatId,
    },
  });

  const aiResponseContent = generateAIResponse();

  const aiMessage = await prisma.message.create({
    data: {
      content: aiResponseContent,
      role: 'assistant',
      userId,
      chatId,
    },
  });

  return {
    chatId,
    userMessage,
    aiMessage,
  };
}

export async function getMessagesHistory(userId: string, chatId?: string) {
  const whereClause: any = { userId };

  if (chatId) {
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId,
      },
    });

    if (!chat) {
      throw new Error('Chat not found or access denied');
    }

    whereClause.chatId = chatId;
  }

  const messages = await prisma.message.findMany({
    where: whereClause,
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      content: true,
      role: true,
      chatId: true,
      createdAt: true,
    },
  });

  return messages;
}

export async function getUserChats(userId: string) {
  const chats = await prisma.chat.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      messages: {
        take: 1,
        orderBy: { createdAt: 'desc' },
        select: {
          content: true,
          role: true,
        },
      },
    },
  });

  return chats;
}
