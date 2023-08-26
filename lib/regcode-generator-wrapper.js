const { v4: uuidv4 } = require('uuid')

const regcodeWrapper = () => {
  return uuidv4().replace(/-/gi, '')
}

module.exports = regcodeWrapper
