import { Injectable } from '@angular/core';
import { Utilisateur } from 'src/app/MODELS/Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  

  constructor() { }

  /**
   * verifier si l'utilisateur Existe dans la BD
   * @param login:: string
   * @param password:: string;
   * @returns Promesse d'un Utilisateur 
   */
  isUserDataExists(login: string, password: string): Promise<Utilisateur>{
    return new Promise(resolved => {
      const utilisateur: Utilisateur = {
        nom: 'Sillery',
        login: 'souley',
        password: 'Victoire.51'
      }
      resolved(utilisateur);
    });
  }
}
