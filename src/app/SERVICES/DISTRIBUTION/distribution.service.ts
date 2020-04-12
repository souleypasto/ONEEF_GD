import { ADD_DISTRIBUTION_URL } from './../../TOOLS/FUNCTIONS/Url';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../STORAGE/local-storage.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Distribution } from 'src/app/MODELS/Distribution';

@Injectable({
  providedIn: 'root'
})
export class DistributionService {

  private baseUrl = `${environment.apiRoot}/distribution`;
  constructor(
    private localstore: LocalStorageService,
    private http: HttpClient) { }

    /**
     * Cette fonction Vas sauvegarde la nouvelle Consomation dans la Base de données
     * @param consumption :: Consumption represente l'objet consomation a sauvegarder
     * @returns :: Promessee booleann qui dit si l'operation s'est bien passé ou pas
     *
     */
  createDistribution(distribution: Distribution): Promise<boolean> {
    return new Promise (resolved => {
      this.addDistribution(distribution).subscribe((result: Distribution) => {
        if (result) {
          resolved(true);
        } else {
          resolved(false);
        }
      });
    });
  }

   /**
    * method to add new distibution
    * @param consumption
    */
  addDistribution(distribution: Distribution): Observable<Distribution> {
    return this.http.post(ADD_DISTRIBUTION_URL, {distribution});
  }
}
