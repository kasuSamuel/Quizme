import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Home from './components/home'
import Questions from './components/questions'
import Results from './components/results'
import LoadingScreen from './components/loading'

import './App.css'

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions/:topic" element={<Questions />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  )
}

export default App
