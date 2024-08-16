import { Box } from "@mui/material"
import MonthlySummary from "./layout/MonthlySummary"
import Calender from "./layout/Calender"
import TransactionMenu from "./layout/TransactionMenu"
import TransactionForm from "./layout/TransactionForm"
import { Transaction } from "../types"
import { useState } from "react"
import { format } from "date-fns"

interface HomeProps {
  monthlyTransactions : Transaction[],
  setCurrentMonth : React.Dispatch<React.SetStateAction<Date>>
}

const Home = ({ monthlyTransactions , setCurrentMonth } : HomeProps) => {
  const today = format(new Date() , "yyyy-MM-dd");
  const [currentDay , setCurrentDay] = useState(today);
  const [closeformcheck , setCloseFormCheck] = useState(false);
  // console.log('クリックされた時の日付を表示!' , currentDay);

  //filterで現在の日付のデータを月のデータからフィルタリング
  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.data === currentDay;
  })

  //formを閉じるボタンの実装
  const onCloseForm = () => {
    // falseたったらtrue
    // trueたったらfalse
    setCloseFormCheck(!closeformcheck);

  }

  const handletransaction = () => {
    // falseたったらtrue
    // trueたったらfalse
    setCloseFormCheck(!closeformcheck);
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
        />
        <TransactionForm 
        onCloseForm={onCloseForm} 
        closeformcheck={closeformcheck} 
        currentDay={currentDay}/>
      </Box>
    </Box>
  )
}

export default Home