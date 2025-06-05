import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'
import contactService from '../services/api/contactService'
import dealService from '../services/api/dealService'
import activityService from '../services/api/activityService'
import noteService from '../services/api/noteService'

const Home = () => {
  const [contacts, setContacts] = useState([])
  const [deals, setDeals] = useState([])
  const [activities, setActivities] = useState([])
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true)
      try {
        const [contactsData, dealsData, activitiesData, notesData] = await Promise.all([
          contactService.getAll(),
          dealService.getAll(),
          activityService.getAll(),
          noteService.getAll()
        ])
        setContacts(contactsData || [])
        setDeals(dealsData || [])
        setActivities(activitiesData || [])
        setNotes(notesData || [])
      } catch (err) {
        setError(err.message)
        toast.error("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }
    loadAllData()
  }, [])

  const handleSearch = (query) => {
    setSearchQuery(query)
    // Implement search functionality across contacts and deals
  }

  const getWelcomeMessage = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'contacts', label: 'Contacts', icon: 'Users' },
    { id: 'deals', label: 'Deals', icon: 'Briefcase' },
    { id: 'tasks', label: 'Tasks', icon: 'CheckSquare' },
    { id: 'calendar', label: 'Calendar', icon: 'Calendar' },
    { id: 'reports', label: 'Reports', icon: 'BarChart3' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ]

  const stats = [
    {
      title: 'Total Contacts',
      value: contacts?.length || 0,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-blue-50',
      change: '+12%'
    },
    {
      title: 'Active Deals',
      value: deals?.filter(deal => deal?.stage !== 'Closed')?.length || 0,
      icon: 'Briefcase',
      color: 'text-secondary',
      bgColor: 'bg-green-50',
      change: '+8%'
    },
    {
      title: 'Tasks Due Today',
      value: '7',
      icon: 'Clock',
      color: 'text-accent',
      bgColor: 'bg-orange-50',
      change: '-3'
    },
    {
      title: 'Monthly Revenue',
      value: `$${deals?.reduce((sum, deal) => sum + (deal?.value || 0), 0)?.toLocaleString() || '0'}`,
      icon: 'DollarSign',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: '+24%'
    }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <MainFeature contacts={contacts} deals={deals} activities={activities} notes={notes} />
      case 'contacts':
        return (
          <div className="p-6 lg:p-8">
            <div className="bg-white rounded-xl shadow-card p-8 text-center">
              <ApperIcon name="Users" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Management</h3>
              <p className="text-gray-600 mb-6">Advanced contact management features coming soon!</p>
              <div className="text-sm text-gray-500">• Import/Export contacts • Advanced search • Custom fields • Contact scoring</div>
            </div>
          </div>
        )
      case 'deals':
        return (
          <div className="p-6 lg:p-8">
            <div className="bg-white rounded-xl shadow-card p-8 text-center">
              <ApperIcon name="Briefcase" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Deal Management</h3>
              <p className="text-gray-600 mb-6">Enhanced deal tracking and forecasting tools launching soon!</p>
              <div className="text-sm text-gray-500">• Deal forecasting • Custom stages • Automated workflows • Performance analytics</div>
            </div>
          </div>
        )
      case 'tasks':
        return (
          <div className="p-6 lg:p-8">
            <div className="bg-white rounded-xl shadow-card p-8 text-center">
              <ApperIcon name="CheckSquare" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Task Management</h3>
              <p className="text-gray-600 mb-6">Comprehensive task management system coming soon!</p>
              <div className="text-sm text-gray-500">• Task scheduling • Team collaboration • Priority management • Progress tracking</div>
            </div>
          </div>
        )
      case 'calendar':
        return (
          <div className="p-6 lg:p-8">
            <div className="bg-white rounded-xl shadow-card p-8 text-center">
              <ApperIcon name="Calendar" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Calendar Integration</h3>
              <p className="text-gray-600 mb-6">Calendar sync and scheduling features launching next month!</p>
              <div className="text-sm text-gray-500">• Google Calendar sync • Meeting scheduling • Reminder notifications • Team availability</div>
            </div>
          </div>
        )
      case 'reports':
        return (
          <div className="p-6 lg:p-8">
            <div className="bg-white rounded-xl shadow-card p-8 text-center">
              <ApperIcon name="BarChart3" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600 mb-6">Advanced reporting and analytics in development!</p>
              <div className="text-sm text-gray-500">• Sales performance • Revenue forecasting • Team productivity • Custom reports</div>
            </div>
          </div>
        )
      case 'settings':
        return (
          <div className="p-6 lg:p-8">
            <div className="bg-white rounded-xl shadow-card p-8 text-center">
              <ApperIcon name="Settings" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Settings & Customization</h3>
              <p className="text-gray-600 mb-6">Customization options coming in v2.0!</p>
              <div className="text-sm text-gray-500">• User preferences • Team settings • Integration management • Custom workflows</div>
            </div>
          </div>
        )
      default:
        return <MainFeature contacts={contacts} deals={deals} activities={activities} notes={notes} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Nova CRM...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
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
              <ApperIcon name="Zap" className="h-5 w-5 text-white" />
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
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? 'gradient-bg text-white shadow-card'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ApperIcon name={item.icon} className="h-5 w-5" />
              <AnimatePresence>
                {!sidebarCollapsed && (
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
              {activeTab === item.id && !sidebarCollapsed && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-2 h-2 bg-white rounded-full"
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Collapse Toggle */}
        <div className="p-4 border-t border-gray-200">
          <motion.button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ApperIcon name={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"} className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8">
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts, deals, or activities..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 ml-6">
            {/* Notifications */}
            <motion.button
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="Bell" className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse-soft"></span>
            </motion.button>

            {/* User Avatar */}
            <motion.div
              className="flex items-center space-x-3 pl-4 border-l border-gray-200"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">A</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                <p className="text-xs text-gray-500">Sales Manager</p>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Welcome Header - Only on Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="bg-white border-b border-gray-200 px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {getWelcomeMessage()}, Alex! 👋
                </h1>
                <p className="text-gray-600 mt-1">
                  Here's what's happening with your sales today
                </p>
              </div>
              <div className="hidden lg:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date().toLocaleTimeString('en-US', { 
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <ApperIcon name="Sun" className="h-6 w-6 text-accent" />
              </div>
            </div>

            {/* Stats Cards - Only on Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-card p-6 hover:shadow-card-hover transform hover:-translate-y-1 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <span className={`text-sm font-medium ${
                          stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">vs last month</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                      <ApperIcon name={stat.icon} className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default Home