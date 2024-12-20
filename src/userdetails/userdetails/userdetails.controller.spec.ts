import { Test, TestingModule } from '@nestjs/testing';
import { UserdetailsController } from './userdetails.controller';

describe('UserdetailsController', () => {
  let controller: UserdetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserdetailsController],
    }).compile();

    controller = module.get<UserdetailsController>(UserdetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
