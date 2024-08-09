import { Box } from "@mui/material"
import MonthlySummary from "./layout/MonthlySummary"
import Calender from "./layout/Calender"
import TransactionMenu from "./layout/TransactionMenu"
import TransactionForm from "./layout/TransactionForm"
import { Transaction } from "../types"

interface HomeProps {
  monthlyTransactions : Transaction[],
}

const Home = ({ monthlyTransactions } : HomeProps) => {
  return (
    <Box sx={{display : "flex"}}>
      {/* 左側に表示するコンテンツ */}
      <Box sx={{flexGrow : 1}}>
        <MonthlySummary monthlyTransactions={monthlyTransactions}/>
        <Calender/>
      </Box>
      {/* 右側に表示するコンテンツ */}
      <Box>
        <TransactionMenu/>
        <TransactionForm/>
      </Box>
    </Box>
  )
}

export default Home