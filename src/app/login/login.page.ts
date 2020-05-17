import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger(
      'fade', [
        transition(':enter', [
          style({ opacity: 0, color:'red', position: 'absolute'}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
           style({ opacity: 1, color:'red', position: 'absolute'}),
          animate('500ms', style({ opacity: 0}))
        ])
    ])
  ]
})
export class LoginPage implements OnInit {

  private disabled: Boolean = true;
  private loginForm = {};
  private emailRegex = '[a-zA-Z]{1,20}[\.\-\_]{0,1}[a-zA-Z]{0,20}[\.\-\_]{0,1}[a-zA-Z]{0,20}@ashesi.edu.gh';


  constructor(
    private router: Router,
    private formBuilder: FormBuilder) {


    this.loginForm = this.formBuilder.group({
      'uemail': ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      'upassword': ['']
    });


  }

  ngOnInit() {
  }


  register() {
    this.router.navigateByUrl('login/register');
  }


}
