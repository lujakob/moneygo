import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {ICategory, CategoryService} from '../../services/category.service';

import * as _ from 'lodash';

@Component({
    selector: 'page-categories',
    templateUrl: 'categories.html'
})
export class CategoriesPage {
    public categories:ICategory[];

    constructor(public navCtrl:NavController,
                public alertCtrl: AlertController,
                private categoryService:CategoryService) {

    }

    ionViewDidEnter() {
        this.categories = this.categoryService.getCategories();
    }

    /**
     *
     */
    addCategoryAlert() {
        let prompt = this.alertCtrl.create({
            title: 'Add category',
            message: "Add another category to your list",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Title'
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
                        this.addCategory(data);
                    }
                }
            ]
        });
        prompt.present();
    }

    addCategory(data) {
        if (data.title === '') return;

        if (!this.categoryAlreadyExists(data.title)) {
            this.categoryService.addCategory(data.title);
            console.log("added");
        } else {
            console.log("duplicated");
        }
    }

    categoryAlreadyExists(title) {
        return _.find(this.categories, ['title', title]) !== undefined;
    }

    removeCategoryAlert(category) {
        let confirm = this.alertCtrl.create({
            title: 'Delete this category?',
            message: 'You really want to delete this category and all it\' entries?',
            buttons: [
                {
                    text: 'Disagree',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Agree',
                    handler: () => {
                        this.removeCategory(category);
                    }
                }
            ]
        });
        confirm.present();
    }

    removeCategory(category) {
        this.categoryService.removeCategory(category);
    }
}
