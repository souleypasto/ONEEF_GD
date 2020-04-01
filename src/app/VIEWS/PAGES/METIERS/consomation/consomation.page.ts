import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../SERVICES/STORAGE/local-storage.service';
import { Pump } from 'src/app/MODELS/Pompe';
import { LIST_USER_PUMP_STR, RACINE_URL_ONF } from 'src/app/TOOLS/INITIALISATION/initVar';
import { CARS } from '../../../../TOOLS/INITIALISATION/localStorageVar';
import { Vehicule } from '../../../../MODELS/Vehicule';
import { CommunFunction } from '../../../../TOOLS/FUNCTIONS/communFunctions';
import { ConsumptionsService } from '../../../../SERVICES/CONSUMPTIONS/consumptions.service';
import { Consumption } from 'src/app/MODELS/Consumption';
import { PompisteService } from '../../../../SERVICES/POMPISTE/pompiste.service';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-consomation',
  templateUrl: './consomation.page.html',
  styleUrls: ['./consomation.page.scss'],
})
export class ConsomationPage implements OnInit {

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

  constructor(private pompisteService: PompisteService, private localStore: LocalStorageService, private util: CommunFunction,
              private consServ: ConsumptionsService, private events: Events) {
    this.xinitVarForCurrentForm();
  }

  ngOnInit() {
  }

  /**
   * elle regroupe juste les Fonction d'initialisation pour ne pas avoir a lire beaucoup de chose dans le constructeur
   * @returns :: Nothings evidment
   * aucun parametre
   */
  xinitVarForCurrentForm(): void  {
    this.getListPompeOfTHisUser();
    this.getListCarsAvailable();
    this.setCurrentPompisteId();
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

  /**
   * recupere la liste des voiture disponible
   * a ce niveau j'ai un manque d'informations . je ne sais pas si c'est la liste de vehicule attaché 
   * a l'utilisateur en cours , ou bien c'est la liste de tous les vehicule enregistre dans la BD ..
   * si c'est le premier cas alors le code est suffisament bon. sinon il faudra juste changer la source de donnée 
   * @param none
   * @returns :: nothinds 
   */
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

  /**
   * permet de proceder a l'enregistrement dune consomation ou cas ou celle ci serai valider du 
   * point de vue du remplissage 
   * @returns :: nothings
   */
  processStoreConsomation(): void {
    this.checkIfDataIsWellFilled().then((resultCheck: boolean) => {
      if (resultCheck) {
        this.buildObjectConsumpTion().then((consumptionBuild: Consumption) => {
          this.consServ.sauvegarderConnection(consumptionBuild).then((resultOperation: boolean) => {
            // a sauvegarde s'est bien passé . 
            // on redirrige vers la liste de consommation de ce pompiste 
            if (resultOperation) {
              this.util.showPopupMessage(`Sauvegarde terminée`);
              this.util.redirectWithRouteQuery(`${RACINE_URL_ONF}historique`);
            } else {
              // La sauvegarde ne s'est pas bien dérouler 
              // on affiche un Message d'erreur 
              this.util.showPopupMessage(`Une erreur est survenue : veuillez reessayer`);
            }
          });
        });
      }
    });
  }
 

  /**
   * cette fonction permet de verifier la validité des données 
   * elle verifie principalement si les données ont été rempli dans tous les champs 
   * @returns :: Promise<boolean></boolean> True / representant la promesse revoyer si les donnees
   * sont bien remplies ou encore False représentation le cas l'expression contraire 
   */
  checkIfDataIsWellFilled(): Promise<boolean> {
    return new Promise (resolved => {
      // TODO
      resolved(true);
    });
  }

  /**
   * Cette fonction permet principalement de construire l'objet qu'on enverra a la sauvegarde
   * la fonction ne sera executé que si les donnée ont été bien rempli dans la fontion qui la precede
   * @returns :: Promise <Consumption></Consumption> la promesse de l'objet en question .
   */
  buildObjectConsumpTion(): Promise<Consumption> {
    return new Promise (resolved => {
      const newConsObject: Consumption = {
        idPompe : this.chosedPump.id,
        car_brand: '',
        created: this.util.getCurrentTimeDate(),
        dateUnic: '',
        end_index_pompe: this.endIndex.toString(),
        id_pompiste: this.idPompiste,
        id_vehicule: Number(this.vehicule.id),
        new_odometer: this.newDistance.toString(),
        pompiste_name: this.chauffeurName,
        pump_label: this.chosedPump.libelle_pompe,
        start_index_pompe: this.startIndex.toString(),
        typeProduit: this.typeCarburant
      };
      resolved(newConsObject);
    });
  }

  onShiftSelected() {
    this.util.showPopupMessage('shift changer');
  }

}
