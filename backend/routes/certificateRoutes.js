import { Router } from 'express';
import { recordDownload } from '../controllers/certificateController.js';

const router = Router();

router.post('/certificates/download', recordDownload);

export default router;
