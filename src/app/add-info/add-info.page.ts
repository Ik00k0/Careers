import { Component, OnInit } from '@angular/core';

import { IonSlides } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import {Router} from '@angular/router'

// import * as $ from 'jquery';

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.page.html',
  styleUrls: ['./add-info.page.scss'],
})



export class AddInfoPage implements OnInit {
  
  @ViewChild('slides') slides: IonSlides;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true,
    pager: true,
  };

 

  swipeNext(){
    this.slides.slideNext();
  }

  routeAway(){
    this.router.navigateByUrl('login')
  }




}
