import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import GeoFire from 'geofire'; 
import * as firebase from 'firebase';
import { Geolocation } from 'ionic-native';
import { AuthProvider } from "./auth";
import { AngularFire } from "angularfire2";

/*
  Generated class for the Location provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationProvider {



  constructor(private auth:AuthProvider, private af:AngularFire) {
    var firebaseRef = firebase.database().ref('geolocation');
     var  geoFire = new GeoFire(firebaseRef);
   this.af.auth.subscribe(data =>{
     if(data)
     {
       Geolocation.getCurrentPosition().then(pos =>{
         let latlng: number[] = [pos.coords.latitude,pos.coords.longitude];
         geoFire.set(data.uid,latlng).then(res =>{
           console.log('succes');
         }),(err) => {
           console.log(err);
         };
       })
     }
   }) 

  }

}
