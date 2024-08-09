// firestoreに登録したデータの型付けを行う


export type TransactionType = "income" | "expense";
export type incomeCategory = "給与" | "副収入" | "お小遣い";
export type ExpenseCategory = "食費" | "日用品" | "住居費" | "交際費" | "娯楽"| "急用";

export interface Transaction {
    id : string,
    Data : string,
    amount: number,
    content: string,
    Type: TransactionType,
    Category: incomeCategory |  ExpenseCategory;
}