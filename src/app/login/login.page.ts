import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { HTTP } from '@ionic-native/http/ngx'
import { loginModel } from './loginModel'
import { ToastController } from '@ionic/angular'
import { Storage } from '@ionic/storage'

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger(
      'fade', [
      transition(':enter', [
        style({ opacity: 0, color: 'red' }),
        animate('500ms', style({ opacity: 1, color: 'white' }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class LoginPage implements OnInit {

  private disabled: Boolean = true
  private noLogin: Boolean = true
  private cookie: Object
  private emailRegex = environment.emailRegex
  private loginFrame: loginModel
  private loadingDone: boolean = false
  private loginForm: FormGroup
  private remEmail = "";
  private remPassword = "";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private httpClient: HTTP,
    private toaster: ToastController,
    private storage: Storage,


  ) {



    this.loginForm = this.formBuilder.group({
      'uemail': ["", [Validators.required, Validators.pattern(this.emailRegex)]],
      'upassword': ["", Validators.required],
      'urem': ['true']
    })


    this.storage.get('userDeets').then(
      async (data) => {
        if (data != null) {
          console.log(data.uEmail)
          this.remEmail = await data.uEmail;
          this.loginForm.controls['uemail'].setValue(this.remEmail)
          this.remPassword = await data.upassword
          this.loginForm.controls['upassword'].setValue(this.remPassword)
        }
      }
    )

  }

  ngOnInit() {
  }


  register() {
    this.router.navigateByUrl('login/register')
  }




  submitLoginDetails(uEmail: string, uPassword: string) {
    // console.log(uemail + ' ' + upassword )
    this.noLogin = false
    let uRemState = this.loginForm.get('urem').value
    console.log("Urem is " + uRemState)
    let uRem = ''

    if (uRemState == false) {
      uRem = 'forget'
      this.check(true)

    } else {
      uRem = 'checked'
      this.check()
    }

    let body = {
      umail: uEmail,
      upass: uPassword,
      urem: uRem
    }

    console.log(body)
    this.httpClient.post(environment.loginUrl, body, { 'Content-Type': 'application/json' }).then(
      (data) => {

        if (data.data == "success") {
          this.loadingDone = true
          this.storage.set("loggedIn", true)
          this.storage.set("username", this.loginForm.get('uemail').value)
          this.router.navigateByUrl("home")
          this.loggedIn()
        } else if ((data.data == "failed") || (data.data == "inactive")) {

          if (data.data == "inactive") {
            this.inactive()
          } else {
            this.failedToLogin()
          }

          this.noLogin = true
        }

        console.log(data)
      },
      (failed) => {
        this.noLogin = true
        this.failedToReachServer()
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
    })
    toast.present()
  }

  async failedToLogin() {
    const toast = await this.toaster.create({
      message: 'Failed to log you in. The credetials you provided were incorrect',
      color: 'danger',
      duration: 5000,
      cssClass: 'text-center'
    })
    toast.present()
  }

  async inactive() {
    const toast = await this.toaster.create({
      message: 'You have attempted to login too many times and your account has been deactivated. Please contact the Admin.',
      color: 'danger',
      duration: 50000,
      cssClass: 'text-center'
    })
    toast.present()
  }

  async failedToReachServer() {
    const toast = await this.toaster.create({
      message: 'Failed to reach server. Please try again later',
      color: 'danger',
      duration: 5000,
      cssClass: 'text-center'
    })
    toast.present()
  }

  check(override = false) {
    let uEmail = this.loginForm.controls['uemail'].value
    let upassword = this.loginForm.controls['upassword'].value

    if (override == false) {
      this.storage.set('userDeets', { uEmail, upassword })
    }

    if (override == true) {
      this.storage.remove('userDeets')
    }


  }


  forgot() {
    this.router.navigateByUrl('login/forgot')
  }

}
