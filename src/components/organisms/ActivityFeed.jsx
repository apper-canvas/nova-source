import { motion } from 'framer-motion'
    import Icon from '@/components/atoms/Icon'
    import Text from '@/components/atoms/Text'
    import Avatar from '@/components/atoms/Avatar'

    const ActivityFeed = ({ activities, contacts, getRelativeTime }) => {
      return (
        <div className="space-y-6">
          <Text as="h3" className="text-lg font-semibold text-gray-900">Recent Activity</Text>
          
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
                  <Avatar className="bg-gradient-to-r from-primary to-primary-light flex-shrink-0">
                    <Icon name={activity.icon} className="h-5 w-5 text-white" />
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <Text as="p" className="text-sm text-gray-900">
                      <Text as="span" className="font-medium">Alex Johnson</Text> {activity.description}
                    </Text>
                    <div className="flex items-center mt-1 space-x-2">
                      <Text as="span" className="text-xs text-gray-500">
                        {getRelativeTime(activity.timestamp)}
                      </Text>
                      {activity.relatedContactId && (
                        <Text as="span" className="text-xs text-primary">
                          • {contacts?.find(c => c.id === activity.relatedContactId)?.name}
                        </Text>
                      )}
                    </div>
                  </div>
                  
                  <Text as="div" className="text-xs text-gray-400">
                    {new Date(activity.timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Text>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    export default ActivityFeed