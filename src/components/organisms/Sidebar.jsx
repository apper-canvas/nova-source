import { motion, AnimatePresence } from 'framer-motion'
    import Icon from '@/components/atoms/Icon'
    import Button from '@/components/atoms/Button'
    import Text from '@/components/atoms/Text'
    import NavItem from '@/components/molecules/NavItem'

    const Sidebar = ({ sidebarCollapsed, setSidebarCollapsed, activeTab, setActiveTab, sidebarItems }) => {
      return (
        <motion.div
          initial={false}
          animate={{ width: sidebarCollapsed ? 80 : 260 }}
          className="bg-white shadow-soft border-r border-gray-200 flex flex-col"
          style={{ minHeight: '100vh' }}
        >
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <motion.div
              className="flex items-center"
              animate={{ justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}
            >
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <Icon name="Zap" className="h-5 w-5 text-white" />
              </div>
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-3 font-bold text-xl text-gray-900"
                  >
                    Nova CRM
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarItems.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                isCollapsed={sidebarCollapsed}
                onClick={setActiveTab}
              />
            ))}
          </nav>

          {/* Collapse Toggle */}
          <div className="p-4 border-t border-gray-200">
            <Button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon name={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"} className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      )
    }

    export default Sidebar