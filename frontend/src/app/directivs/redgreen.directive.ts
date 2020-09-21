import { Directive, ElementRef } from '@angular/core';
@Directive({
  selector: '[appRedgreen]'
})
export class RedgreenDirective {
  constructor( private el :ElementRef) 
  {
    el.nativeElement.style.color="red";
    el.nativeElement.style.backgroundColor= "green";
    console.log("aaaaaaaaa",this.el.nativeElement.style.backgroundColor)
    }
}
