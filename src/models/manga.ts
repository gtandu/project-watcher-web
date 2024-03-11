import { MediaDocument, MediaType } from './media-document';

export class Manga extends MediaDocument {
  readingSource: string;

  constructor(id: number | undefined, name: string, description: string, releasedDate: number, coverPictureUrl: string, rate: number, review: string, state: string, readingSource: string, type?: MediaType) {
    super(id, name, description, releasedDate, coverPictureUrl, rate, review, state, MediaType.MANGA);
    this.readingSource = readingSource;
  }
}
