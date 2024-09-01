import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from "@fullcalendar/core/locales/ja"
import "../../utils/calender.css"
import { DatesSetArg, EventContentArg } from '@fullcalendar/core/index.js'
import { Balance } from '../../types'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Theme } from '../../theme/theme'
import { isSameMonth } from 'date-fns/isSameMonth'
import { dailyProcess } from '../../utils/dailyProcess'
import { useMonthlyTransactions } from '../../hooks/useMOnthlyTransactions'
import { useAppContext } from '../../context/AppContext'

interface Event {
  title : string; 
  start : string;
  extendedProps: Balance;
}

export const Calender  = () => {
  // カスタムフックを取得
  const  monthlyTransactions = useMonthlyTransactions();
  
  //conteApiを使用
  const {setCurrentMonth , setCurrentDay , currentDay ,today} = useAppContext();

  const [events, setEvents] = useState<Event[]>([]);
  //日付を管理するstate
  const [selectedDate, setSelectedDate] = useState<string | null>(currentDay);

  // 月のデータの変更があった場合に、処理を動的に行う
  useEffect(() => {
    //抽出した月から日の情報を処理する関数
    const holdProcess = dailyProcess(monthlyTransactions);
    setEvents(holdProcess);
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
    // console.log("日付は" , DataInfo.view.currentStart);
    setCurrentMonth(currentMonth);
    if(isSameMonth(today , currentMonth)){
      setCurrentDay(today);
    }
  }

  const handleDateClick = (DateInfo : DateClickArg) => {
    // console.log("test" , DataInfo);
    setCurrentDay(DateInfo.dateStr);
    setSelectedDate(DateInfo.dateStr);
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