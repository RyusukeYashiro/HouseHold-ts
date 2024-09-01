import { Box } from "@mui/material"
import MonthlySummary from "./layout/MonthlySummary"
import Calender from "./layout/Calender"
import TransactionMenu from "./layout/TransactionMenu"
import TransactionForm from "./layout/TransactionForm"
import { Transaction } from "../types"
import { useMemo, useState } from "react"
import { useMonthlyTransactions } from "../hooks/useMOnthlyTransactions"
import { useAppContext } from "../context/AppContext"

const Home = () => {

  const {currentDay} = useAppContext();

  const monthlyTransactions = useMonthlyTransactions();
  // フォームが閉じたかを管理
  const [closeformcheck , setCloseFormCheck] = useState(false);
  //選んだformdataを管理
  const [SelectTransaction , setSelectTransaction] = useState<Transaction | null>(null);
  // console.log('クリックされた時の日付を表示!' , currentDay);

  //filterで現在の日付のデータを月のデータからフィルタリング
  const dailyTransactions = useMemo(() => {
    return monthlyTransactions.filter((transaction) => 
      transaction.date === currentDay
    );
  } , [monthlyTransactions , currentDay])

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
        <MonthlySummary 
        // monthlyTransactions={monthlyTransactions}
        />
        <Calender/>
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
        SelectTransaction={SelectTransaction}
        setSelectTransaction={setSelectTransaction}
        />
      </Box>
    </Box>
  )
}

export default Home