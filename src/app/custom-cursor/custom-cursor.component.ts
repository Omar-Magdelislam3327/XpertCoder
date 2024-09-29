import { Component, ElementRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  templateUrl: './custom-cursor.component.html',
  styleUrls: ['./custom-cursor.component.css']
})
export class CustomCursorComponent implements AfterViewInit {
  @ViewChild('cursor') cursor!: ElementRef;

  ngAfterViewInit() {
    // Ensure the cursor element exists before trying to manipulate it
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const cursorEl = this.cursor.nativeElement;
    const cursorSize = 50; // The size of the white circle

    // Update position of the white circle to follow the default cursor
    cursorEl.style.left = `${event.pageX - cursorSize / 2}px`;  // Center the circle on the cursor
    cursorEl.style.top = `${event.pageY - cursorSize / 2}px`;   // Center the circle on the cursor
  }
}
