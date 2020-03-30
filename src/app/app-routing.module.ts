import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'loggin', pathMatch: 'full' },
  { path: 'loggin', loadChildren: () => import('./VIEWS/PAGES/LOGGED/login-register/login-register.module').
      then(m => m.LoginRegisterPageModule) },
  { path: 'pincode', loadChildren: () => import('./VIEWS/PAGES/LOGGED/pin/pin.module').then(m => m.PinPageModule) },
  { path: 'menu', loadChildren: () => import('./VIEWS/PAGES/BASES/menu/menu.module').then(m => m.MenuPageModule)},
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
