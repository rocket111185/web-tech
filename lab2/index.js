import fs from 'node:fs/promises';
import { retrieveMeetingDate, retrieveFilename } from './src/inputProcessor.js';
import { buildSearchResultPage } from './src/htmlBuilder.js';
import { validateMeetingDocumentSchema, parseXml } from './src/xmlParser.js';

try {
  const dataFile = await fs.readFile('./data/meetings.xml', {
    encoding: 'utf8'
  });

  const parsedData = parseXml(dataFile);
  validateMeetingDocumentSchema(parsedData);

  const meetingDateQuery = await retrieveMeetingDate();
  const searchResultFilename = await retrieveFilename();

  const searchResults = parsedData.MeetingInfo.Meeting.filter(
    (meeting) => meeting.Date === meetingDateQuery
  );

  const searchResultPage = await buildSearchResultPage(meetingDateQuery, searchResults);
  fs.writeFile(searchResultFilename, searchResultPage);

  console.log(`Сторінка була збережена, назва файлу: ${searchResultFilename}`);
} catch (error) {
  const promptExit = error.message.startsWith('User force closed the prompt');

  if (!promptExit) {
    console.error(error);
  }
}
