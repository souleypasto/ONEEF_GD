import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../SERVICES/STORAGE/local-storage.service';
import { Pump } from 'src/app/MODELS/Pompe';
import { LIST_USER_PUMP_STR } from 'src/app/TOOLS/INITIALISATION/initVar';

@Component({
  selector: 'app-consomation',
  templateUrl: './consomation.page.html',
  styleUrls: ['./consomation.page.scss'],
})
export class ConsomationPage implements OnInit {

  listPompes: Pump[] = [];

  idPompe: number;
  idPompiste: number;
  created: Date;
  idVehicule: number;
  typeProduit: string;
  newOdometer: string;
  startIndexPompe: string;
  endIndexPompe: string;
  dateUnic: string;
  pumpLabel: string;
  carBrand: string;
  pompisteName: string;

  constructor(private localStore: LocalStorageService) {
    this.getListPompeOfTHisUser();
   }

  ngOnInit() {
  }

  /**
   * recupere la liste des Pompes relatif a cet Utilisateur 
   * @returns :: nothings 
   */
  getListPompeOfTHisUser(): void {
    this.localStore.getObject(LIST_USER_PUMP_STR).then(resultPump => {
      if (resultPump && resultPump.length > 0) {
        this.listPompes = resultPump;
      }
    });
  }

}
