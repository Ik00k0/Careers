import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register2',
  templateUrl: './register2.page.html',
  styleUrls: ['./register2.page.scss'],
})
export class Register2Page implements OnInit {

  constructor(private alerter: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alerter.create({
      header: 'Thanks for Signing Up',
      subHeader: '',
      message: 'Please check your email in order to verify your account',
      buttons: [{
        text: 'Gotcha!',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          this.router.navigateByUrl('login');
        }
      }]
    });

    await alert.present();

  }

}
