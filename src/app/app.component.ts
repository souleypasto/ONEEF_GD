import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalStorageService } from './SERVICES/STORAGE/local-storage.service';
import { UtilisateurService } from './SERVICES/UTILISATEUR/utilisateur.service';
import { CommunFunction } from './TOOLS/FUNCTIONS/communFunctions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userServ: UtilisateurService,
    private util: CommunFunction
  ) {
    this.checkUserConnexionStatus();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   * Cette fonction permet de faire une redirection direc sur la page d'acceuil au cas ou l'utilisateur 
   * ne c'etais aps deconnecter de l'application 
   * @param :: None
   * @returns :: Nothings
   */
  checkUserConnexionStatus() {
    this.userServ.isUserAlwaysConnected().then(resulTcheck => {
      if (resulTcheck) {
        this.util.redirectWithRouteQuery(`menu`);
      }
    });
  }
}
