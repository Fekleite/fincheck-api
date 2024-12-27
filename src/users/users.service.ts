import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';

import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;

    const emailTaken = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (emailTaken) {
      throw new ConflictException('This email is already in use.');
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return user;
  }
}
