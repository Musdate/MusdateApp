import { Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { WalksComponent } from '../walks/walks.component';
import { SettingsComponent } from '../settings/settings.component';
import { MenuWeekComponent } from '../menu-week/menu-week.component';
import { MenuHistoryComponent } from '../menu-history/menu-history.component';
import { MenuDayComponent } from '../menu-day/menu-day.component';
import { HomeComponent } from '../home/home.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';

export const LANDING_ROUTES: Routes = [
    {
        path: '',
        component: LandingComponent,
        children: [
            {
                path: 'home',
                children: [
                    { path: '', component: HomeComponent },
                    {
                        path: 'menu',
                        children: [
                            { path: '', component: MenuWeekComponent },
                            { path: 'day', component: MenuDayComponent },
                            { path: 'history', component: MenuHistoryComponent },
                        ]
                    },
                    { path: 'recipes', component: RecipesComponent },
                    { path: 'shopping-list', component: ShoppingListComponent },
                ]
             },
            { path: 'walks', component: WalksComponent },
            { path: 'settings', component: SettingsComponent },
        ]
     }
];