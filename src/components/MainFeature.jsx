import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import contactService from '../services/api/contactService'
import dealService from '../services/api/dealService'
import activityService from '../services/api/activityService'

const MainFeature = ({ contacts, deals, activities, notes }) => {
  const [activeSection, setActiveSection] = useState('pipeline')
  const [draggedDeal, setDraggedDeal] = useState(null)
  const [newContactForm, setNewContactForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  })
  const [showContactForm, setShowContactForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const pipelineStages = [
    { id: 'New', title: 'New', color: 'bg-gray-100 border-gray-300' },
    { id: 'Contacted', title: 'Contacted', color: 'bg-blue-100 border-blue-300' },
    { id: 'Proposal', title: 'Proposal', color: 'bg-yellow-100 border-yellow-300' },
    { id: 'Negotiation', title: 'Negotiation', color: 'bg-orange-100 border-orange-300' },
    { id: 'Closed', title: 'Closed', color: 'bg-green-100 border-green-300' }
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
        await dealService.update(draggedDeal.id, { ...draggedDeal, stage: targetStage })
        toast.success(`Deal moved to ${targetStage}`)
        // In a real app, we'd update the local state or refetch data
      } catch (error) {
        toast.error('Failed to update deal stage')
      }
    }
    setDraggedDeal(null)
  }

  const handleCreateContact = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const newContact = {
        ...newContactForm,
        createdAt: new Date().toISOString(),
        lastContactedAt: new Date().toISOString(),
        tags: []
      }
      
      await contactService.create(newContact)
      toast.success('Contact created successfully!')
      setNewContactForm({ name: '', email: '', company: '', phone: '' })
      setShowContactForm(false)
    } catch (error) {
      toast.error('Failed to create contact')
    } finally {
      setLoading(false)
    }
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

  const getRelativeTime = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  const renderPipeline = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Sales Pipeline</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-4 py-2 gradient-bg text-white font-medium rounded-xl shadow-card hover:shadow-card-hover transition-all"
          onClick={() => toast.info('Deal creation feature coming soon!')}
        >
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Add Deal
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-96">
        {pipelineStages.map((stage) => (
          <div
            key={stage.id}
            className={`${stage.color} rounded-xl p-4 border-2 border-dashed transition-all`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-700">{stage.title}</h4>
              <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-lg">
                {getDealsForStage(stage.id).length}
              </span>
            </div>

            <div className="space-y-3">
              {getDealsForStage(stage.id).map((deal) => (
                <motion.div
                  key={deal.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, deal)}
                  className="bg-white rounded-lg p-4 shadow-card cursor-move hover:shadow-card-hover transition-all"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileDrag={{ scale: 1.05, rotate: 2 }}
                >
                  <h5 className="font-medium text-gray-900 mb-2">{deal.title}</h5>
                  <p className="text-sm text-gray-600 mb-3">
                    {contacts?.find(c => c.id === deal.contactId)?.company || 'Unknown Company'}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">
                      {formatCurrency(deal.value)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        deal.probability > 70 ? 'bg-green-100 text-green-800' :
                        deal.probability > 40 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {deal.probability}%
                      </span>
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-700">
                          {deal.owner?.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderContacts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent Contacts</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowContactForm(true)}
          className="inline-flex items-center px-4 py-2 gradient-bg text-white font-medium rounded-xl shadow-card hover:shadow-card-hover transition-all"
        >
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Add Contact
        </motion.button>
      </div>

      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl shadow-card p-6 border border-gray-200"
          >
            <form onSubmit={handleCreateContact} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={newContactForm.name}
                    onChange={(e) => setNewContactForm({...newContactForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={newContactForm.email}
                    onChange={(e) => setNewContactForm({...newContactForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={newContactForm.company}
                    onChange={(e) => setNewContactForm({...newContactForm, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newContactForm.phone}
                    onChange={(e) => setNewContactForm({...newContactForm, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 gradient-bg text-white rounded-lg hover:shadow-card-hover transition-all disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Contact'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts?.slice(0, 6).map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-card p-6 hover:shadow-card-hover transition-all"
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {contact.name?.charAt(0) || 'U'}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {getRelativeTime(contact.createdAt)}
              </span>
            </div>
            
            <h4 className="font-semibold text-gray-900 mb-1">{contact.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{contact.company}</p>
            <p className="text-sm text-gray-500 mb-3">{contact.email}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {contact.tags?.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                <ApperIcon name="MoreHorizontal" className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderActivity = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="space-y-6">
          {activities?.slice(0, 8).map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                <ApperIcon name={activity.icon} className="h-5 w-5 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Alex Johnson</span> {activity.description}
                </p>
                <div className="flex items-center mt-1 space-x-2">
                  <span className="text-xs text-gray-500">
                    {getRelativeTime(activity.timestamp)}
                  </span>
                  {activity.relatedContactId && (
                    <span className="text-xs text-primary">
                      • {contacts?.find(c => c.id === activity.relatedContactId)?.name}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="text-xs text-gray-400">
                {new Date(activity.timestamp).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'pipeline', label: 'Sales Pipeline', icon: 'Briefcase' },
          { id: 'contacts', label: 'Contacts', icon: 'Users' },
          { id: 'activity', label: 'Activity', icon: 'Activity' }
        ].map((section) => (
          <motion.button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`inline-flex items-center px-4 py-2 rounded-xl font-medium transition-all ${
              activeSection === section.id
                ? 'gradient-bg text-white shadow-card'
                : 'text-gray-600 bg-white hover:bg-gray-50 border border-gray-200'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ApperIcon name={section.icon} className="h-4 w-4 mr-2" />
            {section.label}
          </motion.button>
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
          {activeSection === 'pipeline' && renderPipeline()}
          {activeSection === 'contacts' && renderContacts()}
          {activeSection === 'activity' && renderActivity()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default MainFeature