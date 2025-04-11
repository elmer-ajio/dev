import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@src/database/prisma';
import { constant } from '@src/resources';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],

});


class UserController {
  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
     
      const { name } = req.body;
      const user = await prisma.user.create({
        data: { name },
      });
      res.status(200).json({
        message: constant.USER_CREATED,
        user,
      });
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
      res.status(200).json({
        message: constant.USER_UPDATED,
        users,
      });
    } catch (error) {
      console.log(error);
        next(error)
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user || user.deleted_at) {
        res.status(404).json({
            message: constant.USER_NOT_FOUND,
            user: null,
         });
        return;
      }
      res.status(200).json({
        message: constant.USER_UPDATED,
        user,
      });
    } catch (error) {
        next(error)
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      
      const { name } = req.body;
      

      await prisma.user.update({
        where: { id },
        data: { name, updated_at: new Date() },
      });
    res.status(200).json({
        message: constant.USER_UPDATED,
       
    });
    } catch (error) {
     
        next(error)
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      await prisma.user.update({
        where: { id },
        data: { deleted_at: new Date(), updated_at: new Date() },
      });
      res.status(200).json({ message: constant.USER_DELETED });
    } catch (error) {
        next(error)
    }
  }
}

const userController = new UserController();

export default userController;
