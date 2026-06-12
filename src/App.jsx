import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import HomePrototypeIndex from './prototypes/HomePrototypeIndex.jsx'
import { getPrototypeById } from './prototypes/index.js'

function PrototypeRoute() {
  const { id } = useParams()
  const prototype = getPrototypeById(id)

  if (!prototype) {
    return <Navigate to="/" replace />
  }

  const PrototypeComponent = prototype.component
  return <PrototypeComponent />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePrototypeIndex />} />
      <Route path="/prototype/:id" element={<PrototypeRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
