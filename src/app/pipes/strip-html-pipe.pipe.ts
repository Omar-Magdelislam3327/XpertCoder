import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtmlPipe'
})
export class StripHtmlPipePipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) {
      return '';
    }
    return value.replace(/<\/?[^>]+(>|$)/g, '');
  }
}
