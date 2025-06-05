import { motion } from 'framer-motion'

    const Button = ({ children, onClick, className = '', whileHover = { scale: 1.05 }, whileTap = { scale: 0.95 }, type = 'button', disabled = false }) => {
      return (
        <motion.button
          type={type}
          onClick={onClick}
          className={`focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
          whileHover={whileHover}
          whileTap={whileTap}
          disabled={disabled}
        >
          {children}
        </motion.button>
      )
    }

    export default Button