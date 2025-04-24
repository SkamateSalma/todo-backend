import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ) {
    // If the task is new (no id), we create it
    if (!('id' in data) || data.id == null) {
      return this.prisma.task.create({
        data: {
          name: data.name as string,
          isDone: data.isDone as boolean,
          deadline: data.deadline as Date,
        },
      });
    }
    // Otherwise we update it
    const { id, ...updateData } = data as Prisma.TaskUpdateInput & {
      id: number;
    };
    return this.prisma.task.update({ where: { id }, data: updateData });
  }
}
