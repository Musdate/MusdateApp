import { Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { WalksComponent } from '../walks/walks.component';

export const LANDING_ROUTES: Routes = [
    {
        path: '', 
        component: LandingComponent,
        children: [
            { path: 'recipes', component: RecipesComponent },
            { path: 'walks', component: WalksComponent }
        ]
     }
];