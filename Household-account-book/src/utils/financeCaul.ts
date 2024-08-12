import { Balance, Transaction } from "../types";

export function financeCaul(transactions : Transaction[]) : Balance {
    //この関数のreturnとして
    // {income: 300 , expense: 200 , balance: 200} のような形が理想
    return transactions.reduce((acc , transaction) => {
        if(transaction.type == "income") {
            acc.income += transaction.amount
        } else {
            acc.expense += transaction.amount
        }
        acc.balance = acc.income - acc.expense;
        return acc 
    } , {income: 0 , expense: 0 , balance: 0});
} 