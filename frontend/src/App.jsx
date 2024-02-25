
import './App.css'
import Home from './pages/home/Home'
import SignIn from './pages/signin/SignIn'
import SignUp from './pages/signup/SignUp'
 
function App() {

return(
  <>
<div className='p-4 h-screen flex items-center justify-center'>
{/* <SignIn /> */}
{/* <SignUp /> */}
<Home />
</div>
  </>
)
}

export default App

// Uncaught SyntaxError: The requested module '/src/components/sidebar/Conversations.jsx' does not provide an export named 'default' (at Sidebar.jsx:3:8)