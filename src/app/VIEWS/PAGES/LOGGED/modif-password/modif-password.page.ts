import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommunFunction } from '../../../../TOOLS/FUNCTIONS/communFunctions';
import { UtilisateurService } from '../../../../SERVICES/UTILISATEUR/utilisateur.service';

@Component({
  selector: 'app-modif-password',
  templateUrl: './modif-password.page.html',
  styleUrls: ['./modif-password.page.scss'],
})
export class ModifPasswordPage implements OnInit {
  
  oldPassword: string;
  newcPassword: string;
  newPassword: string;

  constructor(private mdlCtrl: ModalController, private util: CommunFunction,
              private userServ: UtilisateurService) { }

  ngOnInit() {
  }

  /**
   * la fonction ci apres premet de fermer le modal
   * si bien sur cette page est ouverte en tant que modal
   */
  async closeThisModal() {
    this.mdlCtrl.dismiss();
  }

  /**
   * on pourra y ajoutter une Boute de Dialogue avec tes de choix de reponse
   */
  cancelThisOpeartion() {
    this.mdlCtrl.dismiss();
  }

  /**
   * Process TO Modifiying Password
   */
  modifyPasswor() {
    this.isDataWellFilled().then((resolved: boolean) => {
      if (resolved) {
        this.userServ.modifyThisUserPassword(this.newPassword).then(resulOperation => {
          if (resulOperation) {
            this.util.showPopupMessage('Modification Mot de passe Reussi');
            this.closeThisModal();
          } else {
            this.util.showPopupMessage('Une erreur Est Survenue veuillez reesayez');
          }
        });
      } else {
        this.util.showPopupMessage('les données ne sont pas bien rempli');
      }
    });
  }

  isDataWellFilled() {
    return new Promise(resutCheck => {
      if (this.oldPassword && this.oldPassword !== '') {
        if (this.newPassword && this.newPassword !== '') {
          if (this.newcPassword && this.newcPassword !== '') {
            if (this.newPassword === this.newcPassword) {
              resutCheck(true);
            } else {
              resutCheck(false);
            }
          } else {
            resutCheck(false);
          }
        } else {
          resutCheck(false);
        }
      } else {
        resutCheck(false);
      }
    });
  }

}
