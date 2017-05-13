import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationProvider } from "../../providers/location";
import { AngularFire } from "angularfire2";
import * as firebase from 'firebase';
import { Http, RequestOptions } from "@angular/http";
import { DataProvider } from "../../providers/data";
import { LocationSelectPage } from "../location-select/location-select";

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 @ViewChild('map') mapElement: ElementRef;
 
  map: any;
  mapInitialised: boolean = false;
  apiKey: any = 'AIzaSyB5GBWNTdmMB7R7T2ntrpjTqK3kt8fPq5E';
  firebaseref = firebase.database().ref('geohistory');
  
 
  constructor(public navCtrl: NavController, public connectivityService: ConnectivityService, public modalCtrl: ModalController,/*private loc: LocationProvider,*/ private af: AngularFire,private gl: Geolocation, private http:Http,private data:DataProvider) {
    
    

}
 launchLocationPage(){
 
        let modal = this.modalCtrl.create(LocationSelectPage);
 
        modal.onDidDismiss((location) => {
            console.log(location);
        });
 
        modal.present();    
 
    }

}
