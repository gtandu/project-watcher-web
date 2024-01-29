import { MangaDexStatusMessagePipe } from './manga-dex-status-message.pipe';
import { MangaDexStatus } from '../../models/mangadex/manga-dex-object';

describe('MangaDexStatusMessagePipe', () => {
  it('create an instance', () => {
    const pipe = new MangaDexStatusMessagePipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should return ongoing message when enum value is ONGOING', () => {
      // GIVEN
      const pipe = new MangaDexStatusMessagePipe();
      // WHEN
      let message = pipe.transform(MangaDexStatus.ONGOING);

      // THEN
      expect(message).toBe('ongoing');
    });
    it('should return completed message when enum value is COMPLETED', () => {
      // GIVEN
      const pipe = new MangaDexStatusMessagePipe();
      // WHEN
      let message = pipe.transform(MangaDexStatus.COMPLETED);

      // THEN
      expect(message).toBe('completed');
    });
    it('should return hiatus message when enum value is HIATUS', () => {
      // GIVEN
      const pipe = new MangaDexStatusMessagePipe();
      // WHEN
      let message = pipe.transform(MangaDexStatus.HIATUS);

      // THEN
      expect(message).toBe('hiatus');
    });
    it('should return cancelled message when enum value is CANCELLED', () => {
      // GIVEN
      const pipe = new MangaDexStatusMessagePipe();
      // WHEN
      let message = pipe.transform(MangaDexStatus.CANCELLED);

      // THEN
      expect(message).toBe('cancelled');
    });
    it('should return unknown message when enum value is UNKNOWN', () => {
      // GIVEN
      const pipe = new MangaDexStatusMessagePipe();
      // WHEN
      let message = pipe.transform('' as MangaDexStatus);

      // THEN
      expect(message).toBe('unknown');
    });
  });
});
