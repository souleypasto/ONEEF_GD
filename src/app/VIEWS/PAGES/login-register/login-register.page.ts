import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { UtilisateurService } from 'src/app/SERVICES/UTILISATEUR/utilisateur.service';
import { CommunFunction } from '../../../TOOLS/FUNCTIONS/communFunctions';
import { Utilisateur } from 'src/app/MODELS/Utilisateur';
import { Result } from 'src/app/MODELS/Result';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {

  @ViewChild(IonSlides, {static: true}) slider: IonSlides;
  segment: string;

  login: string;
  password: string;

  constructor(
    private util: CommunFunction,
    private userService: UtilisateurService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.initClassVar();
  }

  /**
   * initisaliser les variables de l classe
   */
  initClassVar() {
  }

  /**
   * Permet de se connecter a l'application en utlisant le login et le mot de pase 
   * @returns:: nothings
   */
  seConnecter(): void {
    this.isDataWellFilled().then((resultCheck: boolean) => {
      if (resultCheck) {
          this.userService.login(this.login, this.password).subscribe((result: Result) => {
            if (!result.error) {
              this.toastr.success(`Bienvenue ` + result.data.user.nom);
              this.util.redirectWithRouteQuery(`menu`);
            } else {
              this.toastr.error('cet Utilisateur n\'existe pas.');
            }
          });
      } else {
        this.toastr.error('Vous devez remplir tous les champs');
      }
    });
  }

  /**
   * verifier si les données ont été remplie dans les champs 
   * @returns:: Promesse boleeanne qui reponds a la question de savoir si les champs sont vides 
   */
  isDataWellFilled(): Promise<boolean> {
    return new Promise(resultCheck => {
      if (this.login && this.login !== '' && this.password && this.password !== '') {
        resultCheck(true);
      } else {
        resultCheck(false);
      }
    });
  }
}
