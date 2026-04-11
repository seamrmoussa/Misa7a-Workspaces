import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { BookingPageComponent } from './features/booking-page/booking-page.component';
import { PlansAndPricingComponent } from './features/plans-and-pricing/plans-and-pricing.component';
import { ReviewComponent } from './features/review/review.component';
import { NotFoundPageComponent } from './features/not-found-page/not-found-page.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { GeneralLayoutComponent } from './layout/general-layout/general-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  //////////////////////////////////////////
  // *for general
  {
    path: '',
    component: GeneralLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home Page | الصفحة الرئيسية' },
      { path: 'booking', component: BookingPageComponent, title: 'New Booking' },
      { path: 'plans', component: PlansAndPricingComponent, title: 'Plans & Price' },
      { path: 'review', component: ReviewComponent, title: 'Previous Reviews' },
      {
        path: 'gallery',
        loadComponent: () =>
          import('./features/gallery/gallery.component').then((c) => c.GalleryComponent),
        title: 'Gallery',
      },
      {
        path: 'help',
        loadComponent: () =>
          import('./features/help-page/help-page.component').then((c) => c.HelpPageComponent),
        title: 'Help',
      },
      {
        path: 'inquiry',
        loadComponent: () =>
          import('./features/inquiry-form/inquiry-form.component').then(
            (c) => c.InquiryFormComponent,
          ),
        title: 'Inquiry',
      },
    ],
  },

  //////////////////////////////////////////
  // *for authentication
  {
    path: '',
    component: AuthLayoutComponent,
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
    children: [
      { path: '', redirectTo: 'admin-panel', pathMatch: 'full' },
      {
        path: 'admin-panel',
        loadComponent: () =>
          import('./features/admin-control-panel/admin-control-panel.component').then(
            (c) => c.AdminControlPanelComponent,
          ),
        title: 'Admin Panel',
      },
      {
        path: 'gm-dashboard',
        loadComponent: () =>
          import('./features/gm-dashboard/gm-dashboard.component').then(
            (c) => c.GmDashboardComponent,
          ),
        title: 'DashBoard',
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
        path: 'notifications',
        loadComponent: () =>
          import('./features/notifications/notifications.component').then(
            (c) => c.NotificationsComponent,
          ),
        title: 'Notifications',
      },
    ],
  },

  //////////////////////////////////////////
  // *for user
  {
    path: 'user',
    component: UserLayoutComponent,
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
        path: 'wallet',
        loadComponent: () =>
          import('./features/wallet-and-balance/wallet-and-balance.component').then(
            (c) => c.WalletAndBalanceComponent,
          ),
        title: 'Wallet & Balance',
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
        path: 'notifications',
        loadComponent: () =>
          import('./features/notifications/notifications.component').then(
            (c) => c.NotificationsComponent,
          ),
        title: 'Notifications',
      },
    ],
  },

  { path: '**', component: NotFoundPageComponent, title: 'Page Not Found' },
];
