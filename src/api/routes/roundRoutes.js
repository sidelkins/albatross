import express from 'express'
const router = express.Router()
import Round from '../controllers/roundController.js';

// GET
router.get('/get/by/userid/:id', Round.getByUserId)
router.get('/get/by/id/:id', Round.getById)

// POST
router.post('/create', Round.save)

// PUT

// DELETE
router.delete('/delete/by/id/:id', Round.deleteById)

export default router;