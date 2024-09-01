import { useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { formatMonth } from "../utils/formatting";
import { Transaction } from "../types";

export const useMonthlyTransactions = () : Transaction[] => {
    const { transactions , currentMonth} =  useAppContext();
      //現在の月に合致するものを取得する変数
    const monthlyTransactions = useMemo(() => {
        return transactions.filter((transaction) => 
        transaction.date.startsWith(formatMonth(currentMonth))
        )
        }, [transactions , currentMonth]);
    return monthlyTransactions;
}