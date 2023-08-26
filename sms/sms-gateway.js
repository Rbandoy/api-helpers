require('dotenv').config()
const smsGateway = {}
const client = require('twilio')(
  'AC22355d89d3f4e3f9b6d5ba43f792e98c',
  'a6f5f5b5449c127956abd0fe1b852315'
)

smsGateway.send = async (phone, message) => {
  return await client.messages.create({
    body: message,
    from: '+16206225507',
    to: `+639${phone}`,
  })
}

module.exports = smsGateway
