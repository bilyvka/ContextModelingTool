import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user;

  constructor(private router: Router){

  }
  ngOnInit() {
    console.log(sessionStorage.getItem('user'));
    if(sessionStorage.getItem('user') !=null){
      this.user =  JSON.parse(sessionStorage.getItem('user'));
      console.log(this.user);
      //redirect to show models page
      this.router.navigate(['/models']);
    }
    else{
      //redirect to login page
      this.router.navigate(['/login']);
    }

  }
}
