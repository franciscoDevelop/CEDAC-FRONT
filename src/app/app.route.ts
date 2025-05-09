import { Routes } from '@angular/router';

// dashboard
import { IndexComponent } from './index';
import { AnalyticsComponent } from './analytics';
import { FinanceComponent } from './finance';
import { CryptoComponent } from './crypto';

// widgets
import { WidgetsComponent } from './widgets';

// tables
import { TablesComponent } from './tables';

// font-icons
import { FontIconsComponent } from './font-icons';

// charts
import { ChartsComponent } from './charts';

// dragndrop
import { DragndropComponent } from './dragndrop';

// layouts
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';

// pages
import { KnowledgeBaseComponent } from './pages/knowledge-base';
import { FaqComponent } from './pages/faq';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            // Administration
            { path: 'administracion', canActivate: [AuthGuard], loadChildren: () => import('./administration/administration.module').then((d) => d.AdministrationModule) },
            // dashboard
            { path: '', canActivate: [AuthGuard], component: IndexComponent, data: { title: 'Sales Admin' } },
            { path: 'analytics', canActivate: [AuthGuard], component: AnalyticsComponent, data: { title: 'Analytics Admin' } },
            { path: 'finance', canActivate: [AuthGuard], component: FinanceComponent, data: { title: 'Finance Admin' } },
            { path: 'crypto', canActivate: [AuthGuard], component: CryptoComponent, data: { title: 'Crypto Admin' } },

            // widgets
            { path: 'widgets', canActivate: [AuthGuard], component: WidgetsComponent, data: { title: 'Widgets' } },

            // font-icons
            { path: 'font-icons', canActivate: [AuthGuard], component: FontIconsComponent, data: { title: 'Font Icons' } },

            // charts
            { path: 'charts', canActivate: [AuthGuard], component: ChartsComponent, data: { title: 'Charts' } },

            // dragndrop
            { path: 'dragndrop', canActivate: [AuthGuard], component: DragndropComponent, data: { title: 'Dragndrop' } },

            // pages
            { path: 'pages/knowledge-base', canActivate: [AuthGuard], component: KnowledgeBaseComponent, data: { title: 'Knowledge Base' } },
            { path: 'pages/faq', canActivate: [AuthGuard], component: FaqComponent, data: { title: 'FAQ' } },

            //apps
            { path: '', canActivate: [AuthGuard], loadChildren: () => import('./apps/apps.module').then((d) => d.AppsModule) },

            // components
            { path: '', canActivate: [AuthGuard], loadChildren: () => import('./components/components.module').then((d) => d.ComponentsModule) },

            // elements
            { path: '', canActivate: [AuthGuard], loadChildren: () => import('./elements/elements.module').then((d) => d.ElementsModule) },

            // forms
            { path: '', canActivate: [AuthGuard], loadChildren: () => import('./forms/form.module').then((d) => d.FormModule) },

            // users
            { path: '', canActivate: [AuthGuard], loadChildren: () => import('./users/user.module').then((d) => d.UsersModule) },

            // tables
            { path: 'tables', canActivate: [AuthGuard], component: TablesComponent, data: { title: 'Tables' } },
            { path: '', canActivate: [AuthGuard], loadChildren: () => import('./datatables/datatables.module').then((d) => d.DatatablesModule) },
        ],
    },

    {
        path: '',
        component: AuthLayout,
        children: [
            // pages
            { path: '', loadChildren: () => import('./pages/pages.module').then((d) => d.PagesModule) },

            // auth
            { path: '', loadChildren: () => import('./auth/auth.module').then((d) => d.AuthModule) },
        ],
    },
];
