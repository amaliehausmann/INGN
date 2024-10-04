import './App.scss'
import { MainLayout } from './layouts/MainLayout'
import { Home } from './pages/Home'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { SingleNews } from './pages/SingleNews'
import { Signin } from './pages/Signin'
import { useState } from 'react'
import { UpdateNews } from './pages/UpdateNews'

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
        <Route path='/updatenews/:slug' element={<UpdateNews user={user}/>} ></Route>
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
