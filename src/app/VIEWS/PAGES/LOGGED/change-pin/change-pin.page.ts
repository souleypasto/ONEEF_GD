import { Component, OnInit } from '@angular/core';
import { CommunFunction } from '../../../../TOOLS/FUNCTIONS/communFunctions';

@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.page.html',
  styleUrls: ['./change-pin.page.scss'],
})
export class ChangePinPage implements OnInit {

  buildNewPing: string;

  constructor(private util: CommunFunction) { }

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
    const newPin = this.buildNewPing;
    // TO DO
    this.util.showPopupMessage('le pin a été modifier ');
    this.annulerAction();
  }

  /**
   * 
   */
  storeValue(value: number) : void {
    this.buildNewPing = this.buildNewPing + value.toString();
  }

}
