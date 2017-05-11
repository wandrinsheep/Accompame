import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth";
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2";
import { DataProvider } from "../../providers/data";
import { LocationProvider } from "../../providers/location";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

users: FirebaseObjectObservable<any>;
items : any;
  constructor(public navCtrl: NavController, private auth: AuthProvider, private af: AngularFire, private data:DataProvider, private loc: LocationProvider) 
  {
     //this.items = this.af.database.object('users/x3cirdMgNhdnKRl5j4elOb08evP2');
     this.af.auth.subscribe(authData => {
        if (authData) {
   this.items = this.data.object('users/'+authData.uid);
        }
     });
    
  }

  getdata(){
     this.users = this.auth.getUserData();
     
        }

  changeName(){
      this.af.auth.subscribe(authData => {
        if (authData) {
    this.data.object('users/'+authData.uid).update({name: "John Wick"})
  }
      });
  }

    
 logout()
 {
   this.auth.logout();
  //this.af.auth.logout().then(data => {console.log('user signed out')});
 }
}
