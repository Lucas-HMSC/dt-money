import { createContext, ReactNode, useContext, useState } from 'react';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

// interface TransactionInput {
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
// }

// type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function createTransaction(transaction: TransactionInput) {
    const newTransaction = {
      ...transaction,
      id: transactions.length + 1,
      createdAt: String(new Date()),
    };

    setTransactions([
      ...transactions,
      newTransaction
    ]);
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction }}
    >
      { children }
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}