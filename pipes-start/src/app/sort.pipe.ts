import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort', 
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(value: any, sortBy: string): any {
    
    return value.sort((a, b) => {
      if( a[sortBy] > b[sortBy]) { 
        return 1;
      } else { 
        return -1;
      }
    });
  }

}
