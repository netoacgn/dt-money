import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { X, ArrowCircleUp, ArrowCircleDown } from "phosphor-react";
import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/Transactions';

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
    const { createTransaction } = useContext(TransactionsContext)

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = useForm<newTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema)

    })

    async function handleCreateNewTransaction(data: newTransactionFormInputs) {
        const { description, price, category, type } = data;

        await createTransaction({
            description,
            price,
            category,
            type,
        });

        reset();
    }

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>

                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input
                        type="text"
                        placeholder='Descrição'
                        required
                        {...register('description')}
                    />
                    <input
                        type="number"
                        placeholder='Preço'
                        required
                        {...register('price', { valueAsNumber: true })}
                    />

                    <input
                        type="text"
                        placeholder='Categoria'
                        required
                        {...register('category')}
                    />

                    <Controller
                        control={control}
                        name='type'
                        render={({ field }) => (
                            <TransactionType
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <TransactionTypeButton
                                    variant='income'
                                    value='income'
                                >
                                    <ArrowCircleUp size={24} />
                                    Entrada
                                </TransactionTypeButton>

                                <TransactionTypeButton
                                    variant='outcome'
                                    value='outcome'
                                >
                                    <ArrowCircleDown size={24} />
                                    Saída
                                </TransactionTypeButton>

                            </TransactionType>
                        )}
                    />

                    <button type='submit' disabled={isSubmitting}>Cadastrar</button>
                </form>


            </Content>
        </Dialog.Portal>
    )
}