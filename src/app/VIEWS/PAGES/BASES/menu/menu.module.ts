import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';



const routes: Routes = [{
    path: 'menu',
    component: MenuPage,
    children: [{
        path: 'acceuil',
        loadChildren: () => import('../../METIERS/acceuil/acceuil.module').then(m => m.AcceuilPageModule)
      },
      {
        path: 'parametrage',
        loadChildren: () => import('../../METIERS/parametrage/parametrage.module').then(m => m.ParametragePageModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('../../METIERS/messages/messages.module').then(m => m.MessagesPageModule)
      },
      {
        path: 'consommer',
        loadChildren: () => import('../../METIERS/consomation/consomation.module').then(m => m.ConsomationPageModule)
      },
      {
        path: 'historique',
        loadChildren: () => import('../../METIERS/historique/historique.module').then(m => m.HistoriquePageModule)
      },
      {
        path: 'modif-password',
        loadChildren: () => import('../../LOGGED/modif-password/modif-password.module').then(m => m.ModifPasswordPageModule)
      },
      {
        path: 'change-pin',
        loadChildren: () => import('../../LOGGED/change-pin/change-pin.module').then(m => m.ChangePinPageModule)
      },
      {
        path: 'distribution',
        loadChildren: () => import('../../METIERS/distribution/distribution.module').then(m => m.DistributionPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'menu/acceuil',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}