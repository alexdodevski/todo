class Date {
    constructor(obj) {
        _this.date = obj
        _this.months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
        _this.week = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"]
        _this.day = _this.date.getDate()
        _this.weeklyDay = _this.date.getDay()
        _this.month = _this.date.getMonth()
    }


    getCurrentDate() {
        return `${week[weeklyDay]}, ${day} ${months[month]}`
    }
}