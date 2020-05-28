import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.page.html',
  styleUrls: ['./careers.page.scss'],
})
export class CareersPage implements OnInit {

  private alphabet: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];;
  constructor(
    private menu: MenuController,
  ) { }

  ngOnInit() {
  }

  openMenu() {
    this.menu.open();
  }
}
