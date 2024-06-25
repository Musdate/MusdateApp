import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

export const AUTH_ROUTES: Routes = [
    {
        path: '', 
        component: LayoutComponent,
        children: [
            { path: 'register', component: RegisterComponent},
            { path: 'login', component: LoginComponent},
            { path: '**', redirectTo: 'login', pathMatch: 'full' }
        ]
     }
];
