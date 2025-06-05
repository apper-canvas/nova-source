import { motion, AnimatePresence } from 'framer-motion'
    import Icon from '@/components/atoms/Icon'
    import Button from '@/components/atoms/Button'
    import Text from '@/components/atoms/Text'

    const NavItem = ({ item, isActive, isCollapsed, onClick }) => {
      return (
        <Button
          onClick={() => onClick(item.id)}
          className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 ${
            isActive
              ? 'gradient-bg text-white shadow-card'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <Icon name={item.icon} className="h-5 w-5" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 font-medium"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
          {isActive && !isCollapsed && (
            <motion.div
              layoutId="activeIndicator"
              className="ml-auto w-2 h-2 bg-white rounded-full"
            />
          )}
        </Button>
      )
    }

    export default NavItem