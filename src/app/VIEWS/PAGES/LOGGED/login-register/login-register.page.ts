import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { UtilisateurService } from 'src/app/SERVICES/UTILISATEUR/utilisateur.service';
import { Utilisateur } from 'src/app/MODELS/Utilisateur';
import { CommunFunction } from 'src/app/TOOLS/FUNCTIONS/communFunctions';
import { PompeService } from '../../../../SERVICES/POMPE/pompe.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {

  @ViewChild(IonSlides, {static: true}) slider: IonSlides;
  segment: string;

  login: string;
  password: string;

  constructor(private util: CommunFunction, private userService: UtilisateurService, private pumpGen: PompeService) { }

  ngOnInit() {
    this.initClassVar();
  }

  /**
   * initisaliser les variables de l classe
   */
  initClassVar() {
  }

  /**
   * Permet de se connecter a l'application en utlisant le login et le mot de pase 
   * @returns:: nothings
   */
  seConnecter(): void {
    this.isDataWellFilled().then((resultCheck: boolean) => {
      if (resultCheck) {
        this.userService.seConnecter(this.login, this.password).subscribe(userFounded => {
          if (userFounded) {
            this.storeThingsInLocalStorage(userFounded.data);
            this.util.redirectWithRouteQuery(`pincode`);
          } else {
            this.util.showPopupMessage(`cet Utilisateur nexiste pas `);
          }
        });
      } else {
        this.util.showPopupMessage(`Vous devez remplir tous les champs `);
      }
    });
  }

  /**
   * sauvegarde les données utile dans la mémoire interne
   */
  storeThingsInLocalStorage(dataUser: any): void {
    this.userService.storeConnectedUserInLocalStorage(true, dataUser.user);
    this.pumpGen.storeThisUserPompInLocalStorage(dataUser.pompes);
  }

  /**
   * verifier si les données ont été remplie dans les champs 
   * @returns:: Promesse boleeanne qui reponds a la question de savoir si les champs sont vides 
   */
  isDataWellFilled(): Promise<boolean> {
    return new Promise(resultCheck => {
      if(this.login && this.login !== '' && this.password && this.password !== '') {
        resultCheck(true);
      } else {
        resultCheck(false);
      }
    });
  }
}
