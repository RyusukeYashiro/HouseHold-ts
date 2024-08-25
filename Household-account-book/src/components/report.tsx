import { Grid, Paper } from '@mui/material'
import React from 'react'
import MonthSelector from './MonthSelector';
import CategoryChart from './CategoryChart';
import BarChart from './BarChart';
import TransactionTable from './TransactionTable';

interface ReportProps {
  currentMonth : Date;
  setCurrentMonth : React.Dispatch<React.SetStateAction<Date>>
}

const Report = ({currentMonth , setCurrentMonth} : ReportProps) => {

  const commonStyle = {
    height : {xs : 'auto' , md : '400px'},
    display : "flex",
    flexDirection : 'column',
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MonthSelector currentMonth={currentMonth} setCurrentMonth={setCurrentMonth}/>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={commonStyle}>
          <CategoryChart/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={commonStyle}>
          <BarChart/>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <TransactionTable/>
      </Grid>
    </Grid>
  )
}

export default Report