import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    return response.json(await appointmentsRepository.find());
});

appointmentsRouter.post('/', async (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointments = new CreateAppointmentService();

    try {
        const appointment = await createAppointments.execute({
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
