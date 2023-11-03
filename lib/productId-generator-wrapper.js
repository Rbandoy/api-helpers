const { v4: uuidv4 } = require('uuid')

const productIdWrapper = () => {
  return uuidv4().replace(/-/gi, '')
}

module.exports = productIdWrapper
