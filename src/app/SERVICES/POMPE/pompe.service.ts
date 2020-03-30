import { Injectable } from '@angular/core';
import { LocalStorageService } from '../STORAGE/local-storage.service';
import { LIST_USER_PUMP_STR } from 'src/app/TOOLS/INITIALISATION/initVar';

@Injectable({
  providedIn: 'root'
})
export class PompeService {
  

  constructor(private localStore: LocalStorageService) { }

  /**
   * sauvegarde les pompes de l'utilisateur courant 
   * @returns :: nothings
   */
  storeThisUserPompInLocalStorage(listpompes: any): void {
    this.localStore.setObject(LIST_USER_PUMP_STR, listpompes);
  }
}
