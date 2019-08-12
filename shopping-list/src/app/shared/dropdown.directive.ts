import { Directive, HostListener, Input, ElementRef, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective { 

    @HostBinding('class.open') isOpen = false;
    
    @HostListener('document:click', ['$event']) toggle(event: Event) {
        if( !this.el.nativeElement.contains(event.target)) { 
            this.isOpen = false;
        } else { 
            this.isOpen = !this.isOpen;
        }
        
    }

    constructor(private el: ElementRef) { }
}