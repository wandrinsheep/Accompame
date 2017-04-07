import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth';

@Component({
  templateUrl: 'login.html',
  selector: 'auth-login',
})

export class LoginPage {
  error: any;

  constructor(private navCtrl: NavController, private auth: AuthProvider) {}

  ngOnInit() {

  }

  loginUserWithFacebook() {
    this.auth.loginWithFacebook().subscribe(data => {
      this.navCtrl.setRoot(TabsPage);
    }, err => {
      this.error = err;
    });
  }
}
