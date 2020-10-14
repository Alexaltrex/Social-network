import {LangType} from "../types/types";
import {translate} from "../const/lang";

// получение текущей даты
// RETURN - JS DATE
export const DATE = {
    getCurrentDate(): Date {
        return new Date();
    },

    getMonthWord(month: number, lang: LangType): string {
        const monthArray = [
            {'eng': "January", 'rus': 'Января'},
            {'eng': "February", 'rus': 'Февраля'},
            {'eng': "March", 'rus': 'Марта'},
            {'eng': "April", 'rus': 'Апреля'},
            {'eng': "May", 'rus': 'Мая'},
            {'eng': "June", 'rus': 'Июня'},
            {'eng': "July", 'rus': 'Июля'},
            {'eng': "August", 'rus': 'Августа'},
            {'eng': "September", 'rus': 'Сентября'},
            {'eng': "October", 'rus': 'Октября'},
            {'eng': "November", 'rus': 'Ноября'},
            {'eng': "December", 'rus': 'Декабря'},
           ];
        return lang === 'eng' ? monthArray[month].eng : monthArray[month].rus
    },

    dateTranslateFromJS(date: Date, lang: LangType): string {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours() as number | string;
        let minutes = date.getMinutes() as number | string;

        if (hours < 10) {
            hours = `0${hours}`
        };

        if (minutes < 10) {
            minutes = `0${minutes}`
        };

        let monthWord = this.getMonthWord(month, lang);
        return `${day} ${monthWord} in ${hours}:${minutes}`;
    },

    dateTranslateFromAPI(date: string, lang: LangType) {
        //const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        const monthWord = this.getMonthWord(+month, lang);
        const day = date[8] === '0' ? date.slice(9, 10) : date.slice(8, 10);
        const hour = date.slice(11, 13);
        const minutes = date.slice(14, 16);
        return `${day} ${monthWord} ${translate(lang, 'in')} ${hour}:${minutes}`
    }
};

//======================== TYPE =======================
