import { Alert, Box, Button} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import React, { useEffect, useState } from 'react';
import { addMonths } from 'date-fns';

dayjs.locale('ja'); // カレンダーの曜日のフォーマット


interface ReportProps {
    currentMonth: Date;
    setCurrentMonth : React.Dispatch<React.SetStateAction<Date>>
}

const MonthSelector = ({currentMonth , setCurrentMonth} : ReportProps) => {
    // clearにするか管理するstate
    const [cleared , setCleared] = React.useState<boolean>(false);
    //valueに正しく当てるために管理
    const [pickerMonth , setPickerMonth] = useState(dayjs(currentMonth));
    // console.log("reportでの現在の月は" , pickerMonth);
    useEffect(() => {
        if(cleared) {
            const timeout = setTimeout(() => {
                setCleared(false);
            }, 1500);
            //クリンアップ関数
            return () => clearTimeout(timeout);
        }
    } , [cleared]);

    const handleDateChange =(newDate : dayjs.Dayjs | null) => {
        if (newDate) {
            const newDateAsDate = newDate.toDate(); // dayjs を Date に変換
            setCurrentMonth(newDateAsDate);
            setPickerMonth(newDate);
        }
    }

    const handlePreMonth = () => {
       const preMonth =  addMonths(currentMonth , -1);
       setPickerMonth(dayjs(preMonth));
       setCurrentMonth(preMonth);
    }

    const handleNextMonth = () => {
        const nextMonth = addMonths(currentMonth , 1);
        setPickerMonth(dayjs(nextMonth));
        setCurrentMonth(nextMonth);
    }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{display: 'flex' , justifyContent: 'center', alignItems : 'center'}}>
            <Button onClick={handlePreMonth} color={'error'} variant='contained'>
                <div>先月</div>
            </Button>
            <DatePicker
                onChange={handleDateChange}
                value={pickerMonth}
                label='年月を選択'
                sx={{margin : '10px' , bgcolor : 'white'}} 
                views={["year" , "month"]}
                format='YYYY/MM'
                slotProps={{
                    calendarHeader : {format : 'YYYY年MM月'},
                    field : {clearable : true , onClear : () => setCleared(true)}
                }}
            />
            {cleared && (
                <Alert severity="success">
                    Field cleared!
                </Alert>
            )}
            <Button  onClick={handleNextMonth} color={'primary'} variant='contained'>
                <div>次月</div>
            </Button>
        </Box>
    </LocalizationProvider>
  )
}

export default MonthSelector