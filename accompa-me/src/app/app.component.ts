import { Component, ViewChild} from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { DataProvider } from '../providers/data';
import { AuthProvider } from '../providers/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    [name: string]: any;
  @ViewChild(Nav) nav: Nav;
  isAppInitialized: boolean = false;
  user: any;
  rootPage: any = LoginPage;
  
  constructor( private platform: Platform,protected data: DataProvider,protected auth: AuthProvider) 
  {
    this.user = {image: ''};
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.auth.getUserData().subscribe(data => {
        if (!this.isAppInitialized) {
          this.rootPage(TabsPage);
          this.isAppInitialized = true;
        }
        this.user = data;
        this.data.list('user').subscribe(data => {
          console.log(data);
        });
      }, err => {
        this.rootPage(LoginPage);
      });
      StatusBar.styleDefault();
    });
  }
}


