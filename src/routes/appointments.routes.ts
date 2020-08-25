import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
    return response.json(appointmentsRepository.all());
});

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointments = new CreateAppointmentService(
        appointmentsRepository,
    );

    try {
        const appointment = createAppointments.execute({
            provider,
            date: parsedDate,
        });
        return response.json(appointment);
    } catch (error) {
        return response.status(400).json({
            error: error.message,
        });
    }
});

export default appointmentsRouter;
