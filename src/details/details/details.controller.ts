import { Controller,Get } from '@nestjs/common';
import { details } from '../details.entity';
import { DetailsService } from './details.service';

import { Post,Put, Delete, Body, Param ,Query} from  '@nestjs/common';




@Controller('details')
export class DetailsController {
    constructor(private detailsService: DetailsService){}
    @Get()
    index(): Promise<details[]> {
      console.log(`Received GET request to fetch user with ID`);
      
        return this.detailsService.findAll();
      } 
      @Post('create')
      async create(@Body() detailsData: details): Promise<any> {
        console.log('Received POST request to create user:',details);
      
      return this.detailsService.create(detailsData);
      }
      @Put(':id/update')
      
      async update(@Param('id') id:number, @Body() detailsData: details): Promise<any> {
        detailsData.id = Number(id);
        console.log('Update #' + detailsData.id)
          
     
    console.log(`Received PUT request to update user with ID: ${id}`);
          return this.detailsService.update(detailsData);
      }  
      @Delete(':id')
      async delete(@Param('id') id): Promise<any> {        
        console.log(`Received DELETE request to remove user with ID: ${id}`);
        return this.detailsService.delete(id);
      } 
      @Get('search')
      search(@Query('q') query: string) {
        return this.detailsService.search(query);
      }
      
      
}


    