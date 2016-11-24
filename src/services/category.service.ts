import * as _ from 'lodash';
import * as localForage from 'localforage';

export type ICategory = {
    title: string;
    total: number;
}

const STORAGE_NAME = 'myMoneyGo';
const STORAGE_KEY = 'categories';

export class CategoryService {
    private categories: ICategory[] = [];
    private store: any;

    constructor() {

        this.store = localForage.createInstance({
            name: STORAGE_NAME
        });

        // fetch categories from localForage
        this.store.getItem(STORAGE_KEY)
            .then((value) => {
                if (!! value && _.isArray(JSON.parse(value))) {
                    this.categories.push(...JSON.parse(value));
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
        this.persistData();
    }

    addAmount(data, category) {
        let val = parseInt(data.amount);
        if (_.isNumber(val) && !_.isNaN(val)) {
            let index = _.findIndex(this.categories, ['title', category.title]);
            this.categories[index].total = this.categories[index].total + parseInt(data.amount);
        }
        this.persistData();
    }

    persistData() {
        this.store.setItem(STORAGE_KEY, JSON.stringify(this.categories)).then(() => {
        })
    }

}