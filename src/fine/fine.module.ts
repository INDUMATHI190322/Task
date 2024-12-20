import { Module } from '@nestjs/common';
import { FineService } from './fine/fine.service';
import { FineController } from './fine/fine.controller';

@Module({
  providers: [FineService],
  controllers: [FineController]
})
export class FineModule {}
