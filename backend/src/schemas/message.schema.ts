import { z } from 'zod';

export const sendMessageSchema = z.object({
  content: z.string().min(1, 'Message content is required'),
  chatId: z.string().uuid('Invalid chat ID').optional(),
});

export const createChatSchema = z.object({
  title: z.string().min(1, 'Chat title is required').optional(),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type CreateChatInput = z.infer<typeof createChatSchema>;