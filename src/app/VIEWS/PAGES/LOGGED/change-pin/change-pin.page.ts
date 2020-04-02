import { Component, OnInit } from '@angular/core';
import { CommunFunction } from '../../../../TOOLS/FUNCTIONS/communFunctions';
import { UtilisateurService } from '../../../../SERVICES/UTILISATEUR/utilisateur.service';

@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.page.html',
  styleUrls: ['./change-pin.page.scss'],
})
export class ChangePinPage implements OnInit {

  buildNewPing: string;

  constructor(private util: CommunFunction, private userServ: UtilisateurService) {}

  ngOnInit() {
    this.initClassVar();
  }

  /**
   * 
   */
  initClassVar() {
    this.buildNewPing = '';
  }

  /***
   * operation du Pin 
   */
  annulerAction() {
    this.util.redirectWithRouteQuery(`menu`)
  }

  /**
   * 
   */
  validerNouveauPin(): void {
      this.userServ.getConnectedUserId().then((id: number) => {
        this.userServ.updatePin(id, this.buildNewPing).subscribe(resulOperation => {
          // debugger;
          this.util.showPopupMessage(`verifie l'api. cest comme si sa ne waka `);
        });
      });
  }

  /**
   * 
   */
  storeValue(value: number): void {
    const actualSize = this.buildNewPing.length;
    if (actualSize < 6) {
      this.buildNewPing = this.buildNewPing + value.toString();
      this.checkScreen(actualSize + 1);
    } else {
      this.util.showPopupMessage('Nombre de pin Atteint!!! veuillez Valider ');
    }
  }

  /**
   * 
   */
  checkScreen(valueScreen: number) {
    const screnId = document.getElementById('checkId' + valueScreen);
    screnId.style.width = '100%';
    screnId.style.height = '100%';
    screnId.style.background = '#0055a4';
    screnId.style.transition = '200ms';

  }

  /**
   * 
   */
  unCheckScreen(valueScreen: number) {
    const screnId = document.getElementById('checkId' + valueScreen);
    screnId.style.transition = '200ms';
    screnId.style.width = '0';
    screnId.style.height = '0';
  }

  /**
   * suuprmier une valeur entrer au clavier 
   */
  deleteValue(): void {
    if (this.buildNewPing.length === 0) {
      this.util.showPopupMessage('Veuillez saisir votre pin');
    }
    if (this.buildNewPing.length > 0) {
      const actualsize = this.buildNewPing.length;
      const newWorld = this.buildNewPing.substring(0, (actualsize - 1));
      this.buildNewPing = newWorld;
      this.unCheckScreen(this.buildNewPing.length + 1);
    }
  }

}