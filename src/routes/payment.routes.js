import { Router } from 'express'
import {
  cancelPayment,
  createPayment,
  processPayment
} from '../controllers/payment.controller'

const router = Router()

router.get('/create-payment', createPayment)
router.get('/process-payment', processPayment)
router.get('/cancel-payment', cancelPayment)

export default router
