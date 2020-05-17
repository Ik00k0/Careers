import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {

  private disabled: Boolean=true;
  

  
  constructor(private router: Router) { }

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
    this.router.navigateByUrl('login/register2')
  }
}
