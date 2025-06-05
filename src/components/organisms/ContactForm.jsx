import { motion, AnimatePresence } from 'framer-motion'
    import Input from '@/components/atoms/Input'
    import Button from '@/components/atoms/Button'
    import Text from '@/components/atoms/Text'

    const ContactForm = ({
      newContactForm,
      setNewContactForm,
      handleCreateContact,
      setShowContactForm,
      loading,
      showContactForm
    }) => {
      return (
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
                    <Text as="label" className="block text-sm font-medium text-gray-700 mb-2">Name</Text>
                    <Input
                      type="text"
                      required
                      value={newContactForm.name}
                      onChange={(e) => setNewContactForm({...newContactForm, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Text as="label" className="block text-sm font-medium text-gray-700 mb-2">Email</Text>
                    <Input
                      type="email"
                      required
                      value={newContactForm.email}
                      onChange={(e) => setNewContactForm({...newContactForm, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Text as="label" className="block text-sm font-medium text-gray-700 mb-2">Company</Text>
                    <Input
                      type="text"
                      value={newContactForm.company}
                      onChange={(e) => setNewContactForm({...newContactForm, company: e.target.value})}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <Text as="label" className="block text-sm font-medium text-gray-700 mb-2">Phone</Text>
                    <Input
                      type="tel"
                      value={newContactForm.phone}
                      onChange={(e) => setNewContactForm({...newContactForm, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 gradient-bg text-white rounded-lg hover:shadow-card-hover transition-all disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Contact'}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      )
    }

    export default ContactForm