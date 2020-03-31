import { Component, OnInit } from '@angular/core';
import { LIST_MENU_HOME, CHAUFFEUR_XTYPE, POMPISTE_XTYPE, ADMIN_XTYPE, SUPERADMIN_XTYPE } from 'src/app/TOOLS/INITIALISATION/initVar';
import { LocalStorageService } from '../../../../SERVICES/STORAGE/local-storage.service';
import { CONNECTED_USER_IFO } from 'src/app/TOOLS/INITIALISATION/localStorageVar';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.page.html',
  styleUrls: ['./acceuil.page.scss'],
})
export class AcceuilPage implements OnInit {

  listMenuHome: any = [];
  listMenuManager: any = [];
  listMenuPompiste: any = [];
  listMenuChauffeur: any = [];
  listmenuPOwer: any = [];
  profil: number;

  constructor(private localStore: LocalStorageService) { }

  ngOnInit() {
    this.initClassVar();
  }

  initClassVar() {
    this.getUserProfile();
    this.listMenuHome = LIST_MENU_HOME;
    LIST_MENU_HOME.forEach(menu => {
        if (menu.level === 1) {
          this.listMenuManager.push(menu);
          this.listMenuChauffeur.push(menu);
          this.listMenuPompiste.push(menu);
          this.listmenuPOwer.push(menu);
        } else if (menu.level === 2) {
          this.listMenuManager.push(menu);
          this.listMenuPompiste.push(menu);
          this.listmenuPOwer.push(menu);
        } else if (menu.level === 3) {
          this.listMenuManager.push(menu);
          this.listmenuPOwer.push(menu);
        } else if (menu.level === 4) {
          this.listmenuPOwer.push(menu);
        }
      });
  }
  /***
   * recupere le niveau d'accreditation de l'utilisateur Courant 
   */
  getUserProfile(): void {
    this.localStore.getObject(CONNECTED_USER_IFO).then(userInfo => {
      if (userInfo) {
        const type = userInfo.userInfo.type;
        if (type === CHAUFFEUR_XTYPE) {
          this.profil = 1;
        } else if (type === POMPISTE_XTYPE) {
          this.profil = 2;
        } else if (type === ADMIN_XTYPE) {
          this.profil = 3;
        } else if (type === SUPERADMIN_XTYPE) {
          this.profil = 4;
        } else {
          this.profil = 2;
        }
      } else {
        this.profil = 2;
      }
    });
  }

}
