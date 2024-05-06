import { input } from '@inquirer/prompts';
import { DATE_REGEXP } from './constants.js';

/**
 * Validates the date input
 * @param {string} dateString Date string. Should have the format yyyy-mm-dd
 * @returns {string | boolean} If the validation is successful, returns true.
 * Otherwise, returns an error message
 */
const dateValidator = (dateString) => {
  const trimmedDateString = dateString.trim();

  // Regex for exact match of the format yyyy-mm-dd
  const inputShape = DATE_REGEXP;

  if (!inputShape.test(trimmedDateString)) {
    return 'Введіть, будь ласка, дату в форматі yyyy-mm-dd';
  }

  return true;
};

/**
 * Retrieves a meeting date from input prompt
 * @returns {Promise<string>} Meeting date string
 */
export const retrieveMeetingDate = async () => {
  const meetingDate = await input({
    message: 'Введіть дату зустрічі (формат yyyy-mm-dd)',
    validate: dateValidator
  });

  return meetingDate.trim();
};

/**
 * Retrieves a file name from input prompt
 * @returns {Promise<string>} File name string
 */
export const retrieveFilename = async () => {
  const filename = await input({
    message: 'Введіть назву файлу, в який буде збережено результат',
    validate: (filenameString) => filenameString.length > 0
  });

  return filename;
};
