import { Injectable, NotFoundException } from '@nestjs/common';

import { BankAccountsRepository } from 'src/shared/database/repositories/bank-account.repositories';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(private bankAccountsRepository: BankAccountsRepository) {}

  async validate(userId: string, bankAccountId: string) {
    const isOwner = await this.bankAccountsRepository.findFirst({
      where: {
        id: bankAccountId,
        userId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException('Bank account not found.');
    }
  }
}
