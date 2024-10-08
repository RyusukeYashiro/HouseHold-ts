import { Grid, Paper } from '@mui/material'
import React from 'react'
import MonthSelector from './MonthSelector';
import CategoryChart from './CategoryChart';
import BarChart from './BarChart';
import TransactionTable from './TransactionTable';
import { useAppContext } from '../context/AppContext';
import { useMonthlyTransactions } from '../hooks/useMOnthlyTransactions';

// interface ReportProps {
//   currentMonth : Date;
//   setCurrentMonth : React.Dispatch<React.SetStateAction<Date>>;
//   monthlyTransactions : Transaction[];
//   isLoading : boolean;
//   handleDeleteTransaction : (transactionId: string | readonly string[]) => Promise<void>;
// }

const Report = () => {

  const {currentMonth ,onDeleteTransaction , isLoading , setCurrentMonth} = useAppContext();
  const monthlyTransactions = useMonthlyTransactions();

  const commonStyle = {
    height : {xs : '400px' , md : '400px'},
    display : "flex",
    flexDirection : 'column',
    p : 2,
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MonthSelector currentMonth={currentMonth} setCurrentMonth={setCurrentMonth}/>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={commonStyle}>
          <CategoryChart monthlyTransactions={monthlyTransactions} isLoading={isLoading}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={commonStyle}>
          <BarChart monthlyTransactions={monthlyTransactions} isLoading={isLoading}/>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <TransactionTable monthlyTransactions={monthlyTransactions} handleDeleteTransaction={onDeleteTransaction}/>
      </Grid>
    </Grid>
  )
}

export default Report