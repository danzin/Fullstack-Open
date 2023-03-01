const app = require('./app')
const { info } = require('./utils/logger')
require('dotenv').config()

const { PORT } = process.env

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})
