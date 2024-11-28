import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },

  {
    path: 'records',
    loadComponent: () =>
      import('./records/records.component').then((m) => m.RecordsComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./add-edit-records/add-records.component').then(
        (m) => m.AddRecordsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./add-edit-records/add-records.component').then(
        (m) => m.AddRecordsComponent
      ),
    canActivate: [AuthGuard],
  },
];
