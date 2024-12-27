import { Module } from '@nestjs/common';

import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { PrismaService } from 'src/shared/database/prisma.service';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService],
})
export class UsersModule {}
