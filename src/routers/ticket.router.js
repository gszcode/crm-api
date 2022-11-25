const express = require('express')
const router = express.Router()

router.all('/', (req, res, netx) => {
  res.json({ message: 'Return form ticket router' })
})

module.exports = router
