import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User, UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm:FormGroup;
  email: FormControl;
  password: FormControl;
  name:FormControl;


  constructor(private userService:UserService,private router: Router) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }


  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);

  }

  createForm() {
    this.registrationForm = new FormGroup({
      name:this.name,
      email: this.email,
      password: this.password

    });
  }

  onSubmit(){
    if (this.registrationForm.valid) {
      console.log("Registration Form Submitted!");
      console.log(this.registrationForm.value);
      let data = this.registrationForm.value;

      this.userService.addUser(data).subscribe(user=>{
          console.log(user);

          this.registrationForm.reset();
          sessionStorage.setItem("clientId",user.clientId);
          sessionStorage.setItem("username",user.name);
          this.router.navigate(['/model-list']);

      }

      );
    }
  }

}
