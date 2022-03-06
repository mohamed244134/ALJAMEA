import Header from './components/Header'
// import './App'
import Home from './components/Home'
import Ayat from './components/Ayat'
import AyahAudio from './components/AyahAudio'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/quran" element={<Home />} />
          <Route path="/surah/:surah/:number" element={<Ayat />} />
          <Route path="/hoo" element={<AyahAudio />} />
        </Routes>
      </div>
    </Router>
  )
}
export default App
