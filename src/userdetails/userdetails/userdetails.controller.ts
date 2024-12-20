import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserdetailsService } from './userdetails.service';
import { Userdetails } from '../userdetails.entity';

@Controller('userdetails')
export class UserdetailsController {
  constructor(private readonly userService: UserdetailsService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() data: Partial<Userdetails>) {
    return this.userService.createUser(data);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() data: Partial<Userdetails>) {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
