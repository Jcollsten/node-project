import express from 'express';
import { loginUser } from '../controllers/authController.js';
import logger from '../utils/loggerUtil.js';
const router = express.Router();
router.post('/login', (req, res, next) => {
    logger.info('Login route accessed');
    next();
}, loginUser);
export default router;
