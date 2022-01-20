import { AppError } from '../../../../shared/errors/AppError';
import { ICreateCategoryDTO } from '../../repositories/ICategoriesRepository';
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('should be able to create a new category', async () => {
    const categoryTest: ICreateCategoryDTO = {
      name: 'Category Name Test',
      description: 'Category Description Test',
    };

    const categoryCreated = await createCategoryUseCase.execute(categoryTest);

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create two categories with the same name', async () => {
    expect(async () => {
      const categoryTest: ICreateCategoryDTO = {
        name: 'Category Name Test',
        description: 'Category Description Test',
      };

      await createCategoryUseCase.execute(categoryTest);
      await createCategoryUseCase.execute(categoryTest);
    }).rejects.toBeInstanceOf(AppError);
  });
});
