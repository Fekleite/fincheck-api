import { Injectable } from '@nestjs/common';

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

  findAll() {
    return `This action returns all bankAccounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bankAccount`;
  }

  update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankAccount`;
  }
}
