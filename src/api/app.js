import express from 'express'
import cors from 'cors'
import defaultRoutes from './routes/default.js'
import userRoutes from './routes/userRoutes.js'

const app = express()
const port = 5000

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

// Start Server
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})