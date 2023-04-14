import { ReactNode, createContext, useEffect, useState } from "react";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    category: string;
    price: number;
    createAt: string;
}

interface TransactionContextType {
    transactions: Transaction[];
}

interface TransactionContextProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionContextProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function loadTransactions() {
        const response = await fetch('http://localhost:3333/transactions')
        const data = await response.json();

        setTransactions(data)
    }

    useEffect(() => {
        loadTransactions();
    }, [])

    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}