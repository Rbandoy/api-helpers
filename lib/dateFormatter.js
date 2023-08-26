const dateFormatter = (date, format) => {
  const now = new Date(date)

  const month = `0${parseInt(now.getMonth()) + 1}`.slice(-2)
  const day = `0${now.getDate()}`.slice(-2)
  const year = now.getFullYear()
  const hour = `0${now.getHours()}`.slice(-2)
  const minute = `0${now.getMinutes()}`.slice(-2)
  const second = `0${now.getSeconds()}`.slice(-2)

  const fullDate = `${year}-${month}-${day}`
  const fullTime = `${hour}:${minute}:${second}`

  let newDate = `${fullDate} ${fullTime}`

  if (format === 'dateOnly') {
    newDate = fullDate
  } else if (format === 'timeOnly') {
    newDate = fullTime
  }

  return newDate
}

module.exports = dateFormatter
