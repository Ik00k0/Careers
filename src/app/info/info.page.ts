import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage';
import {Platform} from '@ionic/angular'


@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform
  ) { }

  ngOnInit() {
  }

  // addInfoNavig(){
  //   this.router.navigateByUrl('add-info', { direction: });
  // }
}
