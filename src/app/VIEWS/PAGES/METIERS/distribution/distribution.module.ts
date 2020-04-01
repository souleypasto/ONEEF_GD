import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DistributionPage } from './distribution.page';
import { ComponentModule } from '../../../../MODULES/component/component.module';

const routes: Routes = [
  {
    path: '',
    component: DistributionPage
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
  declarations: [DistributionPage]
})
export class DistributionPageModule {}
