import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoyInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate the user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '00123',
      email: 'user@test.com',
      password: '1234',
      name: 'User Test',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an non-existent user', async () => {
    expect(async () => {
      const noExistentUser: ICreateUserDTO = {
        driver_license: '999',
        email: 'nonexistent@test.com',
        password: '1234',
        name: 'Non Existent User',
      };

      await authenticateUserUseCase.execute({
        email: noExistentUser.email,
        password: noExistentUser.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with invalid password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '001234',
        email: 'user1@test.com',
        password: '1234',
        name: 'User Test',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'invalid password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
