import { XMLParser } from 'fast-xml-parser';
import Joi from 'joi';
import { DATE_REGEXP, TIME_REGEXP } from './constants.js';

/**
 * Validates the schema of meeting info document
 * @param {Object} document The meeting info document
 */
export const validateMeetingDocumentSchema = (document) => {
  const schema = Joi.object({
    MeetingInfo: Joi.object({
      Meeting: Joi.array().items(Joi.object({
        ShortDescription: Joi.string(),
        Date: Joi.string().pattern(DATE_REGEXP).required(),
        Time: Joi.string().pattern(TIME_REGEXP).required(),
        Guests: Joi.object({
          Guest: Joi.array().items(Joi.object({
            FirstName: Joi.string().required(),
            LastName: Joi.string().required(),
            Age: Joi.number()
          })),
        }).required(),
        Address: Joi.object({
          Country: Joi.string(),
          City: Joi.string().required(),
          Street: Joi.string().required()
        }).required()
      }))
    }).required()
  });

  const results = schema.validate(document);

  if (results.error) {
    throw new Error(results.error);
  }
};

/**
 * Parses the XML document
 * @param {string} inputContents Raw contents of the XML document
 * @returns {Object} Parsed object
 */
export const parseXml = (inputContents) => {
  const xmlParser = new XMLParser({ ignoreDeclaration: true });
  const preparedObject = xmlParser.parse(inputContents);

  return preparedObject;
};
