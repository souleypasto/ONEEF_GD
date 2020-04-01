import { Component, OnInit } from '@angular/core';
import { CommunFunction } from '../../../../TOOLS/FUNCTIONS/communFunctions';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.page.html',
  styleUrls: ['./pin.page.scss'],
})
export class PinPage implements OnInit {

  isToChangePin: boolean;

  constructor(private util: CommunFunction) { }

  ngOnInit() {
    this.initClassVar();
  }

  /**
   * initialise les variables de la clase
   */
  initClassVar() {
    this.isToChangePin = false;
  }

  /**
   * redirriger vers la page principale de l'application 
   */
  goIntoApplication() {
    this.util.redirectWithRouteQuery(`menu`);
  }

}
