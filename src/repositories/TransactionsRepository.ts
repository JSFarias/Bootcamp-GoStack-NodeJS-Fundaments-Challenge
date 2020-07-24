import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface GetAll{
  transactions: Transaction[];
  balance: Balance;
}
 

class TransactionsRepository {
  private transactions: Transaction[];
  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {income: 0, outcome: 0, total: 0};
  }

  public all(): GetAll {

    const getAll =  {
      transactions: this.transactions,
      balance: this.balance,
    } 
    return getAll
  }

  public getBalance(transaction: Transaction): Balance {    

    return this.balance
  }

  public create(data: Omit<Transaction, 'id'>): Transaction {  

    const {income, outcome, total} = this.balance

    if(data.type === 'income'){
      
      this.balance = {
        income: income + data.value,
        outcome,
        total: total + data.value
      }
    }else{

      this.balance = {
        income,
        outcome: outcome + data.value,
        total: total - data.value
      }
    }

    const transaction = new Transaction(data)
    this.transactions.push(transaction)  
    return transaction

  }
}

export default TransactionsRepository;
