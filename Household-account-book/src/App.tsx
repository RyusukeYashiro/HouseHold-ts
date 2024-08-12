import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Report from './components/report'
import Nomatch from './components/Nomatch'
import AppLayout from './components/AppLayout'
import { Theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { useEffect, useState } from 'react'
import { Transaction } from './types/index'
import { collection, getDocs } from 'firebase/firestore'
import { db } from "./firebase";
import { formatMonth } from "./utils/formatting"

function App() {
  function isFireStoreError(err : unknown) : err is {code : string , message : string} {
    return typeof err === "object" && err !== null && ("code" || "message") in err
  }
  //値を管理したいので、useStateを用いて、管理を行う
  const [transactions , setTransactions] = useState<Transaction[]>([]);
  const [currentMonth , setCurrentMonth] = useState(new Date());
  useEffect(() => {
    const fetchTransactions = async() => {
      try {
        const TransactionData = await getDocs(collection(db , "Transactions"));
        setTransactions(TransactionData.docs.map((doc) => ({...doc.data() as Transaction, id: doc.id})));
        console.log(TransactionData);
      }
    catch(err : unknown){
      if(isFireStoreError(err)){
        console.error("firebaseのエラーは" , err);
        console.error("firebaseのエラーは", err.message);
        console.error("firebaseのエラーは" , err.code);
      } else {
        console.error("一般的なエラーは" , err);
      }
    }
    }
    fetchTransactions();
  } , []);
  //現在の月に合致するものを取得する変数
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.data.startsWith(formatMonth(currentMonth));
  });
  
  console.log(monthlyTransactions);

  return (
    //リンク先を表示するルートコンポーネントを準備
    <ThemeProvider theme={Theme}>
      {/* //ブラウザに正しく表示させるためのもの */}
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<AppLayout/>}>
            {/* //現在の月を表示させるために、propsで情報を渡す */}
            <Route index element={<Home monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth}/>}></Route>
            <Route path='report' element={<Report/>}></Route>
            {/* //マッチしない場合は、これのリンクへと飛ばす */}
            <Route path='*' element={<Nomatch/>}></Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
