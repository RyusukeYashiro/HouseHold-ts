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
  const today = format(new Date() , "yyyy-mm-dd");
  const [currentDay , setCurrentDay] = useState(today);
  console.log('クリックされた時の日付' , currentDay);

  //filterで現在の日付のデータを月のデータからフィルタリング
  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.data === currentDay;
  })
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
        <TransactionMenu dailyTransactions={dailyTransactions} currentDay={currentDay}/>
        <TransactionForm/>
      </Box>
    </Box>
  )
}

export default Home