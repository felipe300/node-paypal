import express from 'express'
import morgan from 'morgan'
import paymentRoutes from './routes/payment.routes'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(morgan('dev'))
app.use(paymentRoutes)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`)
})
