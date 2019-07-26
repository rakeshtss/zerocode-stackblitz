import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stepPipe'
})
export class StepPipePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    console.log('args', args);

    return value;
  }
}
