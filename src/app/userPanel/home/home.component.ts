import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  hoveredCard: string = 'web';

  setHoveredCard(card: string) {
    if (card) {
      this.hoveredCard = card;
    }
  }
}
