'use strict'
const response_handler = require('./../utils/response_mapper');
const validator = require('./../utils/validate_request');

exports.handler = (event, context, callback) => {
    update_account_email(event, process.env, callback);
};

/**
 * Update Customer communication email
 * @param {object} request - Client's request.
 * @param {object} envVar - Environment varibales.
 * @return {object} Mapped response for customer account or error.
 */
function update_account_email(request, envVar, callback) {
    validator.validate_request(request,envVar).then(valid => {
      try {
        //call backend only with accountNumber
          let api_response = {
              "result": "something from the docker container or other backend"
          }
          callback(null, "204");
      } catch (e) {
          callback(JSON.stringify(response_handler.error_mapper("Internal server error", 500, e)));
      }
    }, err => {
      callback(JSON.stringify(response_handler.error_mapper("Bad request", 400, err)));
    });
    
}
