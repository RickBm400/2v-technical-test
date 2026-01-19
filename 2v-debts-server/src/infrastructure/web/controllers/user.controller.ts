import { Router } from 'express';
import AsyncHandler from '../middlewares/async-handler.middleware';
import { authMiddleware } from '../middlewares/jwt-header.middleware';
import { CustomError } from '../middlewares/error-handler.middleware';
import { GetUserListUserCase } from '../../../application/user.use-case';

const router = Router();

router.get(
  '/',
  authMiddleware,
  AsyncHandler(async (req, res) => {
    const userId = req.user?.userId || null;
    if (!userId) throw new CustomError('Forbidden access', 403);

    const getAllUsers = new GetUserListUserCase();
    const users = await getAllUsers.execute(userId);

    res.status(200).json({
      message: 'Users retrieved successfully',
      data: users,
    });
  }),
);

export default router;
