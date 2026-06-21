import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { BookingPageComponent } from './features/booking-page/booking-page.component';
import { ReviewComponent } from './features/review/review.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { GeneralLayoutComponent } from './layout/general-layout/general-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { guestGuard } from './core/auth/guards/guest-guard';
import { authGuard } from './core/auth/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  //////////////////////////////////////////
  // *for authentication
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      {
        path: 'registration',
        loadComponent: () =>
          import('./features/registration/registration.component').then(
            (c) => c.RegistrationComponent,
          ),
        title: 'Registration',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/authentication/authentication.component').then(
            (c) => c.AuthenticationComponent,
          ),
        title: 'Login',
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./features/forgot-password/forgot-password.component').then(
            (c) => c.ForgotPasswordComponent,
          ),
        title: 'Forgot Password',
      },
    ],
  },

  //////////////////////////////////////////
  // *for admin
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin-control-panel/admin-control-panel.component').then(
            (c) => c.AdminControlPanelComponent,
          ),
        title: 'Dashboard',
      },
      {
        path: 'add-workspace',
        loadComponent: () =>
          import('./features/add-workspaces/add-workspaces.component').then(
            (c) => c.AddWorkspaceComponent,
          ),
        title: 'Create Workspace',
      },
      {
        path: 'all-workspace',
        loadComponent: () =>
          import('./features/all-workspace/all-workspace.component').then(
            (c) => c.AllWorkspaceComponent,
          ),
        title: 'All Workspace',
      },
      {
        path: 'space-type',
        loadComponent: () =>
          import('./features/space-type/./space-type.component').then((c) => c.SpaceTypeComponent),
        title: 'Create Space Type',
      },
      {
        path: 'manage-role',
        loadComponent: () =>
          import('./features/manage-role/./manage-role.component').then(
            (c) => c.ManageRoleComponent,
          ),
        title: 'Manage Role',
      },
      {
        path: 'booking-history',
        loadComponent: () =>
          import('./features/booking-history/booking-history.component').then(
            (c) => c.BookingHistoryComponent,
          ),
        title: 'Booking History',
      },
      {
        path: 'receptionist',
        loadComponent: () =>
          import('./features/receptionist/receptionist.component').then(
            (c) => c.ReceptionistComponent,
          ),
        title: 'Receptionist',
      },
      {
        path: 'RequestAndSr',
        loadComponent: () =>
          import('./features/request-and-sr/request-and-sr.component').then(
            (c) => c.RequestAndSrComponent,
          ),
        title: 'Request And Sr',
      },
    ],
  },

  //////////////////////////////////////////
  // *for user
  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'user-profile', pathMatch: 'full' },
      {
        path: 'user-profile',
        loadComponent: () =>
          import('./features/user-profile/user-profile.component').then(
            (c) => c.UserProfileComponent,
          ),
        title: 'User Profile',
      },
      {
        path: 'booking-history',
        loadComponent: () =>
          import('./features/booking-history/booking-history.component').then(
            (c) => c.BookingHistoryComponent,
          ),
        title: 'Booking History',
      },
    ],
  },

  //////////////////////////////////////////
  // *for general
  {
    path: '',
    component: GeneralLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home Page | الصفحة الرئيسية' },
      { path: 'booking', component: BookingPageComponent, title: 'New Booking' },
      { path: 'review', component: ReviewComponent, title: 'Previous Reviews' },

      {
        path: 'gallery',
        loadComponent: () =>
          import('./features/gallery/gallery.component').then((c) => c.GalleryComponent),
        title: 'Gallery',
      },
      {
        path: 'Location',
        loadComponent: () =>
          import('./features/location-page/location-page.component').then(
            (c) => c.LocationPageComponent,
          ),
        title: 'Location',
      },
      {
        path: 'contact-us',
        loadComponent: () =>
          import('./features/contact-us/contact-us.component').then((c) => c.ContactUsComponent),
        title: 'Contact Us',
      },
      {
        path: 'loggedout',
        loadComponent: () =>
          import('./features/logout-message/logout-message.component').then(
            (c) => c.LogoutMessageComponent,
          ),
        title: 'Logged Out',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./features/not-found-page/not-found-page.component').then(
            (c) => c.NotFoundPageComponent,
          ),
        title: 'Page Not Found',
      },
    ],
  },
];
