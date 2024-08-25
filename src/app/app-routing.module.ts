import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'paginaperfil',
    loadChildren: () => import('./pages/paginaperfil/paginaperfil.module').then( m => m.PaginaperfilPageModule)
  },
  {
    path: 'paginacrear',
    loadChildren: () => import('./pages/paginacrear/paginacrear.module').then( m => m.PaginacrearPageModule)
  },
  {
    path: 'politcontenido',
    loadChildren: () => import('./pages/politcontenido/politcontenido.module').then( m => m.PolitcontenidoPageModule)
  },
  {
    path: 'politprivacidad',
    loadChildren: () => import('./pages/politprivacidad/politprivacidad.module').then( m => m.PolitprivacidadPageModule)
  },
  {
    path: 'acuerdousuario',
    loadChildren: () => import('./pages/acuerdousuario/acuerdousuario.module').then( m => m.AcuerdousuarioPageModule)
  },
  {
    path: 'agradecimientos',
    loadChildren: () => import('./pages/agradecimientos/agradecimientos.module').then( m => m.AgradecimientosPageModule)
  },
  {
    path: 'centroayuda',
    loadChildren: () => import('./pages/centroayuda/centroayuda.module').then( m => m.CentroayudaPageModule)
  },
  {
    path: 'reportproblema',
    loadChildren: () => import('./pages/reportproblema/reportproblema.module').then( m => m.ReportproblemaPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'adminpage',
    loadChildren: () => import('./pages/adminpage/adminpage.module').then( m => m.AdminpagePageModule)
  },
  {
    path: 'recuperacion',
    loadChildren: () => import('./pages/recuperacion/recuperacion.module').then( m => m.RecuperacionPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
