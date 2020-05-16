import { Component, OnInit, ViewChild } from '@angular/core';
import {IonSlides} from '@ionic/angular'
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {

  private disabled: Boolean=true;
  @ViewChild('slides') slides: IonSlides;

  
  constructor() { }

  ngOnInit() {
  }

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true,
    pagination: false,
    allowTouchMove:false
  };


  // lockSlider(){
  //   this.slides.lockSwipes(true);
  // }

  next(){
    this.slides.slideNext();
  }
}
