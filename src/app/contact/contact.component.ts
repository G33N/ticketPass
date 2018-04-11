import { ContactService } from './../services/contact/contact.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private afDb: AngularFireDatabase, private contactService: ContactService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      Subject: ['', Validators.required],
      Email: ['', Validators.required],
      Body: ['', Validators.required],
    });
  }

  onSubmit() {
    const { Subject, Email, Body } = this.form.value;
    const date = Date();
    const html = `
      <div>Subject: ${Subject}</div>
      <div>Email: <a href="mailto:${Email}">${Email}</a></div>
      <div>Date: ${date}</div>
      <div>Message: ${Body}</div>
    `;
    // This is for sent mails throught firebase functions.
    const formRequest = { Subject, Email, Body };
    // this.afDb.list('/messages').push(formRequest);
    this.contactService.sendEmail(formRequest);
    this.form.reset();
  }

}
