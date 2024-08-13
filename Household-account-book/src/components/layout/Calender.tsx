import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from "@fullcalendar/core/locales/ja"
import "../../utils/calender.css"
import { DatesSetArg, EventContentArg } from '@fullcalendar/core/index.js'
import { financeCaul } from '../../utils/financeCaul'
import { Transaction } from '../../types'
import { Balance } from '../../types'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Theme } from '../../theme/theme'
import { isSameMonth } from 'date-fns/isSameMonth'

interface Event {
  title : string; 
  start : string;
  extendedProps: Balance;
}
interface  MonthlySummaryProps{
  monthlyTransactions : Transaction[],
  setCurrentMonth : React.Dispatch<React.SetStateAction<Date>>
  setCurrentDay : React.Dispatch<React.SetStateAction<string>>
  currentDay : string;
  today : string;
}

export const Calender  = ({ monthlyTransactions ,  setCurrentMonth , setCurrentDay , currentDay , today} : MonthlySummaryProps , ) => {
  const [events, setEvents] = useState<Event[]>([]);
  //日付を管理するstate
  const [selectedDate, setSelectedDate] = useState<string | null>(currentDay);
  // 月のデータの変更があった場合に、処理を動的に行う
  useEffect(() => {
    // accには日付をkeyにしたオブジェクト型配列として扱う
    const dailySummaries = monthlyTransactions.reduce((acc : {[key : string] : Transaction[]} , transaction : Transaction) => {
      console.log("ここで一旦transactionを見る（Calender)" , transaction);
      const holdData = transaction.data;
      // acc オブジェクトに date キーが存在しない場合、そのキーで空の配列を初期化
      if(!acc[holdData]) acc[holdData] = [];
      acc[holdData].push(transaction);
      return (acc);
    } , {});
    // 戻り値例
    // {
    //   "2024-08-22": [
    //     { date: "2024-08-22", type: "income", amount: 100, ... },
    //     { date: "2024-08-22", type: "expense", amount: 50, ... },
    //     ...
    //   ],
    //   "2024-08-23": [
    //     { date: "2024-08-23", type: "income", amount: 200, ... },
    //     ...
    //   ],
    //   ...
    // }

    const calenderEvents = Object.keys(dailySummaries).map(dataProps => {
      const dailyData = financeCaul(dailySummaries[dataProps]);
      return {
        title: `Income: ${dailyData.income}, Expense: ${dailyData.expense}`,
        start: dataProps,
        extendedProps: dailyData,
      };
    });
    setEvents(calenderEvents);
  } , [monthlyTransactions]);

  //カレンダーの見た目を作る関数
  const renderEventContent = (eventInfo : EventContentArg ) => {
    console.log("これはrendereventcontet内の" , eventInfo);
    const isSelected = eventInfo.event.startStr === selectedDate;
    const backgroundColor = isSelected ? Theme.palette.incomeColor.light : '';
    return (
      <div style={{ backgroundColor }}>
        <div className='money' id='event-income'>
          {eventInfo.event.extendedProps.income}
        </div>
        <div className='money' id='event-expense'>
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className='money' id='event-balance'>
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    )
  }

  //月の情報を習得
  const handleDataSet = (DataInfo : DatesSetArg ) => {
    const currentMonth = DataInfo.view.currentStart;
    //console.log("日付は" , DataInfo.view.currentStart);
    setCurrentMonth(currentMonth);
    if(isSameMonth(today , currentMonth)){
      setCurrentDay(today);
    }
  }

  const handleDateClick = (DataInfo : DateClickArg) => {
    // console.log("test" , DataInfo);
    setCurrentDay(DataInfo.dateStr);
    setSelectedDate(DataInfo.dateStr);
  }

  return (
    <div className='calender-app'>
      <div className='calender-app-main'>
      <FullCalendar
          locale={jaLocale}
          plugins={[dayGridPlugin , interactionPlugin]} // pluginsにdayGridPluginを設定する
          initialView="dayGridMonth" // 初期表示のモードを設定する
          events={events}
          eventContent={renderEventContent}
          datesSet={handleDataSet}
          dateClick={handleDateClick}
        />
      </div>
    </div>
  )
}

export default Calender