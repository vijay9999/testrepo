import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { AdminUserPageRoutingModule } from '../admin-user/admin-user-routing.module';
import { UserDetailsPageRoutingModule } from '../user-details/user-details-routing.module';
import { AdminUserPageModule } from '../admin-user/admin-user.module';
import { UserDetailsPageModule } from '../user-details/user-details.module';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'admin-user',
        loadChildren: () => import('../admin-user/admin-user.module').then( m => m.AdminUserPageModule)
      },
      {
        path: 'users-list',
        loadChildren: () => import('../users-list/users-list.module').then( m => m.UsersListPageModule)
      },
      {
        path: 'user-details',
        loadChildren: () => import('../user-details/user-details.module').then( m => m.UserDetailsPageModule)
      },
      {
        path: 'registration',
        loadChildren: () => import('../registration/registration.module').then( m => m.RegistrationPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/admin-user'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  AdminUserPageRoutingModule,
  AdminUserPageModule,
  UserDetailsPageModule,
  UserDetailsPageRoutingModule],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
