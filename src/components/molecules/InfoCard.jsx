import Icon from '@/components/atoms/Icon'
    import Text from '@/components/atoms/Text'

    const InfoCard = ({ iconName, title, description, features }) => {
      return (
        <div className="p-6 lg:p-8">
          <div className="bg-white rounded-xl shadow-card p-8 text-center">
            <Icon name={iconName} className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <Text as="h3" className="text-xl font-semibold text-gray-900 mb-2">{title}</Text>
            <Text as="p" className="text-gray-600 mb-6">{description}</Text>
            <Text as="div" className="text-sm text-gray-500">{features}</Text>
          </div>
        </div>
      )
    }

    export default InfoCard