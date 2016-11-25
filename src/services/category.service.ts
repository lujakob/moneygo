import {Injectable} from '@angular/core';
import {PeriodsService} from './periods.service';
import * as _ from 'lodash';
import * as localForage from 'localforage';
import * as moment from 'moment';
import 'moment/locale/de';

export type ICategory = {
    title: string;
    total: number;
}

export type IExpense = {
    category: string;
    value: number;
    date: string;
}

const STORAGE_NAME = 'myMoneyGo';
const STORAGE_KEY_CATEGORIES = 'categories';
const STORAGE_KEY_EXPENSES = 'expenses';

@Injectable()
export class CategoryService {
    private categories: Array<ICategory> = [];
    private expenses: IExpense[] = [];
    private store: any;

    constructor(private periodsService: PeriodsService) {
        this.init();
    }

    init() {
        this.store = localForage.createInstance({
            name: STORAGE_NAME
        });

        // fetch categories from localForage
        this.store.getItem(STORAGE_KEY_CATEGORIES)
            .then((res) => {
                if (!!res && _.isArray(JSON.parse(<any>res))) {
                    this.categories.push(...JSON.parse(<any>res));
                }
            })
            .catch((err) => console.log('rejected: ' + err));


        // fetch expenses from this.store
        this.store.getItem(STORAGE_KEY_EXPENSES)
            .then((res) => {
                if (!!res && _.isArray(JSON.parse(<any>res))) {
                    this.expenses.push(...JSON.parse(<any>res));
                }
            })
            .catch((err) => console.log('rejected: ' + err));

    }

    getCategories() {
        return this.categories;
    }

    addCategory(title) {
        this.categories.push({title: title, total: 0});
        this.persistData();
    }

    removeCategory(category) {
        this.categories.splice(_.findIndex(this.categories, ['title', category.title]), 1);
        this.expenses = this.expenses.filter(item => item.category !== category.title);
        this.persistData();
    }

    addAmount(data, category) {
        let val = parseInt(data.amount);
        if (_.isNumber(val) && !_.isNaN(val)) {
            this.expenses.push(<IExpense>{
                category: category.title,
                value: parseInt(data.amount),
                date: this.isValidDate(data.date) ? data.date : moment().format('YYYY-MM')
            });
            this.persistData();
            this.updateCategoriesTotal();
        }
    }

    isValidDate(date) {
        return _.isString(date) && date.length === 7;
    }

    updateCategoriesTotal() {
        this.categories.map(item => {
            item.total = _.sum(
                _.map(
                    _.filter(
                        this.expenses,
                        {'category': item.title, 'date': this.periodsService.selectedPeriod}
                    ),
                    (item) => {
                        return item.value;
                    }
                )
            );
            return item;
        });
        this.persistData();
    }

    persistData() {
        this.store.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(this.categories))
            .then(() => {})
            .catch((e) => { console.log('Reject persistance: ' + e)});

        this.store.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(this.expenses))
            .then(() => {})
            .catch((e) => { console.log('Reject persistance: ' + e)});

    }

}