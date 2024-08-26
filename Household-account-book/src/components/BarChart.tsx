import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Transaction } from '../types';
import { dailyProcess } from '../utils/dailyProcess';
import { Theme } from '../theme/theme';
import { Box, CircularProgress, Typography } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  monthlyTransactions : Transaction[];
  isLoading : boolean
}

const BarChart = ({monthlyTransactions , isLoading} : BarChartProps) => {
  
  
  const options = {
    maintainAspectRatio : false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "日別収支"
      }
    }
  };

  const dailyBalances = dailyProcess(monthlyTransactions);
  console.log("reportの情報" , dailyBalances);
  console.log("monthlyTransactions" , monthlyTransactions);

  const dateLabel = dailyBalances.map(item => item.start);
  const dateIncomes = dailyBalances.map(item => item.extendedProps.income);
  const dateExpenses = dailyBalances.map(item => item.extendedProps.expense);

  // console.log(dateLabel , dateIncomes , dateExpenses);
  
  const data : ChartData<"bar"> = {
    labels : dateLabel,
    datasets: [
      {
        label: "支出",
        data : dateExpenses,
        backgroundColor: Theme.palette.expenseColor.light
      },
      {
        label: "収入",
        data: dateIncomes,
        backgroundColor: Theme.palette.incomeColor.light
      }
    ]
  };

  return (
    <Box sx={{
        flexGrow : 1,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
      }}>
      {isLoading ? (
      <CircularProgress />
    ) : monthlyTransactions .length > 0 ? 
    ( <Bar options={options} data={data} /> ) :
    <Typography>データがありません</Typography>
    }
    </Box>
  )
}

export default BarChart