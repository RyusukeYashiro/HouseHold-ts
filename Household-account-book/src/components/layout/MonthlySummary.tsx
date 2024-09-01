import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import PaidIcon from '@mui/icons-material/Paid';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { financeCaul } from '../../utils/financeCaul';
import { useMonthlyTransactions } from '../../hooks/useMOnthlyTransactions';

const MonthlySummary = () => {
  const  monthlyTransactions = useMonthlyTransactions();
  //受け取ったpropsをカードで表示させるために、計算する関数に渡して表示させる
  const  monthlyTotals = financeCaul(monthlyTransactions);
  console.log("月のデータを表示させておく" , monthlyTotals);
  
  return (
    <Grid container spacing={{ xs: 1 , sm: 2}} mb={2}>
      <Grid item xs={4} display={"flex"} flexDirection={"column"}>
        <Card sx={{
          bgcolor: (Theme) => Theme.palette.incomeColor.main, 
          color: "white",
          borderRadius: "10px",
          flexGrow: 1
          }}>
          <CardContent sx={{
            padding: {xs: 1 , sm: 2}
            }}>
            <Stack direction={"row"}>
              <PaidIcon sx={{fontSize : "2rem"}}/>
              <Typography
              padding={"5px"}
              >収入</Typography>
            </Stack>
            <Typography 
            textAlign={"right"} 
            variant='h5' 
            fontWeight={"fontWeightBold"}
            sx={{wordBreak : "break-word", fontSize: {xs : ".8rem" , sm : "1rem" , md : "1.2rem"}}}>{monthlyTotals.income}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} display={"flex"} flexDirection={"column"}>
        <Card sx={{
          bgcolor: (Theme) => Theme.palette.expenseColor.main,
          color: "white",
          borderRadius: "10px",
          flexGrow: 1}}>
          <CardContent sx={{
            padding: {xs: 1 , sm: 2}
            }}>
            <Stack direction={"row"}>
              <PaymentIcon sx={{fontSize : "2rem"}}/>
              <Typography
              padding={"5px"}>支出</Typography>
            </Stack>
            <Typography 
            textAlign={"right"} 
            variant='h5' 
            fontWeight={"fontWeightBold"}
            sx={{
              wordBreak : "break-word",
              fontSize: {xs : ".8rem" , sm : "1rem",
              md : "1.2rem"}}
              }>{monthlyTotals.expense}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} display={"flex"} flexDirection={"column"}>
        <Card sx={{
          bgcolor: (Theme) => Theme.palette.balanceColor.main,
          color: "white",
          borderRadius: "10px"
          }}>
          <CardContent sx={{
            padding: {xs: 1 , sm: 2}
            }}>
            <Stack direction={"row"}>
              <AccountBalanceIcon sx={{fontSize : "2rem"}}/>
              <Typography
              padding={"5px"}>残高</Typography>
            </Stack>
            <Typography 
            textAlign={"right"} 
            variant='h5' 
            fontWeight={"fontWeightBold"}
            sx={{
              wordBreak : "break-word",
              fontSize: {xs : ".8rem",
              sm : "1rem",
              md : "1.2rem"}}}>{monthlyTotals.balance}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default MonthlySummary