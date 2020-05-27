import { Component, OnInit, ViewChild } from '@angular/core';
import {MenuController, AlertController, IonSlides} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('slides') slides: IonSlides;
  

  private username: String = "Username";


  
  constructor(
    private menu: MenuController,
    private alert: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }



  sliderConfig = {
    slidesPerView: 2.3,
    spaceBetween: 2,
    centeredSlides: false,
    pager: false,
    height:  666,
  };


  openMenu(){
    this.menu.open();
  }

  async comingSoon() {


    const alert = await this.alert.create({
      // cssClass: 'my-custom-class',
      header: 'Coming Soon',
      // subHeader: 'Subtitle',
      message: 'This aspect of the app will be coming soon.',
      buttons: ['Ok, I\'ll be waiting']
    });

    await alert.present();
  }


  viewIndustries(){
    this.router.navigateByUrl('careers')
  }
}
