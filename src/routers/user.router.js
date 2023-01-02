const express = require('express')
const router = express.Router()
const { insertUser, getUserByEmail } = require('../models/user/User.model')
const { hashPassword, comparePassword } = require('../helpers/bcrypt.helper')

router.all('/', (req, res, netx) => {
  // res.json({ message: 'Return form user router' })

  netx()
})

// Create new user route
router.post('/', async (req, res) => {
  const { name, company, address, phone, email, password } = req.body
  try {
    // Hash password
    const hashedPass = await hashPassword(password)

    const newUserObj = {
      name,
      company,
      address,
      phone,
      email,
      password: hashedPass
    }

    const result = await insertUser(newUserObj)
    console.log(result)

    res.json({ message: 'New user created', result })
  } catch (error) {
    console.log(error)
    res.json({ statux: 'error', message: error.message })
  }
})

// User sing in router
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.json({ status: 'error', message: 'Invalid form submition!' })
  }

  // get user with email from db
  const user = await getUserByEmail(email)
  console.log(user)

  const passFromDb = user && user._id ? user.password : null

  if (!passFromDb)
    return res.json({ status: 'error', message: 'Invalid email or password!' })

  const result = await comparePassword(password, passFromDb)
  console.log(result)

  res.json({ status: 'success', message: 'Login Successfully!' })
})

module.exports = router
