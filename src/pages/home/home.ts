import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';

import { ICategory, CategoryService } from '../../services/category.service';

import * as _ from 'lodash';

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
            private categoryService: CategoryService) {


        this.periods = [
            {value: '201611', title: '2016, November'},
            {value: '201610', title: '2016, October'}
        ];

        this.selectedPeriod = this.periods[0].value;

        this.categories = this.categoryService.getCategories();
    }

    ionViewDidEnter() {

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
                    }
                }
            ]
        });
        prompt.present();
    }
}
