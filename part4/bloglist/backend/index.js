const app = require('./app')
const { info } = require('./utils/logger')

const PORT = 3003
app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})
