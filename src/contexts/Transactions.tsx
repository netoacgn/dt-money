import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

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
    fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionContextProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionContextProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])


    async function fetchTransactions(query?: string) {
        const response = await api.get('/transactions', {
            params: {
                q: query,
            }
        })


        setTransactions(response.data)
    }

    useEffect(() => {
        fetchTransactions();
    }, [])

    return (
        <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}