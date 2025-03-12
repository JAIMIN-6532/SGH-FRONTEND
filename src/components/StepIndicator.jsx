import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center relative">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index + 1;
          const isCurrent = currentStep === index + 1;

          return (
            <div key={index} className="flex flex-col items-center relative z-10">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.2 : 1,
                  backgroundColor: isCompleted ? '#3B82F6' : isCurrent ? '#60A5FA' : '#E5E7EB',
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                transition={{ duration: 0.2 }}
              >
                {isCompleted ? (
                  <CheckIcon className="w-6 h-6 text-white" />
                ) : (
                  <span className={`${isCurrent ? 'text-white' : 'text-gray-600'} font-semibold`}>
                    {index + 1}
                  </span>
                )}
              </motion.div>
              <span className={`text-sm font-medium ${isCurrent ? 'text-primary' : 'text-gray-500'}`}>
                {step}
              </span>
            </div>
          );
        })}
        
        {/* Progress bar */}
        <div className="absolute top-5 left-0 h-1 bg-gray-200 w-full -z-10">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;