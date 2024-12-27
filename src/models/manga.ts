import { Media } from './media';

export class Manga extends Media {
  readingSource: string;

  constructor(id: number | undefined, name: string, description: string, releasedDate: number, coverPictureUrl: string, rate: number, review: string, state: string, readingSource: string) {
    super(id, name, description, releasedDate, coverPictureUrl, rate, review, state);
    this.readingSource = readingSource;
  }
}
