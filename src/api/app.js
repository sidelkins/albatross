import express from 'express'
import cors from 'cors'
import defaultRoutes from './routes/default.js'

const app = express()
const port = 5000

// Enable CORS
app.use(cors())

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${res.statusCode} ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api', defaultRoutes)

// Start Server
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})