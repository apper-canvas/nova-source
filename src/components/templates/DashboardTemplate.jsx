import { useState } from 'react'
    import { motion, AnimatePresence } from 'framer-motion'
    import { toast } from 'react-toastify'
    import Sidebar from '@/components/organisms/Sidebar'
    import TopNavbar from '@/components/organisms/TopNavbar'
    import StatCard from '@/components/molecules/StatCard'
    import TabButton from '@/components/molecules/TabButton'
    import ContactForm from '@/components/organisms/ContactForm'
    import ContactList from '@/components/organisms/ContactList'
    import PipelineBoard from '@/components/organisms/PipelineBoard'
    import ActivityFeed from '@/components/organisms/ActivityFeed'
    import InfoCard from '@/components/molecules/InfoCard'
    import Icon from '@/components/atoms/Icon'
    import Text from '@/components/atoms/Text'

    const DashboardTemplate = ({
      contacts,
      deals,
      activities,
      notes,
      loading,
      error,
      handleSearch,
      getWelcomeMessage,
      getRelativeTime,
      newContactForm,
      setNewContactForm,
      handleCreateContact,
      showContactForm,
      setShowContactForm,
      setDraggedDeal,
      draggedDeal
    }) => {
      const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
      const [activeTab, setActiveTab] = useState('dashboard')
      const [activeSection, setActiveSection] = useState('pipeline')

      const pipelineStages = [
        { id: 'New', title: 'New', color: 'bg-gray-100 border-gray-300' },
        { id: 'Contacted', title: 'Contacted', color: 'bg-blue-100 border-blue-300' },
        { id: 'Proposal', title: 'Proposal', color: 'bg-yellow-100 border-yellow-300' },
        { id: 'Negotiation', title: 'Negotiation', color: 'bg-orange-100 border-orange-300' },
        { id: 'Closed', title: 'Closed', color: 'bg-green-100 border-green-300' }
      ]

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

      const handleDragStart = (e, deal) => {
        setDraggedDeal(deal)
        e.dataTransfer.effectAllowed = 'move'
      }

      const handleDragOver = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
      }

      const handleDrop = async (e, targetStage) => {
        e.preventDefault()
        
        if (draggedDeal && draggedDeal.stage !== targetStage) {
          try {
            // In a real app, we'd update the local state or refetch data
            toast.success(`Deal moved to ${targetStage}`)
          } catch (error) {
            toast.error('Failed to update deal stage')
          }
        }
        setDraggedDeal(null)
      }

      const getDealsForStage = (stage) => {
        return deals?.filter(deal => deal?.stage === stage) || []
      }

      const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount)
      }

      const renderDashboardContent = () => (
        <div className="p-6 lg:p-8 space-y-8">
          {/* Section Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'pipeline', label: 'Sales Pipeline', icon: 'Briefcase' },
              { id: 'contacts', label: 'Contacts', icon: 'Users' },
              { id: 'activity', label: 'Activity', icon: 'Activity' }
            ].map((section) => (
              <TabButton
                key={section.id}
                section={section}
                activeSection={activeSection}
                onClick={setActiveSection}
              />
            ))}
          </div>

          {/* Section Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeSection === 'pipeline' && (
                <PipelineBoard
                  pipelineStages={pipelineStages}
                  deals={deals}
                  contacts={contacts}
                  handleDragOver={handleDragOver}
                  handleDrop={handleDrop}
                  handleDragStart={handleDragStart}
                  formatCurrency={formatCurrency}
                  getDealsForStage={getDealsForStage}
                />
              )}
              {activeSection === 'contacts' && (
                <>
                  <ContactForm
                    newContactForm={newContactForm}
                    setNewContactForm={setNewContactForm}
                    handleCreateContact={handleCreateContact}
                    setShowContactForm={setShowContactForm}
                    loading={loading}
                    showContactForm={showContactForm}
                  />
                  <ContactList
                    contacts={contacts}
                    getRelativeTime={getRelativeTime}
                    setShowContactForm={setShowContactForm}
                  />
                </>
              )}
              {activeSection === 'activity' && (
                <ActivityFeed
                  activities={activities}
                  contacts={contacts}
                  getRelativeTime={getRelativeTime}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )

      const renderOtherContent = (tab) => {
        switch (tab) {
          case 'contacts':
            return (
              <InfoCard
                iconName="Users"
                title="Contact Management"
                description="Advanced contact management features coming soon!"
                features="• Import/Export contacts • Advanced search • Custom fields • Contact scoring"
              />
            )
          case 'deals':
            return (
              <InfoCard
                iconName="Briefcase"
                title="Advanced Deal Management"
                description="Enhanced deal tracking and forecasting tools launching soon!"
                features="• Deal forecasting • Custom stages • Automated workflows • Performance analytics"
              />
            )
          case 'tasks':
            return (
              <InfoCard
                iconName="CheckSquare"
                title="Task Management"
                description="Comprehensive task management system coming soon!"
                features="• Task scheduling • Team collaboration • Priority management • Progress tracking"
              />
            )
          case 'calendar':
            return (
              <InfoCard
                iconName="Calendar"
                title="Calendar Integration"
                description="Calendar sync and scheduling features launching next month!"
                features="• Google Calendar sync • Meeting scheduling • Reminder notifications • Team availability"
              />
            )
          case 'reports':
            return (
              <InfoCard
                iconName="BarChart3"
                title="Analytics Dashboard"
                description="Advanced reporting and analytics in development!"
                features="• Sales performance • Revenue forecasting • Team productivity • Custom reports"
              />
            )
          case 'settings':
            return (
              <InfoCard
                iconName="Settings"
                title="Settings & Customization"
                description="Customization options coming in v2.0!"
                features="• User preferences • Team settings • Integration management • Custom workflows"
              />
            )
          default:
            return null
        }
      }

      if (loading) {
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <Text as="p" className="text-gray-600">Loading Nova CRM...</Text>
            </div>
          </div>
        )
      }

      return (
        <div className="min-h-screen bg-gray-50 flex">
          <Sidebar
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sidebarItems={sidebarItems}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-screen">
            <TopNavbar searchQuery={contacts.searchQuery} handleSearch={handleSearch} />

            {/* Welcome Header - Only on Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="bg-white border-b border-gray-200 px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Text as="h1" className="text-2xl lg:text-3xl font-bold text-gray-900">
                      {getWelcomeMessage()}, Alex! 👋
                    </Text>
                    <Text as="p" className="text-gray-600 mt-1">
                      Here's what's happening with your sales today
                    </Text>
                  </div>
                  <div className="hidden lg:flex items-center space-x-4">
                    <div className="text-right">
                      <Text as="p" className="text-sm font-medium text-gray-900">
                        {new Date().toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Text>
                      <Text as="p" className="text-xs text-gray-500">
                        {new Date().toLocaleTimeString('en-US', { 
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Text>
                    </div>
                    <Icon name="Sun" className="h-6 w-6 text-accent" />
                  </div>
                </div>

                {/* Stats Cards - Only on Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
                  {stats.map((stat, index) => (
                    <StatCard key={stat.title} {...stat} index={index} />
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
                  {activeTab === 'dashboard' ? renderDashboardContent() : renderOtherContent(activeTab)}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      )
    }

    export default DashboardTemplate