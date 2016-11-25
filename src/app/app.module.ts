import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {CategoriesPage} from '../pages/categories/categories';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {CategoryService} from '../services/category.service';
import {PeriodsService} from '../services/periods.service';


@NgModule({
    declarations: [
        MyApp,
        CategoriesPage,
        HomePage,
        TabsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        CategoriesPage,
        HomePage,
        TabsPage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        PeriodsService,
        CategoryService
    ]
})
export class AppModule {
}
