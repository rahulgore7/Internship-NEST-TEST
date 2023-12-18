// /src/users/users.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';

describe('UsersController', () => {
  let usersController: UserController;
  let usersService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {}, // Mock your repository here if needed
        },
      ],
    }).compile();

    usersController = module.get<UserController>(UserController);
    usersService = module.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      // Update the mock data to include the 'password' property
      const result: User[] = [{ id: 1, username: 'rahul', password: 'password' }];
  
      // Mock the findAll method of the usersService to return the test result
      jest.spyOn(usersService, 'findAll').mockImplementation(async () => result);
  
      // Resolve the promise using await within the expect statement
      expect(await usersController.findAll()).toEqual(result);
    });
  });
  
  

  // Add more tests for other CRUD operations, validation, etc.

  afterEach(() => {
    jest.resetAllMocks();
  });
});
