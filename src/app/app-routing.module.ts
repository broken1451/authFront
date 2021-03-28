import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidaTokenGuard } from './guards/valida-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
    import('./protected/protected.module').then((m) => m.ProtectedModule),
    canActivate:[ValidaTokenGuard],
    canLoad:[ValidaTokenGuard],
  },
  {
    path: '**',
   redirectTo: 'auth'
  },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes,{useHash: true})],
  imports: [RouterModule.forRoot(routes,{useHash: false})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
