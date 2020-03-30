import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../STORAGE/local-storage.service';
import { CONNECTED_USER_IFO } from 'src/app/TOOLS/INITIALISATION/localStorageVar';
import { Observable } from 'rxjs';
import { Result } from 'src/app/MODELS/Results';
import { environment } from 'src/environments/environment';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  
  private baseUrl = `${environment.apiRoot}/user`;

  constructor(private http: HttpClient, private localstore: LocalStorageService,
              private events: Events) { }

  /**
   * verifier si l'utilisateur Existe dans la BD
   * @param login:: string
   * @param password:: string;
   * @returns Promesse d'un Utilisateur 
   */
  seConnecter(login: string, password: string): Observable<Result>{
    return this.http.post<Result>(`${this.baseUrl}/login`, {login, password});
  }


  /**
   * 
   * @param connectedUser :: Utilisateur - c'est l'utilisateur a stoker dans la BD Local
   */
  storeConnectedUserInLocalStorage(state: boolean, connectedUser: object): void {
    const objectToStore = {
      userInfo: state ? connectedUser : null,
      connected: state ? state : !state
    };
    this.localstore.setObject(CONNECTED_USER_IFO, objectToStore);
    this.events.publish('user:isLogged', state ? connectedUser : null);
  }
}
