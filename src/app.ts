import express from 'express';
import battleRouter from './routes/battleRouter.js';

const router = express.Router();
router.use(battleRouter);

export default router;