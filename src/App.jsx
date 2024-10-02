import './App.scss'
import { MainLayout } from './layouts/MainLayout'
import { Home } from './pages/Home'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { SingleNews } from './pages/SingleNews'
import { Signin } from './pages/Signin'
import { useState } from 'react'
import { ProtectedRoute } from './layouts/ProtectedRoute'
import { Dashboard } from './pages/Dashboard'

function App() {

  const [user, setUser] = useState()
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
        <Route index element={<Home/>}></Route>
        <Route path='/singlenews/:newsslug' element={<SingleNews user={user}/>}></Route>
        <Route path='/signin' element={<Signin setUser={setUser} user={user} />}></Route>
        <Route element={<ProtectedRoute user={user}/>}>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Route>
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
