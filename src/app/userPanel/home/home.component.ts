import { Component, HostListener } from '@angular/core';
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
  //
  reviews = [
    {
      title: 'Great Work',
      text: 'Lorem ipsum dolor sit amet consectetur. Eu a et ultricies sed volutpat in. Hendrerit eget nulla purus volutpat eu enim. In lectus convallis tortor facilisis malesuada lobortis gravida diam',
      img: 'https://media.gettyimages.com/id/1332113666/photo/young-businesswoman-using-digital-tablet.jpg?s=612x612&w=gi&k=20&c=jBVr_LzGgIjvmyF6pmgXBqfSZkzmpNWUHxv-zKgw8pQ=',
      name: 'Sara Magdy',
      job: 'CEO at the University of MUST'
    },
    {
      title: 'Amazing',
      text: 'Lorem ipsum dolor sit amet consectetur. Eu a et ultricies sed volutpat in. Hendrerit eget nulla purus volutpat eu enim. In lectus convallis tortor facilisis malesuada lobortis gravida diam',
      img: 'assets/vendors/imgs/anba.jpg'
      , name: 'Mohamed Ahmed', job: 'CEO at the University of MUST'
    },
    { title: 'Good Job', text: 'Lorem ipsum dolor sit amet consectetur. Eu a et ultricies sed volutpat in. Hendrerit eget nulla purus volutpat eu enim. In lectus convallis tortor facilisis malesuada lobortis gravida diam', img: 'assets/vendors/imgs/ahmed.png', name: 'Ahmed Magdy', job: 'CEO at the University of MUST' },
    { title: 'Amazing', text: 'Lorem ipsum dolor sit amet consectetur. Eu a et ultricies sed volutpat in. Hendrerit eget nulla purus volutpat eu enim. In lectus convallis tortor facilisis malesuada lobortis gravida diam', img: 'assets/vendors/imgs/mohamed.png', name: 'Mohamed Ahmed', job: 'CEO at the University of MUST' },
    { title: 'Good Job', text: 'Lorem ipsum dolor sit amet consectetur. Eu a et ultricies sed volutpat in. Hendrerit eget nulla purus volutpat eu enim. In lectus convallis tortor facilisis malesuada lobortis gravida diam', img: 'assets/vendors/imgs/ahmed.png', name: 'Ahmed Magdy', job: 'CEO at the University of MUST' },
    { title: 'Amazing', text: 'Lorem ipsum dolor sit amet consectetur. Eu a et ultricies sed volutpat in. Hendrerit eget nulla purus volutpat eu enim. In lectus convallis tortor facilisis malesuada lobortis gravida diam', img: 'assets/vendors/imgs/mohamed.png', name: 'Mohamed Ahmed', job: 'CEO at the University of MUST' },
    { title: 'Good Job', text: 'Lorem ipsum dolor sit amet consectetur. Eu a et ultricies sed volutpat in. Hendrerit eget nulla purus volutpat eu enim. In lectus convallis tortor facilisis malesuada lobortis gravida diam', img: 'assets/vendors/imgs/ahmed.png', name: 'Ahmed Magdy', job: 'CEO at the University of MUST' }
  ];
  numVisible = 3;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustCarousel();
  }

  ngOnInit() {
    this.adjustCarousel();
    window.scrollTo(0, 0);
  }

  adjustCarousel() {
    const width = window.innerWidth;
    if (width < 576) {
      this.numVisible = 1;
    } else if (width < 768) {
      this.numVisible = 2;
    } else {
      this.numVisible = 3;
    }
  }

}
