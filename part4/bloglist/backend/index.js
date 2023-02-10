const app = require('./app')
const { info } = require('./utils/logger')
require('dotenv').config()


const PORT = process.env.PORT

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})


