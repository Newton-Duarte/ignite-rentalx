import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { CreateCarUseCase } from '../createCar/CreateCarUseCase';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepository: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let createCarUseCase: CreateCarUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to list all the cars available', async () => {
    await createCarUseCase.execute({
      name: 'Available Car',
      description: 'N/A',
      brand: 'N/A',
      category_id: '123',
      daily_rate: 100,
      fine_amount: 150,
      license_plate: 'BBB1234',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars.length).toBeGreaterThan(0);
  });

  it('should be able to list all the cars available by brand', async () => {
    await createCarUseCase.execute({
      name: 'Available Car1',
      description: 'N/A',
      brand: 'Brand01',
      category_id: '123',
      daily_rate: 100,
      fine_amount: 150,
      license_plate: 'BBB1111',
    });
    await createCarUseCase.execute({
      name: 'Available Car2',
      description: 'N/A',
      brand: 'Brand01',
      category_id: '123',
      daily_rate: 120,
      fine_amount: 130,
      license_plate: 'BBB2222',
    });
    await createCarUseCase.execute({
      name: 'Available Car3',
      description: 'N/A',
      brand: 'Brand02',
      category_id: '123',
      daily_rate: 120,
      fine_amount: 130,
      license_plate: 'BBB3333',
    });

    const availableCarsByBrand = await listAvailableCarsUseCase.execute({ brand: 'Brand01' });

    console.log(availableCarsByBrand);

    expect(availableCarsByBrand.length).toEqual(2);
  });
});
