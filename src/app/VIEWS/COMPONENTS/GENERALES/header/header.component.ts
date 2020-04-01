import { Component, OnInit, Input } from '@angular/core';
import { Utilisateur } from 'src/app/MODELS/Utilisateur';
import { LocalStorageService } from '../../../../SERVICES/STORAGE/local-storage.service';
import { CONNECTED_USER_IFO, CARS } from 'src/app/TOOLS/INITIALISATION/localStorageVar';
import { VehiculeService } from '../../../../SERVICES/VEHICULE/vehicule.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  //
  // Les variables reçu
  //
  @Input() titre: string;
  @Input() soustitre: string;
  @Input() defaultParenUrl: string;
  @Input() menuButton: boolean;

  utilisateur: Utilisateur;

  constructor(private localStore: LocalStorageService, private veiServ: VehiculeService) {
    this.initClassVar();
   }

  ngOnInit() {}

  initClassVar() {
    if (this.defaultParenUrl === '' || !this.defaultParenUrl) {
      this.defaultParenUrl = 'tabs';
    }
    this.localStore.getObject(CONNECTED_USER_IFO).then(connectedUser => {
      if (connectedUser) {
        this.utilisateur = connectedUser.userInfo.user as Utilisateur;
      } else {
        this.utilisateur = null;
      }
    });
  }
}
