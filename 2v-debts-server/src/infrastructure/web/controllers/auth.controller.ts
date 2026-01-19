import { Router } from 'express';
import { RegisterUseCase } from '../../../application/auth.use-case';

const router = Router();

router.post('/sign-up', async (req, res) => {
  try {
    const user = req.body;
    const UCRegistUser = new RegisterUseCase();

    const newUser = await UCRegistUser.execute(user);

    res.status(200).json({ message: 'Login successful', user: newUser });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ message });
  }
});

export default router;
