import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'otp-login', pathMatch: 'full' },
  {
    path: 'otp-login',
    loadChildren: () => import('./otp-login/otp-login.module').then(m => m.OtpLoginModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'user-details',
    loadChildren: () => import('./user-details/user-details.module').then(m => m.UserDetailsPageModule)
  },
  {
    path: 'admin-user',
    loadChildren: () => import('./admin-user/admin-user.module').then(m => m.AdminUserPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'users-list',
    loadChildren: () => import('./users-list/users-list.module').then(m => m.UsersListPageModule)
  },
  {
    path: 'image-modal',
    loadChildren: () => import('./image-modal/image-modal.module').then( m => m.ImageModalPageModule)
  },
  {
    path: 'charity',
    loadChildren: () => import('./charity/charity.module').then( m => m.CharityPageModule)
  },
  {
    path: 'achiever-list',
    loadChildren: () => import('./achiever-list/achiever-list.module').then( m => m.AchieverListPageModule)
  },
  {
    path: 'famous-personality',
    loadChildren: () => import('./famous-personality/famous-personality.module').then( m => m.FamousPersonalityPageModule)
  },
  {
    path: 'image-gallery',
    loadChildren: () => import('./image-gallery/image-gallery.module').then( m => m.ImageGalleryPageModule)
  },
  {
    path: 'sms-popover',
    loadChildren: () => import('./sms-popover/sms-popover.module').then( m => m.SmsPopOverPageModule)
  },  {
    path: 'directory-list',
    loadChildren: () => import('./directory-list/directory-list.module').then( m => m.DirectoryListPageModule)
  },
  {
    path: 'business-search',
    loadChildren: () => import('./business-search/business-search.module').then( m => m.BusinessSearchPageModule)
  },
  {
    path: 'matrimony',
    loadChildren: () => import('./matrimony/matrimony.module').then( m => m.MatrimonyPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
