import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Messages } from 'src/app/modules/message';
import { MessagesApiService } from 'src/app/services/messages-api.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ContactComponent {
  message: Messages = new Messages();

  constructor(private api: MessagesApiService, private meta: Meta) {
    window.scrollTo(0, 0);
  }

  onSubmit() {
    this.api.post(this.message).subscribe((response) => {
      alert('Message sent');
    });
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.message.attachment = file.name;
    }
  }
  ngOnInit(): void {
    this.meta.addTags([
      { name: 'description', content: 'Reach out to XpertCoder for inquiries on web and mobile development services, or any other technology needs.' },
      { name: 'keywords', content: 'contact XpertCoder, get in touch, web development inquiries, mobile development support' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }
}
