import { CONSUMPTIONS } from './../../../../TOOLS/INITIALISATION/localStorageVar';
import { Consumption } from './../../../../MODELS/Consumption';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/SERVICES/STORAGE/local-storage.service';
import { ConsumptionsService } from '../../../../SERVICES/CONSUMPTIONS/consumptions.service';
import { CommunFunction } from '../../../../TOOLS/FUNCTIONS/communFunctions';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit {

  //
  // Varaible de classe
  //
  defaultParentUrl: string;

  listconsumptions: Consumption[];

  constructor(private consoService: ConsumptionsService,  private localStore: LocalStorageService,
              private util: CommunFunction) {}

  ngOnInit() {
    this.initClassVar();
  }

  /**
   * initialisation des Varaibles de la classe 
   * @returns :: Nothings
   */
  initClassVar() {
    this.initConsumptionList();
  }


  /**
   * initialise la liste des consomation .. 
   */
  initConsumptionList() {
    this.consoService.getCurrentUserConsomtionsList().then((listconsumptions: Consumption[]) => {
      if (listconsumptions && listconsumptions.length > 0) {
        this.listconsumptions = listconsumptions;
      } else {
        this.listconsumptions = [];
      }
    });
   }

   /**
    * Permet de rediriger vers la Page de consomation
    */
   openNewConsomationPage() {
    this.util.redirectWithRouteQuery(`menu/menu/tabs/tabs/consommer`);
   }

}
