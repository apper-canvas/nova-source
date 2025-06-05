import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
        toastClassName="!bg-white !text-gray-900 !shadow-card !border !border-gray-200 !rounded-xl"
        progressClassName="!bg-gradient-to-r !from-primary !to-primary-light"
      />
    </div>
  )
}

export default App