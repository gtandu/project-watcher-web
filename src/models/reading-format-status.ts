export class ReadingFormatStatus {
  mediaNumber: number;
  read: boolean;
  constructor(mediaNumber: number, read: boolean) {
    this.mediaNumber = mediaNumber;
    this.read = read;
  }
}
