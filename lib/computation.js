const dateFormatter = require('./dateFormatter')

const computation = (amount, interest, months, dateCreated) => {
  const monthlyAmortization = []
  let principalDue = 0
  let interestDue = 0
  let balance = amount
  let penalty = 0
  // eslint-disable-next-line no-plusplus
  for (let x = 1; x <= months; x++) {
    principalDue = amount / months
    balance = balance - principalDue
    interestDue = balance
      ? (interest / 100) * balance
      : (interest / 100) * principalDue
    totalDue = interestDue + principalDue
    penalty = 0
    monthlyAmortization.push({
      paymentSchedule: getMonth(dateCreated, x),
      principalDue: principalDue,
      interestDue: interestDue,
      balance: balance,
      totalDue: totalDue,
      penalty: penalty,
    })
  }
  return monthlyAmortization
}

const getMonth = (dateCreated, counter) => {
  const month = new Date(dateCreated)
  month.setMonth(month.getMonth() + counter)
  return dateFormatter(month, 'dateOnly')
}

module.exports = computation
