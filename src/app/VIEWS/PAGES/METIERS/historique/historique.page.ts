import { CONSUMPTIONS } from './../../../../TOOLS/INITIALISATION/localStorageVar';
import { Consumption } from './../../../../MODELS/Consumption';
import { Component, OnInit } from '@angular/core';
import { CONNECTED_USER_IFO } from 'src/app/TOOLS/INITIALISATION/localStorageVar';
import { LocalStorageService } from 'src/app/SERVICES/STORAGE/local-storage.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit {

  consumptions: Consumption[];
  constructor(
    private localStore: LocalStorageService
  ) {
    
  }

  ngOnInit() {
    console.log(CONSUMPTIONS);
    this.consumptions = CONNECTED_USER_IFO['consommation'];
    this.setConsumptionInfo();
  }


  setConsumptionInfo() {
    this.localStore.getObject(CONSUMPTIONS).then(value => {
      if (value) {
        this.consumptions = value;
        console.log(this.consumptions);
      }
    });
   }

}
