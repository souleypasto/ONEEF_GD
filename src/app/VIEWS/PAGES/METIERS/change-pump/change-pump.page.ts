import { Pump } from 'src/app/MODELS/Pompe';
import { PompeService } from './../../../../SERVICES/POMPE/pompe.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-pump',
  templateUrl: './change-pump.page.html',
  styleUrls: ['./change-pump.page.scss'],
})
export class ChangePumpPage implements OnInit {

  pumps: Pump[];
  constructor(
    private pumpService: PompeService
  ) { }

  ngOnInit() {
  }

  initPumpList() {
    this.pumpService.getPumpList().then((pumps: Pump[]) => {
      if (pumps && pumps.length > 0) {
        this.pumps = pumps;
      } else {
        this.pumps = [];
      }
    });
   }
}
