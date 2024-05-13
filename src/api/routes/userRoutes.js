import express from 'express'
const router = express.Router()
import User from '../controllers/userController.js';

// GET

// POST
router.post('/create', User.save)

// PUT

// DELETE

export default router;