import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login-register', pathMatch: 'full' },
  { path: 'login-register', loadChildren: './VIEWS/PAGES/login-register/login-register.module#LoginRegisterPageModule' },
  // { path: 'tabs', loadChildren: './VIEWS/PAGES/tabs/tabs.module#TabsPageModule' },
  { path: 'menu', loadChildren: './VIEWS/PAGES/menu/menu.module#MenuPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
