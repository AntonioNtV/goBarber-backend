import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
    return response.json(appointmentsRepository.all());
});

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    if (appointmentsRepository.findByDate(parsedDate)) {
        return response.status(400).json({
            message: 'This appointment is already booked',
        });
    }

    const appointment = appointmentsRepository.create({
        provider,
        date: parsedDate,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
