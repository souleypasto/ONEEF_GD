import { Injectable } from '@angular/core';
import { LocalStorageService } from '../STORAGE/local-storage.service';
import { CARS } from '../../TOOLS/INITIALISATION/localStorageVar';
import { Vehicule } from 'src/app/MODELS/Vehicule';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  constructor(private localstore: LocalStorageService) { }

  /**
   * Cette fonction permet de sauvegarder dans la Base de donnée du téléphone 
   * @param vehicules :: list de voiture attaché a l'utilisateur courant 
   * @returns :: Nothings ;
   */
  storeVehiculesInLocalStorage(Vehicles: Vehicule[]): void {
    this.localstore.setObject(CARS, Vehicles);
  }
}
