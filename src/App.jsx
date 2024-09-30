import './App.scss'
import { MainLayout } from './layouts/MainLayout'
import { Home } from './pages/Home'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { SingleNews } from './pages/SingleNews'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
        <Route index element={<Home/>}></Route>
        <Route path='/singlenews/:newsslug' element={<SingleNews/>}></Route>
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
