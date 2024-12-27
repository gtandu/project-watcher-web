// private MediaDto media;
// private ReadingFormat readingFormat;
// private List<ReadingFormatStatusDto> readingFormatStatusList;

import { BaseObject } from './base-object';
import { Manga } from './manga';

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

export class ReadingManga extends BaseObject {
  manga: Manga;
  readingFormat: ReadingFormat;
  readingFormatStatusList: ReadingFormatStatus[];

  constructor(id: number, manga: Manga, readingFormat: ReadingFormat, readingFormatStatusList: ReadingFormatStatus[]) {
    super(id);
    this.manga = manga;
    this.readingFormat = readingFormat;
    this.readingFormatStatusList = readingFormatStatusList;
  }
}
