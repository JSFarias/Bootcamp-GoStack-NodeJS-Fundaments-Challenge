import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transaction: Transaction): Transaction {

    const balance = this.transactionsRepository.getBalance(transaction)
    if(transaction.type === 'outcome' && balance.total < transaction.value){
      throw Error("Not enough money")
    }

    const newTransaction = this.transactionsRepository.create(transaction)
    return newTransaction
    
  }
}

export default CreateTransactionService;
