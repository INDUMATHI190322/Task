import { Module } from '@nestjs/common';
import { DetailsService } from './details/details.service';
import { DetailsController } from './details/details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { details } from './details.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([details]),
  ],

  providers: [DetailsService],
  controllers: [DetailsController]
})
export class DetailsModule {}
