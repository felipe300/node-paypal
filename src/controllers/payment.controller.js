const createPayment = (req, res) => {
  res.send('create order')
}

const processPayment = (req, res) => {
  res.send('process payment')
}

const cancelPayment = (req, res) => {
  res.send('cancel payment')
}

export { createPayment, processPayment, cancelPayment }
