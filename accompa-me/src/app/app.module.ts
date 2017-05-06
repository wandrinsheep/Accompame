import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage} from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';

//providers
import { DataProvider } from '../providers/data';
import { AuthProvider } from '../providers/auth';
import { ConnectivityService } from '../providers/connectivity-service';
import { LocationProvider } from "../providers/location";

export const firebaseConfig = {
    apiKey: "AIzaSyBP9__r9I3MpOlLy4UWjQQLFLXyYfr-hjc",
    authDomain: "accompa-me.firebaseapp.com",
    databaseURL: "https://accompa-me.firebaseio.com",
    projectId: "accompa-me",
    storageBucket: "accompa-me.appspot.com",
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    TabsPage
  ],
  imports: [
     IonicModule.forRoot(MyApp),
     AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    LoginPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},DataProvider,AuthProvider,ConnectivityService, LocationProvider
  ]
})
export class AppModule {}
