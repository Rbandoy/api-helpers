let ResponseController = {};
const convert_to_snake_case  = require('../../lib/data_to_snake_case');

ResponseController.apiResponse = ({ isSuccess = true, errors = null, data = {}, message = "", ...appendData }) => {
    return ({
        isSuccess: isSuccess,
        errors: errors,
        data: data,
        message: message,
        ...appendData
    });
}

module.exports = ResponseController;

