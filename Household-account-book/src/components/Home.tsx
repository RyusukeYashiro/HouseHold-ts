import { Box } from "@mui/material"
import MonthlySummary from "./layout/MonthlySummary"
import Calender from "./layout/Calender"
import TransactionMenu from "./layout/TransactionMenu"
import TransactionForm from "./layout/TransactionForm"
import { Transaction } from "../types"
import { useState } from "react"
import { format } from "date-fns"
import { SchemaType } from "../validations/schema"

interface HomeProps {
  monthlyTransactions : Transaction[],
  setCurrentMonth : React.Dispatch<React.SetStateAction<Date>>,
  onSaveTransaction : (transaction: SchemaType) => Promise<void>
  onDeleteTransaction : (transactionId: string) => Promise<void>
}

const Home = ({ 
  monthlyTransactions , 
  setCurrentMonth , 
  onSaveTransaction,
  onDeleteTransaction
} : HomeProps) => {
  const today = format(new Date() , "yyyy-MM-dd");
  const [currentDay , setCurrentDay] = useState(today);
  const [closeformcheck , setCloseFormCheck] = useState(false);
  //選んだformdataを管理
  const [SelectTransaction , setSelectTransaction] = useState<Transaction | null>(null);
  // console.log('クリックされた時の日付を表示!' , currentDay);

  //filterで現在の日付のデータを月のデータからフィルタリング
  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  })

  //formを閉じるボタンの実装
  const onCloseForm = () => {
    // falseたったらtrue
    // trueたったらfalse
    setCloseFormCheck(!closeformcheck);
    setSelectTransaction(null);
  }

  const handletransaction = () => {
    // falseたったらtrue
    // trueたったらfalse
    if(SelectTransaction) {
      setSelectTransaction(null);
    } else {
      setCloseFormCheck(!closeformcheck);
    }
  }

  const handleSelectTransaction  = (transaction : Transaction) => {
    console.log("クリックした取引を追加" , transaction);
    setSelectTransaction(transaction); 
    setCloseFormCheck(true);
  }

  return (
    <Box sx={{display : "flex"}}>
      {/* 左側に表示するコンテンツ */}
      <Box sx={{flexGrow : 1}}>
        <MonthlySummary monthlyTransactions={monthlyTransactions}/>
        <Calender
          monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
          today={today}
          />
      </Box>
      {/* 右側に表示するコンテンツ */}
      <Box>
        <TransactionMenu 
          dailyTransactions={dailyTransactions}
          currentDay={currentDay} 
          onhandletransaction={handletransaction}
          onSelectTransaction={handleSelectTransaction}
        />
        <TransactionForm 
        onCloseForm={onCloseForm} 
        closeformcheck={closeformcheck} 
        currentDay={currentDay}
        onSaveTransaction={onSaveTransaction}
        SelectTransaction={SelectTransaction}
        setSelectTransaction={setSelectTransaction}
        onDeleteTransaction={onDeleteTransaction} 
        />
      </Box>
    </Box>
  )
}

export default Home