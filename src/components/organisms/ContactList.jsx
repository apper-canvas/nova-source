import { motion } from 'framer-motion'
    import Icon from '@/components/atoms/Icon'
    import Avatar from '@/components/atoms/Avatar'
    import Button from '@/components/atoms/Button'
    import Text from '@/components/atoms/Text'

    const ContactList = ({ contacts, getRelativeTime, setShowContactForm }) => {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Text as="h3" className="text-lg font-semibold text-gray-900">Recent Contacts</Text>
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowContactForm(true)}
              className="inline-flex items-center px-4 py-2 gradient-bg text-white font-medium rounded-xl shadow-card hover:shadow-card-hover transition-all"
            >
              <Icon name="Plus" className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </div>

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
                  <Avatar>
                    <Text as="span" className="text-white font-semibold">
                      {contact.name?.charAt(0) || 'U'}
                    </Text>
                  </Avatar>
                  <Text as="span" className="text-xs text-gray-500">
                    {getRelativeTime(contact.createdAt)}
                  </Text>
                </div>
                
                <Text as="h4" className="font-semibold text-gray-900 mb-1">{contact.name}</Text>
                <Text as="p" className="text-sm text-gray-600 mb-2">{contact.company}</Text>
                <Text as="p" className="text-sm text-gray-500 mb-3">{contact.email}</Text>
                
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
                  <Button className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                    <Icon name="MoreHorizontal" className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    }

    export default ContactList