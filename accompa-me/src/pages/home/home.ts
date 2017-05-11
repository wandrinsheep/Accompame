import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationProvider } from "../../providers/location";
import { AngularFire } from "angularfire2";
import * as firebase from 'firebase';

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
 
  constructor(public navCtrl: NavController, public connectivityService: ConnectivityService, /*private loc: LocationProvider,*/ private af: AngularFire, private gl: Geolocation) {
    

}

ionViewDidLoad()
{
  this.loadGoogleMaps();
}
 loadGoogleMaps(){
 
    this.addConnectivityListeners();
 
  if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
    console.log("Google maps JavaScript needs to be loaded.");
    this.disableMap();
 
    if(this.connectivityService.isOnline()){
      console.log("online, loading map");
 
      //Load the SDK
      window['mapInit'] = () => {
        this.initMap();
        this.enableMap();
      }
       let script = document.createElement("script");
      script.id = "googleMaps";
 
      if(this.apiKey){
        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
      }
 
      document.body.appendChild(script);  
    } 
  }
  else {
 
    if(this.connectivityService.isOnline()){
      console.log("showing map");
      this.initMap();
      this.enableMap();
    }
    else {
      console.log("disabling map");
      this.disableMap();
    }
 
  }
 
}
 initMap(){

      /* let latLng = new google.maps.LatLng(17.942539800000002,-77.233872);
      
 
      let mapOptions = {
        
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      var marker1 = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: 'Hello World!'
        });*/
 
        this.gl.getCurrentPosition((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
 
      let mapOptions = {
        
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      var marker1 = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: 'Hello World!'
        });
  });
 }


  disableMap(){
    console.log("disable map");
  }
 
  enableMap(){
    console.log("enable map");
  }
 
  addConnectivityListeners(){
 
    let onOnline = () => {
 
      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
          this.loadGoogleMaps();
 
        } else {
 
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
      }, 2000);
 
    };
 
    let onOffline = () => {
      this.disableMap();
    };
 
    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
 
  }
  updateLoc(){
    /* var marker1 = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: 'Hello World!'
        });
*/

        /*
    this.af.auth.subscribe(data =>{
      let latlng = this.loc.getFire(data.uid);
     
      latlng.then(res =>{
        
        console.log(res);
        res[0] = res[0]+1;
        res[1] = res[1]+3;
          this.loc.setfire(data.uid,res);
          console.log(res);
      })
     console.log(  latlng);
             })
   
    console.log("location updated");*/
    let locationref  = firebase.database().ref('geolocation').child('N4qvf138koWRdE0OH8pkfJOMfpS2').child('l').child('0');
    locationref.transaction(locationdata =>{
      return locationdata-1;
    })
  }
 
}
