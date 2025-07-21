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

function App() {
 
  const location = useLocation()

  return (
  <div>
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
    </Routes>
    </AnimatePresence>
    </div>
  
  )
}

export default App
