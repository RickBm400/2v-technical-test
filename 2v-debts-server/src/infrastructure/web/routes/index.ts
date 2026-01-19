import AuthControllers from '../controllers/auth.controller';
import DebtControllers from '../controllers/debt.controller';
import UserController from '../controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.use('/auth', AuthControllers);
router.use('/debt', DebtControllers);
router.use('/user', UserController);

export default router;
