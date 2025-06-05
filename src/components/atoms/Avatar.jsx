const Avatar = ({ children, className = '' }) => {
      return (
        <div className={`w-8 h-8 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center ${className}`}>
          {children}
        </div>
      )
    }

    export default Avatar