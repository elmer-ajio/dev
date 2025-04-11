import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name } = req.body;
      const user = await prisma.user.create({
        data: { name },
      });
      res.status(201).json(user);
    } catch (error) {
      next(error)
    }
  }

  async getAllUsers(req: Request, res: Response,  next: NextFunction): Promise<void> {
    try {
      const users = await prisma.user.findMany({
        where: { deleted_at: null },
        orderBy: { created_at: 'desc' },
      });
      res.json(users);
    } catch (error) {
        next(error)
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = BigInt(req.params.id);
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user || user.deleted_at) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
        next(error)
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = BigInt(req.params.id);
      const { name } = req.body;

      const user = await prisma.user.update({
        where: { id },
        data: { name, updated_at: new Date() },
      });
      res.json(user);
    } catch (error) {
        next(error)
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = BigInt(req.params.id);
      const user = await prisma.user.update({
        where: { id },
        data: { deleted_at: new Date(), updated_at: new Date() },
      });
      res.json({ message: 'User soft-deleted', user });
    } catch (error) {
        next(error)
    }
  }
}

const userController = new UserController();

export default userController;
