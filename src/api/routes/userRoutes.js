import express from 'express'
import { 
    getUserById, 
    getUserByUsername,
    createUser
} from '../controllers/userController.js';
const router = express.Router()

router.get('/get/byid', getUserById);
router.get('/get/byusername', getUserByUsername);
router.post('/create', createUser);

export default router;