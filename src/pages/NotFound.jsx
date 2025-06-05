import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="inline-block mb-8"
        >
          <ApperIcon name="SearchX" className="h-24 w-24 text-gray-400 mx-auto" />
        </motion.div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 gradient-bg text-white font-medium rounded-xl shadow-card hover:shadow-card-hover transition-all"
          >
            <ApperIcon name="ArrowLeft" className="h-5 w-5 mr-2" />
            Back to Dashboard
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound