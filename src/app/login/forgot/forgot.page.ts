import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { environment } from 'src/environments/environment';
import { trigger, transition, animate, style } from '@angular/animations';
import { HTTP } from '@ionic-native/http/ngx';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
// import {AppAvailability} from '@ionic-native/app-availability/ngx';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
  animations: [
    trigger('fade',
      [
        transition(
          ':enter', [
          style({ opacity: 0, color: 'red' }),
          animate(500)]
        ),

        transition(
          ':leave', [
          style({ color: 'green', opacity: 1 }),
          animate(500, style({ opacity: 0 }))
        ]
        )
      ]
    )
  ]
})
export class ForgotPage implements OnInit {

  private forgotForm: FormGroup;
  private buttonClicked: Boolean = false;
  private callDone: Boolean = false;
  private app: AppLauncherOptions;



  constructor(
    private fb: FormBuilder,
    private http: HTTP,
    private alerter: AlertController,
    private routeMe: Router,
    private platform: Platform,
    private appLaunch: AppLauncher,
  ) { }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      email: ["oluwa.oyelohunnu@ashesi.edu.gh", [Validators.required, Validators.pattern(environment.emailRegex)]]
    })
  }


  get email(): String {
    return this.forgotForm.get('email').value;
  }

  forgotPassword() {
    this.buttonClicked = true;
    let email = this.email;
    let body = {
      umail: email
    }
    this.http.post(environment.forgotPassURL, body, environment.jsonHeader).then(
      (data) => {
        console.log(data);

        if (data.data === "failed") {

          this.alertUser("failed");
          this.buttonClicked = false;

        } else if (data.data === "inactive") {

          this.alertUser("inactive");
          this.buttonClicked = false;

        } else {

          this.alertUser(null);
          this.callDone = true;

        }

      },

      (fail) => {
        console.log(fail)
      }
    )
  }

  async alertUser(httpMessage: String) {

    let header = '';
    let message = ''

    if (httpMessage == "failed") {

      header = 'Error Occured';
      message = 'Your Email is not registered'

    } else if (httpMessage == "inactive") {

      header = 'Your Account is inactive';
      message = 'Please contact Admin for more assitance'

    } else {

      header = 'Email Sent';
      message = 'Please check your email for a link to reset your password'

    }



    const alert = await this.alerter.create({
      header: header,
      subHeader: '',
      message: message,
      buttons: [{
        text: 'Gotcha!',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {

          if (httpMessage == null) {


            this.routeMe.navigateByUrl('login');
            this.launchMailClient();
          }


        }
      }]
    });

    await alert.present();
  }

  launchMailClient() {

    if (this.platform.is('ios')) {
      this.app.uri = 'ms-outlook://';
    } else if (this.platform.is('android')) {
      this.app = { packageName: 'com.microsoft.office.outlook' };
    }

    //Check for app in this case outlook and launch it if it exists
    this.launchApp();

  }


  launchApp() {

    console.log(this.app.toString());

    //Outlook specific app Launcher
    this.appLaunch.canLaunch(this.app).then(
      (canLaunch: Boolean) => {
        // console.log('Launching Outlook')
        this.appLaunch.launch(this.app).then(
          (data) => {
            // console.log("launched outlook")
          }
        )
      },
      (fail: Boolean) => {
        console.log("Failed to Launch outlook");
      }
    )
  }

}
