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
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from "./firebase";
import { formatMonth } from "./utils/formatting"
import { SchemaType } from './validations/schema'


function App() {
  function isFireStoreError(err : unknown) : err is {code : string , message : string} {
    return typeof err === "object" && err !== null && ("code" || "message") in err
  }
  //値を管理したいので、useStateを用いて、管理を行う
  const [transactions , setTransactions] = useState<Transaction[]>([]);
  //現在の月を管理する
  const [currentMonth , setCurrentMonth] = useState(new Date());
  //transactiosのデータが入っていない場合は、つまりまだデータを取ってこれていない
  const [isLoading , setIsLoading] = useState(true);

  //firestoreにデータを追加
  useEffect(() => {
    const fetchTransactions = async() => {
      try {
        const TransactionData = await getDocs(collection(db , "Transactions"));
        setTransactions(TransactionData.docs.map((doc) => ({...doc.data() as Transaction, id: doc.id})));
        // console.log("dbから取得したデータを表示" , TransactionData);
        }
      catch(err : unknown){
        if(isFireStoreError(err)){
          console.error("firebaseのエラーは" , err);
          console.error("firebaseのエラーは", err.message);
          console.error("firebaseのエラーは" , err.code);
        } else {
          console.error("一般的なエラーは" , err);
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchTransactions();
  } , []);

  //現在の月に合致するものを取得する変数
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
    // transaction.data && transaction.data.startsWith(formatMonth(currentMonth));
  });

  // 取引を保存する関数
  const handleSaveTransaction = async(data : SchemaType) => {
    try {
      const docRef = await addDoc(collection(db , "Transactions") , data);
      console.log("追加したdataの確認" , docRef);
      const newTransaction = { id : docRef.id, ...data} as Transaction;
      // 一度、元のtransactionsを複製して、その後に代入(正確性の担保のため)
      setTransactions(prevTransactions => [...prevTransactions , newTransaction]);
    } catch(err : unknown){
      if(isFireStoreError(err)){
        console.error("firebaseのエラーは" , err);
        console.error("firebaseのエラーは", err.message);
        console.error("firebaseのエラーは" , err.code);
      } else {
        console.error("一般的なエラーは" , err);
      }
    } 
  }

  const handleDeleteTransaction = async(transactionId : string | readonly string[]) => {
    //fireStoreからデータを削除
    try {
      const IdstoDelete = Array.isArray(transactionId) ? transactionId : [transactionId];
      for(const id of  IdstoDelete){
        await deleteDoc(doc(db, "Transactions", id));
      }
      // setTransactions(prevTransactions => prevTransactions.filter(transaction => 
      //   transaction.id !== transactionId));
      setTransactions(prevTransactions => prevTransactions.filter(transaction => 
        !IdstoDelete.includes(transaction.id)));
    } catch(err : unknown){
      if(isFireStoreError(err)){
        console.error("firebaseのエラーは" , err);
        console.error("firebaseのエラーは", err.message);
        console.error("firebaseのエラーは" , err.code);
      } else {
        console.error("一般的なエラーは" , err);
      }
    }
  }

  return (
    //リンク先を表示するルートコンポーネントを準備
    <ThemeProvider theme={Theme}>
      {/* //ブラウザに正しく表示させるためのもの */}
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<AppLayout/>}>
            {/* //現在の月を表示させるために、propsで情報を渡す */}
            <Route index element={
              <Home 
                monthlyTransactions={monthlyTransactions} 
                setCurrentMonth={setCurrentMonth}
                onSaveTransaction={handleSaveTransaction}
                onDeleteTransaction={handleDeleteTransaction}
                />}>
            </Route>
            <Route path='report' element={
              <Report 
                currentMonth={currentMonth} 
                setCurrentMonth={setCurrentMonth}
                monthlyTransactions={monthlyTransactions} 
                isLoading={isLoading}
                handleDeleteTransaction={handleDeleteTransaction}
              />}></Route>
            {/* //マッチしない場合は、これのリンクへと飛ばす */}
            <Route path='*' element={<Nomatch/>}></Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
