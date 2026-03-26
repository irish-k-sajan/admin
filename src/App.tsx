import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminPage from './components/AdminPage/AdminPage'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import SidePanel from './components/Sidepanel/SidePanel'
import ResultSidePanel from './components/ResultSidePanel/ResultSidePanel'
import CustomizedSwitches from './components/CustomizedSwitch/CustomizedSwitch'
import AdminPage2 from './components/AdminPage/AdminPage2'
import AdminPage3 from './components/AdminPage/AdminPage3'
import SummaryPage from './components/SummaryPage/SummaryPage'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <SidePanel />
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin2" element={<AdminPage2 />} />
        <Route path="/admin3" element={<AdminPage3 />} />
        <Route path="/" element={<SummaryPage/>} />
        <Route path="/result" element={<ResultSidePanel />} />
        <Route path="/switch" element={<CustomizedSwitches/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
