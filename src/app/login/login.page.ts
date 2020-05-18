import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HTTP } from '@ionic-native/http/ngx';
import { loginModel } from './loginModel';
import { ToastController } from '@ionic/angular';
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
        style({ opacity: 0, color: 'red', position: 'absolute' }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1, color: 'red', position: 'absolute' }),
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class LoginPage implements OnInit {

  private disabled: Boolean = true;
  private noLogin: Boolean = true;
  
  private emailRegex = '[a-zA-Z]{1,20}[\.\-\_]{0,1}[a-zA-Z]{0,20}[\.\-\_]{0,1}[a-zA-Z]{0,20}@ashesi.edu.gh';
  private loginUrl = 'http://157.245.117.18/career/login/loginproc.php';
  private loginFrame: loginModel;
  private loadingDone: boolean = false;
  private loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private httpClient: HTTP,
    private toaster: ToastController,
    
  ) {


    this.loginForm = this.formBuilder.group({
      'uemail': ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      'upassword': ['', Validators.required],
      'urem': ['']
    });


  }

  ngOnInit() {
  }


  register() {
    this.router.navigateByUrl('login/register');
  }


  

  submitLoginDetails(uEmail: string, uPassword: string) {
    // console.log(uemail + ' ' + upassword )
    this.noLogin = false;
    let uRemState = this.loginForm.get('urem').value;
    console.log("Urem is " + uRemState);
    let uRem ='';

    if(uRemState ==  false){
      uRem = 'forget'
    }else{
      uRem = 'checked'
    }

    let body = {
      umail: uEmail,
      upass: uPassword,
      urem: uRem
    }

    console.log(body)
    this.httpClient.post(this.loginUrl, body, { 'Content-Type': 'application/json' }).then(
      (data) => {

        if (data.data == "success") {
          this.loadingDone = true
          this.loggedIn();
        } else if ((data.data == "failed") || (data.data == "inactive")) {

          if (data.data == "inactive") {
            this.inactive();
          } else {
            this.failedToLogin();
          }

          this.noLogin = true;
        }

        console.log(data);
      },
      (failed) => {
        this.noLogin = true;
        this.failedToReachServer();
        console.log(failed)
      }
    )
  }

  async loggedIn() {
    const toast = await this.toaster.create({
      message: 'You\'ve successfully logged in',
      color: 'success',
      duration: 5000,
      cssClass: 'text-center'
    });
    toast.present();
  }

  async failedToLogin() {
    const toast = await this.toaster.create({
      message: 'Failed to log you in. The credetials you provided were incorrect',
      color: 'danger',
      duration: 5000,
      cssClass: 'text-center'
    });
    toast.present();
  }

  async inactive() {
    const toast = await this.toaster.create({
      message: 'You have attempted to login too many times and your account has been deactivated. Please contact the Admin.',
      color: 'danger',
      duration: 10000,
      cssClass: 'text-center'
    });
    toast.present();
  }

  async failedToReachServer() {
    const toast = await this.toaster.create({
      message: 'Failed to reach server. Please try again later',
      color: 'danger',
      duration: 5000,
      cssClass: 'text-center'
    });
    toast.present();
  }

  check(i:string) {
    console.log(i);
  }




}
