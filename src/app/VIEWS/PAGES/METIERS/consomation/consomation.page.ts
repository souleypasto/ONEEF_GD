import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../SERVICES/STORAGE/local-storage.service';
import { Pump } from 'src/app/MODELS/Pompe';
import { CARS } from '../../../../TOOLS/INITIALISATION/localStorageVar';
import { Vehicule } from '../../../../MODELS/Vehicule';
import { CommunFunction } from '../../../../TOOLS/FUNCTIONS/communFunctions';
import { ConsumptionsService } from '../../../../SERVICES/CONSUMPTIONS/consumptions.service';
import { Consumption } from 'src/app/MODELS/Consumption';
import { PompisteService } from '../../../../SERVICES/POMPISTE/pompiste.service';
import { Events, ActionSheetController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';

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
  mesure: number;
  imagePath: string;
  shift: string;

  imagePompe: string;

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

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  constructor(
    private pompisteService: PompisteService,
    private localStore: LocalStorageService,
    private util: CommunFunction,
    private camera: Camera,
    private consServ: ConsumptionsService,
    private file: File,
    public actionSheetController: ActionSheetController,
    private events: Events) {
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
          this.consServ.sauvegardeConsomation(consumptionBuild).then((resultOperation: boolean) => {
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
  buildObjectConsumpTion(): Promise<Consumption> {
    return new Promise (resolved => {
      const newConsObject: Consumption = {
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
        typeProduit: this.typeCarburant
      };
      resolved(newConsObject);
    });
  }

  /**
   * 
   */
  onShiftSelected() {
    // this.util.showPopupMessage('shift changer');
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
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
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
      header: 'Select Image source',
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();

  }
  /**
   * annuler processus d'enregistrement dun nouvelle consomation 
   * @param :: nothings 
   * @returns :: Nothings 
   */
  annulerProcess(): void {
    this.util.redirectWithRouteQuery(`menu`);
  }

}
