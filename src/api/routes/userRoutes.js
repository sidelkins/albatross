import express from 'express'
import { 
    getUser, 
    createUser, 
    getUserById, 
    getUserByUsername } from '../controllers/userController.js';
const router = express.Router()

router.get('/get/byid', getUserById);
router.get('/get/byusername', getUserByUsername);
router.post('/create', createUser);

export default router;