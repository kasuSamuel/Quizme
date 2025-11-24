import { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import LandingPage from './components/landing'
import LoadingScreen from './components/loading'
import Questions from './components/questions'
import Results from './components/results'

import { Toaster } from 'react-hot-toast'
import './App.css'
import Admin from './components/adminPages/admin'
import Topics from './components/topics'
import Dashboard from './components/Dashboard'
import Categories from './components/adminPages/Categories'
import QuestionList from './components/adminPages/Questions'

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="questions" element={<QuestionList />} />
        </Route>
        <Route path="/topics" element={<Topics />} />
        <Route path="/questions/:topic" element={<Questions />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  )
}

export default App
