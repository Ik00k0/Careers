import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private disabled: Boolean = true;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }


  register(){
    this.router.navigateByUrl('login/register');
  }


}
