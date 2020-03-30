import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ParametragePage } from './parametrage.page';
import { ComponentModule } from 'src/app/MODULES/component/component.module';

const routes: Routes = [
  {
    path: '',
    component: ParametragePage
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
  declarations: [ParametragePage]
})
export class ParametragePageModule {}
