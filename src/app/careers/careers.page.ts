import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, IonSlides, Platform } from '@ionic/angular';
import { Router, NavigationExtras} from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from '../../environments/environment'
import { careersResponse } from './careersService';
import { element } from 'protractor';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.page.html',
  styleUrls: ['./careers.page.scss'],
})
export class CareersPage implements OnInit {

  private alphabet: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  private httpRes: any;
  constructor(
    private menu: MenuController,
    private http: HTTP,
    private platform: Platform,
    private router: Router
  ) { }

  ngOnInit() {
    this.platform.ready().then(
      (ready) => {
        this.getIndustries();



      }


    )

  }

  openMenu() {
    this.menu.open();
  }

  getIndustries() {
    console.log('calling');
    this.http.get(environment.getAllIndustries, {}, environment.jsonHeader).then(
      async (data) => {
        //  console.log(data.data);
        this.httpRes = await JSON.parse(data.data);

        console.log(this.httpRes);
      }
    )

    
  }

  // sortItems(httpRes: any) {

  //   let i = 0;
  //       let previousChar = '';
  //       let holyGrail = []

  //   httpRes.forEach((element, index) => {

  //     if (index > 0) {
  //       previousChar = this.httpRes[i - 1].indusname[0];
  //     } else {
  //       previousChar = '';
  //     }


  //     let object = { previousChar: [] }


  //     if (element.indusname[0] == this.alphabet[i]) {

  //       //if they are the same, but not the same as previous. Check then push 

  //       if (element.indusname[0] == previousChar) {
  //         object.previousChar.push(element.indusname);
  //       }

  //       previousChar = element.indusname[0];

  //       return
  //     }

  //     else if (element.indusname[0] != this.alphabet[i]) {


  //       if (element.indusname[0] < this.alphabet[i]) {
  //         //Move A forward
  //         console.log('lessthan')
  //         return
  //       }

  //       else if (element.indusname[0] > this.alphabet[i]) {

  //         object[element.indusname[0]] = [element.indusname];
  //         i = i++;

  //         //move alphabet forward

  //         return
  //       }


  //     }

  //     if (element.indusname == this.httpRes[index].indusname) {
  //       console.log(object);
  //     }

  //   });
  // }


  getCareers(iid, name){

    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: iid,
        indusname: name
      }
    };
    
    this.router.navigate(['careers/careers-spec/'], navigationExtras);
  }
}
