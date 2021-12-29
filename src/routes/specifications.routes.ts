import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/createSpecification';
import { listSpecificationsController } from '../modules/cars/useCases/listSpecifications';

const specificationsRoutes = Router();

specificationsRoutes.get('/', (request, response) => listSpecificationsController.handle(request, response));

specificationsRoutes.post('/', (request, response) => createSpecificationController.handle(request, response));

export { specificationsRoutes };
