import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'name',
      description: 'description',
      daily_rate: 100,
      license_plate: 'abc1234',
      fine_amount: 500,
      brand: 'brand',
      category_id: '123',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create two cars with same license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'name',
        description: 'description',
        daily_rate: 100,
        license_plate: 'abc1234',
        fine_amount: 500,
        brand: 'brand',
        category_id: '123',
      });

      await createCarUseCase.execute({
        name: 'name',
        description: 'description',
        daily_rate: 100,
        license_plate: 'abc1234',
        fine_amount: 500,
        brand: 'brand',
        category_id: '123',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with field available true by default', async () => {
    const car = await carsRepository.create({
      name: 'name',
      description: 'description',
      daily_rate: 100,
      license_plate: 'abc4321',
      fine_amount: 500,
      brand: 'brand',
      category_id: '123',
    });

    expect(car.available).toBe(true);
  });
});
