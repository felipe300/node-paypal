import { Router } from 'express'
import {
  cancelPayment,
  createPayment,
  processPayment
} from '../controllers/payment.controller'

const router = Router()

router.post('/api/v1/create-payment', createPayment)
router.get('/api/v1/process-payment', processPayment)
router.get('/api/v1/cancel-payment', cancelPayment)

export default router
