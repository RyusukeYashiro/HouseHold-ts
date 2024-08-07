import { Box } from "@mui/material"
import MonthlySummary from "./layout/MonthlySummary"
import Calender from "./layout/Calender"
import TransactionMenu from "./layout/TransactionMenu"
import TransactionForm from "./layout/TransactionForm"

const Home = () => {
  return (
    <Box sx={{display : "flex"}}>
      {/* 左側に表示するコンテンツ */}
      <Box sx={{flexGrow : 1}}>
        <MonthlySummary/>
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