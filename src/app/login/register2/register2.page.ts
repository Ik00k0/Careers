import { Component, OnInit, Inject } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'
import { registerModel } from '../registerModel';
import { RegisterService } from '../register.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { trigger, transition, style, animate } from '@angular/animations';
import { HTTP } from '@ionic-native/http/ngx';
import { ToastController } from '@ionic/angular/';


@Component({
  selector: 'app-register2',
  templateUrl: './register2.page.html',
  styleUrls: ['./register2.page.scss'],
  animations: [
    trigger(
      'passMatch', [
      transition(
        ':enter', [
        style({ opacity: 0, position: 'absolute', color: 'red' }),
        animate(500)
      ]
      ),

      transition(
        ':leave', [
        style({ opacity: 1, color: 'green' }),
        animate(500, style({ opacity: 0 }))
      ]
      )
    ]
    )
  ]
})
export class Register2Page implements OnInit {


  private regModel: registerModel;
  private emailRegex = '[a-zA-Z]{1,20}[\.\-\_]{0,1}[a-zA-Z]{0,20}[\.\-\_]{0,1}[a-zA-Z]{0,20}@ashesi.edu.gh';
  private digitalForm: FormGroup;
  private registerURL: string = 'http://157.245.117.18/career/login/regproc.php';


  constructor(
    private alerter: AlertController,
    private router: Router,
    private regService: RegisterService,
    private fb: FormBuilder,
    private http: HTTP,
    private toaster: ToastController
  ) {

  }

  ngOnInit() {
    this.regModel = this.regService.getRegModel();


    this.digitalForm = this.fb.group({

      email: ['oluwa.oyelohunnu@ashesi.edu.gh', [Validators.required, Validators.pattern(this.emailRegex)]],

      password: ['tobi4life', [Validators.required,]],
      confirmPass: ['tobi4life', [Validators.required,]],

    },
      { validator: this.passwordMatch }
    )

    // console.log(this.regModel);
  }

  async presentAlert(condition: string) {
    let message: string, header: string = '';

    if (condition == "success") {

      header = 'Thanks for Signing Up';
      message = 'Please check your email in order to verify your account';

    } 
    
    if (condition == "exist") {

      header = 'Something went wrong';
      message = 'The email you\'re trying to register already exists';

    } else {

      header = 'Something went wrong';
      message = 'There was an error registering you.';

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
          
          if(condition == "success"){
            this.router.navigateByUrl('login');
          }
          
        }
      }]
    });

    await alert.present();

  }


  passwordMatch(group: AbstractControl): { notSame: Boolean } | null {
    // console.log(group);
    const password: String = group.get('password').value;
    const confirmPass: String = group.get('confirmPass').value;

    return password === confirmPass ? null : { notSame: true }
  }


  async internetError() {
    const toast = await this.toaster.create({
      message: 'Failed to reach server. Please check your internet connection',
      duration: 2000,
      cssClass: 'text-center text-white',
      color: 'danger'
    });
    toast.present();
  }

  submit() {
    let email = <String>this.digitalForm.get('email').value;
    let password = <String>this.digitalForm.get('password').value;
    // console.log('Email is: ' + email + ' & Password is: ' + password);

    //Assign Digital Info
    this.regService.setDigInfo(email, password);
    let body = this.regService.getRegModel();
    console.log(body);

    this.http.post(this.registerURL, body, { 'Content-Type': 'application/json' }).then(
      (data) => {
        console.log(data.data);


        // if((data.data != 'exist') && (data.data != 'failed')) {

        //   this.presentAlert('success');
        // }

        if (data.data == "exist") {
          this.presentAlert("exist");
        } else if (data.data = "failed") {
          this.presentAlert("failed");
        } else {
          this.presentAlert('success');
        }

      },

      (failed) => {
        this.internetError();
      }
    )
  }
}
