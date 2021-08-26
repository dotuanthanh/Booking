import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterModule} from './register/register.module';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(module => module.RegisterModule)
  },
  {
  path: '',
  pathMatch: 'full',
  redirectTo: 'houses'
}, {
  path : 'houses',
  loadChildren: () => import('./house/house.module').then(module => module.HouseModule)
},
  {
    path : 'edit',
    loadChildren: () => import('./update-user/update-user.module').then(module => module.UpdateUserModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then(module => module.ChangePasswordModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
