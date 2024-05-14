import express from 'express'
const router = express.Router()
import User from '../controllers/userController.js';

// GET
router.get('/get/byid', User.getById)
router.get('/get/byusername', User.getByUsername)

// POST
router.post('/create', User.save)

// PUT

// DELETE

export default router;