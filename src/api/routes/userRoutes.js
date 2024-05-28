import express from 'express'
const router = express.Router()
import User from '../controllers/userController.js';

// GET
router.get('/get/by/id/:id', User.getById)
router.get('/get/by/username/:username', User.getByUsername)

// POST
router.post('/create', User.save)
router.post('/login', User.login)

// PUT

// DELETE

export default router;