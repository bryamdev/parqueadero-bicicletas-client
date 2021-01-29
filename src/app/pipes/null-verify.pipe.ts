import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullVerify'
})
export class NullVerifyPipe implements PipeTransform {

  transform(value: any): unknown {
    
    if(!value){
      return "(Vacío)"
    }
    
    return value['nombre'];
  }

}
