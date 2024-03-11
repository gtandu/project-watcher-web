// private MediaDto media;
// private ReadingFormat readingFormat;
// private List<ReadingFormatStatusDto> readingFormatStatusList;

import { BaseObject } from './base-object';
import { MediaDocument } from './media-document';
export enum ReadingFormat {
  CHAPTER = 'chapter',
  VOLUME = 'volume'
}

export class ReadingFormatStatus extends BaseObject{
  mediaNumber: number;
  read: boolean;

  constructor(id: number, mediaNumber: number, read: boolean) {
    super(id);
    this.mediaNumber = mediaNumber;
    this.read = read;
  }
}
export class ReadingMedia extends BaseObject {
  media: MediaDocument;
  readingFormat: ReadingFormat;
  readingFormatStatusList: ReadingFormatStatus[];
  constructor(id: number, media: MediaDocument, readingFormat: ReadingFormat, readingFormatStatusList: ReadingFormatStatus[]) {
    super(id);
    this.media = media;
    this.readingFormat = readingFormat;
    this.readingFormatStatusList = readingFormatStatusList;
  }
}
