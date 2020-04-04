import { Component, OnInit } from '@angular/core';
import { CommunFunction } from '../../../../TOOLS/FUNCTIONS/communFunctions';
import { ActivatedRoute } from '@angular/router';
import { UtilisateurService } from '../../../../SERVICES/UTILISATEUR/utilisateur.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.page.html',
  styleUrls: ['./pin.page.scss'],
})
export class PinPage implements OnInit {

  buildNewPing: string;
  pinUserCOde: string;


  constructor(private route: ActivatedRoute,  private util: CommunFunction, private userServ: UtilisateurService) {
  }

  ngOnInit() {
    this.initClassVar();
  }

  /**
   * initialise les variables de la clase
   */
  initClassVar() {
    this.buildNewPing = '';
    this.route.queryParams.subscribe(paramGetted => {
      this.pinUserCOde = JSON.parse(paramGetted.params);
    });
  }

  /**
   * redirriger vers la page principale de l'application 
   */
  goIntoApplication() {
    this.util.redirectWithRouteQuery(`menu`);
  }


  /**
   * permet de verifier la validité du code pin enterer par l'utilisateur 
   * @retunrs :: nothiings
   */
  validerNouveauPin(): void {
    if (this.pinUserCOde === this.buildNewPing) {
      this.goIntoApplication();
      this.userServ.storeStatusConnectionPin(true);
    } else {
      this.util.showPopupMessage('Code pin non valide ');
    }
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

  /**
   * 
   */
  storeValue(value: number): void {
    const actualSize = this.buildNewPing.length;
    if (actualSize < 6) {
      this.buildNewPing = this.buildNewPing + value.toString();
      this.checkScreen(actualSize + 1);
      if ((actualSize + 1) === 6) {
        this.validerNouveauPin();
      }
    } else {
      this.util.showPopupMessage('Nombre de pin Atteint!!! veuillez Valider ');
    }
  }

  /**
   * 
   */
  checkScreen(valueScreen: number) {
    const screnId = document.getElementById('checkId' + valueScreen);
    screnId.style.width = '40%';
    screnId.style.height = '40%';
    screnId.style.background = '#FF9800';
    screnId.style.borderRadius = '50%';
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

}
