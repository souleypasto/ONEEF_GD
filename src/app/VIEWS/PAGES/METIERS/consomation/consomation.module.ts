import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConsomationPage } from './consomation.page';
import { ComponentModule } from '../../../../MODULES/component/component.module';

const routes: Routes = [
  {
    path: '',
    component: ConsomationPage
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
  declarations: [ConsomationPage]
})
export class ConsomationPageModule {}
