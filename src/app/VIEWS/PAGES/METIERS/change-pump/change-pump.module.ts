import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChangePumpPage } from './change-pump.page';
import { ComponentModule } from 'src/app/MODULES/component/component.module';

const routes: Routes = [
  {
    path: '',
    component: ChangePumpPage
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
  declarations: [ChangePumpPage]
})
export class ChangePumpPageModule {}
