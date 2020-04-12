import { Vehicule } from 'src/app/MODELS/Vehicule';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../STORAGE/local-storage.service';
import { CARS } from 'src/app/TOOLS/INITIALISATION/localStorageVar';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {
 

  constructor(private locaStore: LocalStorageService) { }

  /**
   *
   * @param id_vehicule 
   * @returns Vehicule in a Promise
   */
  getInfoDriverByIdVehicule(id_vehicule: number) {
    return new Promise(resolved => {
      this.locaStore.getObject(CARS).then((listCars: Vehicule[]) => {
        if (listCars && listCars.length > 0) {
          for (let i = 0; i < listCars.length; i++) {
            const cars: Vehicule = listCars[i];
            if (cars.id === id_vehicule) {
              resolved(cars.driver_name);
              break;
            }
            if (i === (listCars.length - 1)) {
              resolved(false);
            }
          }
        }
      });
    });
  }
}
