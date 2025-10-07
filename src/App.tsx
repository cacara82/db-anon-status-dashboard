import { BrowserRouter, Route, Routes } from 'react-router'
import MappingDashboard from './pages/MappingDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MappingDashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}

