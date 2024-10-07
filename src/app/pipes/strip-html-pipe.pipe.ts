import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtmlPipe'
})
export class StripHtmlPipePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.replace(/<\/?[^>]+(>|$)/g, "") : '';
  }

}
