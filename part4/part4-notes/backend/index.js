
const app = require('./app')
const { info } = require('./utils/logger')
const config = require('./utils/config')


const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  info(`Server running on port ${config.PORT}`)
})
