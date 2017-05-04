import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable, FirebaseAuthState, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Facebook } from 'ionic-native';
import firebase from 'firebase';

// Providers
import {DataProvider} from './data';

@Injectable()
export class AuthProvider {
  user: FirebaseObjectObservable<any>;
  auth$: any;

  constructor(private af: AngularFire, private data: DataProvider, private platform: Platform) {
      this.af.auth.subscribe(authdata => {
      this.auth$ = authdata;
    })
    this.getUserData();
    this.isAuthenticated();
   /* this.af.database.list('pushTest').push({
      teste: 'teste'
    }).then((data) => {
      console.log(data);
    }); */
  }

isAuthenticated(): Boolean{
    console.log(this.auth$);
   console.log(this.auth$ !==null);
   return this.auth$ !== null;
 
}

  getUserData() {
    return Observable.create(observer => {
      this.af.auth.subscribe(authData => {
        if (authData) {
          this.data.object('accompa-me/users ' + authData.uid).subscribe(userData => {
            console.log(userData);
            this.user = userData;
            observer.next(userData);
            
          });
        } else {
          observer.error();
        }
      });
    });
  }

  loginWithFacebook() {
      return Observable.create(observer => {
      if (this.platform.is('cordova')) {
        Facebook.login(['public_profile', 'email']).then(facebookData => {
          let provider = firebase.auth.FacebookAuthProvider.credential(facebookData.authResponse.accessToken);
          firebase.auth().signInWithCredential(provider).then(firebaseData => {
            this.af.database.list('users').update(firebaseData.uid, {
              name: firebaseData.displayName,
              email: firebaseData.email,
              provider: 'facebook',
              image: firebaseData.photoURL
            });
            observer.next();
          });
        }, error => {
          observer.error(error);
        });
      } else {
        this.af.auth.login({
          provider: AuthProviders.Facebook,
          method: AuthMethods.Popup
        }).then((facebookData) => {
          this.af.database.list('users').update(facebookData.auth.uid, {
            name: facebookData.auth.displayName,
            email: facebookData.auth.email,
            provider: 'facebook',
            image: facebookData.auth.photoURL
          });
          observer.next();
        }).catch((error) => {
          console.info("error", error);
          observer.error(error);
        });
      }
    });
    }


  logout() {
   this.af.auth.subscribe(data =>{
      if(data){
        this.af.database.list('/users').$ref.ref.child(data.uid).remove().then(data => {console.log('succesfully removed');});
      }
    }),
    err => {console.log(err)};
    
    this.af.auth.logout();
 
  }
}
