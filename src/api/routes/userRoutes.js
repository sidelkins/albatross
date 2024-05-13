import express from 'express'
import { getUser, createUser } from '../controllers/userController.js';
const router = express.Router()

router.get('/get', getUser);
router.post('/create', createUser);

export default router;