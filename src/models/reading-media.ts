import { Media } from './media';
import { ReadingFormat } from './reading-format';
import { ReadingFormatStatus } from './reading-format-status';

export class ReadingMedia {
  mediaDocument: Media;
  readingFormat: ReadingFormat;
  readingFormatStatusList: ReadingFormatStatus[];

  constructor(mediaDocument: Media, readingFormat: ReadingFormat, readingFormatStatusList: ReadingFormatStatus[]) {
    this.mediaDocument = mediaDocument;
    this.readingFormat = readingFormat;
    this.readingFormatStatusList = readingFormatStatusList;
  }
}
