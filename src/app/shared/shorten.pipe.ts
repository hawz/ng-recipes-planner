/**
 * SHORTEN PIPE
 *
 * The ShortenPipe creates a pipe that truncates the
 * provided text value if its length is greater than the limit
 * parameter.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  /**
   * the method is the implementation of the transform() method
   * of the PipeTransform interface.
   * It has to return a new value which will be the truncated text
   * or the original text if the limit length is not reached.
   *
   * @param value the text we want to truncate
   * @param limit the lenght after which the text is truncated
   */
  transform(value: any, limit: number) {
    if (value.length > limit) {
      return value.substr(0, limit) + '...';
    }
    return value;
  }
}
