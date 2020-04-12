import { Compartment } from './../../../../MODELS/Compartment';
import { Distribution } from './../../../../MODELS/Distribution';
import { Component, OnInit, AbstractType } from '@angular/core';
import { Pump } from 'src/app/MODELS/Pompe';
import { Vehicule } from 'src/app/MODELS/Vehicule';
import { PompisteService } from 'src/app/SERVICES/POMPISTE/pompiste.service';
import { LocalStorageService } from 'src/app/SERVICES/STORAGE/local-storage.service';
import { CARS } from 'src/app/TOOLS/INITIALISATION/localStorageVar';
import { Events, ActionSheetController } from '@ionic/angular';
import { CommunFunction } from 'src/app/TOOLS/FUNCTIONS/communFunctions';
import { LIST_USER_PUMP_STR, RACINE_URL_ONF } from 'src/app/TOOLS/INITIALISATION/initVar';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { DistributionService } from 'src/app/SERVICES/DISTRIBUTION/distribution.service';

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
  mesure: number;
  imagePath: string;
  shift: string;
  typeProduit: string;

  imagePompe: string;

  // Model
  model: Distribution;
  compartment: string;
  operationTypes: any;

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

  croppedImagepath = '';
  isLoading = false;
  canValidateOperation = false;
  canAddImage = true;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  constructor(
    private pompisteService: PompisteService,
    private localStore: LocalStorageService,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private distributionService: DistributionService,
    private util: CommunFunction,
    private events: Events) {
      this.xinitVarForCurrentForm();
     }

  ngOnInit() {
    this.defaultParentUrl = `menu`;
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
        this.util.showPopupMessage(`Impossible de recupérer les Info du Pompiste.`);
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

  onShiftSelected() {
    // this.util.showPopupMessage('shift changer');
  }

  fullFieldOperationType() {
    // this.util.showPopupMessage('shift changer');
  }

  fullFieldCompartment() {
    // this.util.showPopupMessage('shift changer');
  }

  /**
   * permet de proceder a l'enregistrement dune consomation ou cas ou celle ci serai valider du
   * point de vue du remplissage
   * @returns :: nothings
   */
  processStoreConsomation(): void {
    this.checkIfDataIsWellFilled().then((resultCheck: boolean) => {
      if (resultCheck) {
        this.buildObjectConsumpTion().then((consumptionBuild: Distribution) => {
          this.distributionService.createDistribution(consumptionBuild).then((resultOperation: boolean) => {
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
      } else {
        this.util.showPopupMessage(`Veuillez remplir tous les Champs`);
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
      if (this.chosedPump && this.hoursAvailable && this.typeCarburant && this.oldDistance && this.newDistance
        && this.startIndex && this.endIndex && this.imagePompe !== '') {
        resolved(true);
      } else {
        resolved(false);
      }
    });
  }

  /**
   * Cette fonction permet principalement de construire l'objet qu'on enverra a la sauvegarde
   * la fonction ne sera executé que si les donnée ont été bien rempli dans la fontion qui la precede
   * @returns :: Promise <Consumption></Consumption> la promesse de l'objet en question .
   */
  buildObjectConsumpTion(): Promise<Distribution> {
    return new Promise (resolved => {
      const newConsObject: Distribution = {
        id_pompe : this.chosedPump.id,
        id_pompiste: this.idPompiste,
        car_brand: '',
        created: this.util.getCurrentTimeDate(),
        dateUnic: this.util.getCurrentTimeDate().toString(),
        end_index_pompe: this.endIndex.toString(),
        id_vehicule: Number(this.vehicule.id),
        new_odometer: this.newDistance.toString(),
        pompiste_name: this.chauffeurName,
        pump_label: this.chosedPump.libelle_pompe,
        start_index_pompe: this.startIndex.toString(),
        typeProduit: this.typeCarburant,
        image: this.imagePompe
      };
      resolved(newConsObject);
    });
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
    quality: 100,
    sourceType: sourceType,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imagePompe = 'data:image/jpeg;base64,' + imageData;
      this.canValidateOperation = true;
      this.canAddImage = false;
      this.cropImage(imageData);
      }, (err) => {
      // Handle error
      });

  }

  cropImage(imageData: any) {
    throw new Error('Method not implemented.');
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Sélectionner Image',
      buttons: [{
        text: 'Galerie',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Annuler',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();

  }

   /**
    * calculer l'index consommer
    */
  calculateMesurePompe(typeIndex: string): void {
    if (typeIndex === 'old') {
      if (!this.endIndex) {
        this.endIndex = 0;
        this.mesure = this.startIndex;
      }
    } else {
      this.mesure = this.endIndex - this.startIndex;
    }
  }

}
