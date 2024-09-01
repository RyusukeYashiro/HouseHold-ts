import { createContext, ReactNode, useContext, useState, } from "react";
import { Transaction } from "../types";
import { SchemaType } from "../validations/schema";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { isFireStoreError } from "../utils/Errorhandle";
import { format } from "date-fns";


interface AppContextType {
    transactions : Transaction[];
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
    currentMonth : Date;
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
    isLoading : boolean;
    setIsLoading : React.Dispatch<React.SetStateAction<boolean>>
    onSaveTransaction : (data: SchemaType) => Promise<void>
    onDeleteTransaction : (transactionId: string | readonly string[]) => Promise<void>
    currentDay: string;
    setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
    today: string;
}
export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({children} : {children : ReactNode}) => {
    const [transactions , setTransactions] = useState<Transaction[]>([]);
    const [currentMonth , setCurrentMonth] = useState(new Date());
    const [isLoading , setIsLoading] = useState(true);
    const today = format(new Date() , "yyyy-MM-dd");
    const [currentDay , setCurrentDay] = useState(today);

    // 取引を保存する関数
    const handleSaveTransaction = async(data : SchemaType) => {
        try {
        const docRef = await addDoc(collection(db , "Transactions") , data);
        console.log("追加したdataの確認" , docRef);
        const newTransaction = { id : docRef.id, ...data} as Transaction;
        // 一度、元のtransactionsを複製して、その後に代入(正確性の担保のため)
        setTransactions(prevTransactions => [...prevTransactions , newTransaction]);
        } catch(err : unknown){
        if(isFireStoreError(err)){
            console.error("firebaseのエラーは" , err);
            console.error("firebaseのエラーは", err.message);
            console.error("firebaseのエラーは" , err.code);
        } else {
            console.error("一般的なエラーは" , err);
        }
        } 
    }

    const handleDeleteTransaction = async(transactionId : string | readonly string[]) => {
        //fireStoreからデータを削除
        try {
        const IdstoDelete = Array.isArray(transactionId) ? transactionId : [transactionId];
        for(const id of  IdstoDelete){
            await deleteDoc(doc(db, "Transactions", id));
        }
        // setTransactions(prevTransactions => prevTransactions.filter(transaction => 
        //   transaction.id !== transactionId));
        setTransactions(prevTransactions => prevTransactions.filter(transaction => 
            !IdstoDelete.includes(transaction.id)));
        } catch(err : unknown){
        if(isFireStoreError(err)){
            console.error("firebaseのエラーは" , err);
            console.error("firebaseのエラーは", err.message);
            console.error("firebaseのエラーは" , err.code);
        } else {
            console.error("一般的なエラーは" , err);
        }
        }
    }
    
    return(
        <AppContext.Provider value={{
            transactions,
            setTransactions,
            currentMonth,  
            setCurrentMonth,
            isLoading,
            setIsLoading,
            onDeleteTransaction : handleDeleteTransaction,
            onSaveTransaction : handleSaveTransaction,
            currentDay,
            setCurrentDay,
            today
        }}>
            {children}
        </AppContext.Provider>
    )
}
//カスタムフックを定義
export const useAppContext = () => {
    const context = useContext(AppContext)
    if(!context){
        //providerの外でcontextを利用しようとした時
        throw new Error("provider以外での利用です");
    }
    return context;
} 