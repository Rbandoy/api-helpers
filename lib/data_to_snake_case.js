const stringToSnakeCase = require('./string_to_snake_case')

const isDate = (date) => {
  if (date instanceof Date) {
    return true
  }

  return false
}

const isObject = (data) => {
  if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
    return true
  }

  return false
}

const isArray = (data) => {
  if (Array.isArray(data)) {
    return true
  }

  return false
}

const dataToSnakeCase = (data, overwrites) => {
  if (isDate(data)) {
    return data
  }

  if (isArray(data)) {
    return data.map((item) => {
      return dataToSnakeCase(item, overwrites)
    })
  }

  if (isObject(data)) {
    const newData = {}

    Object.keys(data).forEach((key) => {
      const snakeKey = stringToSnakeCase(key, overwrites)
      newData[snakeKey] = dataToSnakeCase(data[key], overwrites)
    })

    return newData
  }

  return data
}

module.exports = dataToSnakeCase
