import { Component } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {

  onMouseMove(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const cardRect = card.getBoundingClientRect();
    const mouseX = event.clientX - cardRect.left;
    const mouseY = event.clientY - cardRect.top;
    const rotateX = (mouseY / cardRect.height - 0.5) * 20;
    const rotateY = (mouseX / cardRect.width - 0.5) * -20;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  onMouseLeave() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      const element = card as HTMLElement;
      element.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
  }
}
