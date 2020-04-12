import { PumpComponent } from './../../VIEWS/COMPONENTS/METIERS/pump/pump.component';
import { ConsumptionComponent } from './../../VIEWS/COMPONENTS/METIERS/consumption/consumption.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../VIEWS/COMPONENTS/GENERALES/header/header.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from '../../VIEWS/COMPONENTS/GENERALES/menu/menu.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    ConsumptionComponent,
    PumpComponent

  ],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    ConsumptionComponent,
    PumpComponent
  ]
})
export class ComponentModule { }
