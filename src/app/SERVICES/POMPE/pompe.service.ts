import { PUMPS } from './../../TOOLS/INITIALISATION/localStorageVar';
import { Pump } from 'src/app/MODELS/Pompe';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../STORAGE/local-storage.service';
import { LIST_USER_PUMP_STR } from 'src/app/TOOLS/INITIALISATION/initVar';
import { CONNECTED_USER_IFO } from '../../TOOLS/INITIALISATION/localStorageVar';

@Injectable({
  providedIn: 'root'
})
export class PompeService {

  constructor(private localStore: LocalStorageService) { }

  /**
   * sauvegarde les pompes de l'utilisateur courant
   * @returns :: nothings
   */
  storeThisUserPompInLocalStorage(listpompes: Pump[]): void {
    this.localStore.setObject(LIST_USER_PUMP_STR, listpompes);
  }

  /**
   * recupeer la liste des consommation d'un utilisateur 
   * sera enmener a changer lorsque les spécifités précises serons faite 
   * @retuns Promise<Consumption[]> representation un talbleau de consommation
   */
  getPumpList(): Promise<Pump[]> {
    return new Promise (resolved => {
      this.localStore.getObject(LIST_USER_PUMP_STR).then((pumps: Pump[]) => {
        if (pumps) {
          console.log(pumps);
          resolved(pumps);
        }
      });
    });
  }

}
