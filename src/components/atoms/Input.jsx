const Input = ({ type = 'text', placeholder, value, onChange, className = '', required = false }) => {
      return (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${className}`}
          required={required}
        />
      )
    }

    export default Input