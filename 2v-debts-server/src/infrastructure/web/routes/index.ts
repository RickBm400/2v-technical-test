import AuthControllers from '../controllers/auth.controller';
import DebtControllers from '../controllers/debt.controller';
import { Router } from 'express';

const router = Router();

router.use('/auth', AuthControllers);
router.use('/debt', DebtControllers);

export default router;
