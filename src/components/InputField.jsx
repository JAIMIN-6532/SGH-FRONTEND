import { motion } from 'framer-motion';

const InputField = ({ label, type = "text", name, value, onChange, required = false, className = "", icon: Icon }) => {
  return (
    <motion.div 
      className={`mb-4 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            w-full px-4 py-3 rounded-lg border border-gray-300
            focus:ring-2 focus:ring-primary/20 focus:border-primary
            transition-all duration-200 ease-in-out
            ${Icon ? 'pl-10' : ''}
            placeholder-gray-400
            bg-white
            shadow-sm
          `}
        />
      </div>
    </motion.div>
  );
};

export default InputField;