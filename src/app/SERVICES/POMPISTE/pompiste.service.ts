import { Injectable } from '@angular/core';
import { LocalStorageService } from '../STORAGE/local-storage.service';
import { CONSUMPTIONS } from '../../TOOLS/INITIALISATION/localStorageVar';
import { Consumption } from 'src/app/MODELS/Consumption';

@Injectable({
  providedIn: 'root'
})
export class PompisteService {

  constructor(private localStore: LocalStorageService) {}

  /**
   * j'utilise ici juste une pirouteet pour recupérer l'id du Pompiste 
   * faudra implementer la bonne methode en utilisant les API adequate  
   */
  getCurrentPompisteId(): Promise < number > {
    return new Promise(resolved => {
      this.localStore.getObject(CONSUMPTIONS).then((listConsomations: Consumption[]) => {
        if (listConsomations && listConsomations.length > 0) {
          const idPompiste = listConsomations[0].id_pompiste;
          resolved(idPompiste);
        } else {
          resolved(null);
        }
      });
    });
  }
}