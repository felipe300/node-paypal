import axios from 'axios'
import {
  PAYPAL_API_URL,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET
} from '../config/config.js'

const createPayment = async (req, res) => {
  const order = {
    intent: 'CAPTURE',
    // here goes the cart
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: '100.00'
        },
        description: 'This is the payment description.'
      }
    ],
    application_context: {
      brand_name: 'Acme Company',
      landing_page: 'LOGIN',
      user_action: 'PAY_NOW',
      shipping_preference: 'NO_SHIPPING',
      return_url: 'http://localhost:4000/process-payment',
      cancel_url: 'http://localhost:4000/cancel-payment'
    }
  }

  const response = await axios.post(`${PAYPAL_API_URL}/v2/checkout/orders`, order, {
    auth: {
      username: PAYPAL_API_CLIENT,
      password: PAYPAL_API_SECRET
    }
  })

  console.log(response.data)

  res.send('create payment')
}

const processPayment = (req, res) => {
  res.send('process payment')
}

const cancelPayment = (req, res) => {
  res.send('cancel payment')
}

export { createPayment, processPayment, cancelPayment }
