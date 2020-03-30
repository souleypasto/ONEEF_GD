import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoriquePage } from './historique.page';
import { ComponentModule } from '../../../../MODULES/component/component.module';

const routes: Routes = [
  {
    path: '',
    component: HistoriquePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentModule
  ],
  declarations: [HistoriquePage]
})
export class HistoriquePageModule {}
