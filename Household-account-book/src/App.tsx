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


function App() {
  return (
    //リンク先を表示するルートコンポーネントを準備
    <ThemeProvider theme={Theme}>
      {/* //ブラウザに正しく表示させるためのもの */}
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<AppLayout/>}>
            <Route index element={<Home/>}></Route>
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
