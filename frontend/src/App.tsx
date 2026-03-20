import './App.css'
import AppRoutes from "./app/router/routes"
import { AlertProvider } from './contexts/AlertContext';
import { AuthProvider } from './contexts/AuthContext';


function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <AppRoutes />
      </AlertProvider>
    </AuthProvider>
  )
}

export default App
