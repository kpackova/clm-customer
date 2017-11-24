 'use strict'
 require('dotenv').config();
 const ajv = require('ajv');
 const yaml = require('yamljs');
 var Promise = require('promise');

 let validationCache;
 let validationSchemas = [];

 module.exports = {
     validate_request
 }

 /**
  * Map response for Account summary
  * @param {object} request - Client request.
  * @param {object} envVar - Environment varibles.
  * @return {object} True if request is valid or error.
  */
 function validate_request(request, envVar) {
     let validateRequest = new Promise(function (fulfill, reject) {
         if ((typeof envVar.SCHEMA_PATH !== 'undefined') && envVar.SCHEMA_PATH !== '') {
             var requestValidator = getValidator(envVar);
             var valid = requestValidator(request.body);

             if (valid) {
                 fulfill(valid);
             } else {
                 let err = JSON.stringify(requestValidator.errors);
                 err = err.replace(/(\\")|(")|(\\')/g, "'");
                 var errorMessage = {
                     "errorCode": "400",
                     "errorDescription": "Bad request.",
                     "message": err
                 };
                 reject(errorMessage);
             }
         } else {
             fulfill(true);
         }
     });
     return validateRequest.then(function (result, error) {
         if (error) {
             return error;
         } else {
             return result;
         }
     });
 }
 /**
  * Map response for Account summary
  * @param {object} envVar - Environment varibles.
  * @return {object} Validator object.
  */
 function getValidator(envVar) {
     //pipeline uses caching mechanism for schema data
     if (!validationCache) {
         var ajvres = ajv({
             allErrors: true,
             schemas: [
                 yaml.load('./api_definitions/definitions.yaml')
             ]
         });
         validationCache = ajvres;
     }
     if (!validationSchemas[envVar.SCHEMA_PATH]) {
         validationSchemas[envVar.SCHEMA_PATH] = validationCache.getSchema(envVar.SCHEMA_PATH);
     }
     return validationSchemas[envVar.SCHEMA_PATH];
 }
