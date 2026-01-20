import { Router } from 'express';
import asyncHandler from '../middlewares/async-handler.middleware';
import {
  CreateDebtUseCase,
  DeleteDebtUseCase,
  ListDebtPaginatedUseCase,
  UpdateDebtUseCase,
} from '../../../application/debt.use-case';
import { CustomError } from '../middlewares/error-handler.middleware';
import { authMiddleware } from '../middlewares/jwt-header.middleware';

const router = Router();

// get debts paginated and / or filtered
router.get(
  '/',
  asyncHandler(async (req, res) => {
    res.status(200);
  }),
);

// get debts info by id
// pupulate movements sorted
router.get(
  '/paginated',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.user?.userId || null;
    if (!userId) throw new CustomError('Forbidden access', 403);

    const { status, search, limit, page } = req.query as any;

    const debtPaginatedUseCase = new ListDebtPaginatedUseCase();
    const result = await debtPaginatedUseCase.execute(
      userId,
      {
        status,
        search,
      },
      { limit, page },
    );

    res.status(200).json({
      message: 'Debts retrieved successfully',
      data: result,
    });
  }),
);

// export debts data to csv
// router.get('/:id/export');

// get completed debts using aggregations
// router.get('/:id');

// set new debt
router.post(
  '/',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.user?.userId || null;
    if (!userId) throw new CustomError('Forbidden access', 403);
    const debt = req.body;
    const createDebt = new CreateDebtUseCase();

    const newDebt = await createDebt.execute({
      creditor_id: userId,
      ...debt,
    });

    res.status(200).json({
      message: 'Debt created successfully',
      data: newDebt,
    });
  }),
);

// update debt info
router.patch(
  '/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.user?.userId || null;
    if (!userId) throw new CustomError('Forbidden access', 403);

    const debt = req.body;
    const debtId = req.params.id as string;

    const updateDebt = new UpdateDebtUseCase();
    await updateDebt.execute(debtId, { ...debt, creditor_id: userId });

    res.status(200).json({
      message: 'Debt Updated successfully',
    });
  }),
);

// make debt payment
// add movement and update status if needed
// router.patch('/:id/payment');

// delete debt
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const debtId = req.params.id as string;

    const deleteDebt = new DeleteDebtUseCase();
    await deleteDebt.execute(debtId);

    res.status(200).json({
      message: 'Debt deleted successfully',
      data: {
        debtId,
      },
    });
  }),
);

export default router;
