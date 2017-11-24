'use strict'
//const env = require('./../utils/environment_variables');
const response_handler = require('./../utils/response_mapper');
const validator = require('./../utils/validate_request');

exports.handler = (event, context, callback) => {
    get_account_summary(event, process.env, callback);
};

/**
 * Map response for Account summary
 * @param {object} request - Client's request.
 * @param {object} envVar - Environment varibales.
 * @return {object} Mapped response for customer account or error.
 */
function get_account_summary(request, envVar, callback) {
    validator.validate_request(request,envVar).then(valid => {
      try {
        //call backend only with accountNumber
          let api_response = {
              "result": "something from the docker container or other backend"
          }
          callback(null, response_handler.prepare_account_summary_response(api_response));
      } catch (e) {
          callback(JSON.stringify(response_handler.error_mapper("Internal server error", 500, e)));
      }
    }, err => {
      callback(JSON.stringify(response_handler.error_mapper("Bad request", 400, err)));
    });
    
}
