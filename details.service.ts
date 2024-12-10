import { Injectable } from '@nestjs/common';
import { Repository , ILike} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { details } from '../details.entity';
import { UpdateResult, DeleteResult } from  'typeorm';



@Injectable()
export class DetailsService {
    constructor(
        @InjectRepository(details)
        private detailsRepository: Repository<details>,
    ) { }
    async  findAll(): Promise<details[]> {
        console.log('Fetching all users...');
        return await this.detailsRepository.find();
    }

    async  create(detailsData:details): Promise<details> {
    
        console.log('Creating user:', detailsData);
        return await this.detailsRepository.save(detailsData);
    }

    async update(detailsData:details): Promise<UpdateResult> {
    
        console.log(`Updating user with ID: ${detailsData.id}`);

        return await this.detailsRepository.update(detailsData.id, detailsData);
      }
    async delete(id): Promise<DeleteResult> {
        console.log(`Deleting user with ID: ${id}`);
        return await this.detailsRepository.delete(id);
    }
    async search(query: string): Promise<details[]> {
        return this.detailsRepository.find({
          where: [
            { Name: ILike(`%${query}%`) },
            { Password: ILike(`%${query}%`) },
            { Occupation: ILike(`%${query}%`) },
            { country: ILike(`%${query}%`) },
          ],
        });
}
}
