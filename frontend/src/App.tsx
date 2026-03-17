import './App.css'
import AppRoutes from "./app/router/routes"
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
