import { v4 } from 'uuid';

class Appointment {
    id: string;

    provider: string;

    date: Date;

    constructor(provider: string, date: Date) {
        this.provider = provider;
        this.date = date;
        this.id = v4();
    }
}

export default Appointment;
