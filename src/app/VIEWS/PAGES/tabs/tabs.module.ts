import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabsPage } from './tabs.page';



const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'acceuil',
        loadChildren: '../acceuil/acceuil.module#AcceuilPageModule'
      },
      {
        path: 'parametrage',
        loadChildren: '../parametrage/parametrage.module#ParametragePageModule'
      },
      {
        path: 'messages',
        loadChildren: '../messages/messages.module#MessagesPageModule'
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/acceuil',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}