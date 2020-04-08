import { Utilisateur } from 'src/app/MODELS/Utilisateur';
import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { LIST_PAGE_MENU, ADDITIONAL_POMP_MENU } from 'src/app/TOOLS/INITIALISATION/initVar';
import { UtilisateurService } from '../../../../SERVICES/UTILISATEUR/utilisateur.service';
import { Events, ModalController } from '@ionic/angular';
import { LocalStorageService } from '../../../../SERVICES/STORAGE/local-storage.service';
import { CONNECTED_USER_IFO } from 'src/app/TOOLS/INITIALISATION/localStorageVar';
import { ModifPasswordPage } from '../../LOGGED/modif-password/modif-password.page';
import { CommunFunction } from '../../../../TOOLS/FUNCTIONS/communFunctions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '';
  pages = LIST_PAGE_MENU;
  utilisateur: Utilisateur;
  additionalPage =  ADDITIONAL_POMP_MENU;
  addAdditionalPage = false;

  constructor(
    private events: Events,
    private router: Router,
    private userGen: UtilisateurService,
    private localStore: LocalStorageService,
    private modlCtrl: ModalController,
    private util: CommunFunction) {

    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
   }

  ngOnInit() {
    this.setUserInformation();
    this.setEventListener();
    console.log(this.pages);
  }

  setEventListener() {
    this.events.subscribe('menu', value => {
      if (value) {
        this.addAdditionalPage = true;
      } else {
        this.addAdditionalPage = false;
      }
    });
    console.log(this.addAdditionalPage);
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

  /**
   * OUvrir la page en tant que Popup 
   * @param p :: parametre de la page qu'on voudrai ouvrir 
   */
  async openPopupPage(page: any) {
    const modal = await this.modlCtrl.create({
      component: ModifPasswordPage
    });
    return await modal.present();
  }

  /**
   * ouvrir une page tapper du menu
   * @param url ::  string url de la page qu'on voudrai ouvrir 
   */
  openPage(url: string) {
    this.util.redirectWithRouteQuery(url);
  }

}
