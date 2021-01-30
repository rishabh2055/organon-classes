import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appCommonDirective]'
})
export class CommonDirectiveDirective {

  constructor() {
    document.addEventListener('contextmenu', e => e.preventDefault());
   }
  @HostListener('window:keydown', ['$event']) onKeyPress(e: KeyboardEvent) {
    if(e.keyCode == 123) {
      alert('You cannot inspect Element');
       return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
      alert('You cannot inspect Element');
      return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
      alert('You cannot inspect Element');
      return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
      alert('You cannot inspect Element');
      return false;
    }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
      alert('You cannot inspect Element');
      return false;
    }
    if((e.ctrlKey || e.metaKey) && e.keyCode == 67){
      alert('CTRL + C');
      return false;
    }
        
    if((e.ctrlKey || e.metaKey) && e.keyCode == 86){
      alert('CTRL +  V');
      return false;
    }
        
  }
}
