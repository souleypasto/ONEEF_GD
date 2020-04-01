import { Consumption } from './../../MODELS/Consumption';
import { Folder } from './../../MODELS/Folder';
import { Pompiste } from './../../MODELS/Pompiste';
import { CONSUMPTIONS, CARS, DRIVERS, FOLDERS} from './../../TOOLS/INITIALISATION/localStorageVar';
import { Data } from './../../MODELS/Data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../STORAGE/local-storage.service';
import { CONNECTED_USER_IFO } from 'src/app/TOOLS/INITIALISATION/localStorageVar';
import { Observable } from 'rxjs';
import { Result } from 'src/app/MODELS/Results';
import { environment } from 'src/environments/environment';
import { Events } from '@ionic/angular';
import { CommunFunction } from '../../TOOLS/FUNCTIONS/communFunctions';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  
  private baseUrl = `${environment.apiRoot}/user`;

  constructor(private http: HttpClient, private localstore: LocalStorageService,
              private events: Events, private util: CommunFunction) { }

  /**
   * verifier si l'utilisateur Existe dans la BD
   * @param login:: string
   * @param password:: string;
   * @returns Promesse d'un Utilisateur 
   */
  seConnecter(login: string, password: string): Observable<Result> {
    return this.http.post<Result>(`${this.baseUrl}/login`, {login, password});
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
  }

  /**
   * Modification du Mot de passe 
   * @param nouveauMotDePasse : string represente le nouveau mot de passe de l'utilisateur
   * @returns :: Promise<boolean> 
   */
  modifyThisUserPassword(nouveauMotDePasse: string): Promise<boolean> {
    return new Promise (resolved => {
      this.util.showPopupMessage(`il faut implementer l'API de modification du Mot de Pase. aller dans la page UtilsiateurService`);
      resolved(true);
    });
  }
}
