import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { UsersDto } from '../dtos/users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/create')
  @ApiResponse({ status: 201, description: 'user created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'The data entered to create the user is invalid.',
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error occurred while creating the user.',
  })
  create(@Body() createUser: UsersDto) {
    return this.userService.create(createUser);
  }

  @Get('/all')
  @ApiResponse({
    status: 200,
    description: 'All user were found successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'No user were found in the system.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while searching for the user.',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'user found successfully.' })
  @ApiResponse({
    status: 404,
    description: 'user with the entered ID not found.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while searching for the user.',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiResponse({ status: 200, description: 'user updated successfully.' })
  @ApiResponse({
    status: 404,
    description: 'user with the entered ID not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error occurred while updating the user.',
  })
  update(@Param('id') id: string, @Body() updateUser: UsersDto) {
    return this.userService.update(+id, updateUser);
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 200, description: 'user deleted successfully.' })
  @ApiResponse({
    status: 404,
    description: 'user with the entered ID not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error occurred while deleting the user.',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
