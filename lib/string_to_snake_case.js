const stringToSnakeCase = (string, overwrites = {}) => {
  let overwriteString = ''
  overwriteString = overwrites[string]
  if (overwriteString) {
    return overwriteString
  }

  const isNotSnakeCase = string.match(/^[A-Z]*$/)
  if (isNotSnakeCase) return string

  let snakeCase = string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('_')

  if (snakeCase.startsWith('_')) snakeCase = snakeCase.slice(1)

  return snakeCase
}

module.exports = stringToSnakeCase
