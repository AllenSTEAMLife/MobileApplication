export default class notification {
    constructor(title, type, date, message, onlyNotif=false) {
        this.title = title
        this.date = date
        this.type = type
        this.message = message
        this.onlyNotif = onlyNotif
    }
}