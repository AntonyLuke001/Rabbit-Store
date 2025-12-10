import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import AllRoutes from './routes/AllRoutes'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <BrowserRouter>
    <Toaster position='top-right' />
    <AllRoutes/>
    </BrowserRouter>
  )
}

export default App