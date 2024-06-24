import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkspacesEntity } from '../entities/workspaces.entity';
import { Repository } from 'typeorm';
import { WorkSpacesDto } from '../dtos/workspaces.dto';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(WorkspacesEntity)
    private readonly workspaceRepository: Repository<WorkspacesEntity>,
  ) {}

  async create(createWorkspace: WorkSpacesDto): Promise<WorkspacesEntity> {
    try {
      const workspace = await this.workspaceRepository.save(createWorkspace);
      return workspace;
    } catch (error) {
      throw new NotFoundException('workspace creation failed');
    }
  }

  async findAll(): Promise<WorkspacesEntity[]> {
    try {
      return await this.workspaceRepository.find();
    } catch (error) {
      throw new NotFoundException('Error find workspace');
    }
  }

  async findOne(workspace_id: number): Promise<WorkspacesEntity> {
    const workspace = await this.workspaceRepository.findOne({
      where: { workspace_id },
    });

    if (!workspace) {
      throw new NotFoundException('workspace not found');
    }

    return workspace;
  }

  async update(
    id: number,
    updateWorkspace: WorkSpacesDto,
  ): Promise<WorkspacesEntity> {
    const workspace = await this.workspaceRepository.preload({
      workspace_id: id,
      ...updateWorkspace,
    });

    if (!workspace) {
      throw new NotFoundException('workspace not found');
    }

    return await this.workspaceRepository.save(workspace);
  }

  async remove(workspace_id: number): Promise<void> {
    const workspace = await this.workspaceRepository.findOne({
      where: { workspace_id },
    });

    if (!workspace) {
      throw new NotFoundException('workspace not found');
    }

    try {
      await this.workspaceRepository.remove(workspace);
    } catch (error) {
      throw new NotFoundException('Error deleting workspace');
    }
  }
}
