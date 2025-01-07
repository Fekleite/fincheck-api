import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

import { BankAccountsRepository } from 'src/shared/database/repositories/bank-account.repositories';

@Injectable()
export class BankAccountsService {
  constructor(private bankAccountsRepository: BankAccountsRepository) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountsRepository.create({
      data: {
        userId,
        name: createBankAccountDto.name,
        initialBalance: createBankAccountDto.initialBalance,
        color: createBankAccountDto.color,
        type: createBankAccountDto.type,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.bankAccountsRepository.findMany({
      where: {
        userId,
      },
    });
  }

  async update(
    userId: string,
    backAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const isOwner = await this.bankAccountsRepository.findFirst({
      where: {
        id: backAccountId,
        userId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException('Bank account not found.');
    }

    return this.bankAccountsRepository.update({
      where: {
        id: backAccountId,
      },
      data: {
        name: updateBankAccountDto.name,
        color: updateBankAccountDto.color,
        initialBalance: updateBankAccountDto.initialBalance,
        type: updateBankAccountDto.type,
      },
    });
  }

  remove(id: string) {
    return `This action removes a #${id} bankAccount`;
  }
}
