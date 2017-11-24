'use strict'

/**
 * Response handler module.
 * @module responseHandler
 */
module.exports = {
    prepare_account_summary_response,
    error_mapper
};

/**
 * Map response for Account summary
 * @param {object} api_response - Raw api response.
 * @return {object} Mapped response.
 */
function prepare_account_summary_response(api_response) {
    if (api_response!==undefined) {
        let preparedResponse = {
            // "marketId": database_response.MARKETID,
            // "accountNumber": database_response.ACCOUNTNO,
            // "customerName": database_response.CUSTOMERNAME,
            // "customerType": database_response.CUSTOMERTYPE,
            // "accountStatus": database_response.ACCOUNTSTATUS,
            // "customerSegmentation": database_response.CUSTOMERSEGMENTATION,
            // "addressId": database_response.ADDRESSID,
            // "streetAddress": database_response.STREETADDRESS,
            // "appartmentNumber": database_response.APARTMENTNO,
            // "city": database_response.CITY,
            // "state": database_response.STATE,
            // "zip": database_response.ZIP,
            // "fullAddress": database_response.FULLADDRESS,
            // "emailAddresses": database_response.EMAILADDRESSES,
            // "daytimePhone": database_response.DAYTIMEPHONE,
            // "eveningPhone": database_response.EVENINGPHONE,
            // "otherPhoneNumber": database_response.OTHERPHONENUMBER,
            // "contactName": database_response.CONTACTNAME
            "marketId": 6,
            "accountNumber": 253263,
            "customerName": "John Smith",
            "customerType": "MDU",
            "accountStatus": "Active",
            "customerSegmentation": "",
            "addressId": 20,
            "streetAddress": "Sunshine street",
            "appartmentNumber": "23",
            "city": "Atlanta",
            "state": "GA",
            "zip": "30009",
            "fullAddress": "Sunshone street, 23, Atlanta, GA, 30009-2356",
            "emailAddresses": "John Smith",
            "daytimePhone": "123456789",
            "eveningPhone": "987654321",
            "otherPhoneNumber": "456123789",
            "contactName": "John Smith"
        };
        return preparedResponse;
    } else {
        return [];
    }
}

/**
 * Map response for Account summary
 * @param {string} errorDescription - Short error description.
 * @param {number} code - Error code.
 * @param {object} error - Original error object.
 * @return {object} Mapped error object.
 */
function error_mapper(errorDescription,code, error)
{
  let err = JSON.stringify(error);
  err = err.replace(/(\\")|(")|(\\')/g, "'");
  let errorMessage = {
      "errorCode": code.toString(),
      "errorDescription": errorDescription,
      "requestId": "none",
      "message": error.message
  };
  console.log(errorMessage);
  return errorMessage;
}