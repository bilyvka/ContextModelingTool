import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(private router: Router,private userService:UserService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {

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
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password

    });
  }

  onSubmit(){
    if (this.loginForm.valid) {

      this.userService.getUser(this.loginForm.value).subscribe(user=>{

        this.loginForm.reset();
        sessionStorage.setItem("user",JSON.stringify(user));
        this.router.navigate(['/model-list']);
      });

    }
    else{
      console.log("form is invalid");
    }

  }

}
