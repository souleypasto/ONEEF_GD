import { Component, OnInit } from '@angular/core';
import { Pump } from 'src/app/MODELS/Pompe';
import { Vehicule } from 'src/app/MODELS/Vehicule';
import { PompisteService } from 'src/app/SERVICES/POMPISTE/pompiste.service';
import { LocalStorageService } from 'src/app/SERVICES/STORAGE/local-storage.service';
import { CARS } from 'src/app/TOOLS/INITIALISATION/localStorageVar';
import { Events } from '@ionic/angular';
import { CommunFunction } from 'src/app/TOOLS/FUNCTIONS/communFunctions';

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.page.html',
  styleUrls: ['./distribution.page.scss'],
})
export class DistributionPage implements OnInit {

//
  // Variable binder sur le formulaire
  //
  chosedPump: Pump;
  hoursAvailable: string;
  typeCarburant: string;
  vehicule: Vehicule;
  chauffeurName: string;
  chauffeurId: string;
  oldDistance: number;
  newDistance: number;
  startIndex: number;
  endIndex: number;
  mesure: string;
  imagePath: string;
  shift: string;


  //
  // Variable selection dans le Formulaire
  //
  listPompes: Pump[] = [];
  listVehicules: Vehicule[];

  //
  // AUTRES VARIABLES
  //
  idPompiste: number;
  defaultParentUrl: string;

  constructor(
    private pompisteService: PompisteService,
    private localStore: LocalStorageService,
    private util: CommunFunction,
    private events: Events) { }

  ngOnInit() {
    this.defaultParentUrl = `menu`;
  }

/**
 * action qui s'execute juste avant que la vue ne souvre
 * c'est pour mettre a jour le menu
 */
   ionViewWillEnter() {
    this.events.publish('menu', true);
  }

  /**
   * action qui s'esxecute au moment ou on veux abandonner la vue
   * c'est pour mettre a jour le menu  encore
   */
   ionViewWillLeave() {
    this.events.publish('menu', false);
  }

  /**
   * cette fonction permet de recupérer l'id du Pompiste qui est en train de mener la transaction 
   * @returns :: nothings 
   */
   setCurrentPompisteId(): void {
    this.pompisteService.getCurrentPompisteId().then((idPompiste: number) => {
      if (!idPompiste) {
        this.util.showPopupMessage(`Impossible de recupérer les Info du Pompiste`);
      } else {
        this.idPompiste = idPompiste;
      }
    });
  }

  getListCarsAvailable(): void {
    this.localStore.getObject(CARS).then(resultCars => {
      if (resultCars && resultCars.length > 0) {
        this.listVehicules = resultCars;
      } else {
        this.listVehicules = [];
      }
    });
  }

  /**
   * rempli automatiquement le champ du Chauffeur lorsqu'on choisi le vehicule 
   */
   fullFieldDriver() {
    this.chauffeurName = this.vehicule.driver_name;
    this.chauffeurId = this.vehicule.id_driver;
  }

}
