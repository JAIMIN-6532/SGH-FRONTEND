import { motion } from 'framer-motion';

const FormSection = ({ title, children, icon: Icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-2xl p-8 mb-8 border border-gray-100"
    >
      <div className="flex items-center mb-6">
        {Icon && (
          <div className="bg-primary/10 p-3 rounded-lg mr-4">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )}
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{title}</h2>
      </div>
      <div className="space-y-6">{children}</div>
    </motion.div>
  );
};

export default FormSection;