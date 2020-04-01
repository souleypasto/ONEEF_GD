import { Component, OnInit, Input } from '@angular/core';
import { Consumption } from '../../../../MODELS/Consumption';
import { ChauffeurService } from '../../../../SERVICES/CHAUFFEUR/chauffeur.service';
import { Driver } from '../../../../MODELS/Driver';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss'],
})
export class ConsumptionComponent implements OnInit {

  @Input() consumption: Consumption;

  driverName: string;

  constructor(private driveServ: ChauffeurService) {}

  ngOnInit() {
    this.initClassVar();
  }

  initClassVar() {
    if (this.consumption) {
      this.driveServ.getInfoDriverByIdVehicule(this.consumption.id_vehicule).then((driverInfo: string) => {
        if (driverInfo) {
          this.driverName = driverInfo;
        }
      });
    }
  }


}
