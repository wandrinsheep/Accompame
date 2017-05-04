import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth";
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2";
import { DataProvider } from "../../providers/data";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

users: FirebaseObjectObservable<any> ;
items : any;
  constructor(public navCtrl: NavController, private auth: AuthProvider, private af: AngularFire, private data:DataProvider) 
  {
    this.items = this.af.database.list('/users');
  }

  getdata(){
 
   }
         
    
  



 logout()
 {
   this.auth.logout();
  //this.af.auth.logout().then(data => {console.log('user signed out')});
 }
}
