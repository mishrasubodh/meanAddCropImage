import { Directive ,ElementRef,Renderer2} from '@angular/core';

@Directive({
  selector: '[appBlue]'
})
export class BlueDirective {
  constructor(
    private el:ElementRef,
    private render:Renderer2
    ) { 
    el.nativeElement.style.backgroundColor="lightgray";
    console.log("eeell",el,  this.el.nativeElement.textContent)
    console.log("render",render)
  }
}
