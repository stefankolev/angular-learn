import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f', {static: true})signupForm: NgForm;
  defaultQuestion = 'pet';
  answer: string;
  genders = ['male', 'female'];
  user = { 
    username: '', 
    email: '', 
    secretQuestion: '', 
    answer: '', 
    gender: ''
  }
  submitted = false;
  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName, 
    //     email: ''
    //   }, 
    //   secret: 'pet', 
    //   questionAnswer: '', 
    //   gender: 'male'
    // });
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  // onSubmit(form: NgForm) { 
  //   console.log( form );
  // }

  onSubmit() { 
    console.log(this.signupForm);
    this.submitted = true;

    this.user.username = this.signupForm.form.value.userData.username;
    this.user.email = this.signupForm.form.value.userData.email;
    this.user.secretQuestion = this.signupForm.form.value.secret;
    this.user.answer = this.signupForm.form.value.questionAnswer;
    this.user.gender = this.signupForm.form.value.gender;

    this.signupForm.reset();
  }

}
