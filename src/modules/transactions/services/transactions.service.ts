import { Injectable } from '@nestjs/common';

import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';

import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';

import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { backAccountId, categoryId, date, name, type, value } =
      createTransactionDto;

    await this.validateEntitiesOwnership({ userId, backAccountId, categoryId });

    return this.transactionsRepository.create({
      data: {
        userId,
        backAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.transactionsRepository.findMany({
      where: {
        userId,
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { backAccountId, categoryId, date, name, type, value } =
      updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      backAccountId,
      categoryId,
      transactionId,
    });

    return this.transactionsRepository.update({
      where: {
        id: transactionId,
      },
      data: {
        backAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
    });
  }

  remove(id: string) {
    return `This action removes a #${id} transaction`;
  }

  private async validateEntitiesOwnership(data: {
    userId: string;
    backAccountId: string;
    categoryId: string;
    transactionId?: string;
  }) {
    await Promise.all([
      data.transactionId &&
        this.validateTransactionOwnershipService.validate(
          data.userId,
          data.transactionId,
        ),
      this.validateBankAccountOwnershipService.validate(
        data.userId,
        data.backAccountId,
      ),
      this.validateCategoryOwnershipService.validate(
        data.userId,
        data.categoryId,
      ),
    ]);
  }
}
