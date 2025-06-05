import { useState, useEffect } from 'react'
    import { toast } from 'react-toastify'
    import contactService from '@/services/api/contactService'
    import dealService from '@/services/api/dealService'
    import activityService from '@/services/api/activityService'
    import noteService from '@/services/api/noteService'
    import DashboardTemplate from '@/components/templates/DashboardTemplate'

    const HomePage = () => {
      const [contacts, setContacts] = useState([])
      const [deals, setDeals] = useState([])
      const [activities, setActivities] = useState([])
      const [notes, setNotes] = useState([])
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(null)
      const [searchQuery, setSearchQuery] = useState('')
      const [newContactForm, setNewContactForm] = useState({
        name: '',
        email: '',
        company: '',
        phone: ''
      })
      const [showContactForm, setShowContactForm] = useState(false)
      const [draggedDeal, setDraggedDeal] = useState(null)

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

      const handleCreateContact = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
          const contact = {
            ...newContactForm,
            createdAt: new Date().toISOString(),
            lastContactedAt: new Date().toISOString(),
            tags: []
          }
          
          await contactService.create(contact)
          setContacts(prev => [...prev, contact]) // Optimistically update UI
          toast.success('Contact created successfully!')
          setNewContactForm({ name: '', email: '', company: '', phone: '' })
          setShowContactForm(false)
        } catch (error) {
          toast.error('Failed to create contact')
        } finally {
          setLoading(false)
        }
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

      return (
        <DashboardTemplate
          contacts={contacts}
          deals={deals}
          activities={activities}
          notes={notes}
          loading={loading}
          error={error}
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          getWelcomeMessage={getWelcomeMessage}
          getRelativeTime={getRelativeTime}
          newContactForm={newContactForm}
          setNewContactForm={setNewContactForm}
          handleCreateContact={handleCreateContact}
          showContactForm={showContactForm}
          setShowContactForm={setShowContactForm}
          setDraggedDeal={setDraggedDeal}
          draggedDeal={draggedDeal}
        />
      )
    }

    export default HomePage