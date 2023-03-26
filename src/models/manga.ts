import { MediaDocument } from "./media-document";

export class Manga extends MediaDocument {
  readingSource: string;


  constructor(id: string, name: string, description: string, releasedDate: number, coverPictureUrl: string, rate: number, review: string, state: string, readingSource: string) {
    super(id, name, description, releasedDate, coverPictureUrl, rate, review, state);
    this.readingSource = readingSource;
  }
}
