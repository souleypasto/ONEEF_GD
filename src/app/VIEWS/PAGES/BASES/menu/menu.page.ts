import { Utilisateur } from 'src/app/MODELS/Utilisateur';
import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { LIST_PAGE_MENU } from 'src/app/TOOLS/INITIALISATION/initVar';
import { UtilisateurService } from '../../../../SERVICES/UTILISATEUR/utilisateur.service';
import { Events } from '@ionic/angular';
import { LocalStorageService } from '../../../../SERVICES/STORAGE/local-storage.service';
import { CONNECTED_USER_IFO } from 'src/app/TOOLS/INITIALISATION/localStorageVar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  
  selectedPath = '';
  pages = LIST_PAGE_MENU;
  utilisateur: Utilisateur;

  constructor(private events: Events, private router: Router, private userGen: UtilisateurService,
              private localStore: LocalStorageService) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
    this.setUserInformation();
   }

  ngOnInit() {
  }

  /***
   * 
   */
  setUserInformation() {
   this.localStore.getObject(CONNECTED_USER_IFO).then(value => {
     if (value) {
       this.utilisateur = value.userInfo;
     }
   });
  }

  /**
   * perfom action on disconnected
   */
  setDisconnectedUser() {
    this.userGen.storeConnectedUserInLocalStorage(false, null);
  }

}
