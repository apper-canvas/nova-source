import { motion } from 'framer-motion'
    import Icon from '@/components/atoms/Icon'
    import Avatar from '@/components/atoms/Avatar'
    import Text from '@/components/atoms/Text'
    import SearchInput from '@/components/molecules/SearchInput'
    import Button from '@/components/atoms/Button'

    const TopNavbar = ({ searchQuery, handleSearch }) => {
      return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8">
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <SearchInput
              placeholder="Search contacts, deals, or activities..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 ml-6">
            {/* Notifications */}
            <Button
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name="Bell" className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse-soft"></span>
            </Button>

            {/* User Avatar */}
            <motion.div
              className="flex items-center space-x-3 pl-4 border-l border-gray-200"
              whileHover={{ scale: 1.02 }}
            >
              <Avatar>
                <Text as="span" className="text-white font-semibold text-sm">A</Text>
              </Avatar>
              <div className="hidden md:block">
                <Text as="p" className="text-sm font-medium text-gray-900">Alex Johnson</Text>
                <Text as="p" className="text-xs text-gray-500">Sales Manager</Text>
              </div>
            </motion.div>
          </div>
        </header>
      )
    }

    export default TopNavbar