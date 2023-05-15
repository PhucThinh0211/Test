import {format, parseISO} from 'date-fns';
import moment from 'moment';
import {Profile, RoleData} from './define-types';

class Utils {
    static token: any;
    static profile: Profile | null;
    static role: RoleData;
    static constant = {
         token: 'token', 
         username: 'username', 
         role: 'role', 
         email: 'email',
         user: 'user' 
        };
    static async setLocalStorage(key: string, value: unknown): Promise<void> {
        localStorage.setItem(key, JSON.stringify(value));
    }
    static async getValueLocalStorage(key: string): Promise<any> {
        const value = await localStorage.getItem(key);
        let re = null;
        value && (re = Utils.parseJson(value));
        return re;
    }
    static async removeItemLocalStorage(key: string): Promise<void> {
        await localStorage.removeItem(key);
    }
    static async clear(): Promise<void> {
        await localStorage.clear();
    }

    static convertJson2XForm(details: any): string {
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        return formBody.join('&');
    }

    static parseJson(str: string): any | null {
        try {
            return JSON.parse(str);
        } catch (e) {
            return null;
        }
    }
    static pathNameMatchContent(path: string): string | undefined {
        if (path === '/main') {
            return 'main';
        }
        const regex = /\/main\/(\w+)$/g;
        const matchResult = regex.exec(path);
        if (matchResult && matchResult.length === 2) {
            return matchResult[1];
        }
        return;
    }
    static formatDate(date: Date): any | null {
        const tyoeFormat = 'MM/dd/yyyy';
        return format(date, tyoeFormat);
    }
    static formatDateVN(date: Date): any | null {
        const tyoeFormat = 'dd/MM/yyyy';
        return format(date, tyoeFormat);
    }
    static formatDateCallApi(date: Date): any | null {
        const tyoeFormat = 'yyyy-MM-dd';
        return format(date, tyoeFormat);
    }
    static formatDateTimeCallApi(date: Date): any | null {
        const tyoeFormat = 'yyyy-MM-dd HH:mm:ss';
        return format(date, tyoeFormat);
    }
    static isNullOrEmpty(value: string | null): boolean {
        return value === null || value === '' || value === undefined;
    }
    static formatDateString(date: string): any | null {
        const tyoeFormat = 'MM/dd/yyyy';
        const newDate = parseISO(date);
        return format(newDate, tyoeFormat);
    }
    static typeFormatDate(): any | null {
        return 'MM/dd/yyyy';
    }
    static typeFormatYear(): any | null {
        return 'yyyy';
    }
    static formatDateToTable(dateArr: string, dateDep: string): string | null {
        const tyoeFormat = 'MM/dd';
        const newDateArr = parseISO(dateArr);
        const newDateDep = parseISO(dateDep);
        return (
            format(newDateArr, tyoeFormat) +
            ' - ' +
            format(newDateDep, tyoeFormat)
        );
    }
    static formatDateToStringRevenue(dateArr: string): string | null {
        const tyoeFormat = 'dd/MM';
        const newDateArr = parseISO(dateArr);
        return format(newDateArr, tyoeFormat);
    }
    static convertToAsiaVNZone(date: Date): string {
        const tzString = 'Asia/Jakarta';
        return new Date(
            (typeof date === 'string' ? new Date(date) : date).toLocaleString(
                'en-US',
                {timeZone: tzString},
            ),
        ).toISOString();
    }

    static convertToVNTimeZone(date: Date): string {
        const hour = 7;
        date.setTime(date.getTime() + hour * 60 * 60 * 1000);
        return date.toISOString();
    }
    static convertToVNTimeZoneMbyMoment(
        date: string | Date,
        format: string = 'HH:mm:ss DD/MM/YYYY',
    ): string {
        const testDateUtc = moment.utc(date);
        const localDate = moment(testDateUtc).local();
        return localDate.format(format);
    }
    static convertToUTC(date: Date): string {
        return moment(date).utc().format();
    }
    static differenceInDays(
        dateTo: Date | string,
        dateForm: Date | string,
    ): number {
        return moment(dateTo).diff(moment(dateForm), 'days');
    }
    static convertBirthDateFormat(oldDate: string | null): Date | undefined {
        if (oldDate === null || oldDate === undefined) {
            return undefined;
        }
        if (oldDate.length > 9) {
            return new Date(oldDate);
        }
        return undefined;
    }
    static convertStartDate(date: Date | string): any {
        const tmp = new Date(date);
        tmp.setHours(0, 0, 0, 0);
        return tmp;
    }

    static convertMiddleDate(date: Date | string): any {
        const tmp = new Date(date);
        tmp.setHours(12, 0, 0, 0);
        return tmp;
    }

    static convertEndDate(date: Date | string): any {
        const tmp = new Date(date);
        tmp.setHours(23, 59, 59, 59);
        return tmp;
    }
    static async formatNumber(value: number) {
        const stringFormat = await this.getValueLocalStorage('FMNUMBER');
        return Intl.NumberFormat(stringFormat ?? 'en-US').format(value ?? 0);
    }

    static unsetFormatNumber(value: string): number {
        return parseInt(value.split(',').join(''), 10);
    }

    static dateDiffInDays = (startDate: Date, endDate: Date): number => {
        // Discard the time and time-zone information.
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const utc1 = Date.UTC(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate(),
        );
        const utc2 = Date.UTC(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate(),
        );
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    };

    static transformData = (obj: any, destination: any) => {
        Object?.keys(destination)?.map(key => {
            if (
                obj[key] !== '' &&
                obj[key] !== null &&
                obj[key] !== undefined
            ) {
                destination[key] = obj[key];
            }
            return null;
        });
    };
    static querySearchToString(filters: any): string {
        const _filters = {...filters};
        const searchParams = Object.keys(_filters)
            .map(filterKey => {
                if (
                    _filters[filterKey] === undefined ||
                    _filters[filterKey] === null
                ) {
                    return '';
                }
                return `${filterKey}=${_filters[filterKey]}`;
            })
            .join('&');
        return searchParams;
    }
    static querySearchToJson(queryString: string): any {
        const pairs = queryString.substring(1).split('&');
        const array = pairs.map(item => {
            const parts = item.split('=');
            return parts;
        });

        return Object.fromEntries(array);
    }
    static getPageSize(windowSize: string): number {
        switch (windowSize) {
            case '2xl':
                return 15;
            case 'xl':
                return 12;
            case 'lg':
                return 12;
            case 'md':
                return 12;
            case 'sm':
                return 12;
            default:
                break;
        }
        return 12;
    }
    static getPageSizeAssign(windowSize: string): number {
        switch (windowSize) {
            case '2xl':
                return 8;
            case 'xl':
                return 6;
            case 'lg':
                return 6;
            case 'md':
                return 6;
            case 'sm':
                return 6;
            default:
                break;
        }
        return 6;
    }

    static compareString = (a: string, b: string): number => {
        return a.localeCompare(b);
    };

    static spliceSlice(str: string, index: number, count: number, add: string) {
        // We cannot pass negative indexes directly to the 2nd slicing operation.
        if (index < 0) {
            index = str.length + index;
            if (index < 0) {
                index = 0;
            }
        }

        return str.slice(0, index) + (add || '') + str.slice(index + count);
    }

    static compareWithoutTime = (date1: Date, date2: Date): boolean => {
        date1.setHours(0, 0, 0, 0);
        date2.setHours(0, 0, 0, 0);
        return date1.toDateString() === date2.toDateString();
    };

    static middayTime(date: Date): Date {
        date.setHours(12, 0, 0, 0);
        return date;
    }

    static formatCreditCard = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };
    /**
     * Parse a localized number to a float.
     * @param {string} stringNumber - the localized number
     * @param {string} locale - [optional] the locale that the number is represented in. Omit this parameter to use the current locale.
     */
    static async parseLocaleNumber(stringNumber: string) {
        const stringFormat = await this.getValueLocalStorage('FMNUMBER');
        const thousandSeparator = Intl.NumberFormat(stringFormat ?? 'en-US')
            .format(11111)
            .replace(/\p{Number}/gu, '');
        const decimalSeparator = Intl.NumberFormat(stringFormat ?? 'en-US')
            .format(1.1)
            .replace(/\p{Number}/gu, '');

        return parseFloat(
            stringNumber
                .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
                .replace(new RegExp('\\' + decimalSeparator), '.'),
        );
    }
    static parseUrl(obj: {[key: string]: string}): URLSearchParams {
        const params = new URLSearchParams();
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            if (key && value) {
                params.set(key, value);
            }
        });
        return params;
    }
    static handleErrosMessaeg(error: any): boolean {
        if (error) {
            if (error.status === 401 || error.status === 502) {
                return false;
            }
        }
        return true;
    }
    static formatDateByUTC(date: Date): Date {
        const tmp = new Date(date);
        return new Date(
            Date.UTC(tmp.getFullYear(), tmp.getMonth(), tmp.getDate(), 0, 0, 0),
        );
    }
    static getDatesBetween = (
        startDate: Date,
        endDate: Date,
        includeEndDate?: boolean,
    ) => {
        const dates = [];
        const currentDate = startDate;
        while (currentDate < endDate) {
            dates.push(format(new Date(currentDate), 'MM/dd/yyyy'));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        if (includeEndDate) {
            dates.push(endDate);
        }
        return dates;
    };
    static getTimeZoneLocal(): number {
        return new Date().getTimezoneOffset() / 60;
    }

    static storageFile = async (data: any, name: string) => {
        
        
        try {
            let url = window.URL.createObjectURL(data);
            let a = document.createElement('a');
            a.href = url;
            a.download = 'employees.json';
            a.click();
            // SimpleToast.show('Tải thành công vào thư mục Downloads ' + name);
        } catch (ex) {
            console.log(ex);
            // SimpleToast.show('Tải không thành công');
        }
    };
}

export default Utils;
