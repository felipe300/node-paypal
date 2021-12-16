import axios from 'axios'
import {
  PAYPAL_API_URL,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
  PAYPAL_LOCALHOST
} from '../config/config.js'

const createPayment = async (req, res) => {
  try {
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
        return_url: `${PAYPAL_LOCALHOST}/process-payment`,
        cancel_url: `${PAYPAL_LOCALHOST}/cancel-payment`
      }
    }

    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')

    const { data } = await axios.post(
      `${PAYPAL_API_URL}/v1/oauth2/token`,
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET
        }
      }
    )

    const token = data.access_token
    const response = await axios.post(
      `${PAYPAL_API_URL}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    res.json(response.data)
  } catch (err) {
    console.log(err)
    res.status(500).send(`Something goes wrong... ${err}`)
  }
}

const processPayment = async (req, res) => {
  const { token } = req.query

  // can be the same as the above
  const response = await axios.post(
    `${PAYPAL_API_URL}/v2/checkout/orders/${token}/capture`,
    {},
    {
      auth: {
        username: PAYPAL_API_CLIENT,
        password: PAYPAL_API_SECRET
      }
    }
  )

  res.redirect('/payed.html')
}

const cancelPayment = async (req, res) => {
  res.redirect('/')
}

export { createPayment, processPayment, cancelPayment }
