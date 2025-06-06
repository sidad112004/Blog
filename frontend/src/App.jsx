import React from 'react'
import Signin from './components/signin/Signin'
import Signup from './components/signup/Signup'
import Dashboard from './components/dashboard/Dashboard'
import Navbar from './components/navbar/Navbar'
import Myprofile from './components/myprofile/Myprofile'

function App() {
  return (
    <>
     <Navbar/>

    {/* <Signin/> */}
    {/* <Signup/> */}
    {/* <Dashboard/> */}
    <Myprofile/>
   
    </>
  )
}

export default App