import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ error: 'Failed to get user' });
    }
}

export const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
}