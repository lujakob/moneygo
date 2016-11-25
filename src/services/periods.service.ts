import {Injectable} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/de';

export type IPeriod = {
    value: string;
    title: string;
}

const MONTH_FORMAT = 'YYYY-MM';

const FIRST_PERIOD = '2016-03-01';

@Injectable()
export class PeriodsService {
    private periods: IPeriod[];
    public selectedPeriod: string = '2016-11';

    constructor() {
        this.setPeriods();
    }

    setPeriods() {
        let current = moment().format(MONTH_FORMAT);
        let first = moment(FIRST_PERIOD).format(MONTH_FORMAT);
    }

    getPeriods() {
        return [
            {value: '2016-11', title: '2016, November'},
            {value: '2016-10', title: '2016, October'},
            {value: '2016-09', title: '2016, September'}
        ];
    }
}