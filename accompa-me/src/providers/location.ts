import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import GeoFire from 'geofire'; 
import * as firebase from 'firebase';
import { Geolocation } from 'ionic-native';
import { AuthProvider } from "./auth";
import { AngularFire } from "angularfire2";
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the Location provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationProvider {

 firebaseRef = firebase.database().ref('geolocation');
 geoFire = new GeoFire(this.firebaseRef);
 geoquery;


  constructor(private auth:AuthProvider, private af:AngularFire) {
    
  /*this.af.auth.subscribe(data =>{
     if(data)
     {
       Geolocation.getCurrentPosition().then(pos =>{
         let latlng: number[] = [pos.coords.latitude,pos.coords.longitude];
         this.geoFire.set(data.uid,latlng).then(res =>{
           console.log('succes');
         }),(err) => {
           console.log('error setting data'+err);
         };
          this.queryFireEntered(latlng,1);
       }).catch((err) => {
           console.log('error setting position data'+ err);
     })
   }});*/
Geolocation.getCurrentPosition().then(pos =>{
            console.log(pos.coords.latitude);        
            let latlng: number[] = [pos.coords.latitude,pos.coords.longitude];
       /*  this.geoFire.set(data.uid,latlng).then(res =>{
           console.log('succes');
         }),(err) => {
           console.log('error setting data'+ err);
        };*/
          this.queryFireEntered(latlng,50);
      }).catch(err=>{console.log("error"+err)} );
     }


  getFire(key:string){
    return this.geoFire.get(key)
  }
  setfire(key:string,loc: number[] ){
    this.geoFire.set(key,loc).then(data => {console.log("data set");})
  }

  queryFireEntered(center: number[], radius: number)
  {
     this.geoFire.query({center,radius}).on("key_entered",(key,location,distance)=>{console.log(key + " is located at [" + location + "] which is within the query (" + distance.toFixed(4) + " km from center)");
      }); 

    /*   this.geoFire.query({center, radius}).on("key_exited", (key, location, distance)=> {
        console.log(key + " is located at [" + location + "] which is no longer within the query (" + distance.toFixed(3) + " km from center)");});*/
  }
  

 queryFireExit(center: number[], radius: number)
  {

     
  }
  
  updatequery(center:number[], radius: number)
  {
    this.geoquery.updateCriteria(center,radius).then(data => console.log(data));
  }
}
