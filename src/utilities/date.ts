export const DATE = {
    // получение текущей даты
    // RETURN - JS DATE
    getCurrentDate() {
        return new Date();
    },

    getMonthWord(month: number) {
        switch (month) {
            case 1: {
                return 'January';
            }
            case 2: {
                return 'February';
            }
            case 3: {
                return 'March';
            }
            case 4: {
                return 'April';
            }
            case 5: {
                return 'May';
            }
            case 6: {
                return 'June';
            }
            case 7: {
                return 'July';
            }
            case 8: {
                return 'August';
            }
            case 9: {
                return 'September';
            }
            case 10: {
                return 'October';
            }
            case 11: {
                return 'November';
            }
            case 12: {
                return 'December';
            }
        }
    },

    dateTranslateFromJS(date: Date) {
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

        let monthWord = this.getMonthWord(+month);
        return `${day} ${monthWord} in ${hours}:${minutes}`;
    },

    dateTranslateFromAPI(date: string) {
        const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        const monthWord = this.getMonthWord(+month);
        const day = date.slice(8, 10);
        const hour = date.slice(11, 13);
        const minutes = date.slice(14, 16);
        return `${day} ${monthWord} in ${hour}:${minutes}`
    }


}