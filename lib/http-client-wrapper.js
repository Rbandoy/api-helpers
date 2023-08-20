/* eslint-disable prettier/prettier */
const axios = require('axios');
const logger = require('../logging/logger');
const CustomError = require('./customError');

const request = axios.create();

request.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

request.defaults.timeout = 10000;

const status200ButErrorHandler = (response) => {
  const { data } = response;

  const statusCode =
    data.result_code || data.resultCode || data.statusCode || data.status_code;
  const isRequestSuccess = parseInt(statusCode) === 200;
  if (!isRequestSuccess) {
    const requestError = new Error(data.message);
    requestError.response = {
      data,
      status: statusCode,
    };
    throw requestError
  }
};
const responseErrorHandler = (error) => {
  const { response, request } = error;
  if (response) {
    throw new CustomError(
      response.data.message,
      response.status,
      response.data.errors || response.data.data,
    );
  }
  throw error;
};

const httpClientRequest = Object.freeze({
  get: async (URL, payload) => {
    try {
      logger.info(`Entering - Get client request - ${URL}`);
      const response = await request.get(`${URL}`, payload);
      status200ButErrorHandler(response);
      logger.info(`Successful - Get client request - ${URL}`);
      return response.data;
    } catch (error) {
      logger.info(`Error on Get request: ${URL}, ${error}`);
      responseErrorHandler(error);
    }
  },
  post: async (URL, payload) => {
    try {
      logger.info(`Entering - Post client request - ${URL}`);
      const response = await request.post(`${URL}`, payload);
      status200ButErrorHandler(response);
      logger.info(`Successful - Post client request - ${URL}`);
      return response.data;
    } catch (error) {
      logger.info(`Error on Post request: ${URL}, ${error}`);
      responseErrorHandler(error);
    }
  },
  patch: async (URL, payload) => {
    try {
      logger.info(`Entering - Patch client request - ${URL}`);
      const response = await request.patch(`${URL}`, payload);
      status200ButErrorHandler(response);
      logger.info(`Successful - Patch client request - ${URL}`);
      return response.data;
    } catch (error) {
      logger.info(`Error on patch request: ${URL}, ${error}`);
      responseErrorHandler(error);
    }
  },
  delete: async (URL) => {
    try {
      logger.info(`Entering - Delete client request - ${URL}`);
      const response = await request.delete(`${URL}`);
      status200ButErrorHandler(response);
      logger.info(`Successful - Delete client request - ${URL}`);
      return response.data;
    } catch (error) {
      logger.info(`Error on Delete request: ${URL}, ${error}`);
      responseErrorHandler(error);
    }
  },
  put: async (URL, payload) => {
    try {
      logger.info(`Entering - Put client request - ${URL}`);
      const response = await request.put(`${URL}`, payload);
      status200ButErrorHandler(response);
      logger.info(`Successful - Put client request - ${URL}`);
      return response.data;
    } catch (error) {
      logger.info(`Error on Put request: ${URL}, ${error}`);
      responseErrorHandler(error);
    }
  },
});

module.exports = httpClientRequest;
