import { motion } from 'framer-motion'
    import Text from '@/components/atoms/Text'
    import Avatar from '@/components/atoms/Avatar'

    const PipelineCard = ({ deal, contacts, formatCurrency, handleDragStart }) => {
      return (
        <motion.div
          key={deal.id}
          draggable
          onDragStart={(e) => handleDragStart(e, deal)}
          className="bg-white rounded-lg p-4 shadow-card cursor-move hover:shadow-card-hover transition-all"
          whileHover={{ scale: 1.02, y: -2 }}
          whileDrag={{ scale: 1.05, rotate: 2 }}
        >
          <Text as="h5" className="font-medium text-gray-900 mb-2">{deal.title}</Text>
          <Text as="p" className="text-sm text-gray-600 mb-3">
            {contacts?.find(c => c.id === deal.contactId)?.company || 'Unknown Company'}
          </Text>
          
          <div className="flex items-center justify-between">
            <Text as="span" className="text-lg font-bold text-green-600">
              {formatCurrency(deal.value)}
            </Text>
            <div className="flex items-center space-x-2">
              <Text as="span" className={`px-2 py-1 text-xs font-medium rounded-full ${
                deal.probability > 70 ? 'bg-green-100 text-green-800' :
                deal.probability > 40 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {deal.probability}%
              </Text>
              <Avatar className="bg-gray-300">
                <Text as="span" className="text-xs font-medium text-gray-700">
                  {deal.owner?.charAt(0)}
                </Text>
              </Avatar>
            </div>
          </div>
        </motion.div>
      )
    }

    export default PipelineCard