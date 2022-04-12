export default class event {
    constructor(name, description, club, startTime, endTime, maxAttendees) {
        this.name = name;
        this.description = description;
        this.club = club;
        this.startTime = Date(startTime * 1000);
        this.endTime = Date(endTime * 1000);
        this.maxAttendees = maxAttendees;
    }
    

}