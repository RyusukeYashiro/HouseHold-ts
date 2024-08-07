import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Report from './components/report'
import Nomatch from './components/Nomatch'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='report' element={<Report/>}></Route>
        {/* //マッチしない場合は、これのリンクへと飛ばす */}
        <Route path='*' element={<Nomatch/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
