import express from 'express'
const router = express.Router()
import Round from '../controllers/roundController.js';

// GET
router.get('/get/byuserid', Round.getByUserId)

// POST
router.post('/create', Round.save)

// PUT

// DELETE

export default router;