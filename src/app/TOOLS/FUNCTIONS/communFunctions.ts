import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CommunFunction {
 
  constructor(public alertController: AlertController,
              private loadingController: LoadingController, private router: Router, private navCtrl: NavController,
              private toastCtrl: ToastController, private storage: Storage) {}

  /**
   * calcule la difference de temps entre un temps donné et le temps courrant
   * @param dateTime
   */
  async getTimeDifference(dateTime: string) : Promise< any[] > {
      const currentTime = this.getHoursFromDateTImeString(null);
      const dateToDiff = dateTime.split(';')[1];
      const currentTimeTab = currentTime.split('-');
      const dateToDiffTab = dateToDiff.split('-');
      const newTab = [];
      for (let pos = 0; pos < currentTimeTab.length; pos++) {
        newTab.push((+dateToDiffTab[pos]) - (+currentTimeTab[pos]));
      }
      return new Promise(resolved => {
        resolved(newTab);
      });
  }

  /**
   * permet de recupérer l'heure courante , doit etre mieux implémenté
   * ne prends rien en paramettre
   * @returns :: Date 
   */
  getCurrentTimeDate(): Date {
    return new Date();
  }

  /**
   * permet de redirgier vers une nouvelle page
   * @param params parametres de redirections
   * @param url url de redirection vers la novelle page
   */
  redirecTo(params: any = null, url: any, isRoot: boolean = false) {
    if (isRoot === true) {
      this.navCtrl.navigateRoot(url);
    } else {
      this.navCtrl.navigateForward(url);
    }
  }

  /**
   * Permet dafficher un message Utilisateur
   * @param message texte a afficher a l'utilisateur
   */
  async showUserMessageToast(message: string, positionMiddle: any = 'middle') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: positionMiddle
    });
    toast.present();
  }

  /**
   * cette fonction permet de redireger avec parametre vers une nouvelle page donc
   * lurl a été spécifier en parametre
   * @param url url de redirection
   * @param queryParamsObject permet denvoyer a la page qui la porte l'url de la page Parente
   */
  async redirectWithRouteQuery(url: string, queryParamsObject: any = null) {
    const loading = await this.showPresentVarLoader('redirection...');
    loading.present();
    const naviQuery: NavigationExtras = {
      queryParams: {
        params: JSON.stringify(queryParamsObject)
      }
    };
    if (queryParamsObject === null) {
      this.router.navigate([url]).then(() => {
        loading.dismiss();
      }).catch(error => {
        loading.dismiss();
        this.showUserMessageToast('erreur lors de la redirection, veuillez consilter la console');
        console.dir(error);
      });
    }
    if (queryParamsObject !== null) {
      this.router.navigate([url], naviQuery).then(() => {
        loading.dismiss();
      }).catch(error => {
        loading.dismiss();
        this.showUserMessageToast('erreur lors de la redirection, veuillez consilter la console');
        console.dir(error);
      });
    }
  }

  extractValueFromTab(tab: any, valueFilter: string) {

  }

  /**
   * supprime un element d'une table et renvoi la nouvelle valeur de la
   * table
   * @param tab
   * @param indexOfElement
   */
  removeElementFromTab(tab: any, indexOfElement: number): any {
    const finalTab = [];
    for (let pos = 0; pos < tab.length; pos++) {
      if (pos !== indexOfElement) {
        finalTab.push(tab[pos]);
      }
    }
    return finalTab;
  }

  /**
   *
   * @param tab
   * @param idPanier
   */
  removeObjectFromTabObject(tab: any, idPanier: string) {
    const finalTab = [];
    for (let pos = 0; pos < tab.length; pos++) {
      if (tab[pos].idPanier !== idPanier) {
        finalTab.push(tab[pos]);
      }
    }
    return finalTab;
  }



  async presentAlert(messageShow: string) {
    const alert = await this.alertController.create({
      header: 'Informations ONNEFF',
      subHeader: '',
      message: messageShow,
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   *
   * @param keyToStore
   * @param Value
   */
  storeThisToLoacalStorage(keyToStore: string, Value: any): any {
    this.storage.set(keyToStore, Value).then(resultSearch => {}).catch(error => {
      console.dir(error);
    });
  }

  /**
   *
   * @param storedKey
   */
  getThisValueFromStorage(storedKey: string): any {
    return new Promise(resolved => {
      this.storage.get(storedKey).then(resulSearch => {
        if (resulSearch !== undefined && resulSearch !== null) {
          resolved(resulSearch);
        } else {
          resolved(false);
        }
      });
    });
  }

  /**
   * permet d'implementer le loadinfController pour permettre qu'une action se termine
   * @param messageToShow {string}
   */
  async showPresentVarLoader(messageToShow ?: string) {
    const loading = await this.loadingController.create({
      message: messageToShow,
      spinner: 'lines-small',
      showBackdrop: false
    });
    return loading;
  }



  /**
   * renvoie le message de fonction non encore implémenter
   */
  showNotImplementedBox() {
    this.showPopupMessage('fonction non encore implementer...');
  }

  async showPopupMessage(messageText: string) {
    const alert = await this.alertController.create({
      header: 'ONNEFF',
      subHeader: 'Information Warning',
      message: messageText,
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   * get Date Time As yyyy-mm-dd
   * @param dateAsDate
   */
  convertDateToDateTImeString(dateAsDate?: any) {
    const dateTmp = !dateAsDate ? new Date() : new Date(dateAsDate);
    const dd = String(dateTmp.getDate()).padStart(2, '0');
    const mm = String(dateTmp.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = dateTmp.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  /**
   * get time from current time
   * @param dateTIme
   * @retuns string
   */
  getHoursFromDateTImeString(dateTIme?: any): string {
    const d = !dateTIme ? new Date() : new Date(dateTIme);
    const hours = d.getHours();
    const min = d.getMinutes();
    const sec = d.getSeconds();
    return hours + '-' + min + '-' + sec;
  }

  

  /**
   * permet de comparer une date de type yyyy-mm-dd avec la date courante dans la zone
   * @param dateToCompare
   */
  compareADateWithCurrentDate(dateToCompare: string): Promise<boolean> {
    return new Promise(resolved => {
      const currentDate = this.convertDateToDateTImeString(null);
      const dateToCOmpare = this.convertDateToDateTImeString(dateToCompare);
      const tabToCOmpare = dateToCOmpare.split('-');
      const tabCurrentDate = currentDate.split('-');
      for (let pos = 0; pos < tabToCOmpare.length; pos++) {
        if ((pos === 0) && (+tabToCOmpare[pos] > +tabCurrentDate[pos])) {
          resolved(true);
          return;
        }
        if (+tabToCOmpare[pos] < +tabCurrentDate[pos]) {
          resolved(false);
          return;
        }
      }
      resolved(true);
    });
  }

  /**
   * Cette fonction permet de comparer deux date et de dire si l'une vien avant l'autre les parametres sont les suivants
   * @param firstDate la date qui est supposé etre la premiere date
   * @param secondDate la date qui est supposé etre la deuxieme date 
   */
  compareTwoDateString(firstDate: string, secondDate: string): Promise<boolean> {
    return new Promise(resolved => {
      const firstDateAsDate = this.convertDateToDateTImeString(firstDate);
      const secondDateAsDate = this.convertDateToDateTImeString(secondDate);
      const firstDateAsDateTab = firstDateAsDate.split('-');
      const secondDateAsDateTab = secondDateAsDate.split('-');
      for (let pos = 0; pos < secondDateAsDateTab.length; pos++) {
        if ((pos === 0) && (+secondDateAsDateTab[pos] > +firstDateAsDateTab[pos])) {
          resolved(true);
          return;
        }
        if (+secondDateAsDateTab[pos] < +firstDateAsDateTab[pos]) {
          resolved(false);
          debugger;
          return;
        }
      }
      resolved(true);
    });
  }

  /**
   * Permet de calculer le temps en Jour entre deux date . les parametres sont des DateTime As String,
   * il faut noter que la date de Debut doit etre inférieur a la date de Fin . c'est sur cette base la qu'on 
   * avance. Bien Plus on considere 
   * @param dateDebut 
   * @param dateFin 
   * @returns Promsise <number>
   */
  calculatePeriodeBetweenToDate(dateDebut: string, dateFin: string): Promise <number> {
    let currentDiff = 0;
    let finalDays = 0; 
    return new Promise(resolved => {
        const dateDebutAsDate = this.convertDateToDateTImeString(dateDebut);
        const dateFinAsDate = this.convertDateToDateTImeString(dateFin);
        const dateDebutAsTab = dateDebutAsDate.split('-');
        const dateFinAsTab = dateFinAsDate.split('-');
        for (let pos = 0; pos < dateDebutAsTab.length; pos++) {
          currentDiff = +dateFinAsTab[pos] - +dateDebutAsTab[pos];
          if (pos === 0) {
            finalDays = currentDiff * 365;
          } else if (pos === 1) {
            finalDays = finalDays + (currentDiff * 30);
          } else if (pos === 2) {
            finalDays = finalDays + currentDiff;
          }
        }
        resolved(finalDays);
      });
  }

  /**
   * compare un heure entré en parametre avec lheure courante de la zone en cours
   * @param timeToCompare
   */
  compareaTimeWithCurrentTIme(timeToCompare: string) {
    return new Promise(resolved => {
      const hourToCompare = this.getHoursFromDateTImeString(timeToCompare);
      const currentHour = this.getHoursFromDateTImeString(null);
      const tabToCOmpare = hourToCompare.split('-');
      const tabCurrentDate = currentHour.split('-');
      for (let pos = 0; pos < tabToCOmpare.length; pos++) {
        if ((pos === 0) && (+tabToCOmpare[pos] > +tabCurrentDate[pos])) {
          resolved(true);
          return;
        }
        if (+tabToCOmpare[pos] < +tabCurrentDate[pos]) {
          resolved(false);
          return;
        }
        if (pos === 1) {
          resolved(true);
          return;
        }
      }
      resolved(true);
    });
  }

  /**
   * Permet d'additionner deux dates pour linstant la fonction n'es pas au point 
   * mais on peut addidionner des jours a une date 
   * @param currentDateTime 
   * @param timeToAdd 
   */
  addingTwoTime(currentDateTime: string, timeToAdd: number) {
      const currentDateTimeAsTab = currentDateTime.split('-');
      const currentDataYear = +currentDateTimeAsTab[0] + 1;
      return currentDataYear + '-' + currentDateTimeAsTab[1] + '-' + currentDateTimeAsTab[2];
  }

}
