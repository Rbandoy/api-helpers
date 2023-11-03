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

const GPM = (unitSold, unitPrice, priceSoldPerUnit) => {
  const Revenue = unitSold * priceSoldPerUnit
  const COGS = unitSold * unitPrice
  const grossProfit = Revenue - COGS
  const gpm = (grossProfit / Revenue) * 100

  const totalCostList = [
    { name: 'gasoline', amount: 80, 'Total Amount': 80 * unitSold },
    { name: 'motor maintenance', amount: 10 * unitSold },
    // { name: 'rent', amount: 60000 },
    // { name: 'owner', amount: 50 * unitSold },
    // { name: 'promo', amount: 50 * unitSold },
    // { name: 'Servers', amount: 8000 },
    // { name: 'Google account', amount: 3000 },
    // { name: 'Pickup rice stock', amount: 4080 },
  ]

  let totalCostAmount = 0
  totalCostList.forEach((element) => {
    totalCostAmount += element.amount
  })

  const totalCost = totalCostAmount
  const totalNetProfit = grossProfit - totalCost
  const opm = ((grossProfit - totalCost) / Revenue) * 100
  const tnpm = (totalNetProfit / Revenue) * 100

  return {
    'Unit Sold': unitSold,
    'unit price': unitPrice,
    'unit Selling Price': priceSoldPerUnit,
    'Total Revenue': Revenue,
    'Cost of Goods Sold': COGS,
    'GROSS PROFIT': grossProfit,
    'Cost Items': totalCostList,
    'Total Cost Amount': totalCostAmount,
    'Total Cost': totalCost,
    'Total Net Profit': totalNetProfit,
    'GROSS PROFIT MARGIN (%)': gpm,
    'Operating Profit Margin (%)': opm,
    'Net Profit Margin(%)': tnpm,
  }
}

console.log(GPM(8, 2000, 2100))

module.exports = computation
