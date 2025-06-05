import { motion } from 'framer-motion'
    import Icon from '@/components/atoms/Icon'
    import Text from '@/components/atoms/Text'

    const StatCard = ({ title, value, icon, color, bgColor, change, index }) => {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-card p-6 hover:shadow-card-hover transform hover:-translate-y-1 transition-all duration-200"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <Text as="p" className="text-sm font-medium text-gray-600">{title}</Text>
              <Text as="p" className="text-3xl font-bold text-gray-900 mt-2">{value}</Text>
              <div className="flex items-center mt-2">
                <Text as="span" className={`text-sm font-medium ${
                  change?.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {change}
                </Text>
                <Text as="span" className="text-xs text-gray-500 ml-1">vs last month</Text>
              </div>
            </div>
            <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center`}>
              <Icon name={icon} className={`h-6 w-6 ${color}`} />
            </div>
          </div>
        </motion.div>
      )
    }

    export default StatCard