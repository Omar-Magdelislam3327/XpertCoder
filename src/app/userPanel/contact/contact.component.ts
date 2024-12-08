/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Messages } from 'src/app/modules/message';
import { MessagesApiService } from 'src/app/services/messages-api.service';
import { Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

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
  contactForm!: FormGroup;
  selectedFile: any | null = null;
  fileTooLarge = false;
  invalidFileType = false;

  constructor(private fb: FormBuilder, private api: MessagesApiService, private meta: Meta) {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      Name: ['', Validators.required],
      Type: ['', Validators.required],
      Email: ['', [Validators.required]],
      Phone: ['', [Validators.required]],
      Budget: ['', Validators.required],
      Company: ['', Validators.required],
      Description: ['', Validators.required],
      File: ['', Validators.required],
    });

    this.meta.addTags([
      { name: 'description', content: 'Reach out to XpertCoder for inquiries on web and mobile development services, or any other technology needs.' },
      { name: 'keywords', content: 'contact XpertCoder, get in touch, web development inquiries, mobile development support' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }

  onSubmit(): void {
    if (this.contactForm.invalid || this.fileTooLarge || this.invalidFileType) {
      Swal.fire({
        title: 'Error',
        text: 'Please enter all required fields and select a valid file',
        icon: 'error',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#00816F',
      })
      return;
    }

    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('File', this.selectedFile);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Please select a valid file',
        icon: 'error',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#00816F',
      })
      return;
    }

    formData.append('Name', this.contactForm.get('Name')?.value || '');
    formData.append('Type', this.contactForm.get('Type')?.value || '');
    formData.append('Email', this.contactForm.get('Email')?.value || '');
    formData.append('Phone', this.contactForm.get('Phone')?.value || '');
    formData.append('Budget', this.contactForm.get('Budget')?.value || '');
    formData.append('Company', this.contactForm.get('Company')?.value || '');
    formData.append('Description', this.contactForm.get('Description')?.value || '');

    this.api.sendMessage(formData).subscribe(
      (response) => {
        Swal.fire({
          title: 'Message sent',
          text: 'We will get back to you soon',
          icon: 'success',
          confirmButtonText: 'Okay',
          confirmButtonColor: '#00816F',
        })
        this.resetForm();
        console.log("Sent message", response);

      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'There was an issue sending the message. Please try again later.',
          icon: 'error',
          confirmButtonText: 'Retry',
          confirmButtonColor: '#00816F',
        })
      }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileSize = file.size / (1024 * 1024);
      if (fileSize > 5) {
        this.fileTooLarge = true;
        this.invalidFileType = false;
        return;
      } else {
        this.fileTooLarge = false;
      }

      if (!file.type.startsWith('application/pdf')) {
        this.invalidFileType = true;
        return;
      } else {
        this.invalidFileType = false;
      }

      this.selectedFile = file;
    }
  }

  resetForm(): void {
    this.contactForm.reset();
    this.selectedFile = null;
    this.fileTooLarge = false;
    this.invalidFileType = false;
  }

}
