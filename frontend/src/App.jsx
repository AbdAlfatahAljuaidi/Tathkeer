import {BrowserRouter,Route,Routes,useLocation} from 'react-router-dom'
import SignUp from './components/Rigester/SignUp'
import Login from './components/Rigester/Login'
import Home from './components/Home/Home'
import Active from './components/Active/Active'
import ForgotPassword from './components/Active/ForgotPassword'
import {ToastContainer} from 'react-toastify'
import { AnimatePresence } from 'framer-motion'
import Info from './components/Info/Info'
import Suggest from './components/Suggest/Suggest'
import ActivePage from './components/Active/ActivePage'
import UpdateDocument from './components/Home/UpdateDocument'
import ChildOne from './components/props/ChildOne'
import Father from './components/props/Father'
import ChildTwo from './components/props/ChildTwo'

import Abood from './components/props/Context'

function App() {
 //test
  const location = useLocation()

  return (
    <Abood.Provider value={{title:"Mr Error",age:20}}>
  <div dir='rtl'>
      <ToastContainer
      theme='dark'
      />
      <AnimatePresence mode='wait'>
    <Routes location={location} key={location.pathname}>
      <Route path='/SignUp' element={<SignUp />} /> 
      <Route path='/Login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/Active/:email' element={<Active />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/' element={<Info />} />
      <Route path='/Suggest' element={<Suggest />} />
      <Route path='/ActivePage' element={<ActivePage />} />
      <Route path='/updateDocument/:id' element={<UpdateDocument/>} />
      <Route path='/ChildOne' element={<ChildOne/>} />
      <Route path='/Father' element={<Father/>} />
      <Route path='/ChildTwo' element={<ChildTwo/>} />
    </Routes>
    </AnimatePresence>
    </div>
    </Abood.Provider>
  )
}

export default App
