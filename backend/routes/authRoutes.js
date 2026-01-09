import { Router } from 'express';
import { login, signup, getStatsCount } from '../controllers/authController.js';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/stats', getStatsCount);

export default router;
