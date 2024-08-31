import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from '@mui/material';
import { ExpenseCategory, incomeCategory, Transaction, TransactionType } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoriesProps {
  monthlyTransactions : Transaction[];
  isLoading : boolean;
}

const CategoryChart = ({monthlyTransactions , isLoading} : CategoriesProps) => {

  const [chartType , setChartType] = React.useState<TransactionType>('expense');
  
  const handleChange = (e : SelectChangeEvent<TransactionType>) => {
    setChartType(e.target.value as TransactionType);
  }

  const categorySums = monthlyTransactions
    .filter((transaction) => transaction.type === chartType)
    .reduce<Record<incomeCategory | ExpenseCategory , number>>((acc, transaction) => {
      //初期化処理。
      if(!acc[transaction.category]){
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return(acc);
      // {
      //   "食費" : 3000,
      //   "交際費" : 10000,
      // }
    } , {} as Record<incomeCategory | ExpenseCategory , number>);
  console.log(categorySums);

  const categoriesLabel = Object.keys(categorySums);
  const categoriesValues = Object.values(categorySums);

  const options = {
    maintainAspectRatio : false,
    responsive: true,
  }

  const data : ChartData<"doughnut"> = {
    //種類。ここではtypeによってカテゴリーの種類を分ける。
    labels: categoriesLabel,
    datasets: [
      {
        //データの分布
        data: categoriesValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return(
    <>
        <FormControl fullWidth>
        <InputLabel id="transaction-type">収支の種類</InputLabel>
        <Select 
        labelId='transaction-type'
        label='収支の種類'
        value={chartType} onChange={(handleChange)}>
          <MenuItem value={"income"}>収入</MenuItem>
          <MenuItem value={"expense"}>支出</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{
        flexGrow : 1,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
      }}>
        {isLoading ? (
          <CircularProgress />
          ) : categoriesLabel.length > 0 && categoriesValues.length > 0 ? 
          (<Doughnut options={options} data={data}/>) :
          <Typography>データがありません</Typography>
        }
      </Box>
    </>
  )
}


export default CategoryChart