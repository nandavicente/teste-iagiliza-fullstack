import { FastifyRequest, FastifyReply } from 'fastify';
import { getUserProfile, updateUserProfile } from '../services/user.service';
import { updateProfileSchema } from '../schemas/auth.schema';

export async function getProfileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = request.userId;

    const user = await getUserProfile(userId);

    return reply.status(200).send({
      message: 'Profile retrieved successfully',
      data: user,
    });
  } catch (error: any) {
    return reply.status(404).send({
      error: 'Not Found',
      message: error.message,
    });
  }
}

export async function updateProfileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = request.userId;

    const data = updateProfileSchema.parse(request.body);

    const user = await updateUserProfile(userId, data);

    return reply.status(200).send({
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return reply.status(400).send({
        error: 'Validation Error',
        message: error.errors,
      });
    }

    return reply.status(400).send({
      error: 'Update Failed',
      message: error.message,
    });
  }
}