import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Pump } from 'src/app/MODELS/Pompe';
import { PompeService } from 'src/app/SERVICES/POMPE/pompe.service';

@Component({
  selector: 'app-pump',
  templateUrl: './pump.component.html',
  styleUrls: ['./pump.component.scss'],
})
export class PumpComponent implements OnInit {

  @Input() pumps: Pump[];
  @Output() selectedPump: EventEmitter<any> = new EventEmitter();

  constructor(
    private pumpService: PompeService
  ) { }

  ngOnInit() {
    this.getPumps();
  }

  getPumps() {
      this.pumpService.getPumpList().then((pumpInfo: Pump[]) => {
        if (pumpInfo) {
          console.log(pumpInfo);
          this.pumps = pumpInfo;
        }
      });
  }

  selectPump(pump) {
    this.selectPump = pump;
  }

}
