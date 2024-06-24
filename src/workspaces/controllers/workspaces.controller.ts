import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WorkspacesService } from '../services/workspaces.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkSpacesDto } from '../dtos/workspaces.dto';

@ApiTags('Workspaces')
@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post('/create')
  @ApiResponse({ status: 201, description: 'workspaces created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'The data entered to create the workspaces is invalid.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while creating the workspaces.',
  })
  create(@Body() createWorkspace: WorkSpacesDto) {
    return this.workspacesService.create(createWorkspace);
  }

  @Get('/all')
  @ApiResponse({
    status: 200,
    description: 'All workspaces were found successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'No workspaces were found in the system.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while searching for the workspaces.',
  })
  findAll() {
    return this.workspacesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'workspaces found successfully.' })
  @ApiResponse({
    status: 404,
    description: 'workspaces with the entered ID not found.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while searching for the workspaces.',
  })
  findOne(@Param('id') id: string) {
    return this.workspacesService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiResponse({ status: 200, description: 'workspaces updated successfully.' })
  @ApiResponse({
    status: 404,
    description: 'workspaces with the entered ID not found.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while updating the workspaces.',
  })
  update(@Param('id') id: string, @Body() updateWorkspace: WorkSpacesDto) {
    return this.workspacesService.update(+id, updateWorkspace);
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 200, description: 'workspaces deleted successfully.' })
  @ApiResponse({
    status: 404,
    description: 'workspaces with the entered ID not found.',
  })
  @ApiResponse({
    status: 500,
    description:
      'An internal server error occurred while deleting the workspaces.',
  })
  remove(@Param('id') id: string) {
    return this.workspacesService.remove(+id);
  }
}
