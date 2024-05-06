import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLBuilder } from 'fast-xml-parser';

const xmlBuilder = new XMLBuilder();

/**
 * Builds a page part with meeting list
 * @param {any[]} meetingList Array of meeting info objects
 * @returns {string} Prepared page part
 */
const buildMeetingTable = (meetingList) => {
  let result = '';

  for (const meeting of meetingList) {
    const guests = meeting.Guests.Guest
      .map((guest) => `${guest.FirstName} ${guest.LastName} (${guest.Age || '?'})`)
      .join(', ');

    const address = `${meeting.Address.Country}, ${meeting.Address.City}, ${meeting.Address.Street}`;

    const tableRow = {
      tr: {
        td: [
          `${meeting.Date} ${meeting.Time}`,
          `${meeting.ShortDescription}`,
          guests,
          address
        ]
      }
    };

    const tableRowOutput = xmlBuilder.build(tableRow);
    result += tableRowOutput;
  }

  return result;
};

/**
 * Builds the search result page
 * @param {string} meetingDate The date of meeting
 * @param {any[]} searchResults Provided meeting search results
 * @returns {string} Prepared search result page
 */
export const buildSearchResultPage = async (meetingDate, searchResults) => {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  const pageTemplatePath = path.join(dirname, 'page-result-template.html');

  const pageContents = await fs.readFile(pageTemplatePath, {
    encoding: 'utf8'
  });

  const searchResultsTable = buildMeetingTable(searchResults);

  const preparedPage = pageContents
    .replace('{search_date}', meetingDate)
    .replace('{search_results}', searchResultsTable);

  return preparedPage;
};
