import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';

import { ICategory, CategoryService } from '../../services/category.service';
import {PeriodsService} from '../../services/periods.service';

import * as moment from 'moment';
import 'moment/locale/de';

export type IPeriod = {
    value: string;
    title: string;
}

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public categories: ICategory[];
    public periods: IPeriod[];
    public selectedPeriod;

    constructor(
            public navCtrl:NavController,
            public alertCtrl: AlertController,
            private categoryService: CategoryService,
            private periodsService: PeriodsService) {

        this.categories = this.categoryService.getCategories();
        this.periods = this.periodsService.getPeriods();
        this.selectedPeriod = this.periodsService.selectedPeriod;
    }

    ionViewDidEnter() {

    }

    updatePeriod() {
        this.periodsService.selectedPeriod = this.selectedPeriod;
        this.categoryService.updateCategoriesTotal();
        this.categories = this.categoryService.getCategories();
    }

    /**
     *
     * @param item
     */
    itemSelected(category) {
        let prompt = this.alertCtrl.create({
            title: 'Add amount',
            message: "... to category: " + category.title,
            inputs: [
                {
                    name: 'amount',
                    placeholder: 'Amount'
                },
                {
                    name: 'date',
                    value: moment().format('YYYY-MM'),
                    placeholder: 'Date (2016-10)'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        console.log('Saved clicked');
                        this.categoryService.addAmount(data, category);
                        this.categories = this.categoryService.getCategories();
                    }
                }
            ]
        });
        prompt.present();
    }
}
