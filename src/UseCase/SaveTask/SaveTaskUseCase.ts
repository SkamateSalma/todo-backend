import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from 'src/Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase
  implements UseCase<Promise<Task>, [dto: SaveTaskDto]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto) {
    try {
      const task = await this.taskRepository.save({
        id: dto.id,
        name: dto.name,
        isDone: dto.isDone,
        deadline: dto.deadline,
      });
      return task;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
