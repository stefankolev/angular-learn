import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
    
    
    transform(value: any, limit: number, anotherArg: number) {
        
        if( value.length <= limit ) { 
            return value;
        }
        return value.substr(0, limit) + '...';
    } 

}