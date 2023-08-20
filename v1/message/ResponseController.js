const ResponseController = {};

ResponseController.apiResponse = ({
  isSuccess = true,
  errors = null,
  data = {},
  message = '',
  ...appendData
}) => {
  return {
    isSuccess: isSuccess,
    errors: errors,
    data: data,
    message: message,
    ...appendData,
  };
};

module.exports = ResponseController;
