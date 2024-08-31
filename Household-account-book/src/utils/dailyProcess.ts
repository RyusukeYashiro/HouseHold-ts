import { Transaction } from "../types";
import { financeCaul } from "./financeCaul";


export function dailyProcess(monthlyTransactions : Transaction[]){
    // accには日付をkeyにしたオブジェクト型配列として扱う
    const dailySummaries = monthlyTransactions.reduce((acc : {[key : string] : Transaction[]} , transaction : Transaction) => {
        // console.log("ここで一旦transactionを見る（Calender)" , transaction);
        const holdDate = transaction.date;
        // acc オブジェクトに date キーが存在しない場合、そのキーで空の配列を初期化
        if(!acc[holdDate]) acc[holdDate] = [];
        acc[holdDate].push(transaction);
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
    
    const calenderEvents = Object.keys(dailySummaries).map(dateProps => {
        const dailyDate = financeCaul(dailySummaries[dateProps]);
        return {
            title: `Income: ${dailyDate.income}, Expense: ${dailyDate.expense}`,
            start: dateProps,
            extendedProps: dailyDate,
        };
    });
    return(calenderEvents);
}