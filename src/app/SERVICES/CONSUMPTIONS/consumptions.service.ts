import { Consumption } from '../../MODELS/Consumption';
import { CONSUMPTIONS} from '../../TOOLS/INITIALISATION/localStorageVar';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../STORAGE/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionsService {

  constructor(private localstore: LocalStorageService) { }

  
  /**
   * recupeer la liste des consommation d'un utilisateur 
   * sera enmener a changer lorsque les spécifités précises serons faite 
   * @retuns Promise<Consumption[]> representation un talbleau de consommation
   */
  getCurrentUserConsomtionsList(): Promise<Consumption[]> {
    return new Promise (resolved => {
      this.localstore.getObject(CONSUMPTIONS).then((listConso: Consumption[]) => {
        if (listConso) {
          resolved(listConso);
        }
      });
    });
  }
  /**
   * permet de stocké les consomations d'un Utilisateur dans la memoier du téléphone 
   * @param consumptions :: Tableau de consomations 
   * @returns :: Ne retourne rien , sa ne vaux pas la peine de retourner quoi que ce soit 
   */
  storeConsumptionInLocalStorage(consumptions: Consumption[]): void {
    this.localstore.setObject(CONSUMPTIONS, consumptions);
  }

  /**
   * Cette fonction Vas sauvegarde la nouvelle Consomation dans la Base de données 
   * @param consumption :: Consumption represente l'objet consomation a sauvegarder
   * @returns :: Promessee booleann qui dit si l'operation s'est bien passé ou pas 
   * 
   */
  sauvegarderConnection(consumption: Consumption): Promise<boolean> {
    return new Promise (resolved => {
      // TO DO
      // ...
      // ...
      resolved(true);
    });
  }
}
