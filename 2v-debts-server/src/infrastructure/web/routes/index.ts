import AuthControllers from '../controllers/auth.controller';
import { Router } from 'express';

const router = Router();

router.use('/auth', AuthControllers);

export default router;
