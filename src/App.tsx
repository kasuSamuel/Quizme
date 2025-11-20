import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

import LandingPage from './components/landing'
import Questions from './components/questions'
import Results from './components/results'
import LoadingScreen from './components/loading'

import './App.css'
import Topics from './components/topics'

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/questions/:topic" element={<Questions />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  )
}

export default App
