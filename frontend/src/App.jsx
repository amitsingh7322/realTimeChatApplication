
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import SignIn from './pages/signin/SignIn'
import SignUp from './pages/signup/SignUp'
 import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
function App() {
const {authUser} = useAuthContext();
return(
  <>
<div className='p-4 h-screen flex items-center justify-center'>
<Routes>
  <Route path='/' element ={authUser?<Home />:<Navigate to="/signin" />}/>
  <Route path='/signin' element ={authUser?<Navigate to="/" />:<SignIn />} />
  <Route path='/signup' element ={authUser?<Navigate to="/" />:<SignUp />} />
</Routes>
<Toaster/>
</div>
  </>
)
}

export default App

// Uncaught SyntaxError: The requested module '/src/components/sidebar/Conversations.jsx' does not provide an export named 'default' (at Sidebar.jsx:3:8)