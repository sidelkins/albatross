import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import defaultRoutes from './routes/default.js'
import userRoutes from './routes/userRoutes.js'
import bagRoutes from './routes/bagRoutes.js'

const app = express()
dotenv.config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors())
app.use((req, res, next) => {
  console.log(`${res.statusCode} ${req.method} ${req.url}`);
  next();
});
app.use(express.json())

// Routes
app.use('/api', defaultRoutes)
app.use('/api/user', userRoutes)
app.use('/api/bag', bagRoutes)

// Start Server
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})