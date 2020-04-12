import { CHANGE_PIN_URL, UPDATE_PASSWORD_IRL } from './../../TOOLS/FUNCTIONS/Url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Result } from 'src/app/MODELS/Results';
import { CONNECTED_USER_IFO, CONNECTED_PIN_STATUS } from 'src/app/TOOLS/INITIALISATION/localStorageVar';
import { environment } from 'src/environments/environment';
import { CommunFunction } from '../../TOOLS/FUNCTIONS/communFunctions';
import { LocalStorageService } from '../STORAGE/local-storage.service';
import { Utilisateur } from 'src/app/MODELS/Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
 
 

  private baseUrl = `${environment.apiRoot}/user`;

  constructor(private http: HttpClient, private localstore: LocalStorageService,
              private events: Events, private util: CommunFunction) {}

  /**
   * voici la fonction qui permet de verifier si un Utilisateur ne s'est pas deconnecté 
   * avant de sortir de l'application 
   * @returns Promesse booleenne
   */
  isUserAlwaysConnected(): Promise<boolean> {
    return new Promise (resultChek => {
        this.getConnectedUser().then(userInfo => {
          if (!userInfo) {
            resultChek(false);
          } else {
            resultChek(true);
          }
        });
    });
  }

  /**
   * permet de renvoyer l'Id de l(utilateurr connecté )
   */
  getConnectedUserId(): Promise<number> {
    return new Promise(resolved => {
      this.localstore.getObject(CONNECTED_USER_IFO).then(resulGetted => {
        if (resulGetted) {
          resolved(resulGetted.userInfo.id);
        }
      });
    });
  }

  /**
   * Permet de recuperer les Information sur l'utlisateur connecté 
   */
  getConnectedUser(): Promise<Utilisateur> {
    return new Promise(resolved => {
      this.localstore.getObject(CONNECTED_USER_IFO).then(resulGetted => {
        if (resulGetted) {
          resolved(resulGetted.userInfo);
        }
      });
    });
  }


  /**
   * verifier si l'utilisateur Existe dans la BD
   * @param login:: string
   * @param password:: string;
   * @returns Promesse d'un Utilisateur
   */
  seConnecter(login: string, password: string): Observable < Result > {
    return this.http.post < Result > (`${this.baseUrl}/login`, {
      login,
      password
    });
  }


  /**
   * stocke les parametre de connection dans la base de donnée du téléphone
   * @param connectedUser :: Utilisateur - c'est l'utilisateur a stoker dans la BD Local
   * @returns :: Comme on est a peu pret sur que l'operation nechouera jamais , on ne renvoie rien
   * mais pour la securité on devra gerer cet aspect la
   */
  storeConnectedUserInLocalStorage(state: boolean, connectedUser: object): void {
    const objectToStore = {
      userInfo: state ? connectedUser : null
    };
    this.localstore.setObject(CONNECTED_USER_IFO, objectToStore);
    this.events.publish('user:isLogged', state ? connectedUser : null);
    if (!state) {
      this.removeAllUserStorageVarStored();
    }
  }

  /**
   * Cette Fonction permet de stocker l'etat d'ajout du Code pin a l'application ou pas 
   * a chaque foi qu'on voudra entrer dans l'application si le code pin a deja été entré alors on ne l'entre plus 
   * @param state :: boolean, di si on veux setter ou unsetter cette varaible 
   */
  storeStatusConnectionPin(state: boolean) {
    if (state) {
      this.localstore.set(CONNECTED_PIN_STATUS, true);
    } else {
      this.localstore.set(CONNECTED_PIN_STATUS, false);
    }
  }

  /**
   * cette fonction permet de vider la memoire du téléphone de tout ce quon a inserer , juste
   * lors de la connexion
   * @returns :: Nothings
   */
  removeAllUserStorageVarStored(): void {
    this.localstore.clear();
  }

  /**
   * Modification du Mot de passe
   * @param nouveauMotDePasse : string represente le nouveau mot de passe de l'utilisateur
   * @returns :: Promise<boolean>
   */
  modifyThisUserPassword(nouveauMotDePasse: string): Promise < boolean > {
    return new Promise(resolved => {
      this.util.showPopupMessage(`il faut implementer l'API de modification du Mot de Pase. aller dans la page UtilsiateurService`);
      resolved(true);
    });
  }

  /**
   * methode permettant de changer le code pin
   * @param: userId: id de l'utilisateur connecter
   * @param: string ;; pin a changer
   * @retunr :: Observable<any>
   */
  updatePin(userId: number, pin: string): Observable < any > {
    return this.http.post(CHANGE_PIN_URL, {
      userId,
      pin
    });
  }

  /**
   * methode permettant de reinitialiser le mot de passe de l'utilisateur
   * @param login
   * @param password
   * @returns :: Observable<any></any>
   */
  updateUserPassword(login: string, password: string): Observable < any > {
    return this.http.post(UPDATE_PASSWORD_IRL, {
      login,
      password
    });
  }
}
