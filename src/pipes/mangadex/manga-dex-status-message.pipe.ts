import { Pipe, PipeTransform } from '@angular/core';
import { MangaDexStatus } from "../../models/mangadex/manga-dex-object";

@Pipe({
  name: 'mangaDexStatusMessage',
  standalone: true
})
export class MangaDexStatusMessagePipe implements PipeTransform {

  transform(value: MangaDexStatus): string {
    switch(value) {
      case MangaDexStatus.ONGOING:
        return $localize`ongoing`;
      case MangaDexStatus.COMPLETED:
        return $localize`completed`;
      case MangaDexStatus.HIATUS:
        return $localize`hiatus`;
      case MangaDexStatus.CANCELLED:
        return $localize`cancelled`;
      default:
        return $localize`unknown`;
    }
  }

}
