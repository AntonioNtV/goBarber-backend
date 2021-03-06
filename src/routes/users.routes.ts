import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatar from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);
/**
 * Repositories
 * Services
 */

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const { id } = request.user;
        const { filename } = request.file;

        const updateUserAvatar = new UpdateUserAvatar();
        const user = await updateUserAvatar.execute({
            user_id: id,
            avatarFilename: filename,
        });

        delete user.password;

        return response.json(user);
    },
);

export default usersRouter;
