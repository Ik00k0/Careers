import { Component } from '@angular/core';


import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router/';
import { Storage } from '@ionic/storage';
import { MenuController, AlertController, Platform } from '@ionic/angular'
import { HTTP } from '@ionic-native/http/ngx'
import { environment } from 'src/environments/environment';
// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})


export class AppComponent {
  private rootPage: any;
  private urls = ["/careers", "/careers/courses/", '/home', '/home/active', '/courses'];

  private appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Careers',
      url: '/careers',
      icon: 'business'
    },
    {
      title: 'Courses',
      url: '/courses',
      icon: 'school'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'Help',
      url: '/help',
      icon: 'information-circle'
    }
  ];


  private urlMatch = false;
  industries: any = null;
  private username;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    private menu: MenuController,
    private alert: AlertController,
    private http: HTTP
  ) {


    //Check for current Page to display menu
    this.router.events.forEach(
      (event) => {
        if (event instanceof NavigationEnd) {
          let currentUrl = this.router.url;
          this.urls.forEach(
            (element) => {
              if (element == currentUrl) {
                this.urlMatch = true;
              }

              if (this.industries == null) {
                this.platform.ready().then(

                  (ready) => {

                    if (this.platform.is("cordova")) {
                      console.log("got in!")
                      this.getIndustries();
                    }


                  }
                )
              }
            }
          )
        }
      }
    )


    this.initializeApp();
  }


  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is("cordova")) {
        this.storage.get('username').then((user) => {
          if (user != null) {
            this.username = user.split('@')[0]
          }

        })
      }
    });
  }



  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  async openMenu() {
    await this.menu.open();
  }

  async closeMenu() {
    await this.menu.close();
  }


  async comingSoon(i: number) {
    console.log(i);
    if ((i == 3) || (i == 4)) {


      const alert = await this.alert.create({
        // cssClass: 'my-custom-class',
        header: 'Coming Soon',
        // subHeader: 'Subtitle',
        message: 'This aspect of the app will be coming soon.',
        buttons: ['Ok, I\'ll be waiting']
      });

      await alert.present();
    }
  }

  // checkURL() {
  //   setTimeout(function () {
  //     //do something once
  //     console.log("hey")
  //   }, 2500);
  // }


  getIndustries() {
    console.log('calling');
    this.http.get(environment.getAllIndustries, {}, environment.jsonHeader).then(
      async (data) => {

        this.industries = await JSON.parse(data.data);

        // console.log(this.industries);
        this.storage.set('industries', this.industries);
        this.storage.set('salute', 'hey');
      }
    )

  }

  logout() {
    this.storage.set('loggedIn', false);
    this.menu.close();
    this.router.navigateByUrl('login');
  }

  route(url: string) {
    this.router.navigateByUrl(url);
  }



}
