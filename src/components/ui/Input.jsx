import { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  icon: Icon,
  className = '',
  wrapperClassName = '',
  ...props 
}, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${wrapperClassName}`}>
      {label && (
        <label className="text-sm font-medium text-gray-300 ml-1">
          {label}
        </label>
      )}
      
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">
            <Icon size={18} />
          </div>
        )}
        
        <input
          ref={ref}
          className={`
            w-full bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)] 
            rounded-xl px-4 py-2.5 text-white placeholder-gray-500
            focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50
            transition-all duration-200
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <span className="text-xs text-red-400 ml-1 animate-fadeIn">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
