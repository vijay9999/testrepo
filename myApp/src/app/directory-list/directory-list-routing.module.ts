import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectoryListPage } from './directory-list.page';

const routes: Routes = [
  {
    path: '',
    component: DirectoryListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectoryListPageRoutingModule {}
