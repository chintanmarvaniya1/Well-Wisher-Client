import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm!: FormGroup<any>;

  constructor(private signUPService: SignupService, private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['',Validators.required],
      dob:['', Validators.required]
    });
  }

  signup=async()=>{   
     console.log(this.signupForm.value);
    (await this.signUPService.signUP(this.signupForm.value)).subscribe((data:any)=>{
      console.log(data);
      
      if (data.success) {
        alert(`User Sign UP Successfully with userID:${data.userID}`)
      } else {
        alert(`Unable to create User`)
      }
    },(err:any)=>{
      alert(`${err.error.message}`);
    });
  }
}