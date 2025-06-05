import Icon from '@/components/atoms/Icon'
    import Input from '@/components/atoms/Input'

    const SearchInput = ({ value, onChange, placeholder }) => {
      return (
        <div className="relative">
          <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      )
    }

    export default SearchInput