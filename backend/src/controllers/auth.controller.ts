import { FastifyRequest, FastifyReply } from 'fastify';
import { registerUser, loginUser } from '../services/auth.service';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    
    const data = registerSchema.parse(request.body);

    const result = await registerUser(data);

    return reply.status(201).send({
      message: 'User registered successfully',
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
      error: 'Registration Failed',
      message: error.message,
    });
  }
}

export async function loginController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
 
    const data = loginSchema.parse(request.body);

    const result = await loginUser(data);

    return reply.status(200).send({
      message: 'Login successful',
      data: result,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return reply.status(400).send({
        error: 'Validation Error',
        message: error.errors,
      });
    }

    return reply.status(401).send({
      error: 'Authentication Failed',
      message: error.message,
    });
  }
}