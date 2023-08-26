const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf } = format
const rTracer = require('cls-rtracer')
const isEmpty = require('../lib/isEmpty')
// a custom format that outputs request id
const rTracerFormat = printf((info) => {
  const { sessionId } = rTracer.id() || ''
  const { subscriber_id } = rTracer.id() || ''
  return isEmpty(subscriber_id)
    ? `${info.timestamp} [request-id:${sessionId}] ${info.message}`
    : `${info.timestamp} [request-id:${sessionId}]:[subscriber-id:${subscriber_id}] ${info.message}`
})

const logger = createLogger({
  format: combine(timestamp(), rTracerFormat),
  transports: [new transports.Console()],
})

module.exports = logger
