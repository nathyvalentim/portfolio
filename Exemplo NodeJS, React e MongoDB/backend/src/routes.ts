import { Router } from 'express';


import { isAuthenticated } from './middlewares/isAuthenticated';

//Usuários
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

//Buscas
import { ListAllController } from './controllers/search/ListAllController';
import { ListLaunchesController } from './controllers/search/ListLaunchesController';
import { ListStatsController } from './controllers/search/ListStatsController';

const router = Router();


//Rotas de busca
router.get('/', new ListAllController().handle)
router.get('/launches', new ListLaunchesController().handle)
router.get('/launches/stats', new ListStatsController().handle)

export { router };