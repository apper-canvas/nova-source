import { motion } from 'framer-motion'
    import Icon from '@/components/atoms/Icon'
    import Button from '@/components/atoms/Button'
    import Text from '@/components/atoms/Text'

    const TabButton = ({ section, activeSection, onClick }) => {
      return (
        <Button
          key={section.id}
          onClick={() => onClick(section.id)}
          className={`inline-flex items-center px-4 py-2 rounded-xl font-medium transition-all ${
            activeSection === section.id
              ? 'gradient-bg text-white shadow-card'
              : 'text-gray-600 bg-white hover:bg-gray-50 border border-gray-200'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Icon name={section.icon} className="h-4 w-4 mr-2" />
          <Text>{section.label}</Text>
        </Button>
      )
    }

    export default TabButton