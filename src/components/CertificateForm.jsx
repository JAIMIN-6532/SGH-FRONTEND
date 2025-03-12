import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {
  UserIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  HomeIcon,
  DocumentTextIcon,
  PhotoIcon,
  PencilIcon,
  ClipboardDocumentListIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import FormSection from './FormSection';
import InputField from './InputField';
import StepIndicator from './StepIndicator';

const steps = [
  "Child Details",
  "Father's Info",
  "Mother's Info",
  "Family Details",
  "Documents",
  "Registration",
  "Summary"
];

const generateRegistrationNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `BCR${year}${random}`;
};

const CertificateForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    childName: '',
    dateOfBirth: new Date(),
    timeOfBirth: '',
    placeOfBirth: '',
    gender: '',
    birthOrder: '',
    
    fatherName: '',
    fatherAge: '',
    fatherOccupation: '',
    fatherEducation: '',
    fatherReligion: '',
    fatherNationality: '',
    fatherAddress: '',
    
    motherName: '',
    motherAge: '',
    motherOccupation: '',
    motherEducation: '',
    motherReligion: '',
    motherNationality: '',
    motherAddress: '',
    
    previousChildren: '',
    livingChildren: '',
    specialNotes: '',
    
    // Required Documents
    nonAvailabilityCert: null,
    schoolLeavingCert: null,
    jointPhotoAffidavit: null,
    passportPhotos: null,
    hospitalCertificate: null,
    
    registrationDate: new Date(),
    registrationNumber: generateRegistrationNumber(),
    signature: null,
    photoId: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleDateChange = (date, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      console.log('Form Data:', formData);
    }
  };

  const FileUploadField = ({ label, name, icon: Icon, required = false }) => (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type="file"
          name={name}
          onChange={handleFileChange}
          className="hidden"
          id={name}
          accept=".pdf,.jpg,.jpeg,.png"
          required={required}
        />
        <label
          htmlFor={name}
          className={`flex items-center justify-center w-full px-4 py-3 rounded-lg border-2 border-dashed
            ${formData[name] ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-primary'}
            cursor-pointer transition-colors duration-200`}
        >
          <Icon className={`w-6 h-6 mr-2 ${formData[name] ? 'text-green-500' : 'text-gray-400'}`} />
          <span className={formData[name] ? 'text-green-600' : 'text-gray-600'}>
            {formData[name] ? formData[name].name : `Upload ${label}`}
          </span>
        </label>
      </div>
    </div>
  );

  const renderSummary = () => (
    <FormSection title="Registration Summary" icon={ClipboardDocumentListIcon}>
      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Registration Details</h3>
          <p className="text-blue-800">Registration Number: {formData.registrationNumber}</p>
          <p className="text-blue-800">Registration Date: {formData.registrationDate.toLocaleDateString()}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Child Information</h3>
            <p><span className="font-medium">Name:</span> {formData.childName}</p>
            <p><span className="font-medium">Date of Birth:</span> {formData.dateOfBirth.toLocaleDateString()}</p>
            <p><span className="font-medium">Gender:</span> {formData.gender}</p>
            <p><span className="font-medium">Place of Birth:</span> {formData.placeOfBirth}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Family Details</h3>
            <p><span className="font-medium">Previous Children:</span> {formData.previousChildren}</p>
            <p><span className="font-medium">Living Children:</span> {formData.livingChildren}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Father's Information</h3>
            <p><span className="font-medium">Name:</span> {formData.fatherName}</p>
            <p><span className="font-medium">Age:</span> {formData.fatherAge}</p>
            <p><span className="font-medium">Occupation:</span> {formData.fatherOccupation}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Mother's Information</h3>
            <p><span className="font-medium">Name:</span> {formData.motherName}</p>
            <p><span className="font-medium">Age:</span> {formData.motherAge}</p>
            <p><span className="font-medium">Occupation:</span> {formData.motherOccupation}</p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Required Documents Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><span className="font-medium">Non-availability Certificate:</span> {formData.nonAvailabilityCert ? '✓ Uploaded' : '✗ Not uploaded'}</p>
            <p><span className="font-medium">School Leaving Certificate:</span> {formData.schoolLeavingCert ? '✓ Uploaded' : '✗ Not uploaded'}</p>
            <p><span className="font-medium">Joint Photo Affidavit:</span> {formData.jointPhotoAffidavit ? '✓ Uploaded' : '✗ Not uploaded'}</p>
            <p><span className="font-medium">Passport Photos:</span> {formData.passportPhotos ? '✓ Uploaded' : '✗ Not uploaded'}</p>
            <p><span className="font-medium">Hospital Certificate:</span> {formData.hospitalCertificate ? '✓ Uploaded' : '✗ Not uploaded'}</p>
          </div>
        </div>

        {formData.specialNotes && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Special Notes</h3>
            <p className="text-gray-700">{formData.specialNotes}</p>
          </div>
        )}
      </div>
    </FormSection>
  );

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <FormSection title="Child Information" icon={UserIcon}>
            <InputField
              label="Child's Full Name"
              name="childName"
              value={formData.childName}
              onChange={handleInputChange}
              required
              icon={UserIcon}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-2">
                  Date of Birth
                </label>
                <div className="relative">
                  <DatePicker
                    selected={formData.dateOfBirth}
                    onChange={(date) => handleDateChange(date, 'dateOfBirth')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <InputField
                label="Time of Birth"
                type="time"
                name="timeOfBirth"
                value={formData.timeOfBirth}
                onChange={handleInputChange}
                required
                icon={ClockIcon}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-2">
                  Gender
                </label>
                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <UserGroupIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <InputField
                label="Place of Birth"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleInputChange}
                required
                icon={MapPinIcon}
              />
            </div>
          </FormSection>
        );
      
      case 2:
        return (
          <FormSection title="Father's Information" icon={UserIcon}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Father's Full Name"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                required
                icon={UserIcon}
              />
              <InputField
                label="Age at Child's Birth"
                type="number"
                name="fatherAge"
                value={formData.fatherAge}
                onChange={handleInputChange}
                required
                icon={CalendarIcon}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Occupation"
                name="fatherOccupation"
                value={formData.fatherOccupation}
                onChange={handleInputChange}
                icon={BriefcaseIcon}
              />
              <InputField
                label="Education"
                name="fatherEducation"
                value={formData.fatherEducation}
                onChange={handleInputChange}
                icon={AcademicCapIcon}
              />
            </div>
            <InputField
              label="Address"
              name="fatherAddress"
              value={formData.fatherAddress}
              onChange={handleInputChange}
              icon={HomeIcon}
            />
          </FormSection>
        );
      
      case 3:
        return (
          <FormSection title="Mother's Information" icon={UserIcon}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Mother's Full Name"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
                required
                icon={UserIcon}
              />
              <InputField
                label="Age at Child's Birth"
                type="number"
                name="motherAge"
                value={formData.motherAge}
                onChange={handleInputChange}
                required
                icon={CalendarIcon}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Occupation"
                name="motherOccupation"
                value={formData.motherOccupation}
                onChange={handleInputChange}
                icon={BriefcaseIcon}
              />
              <InputField
                label="Education"
                name="motherEducation"
                value={formData.motherEducation}
                onChange={handleInputChange}
                icon={AcademicCapIcon}
              />
            </div>
            <InputField
              label="Address"
              name="motherAddress"
              value={formData.motherAddress}
              onChange={handleInputChange}
              icon={HomeIcon}
            />
          </FormSection>
        );

      case 4:
        return (
          <FormSection title="Family Details" icon={UserGroupIcon}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Number of Previous Children"
                type="number"
                name="previousChildren"
                value={formData.previousChildren}
                onChange={handleInputChange}
                icon={UserGroupIcon}
              />
              <InputField
                label="Number of Living Children"
                type="number"
                name="livingChildren"
                value={formData.livingChildren}
                onChange={handleInputChange}
                icon={UserGroupIcon}
              />
            </div>
            <div className="mt-6">
              <label className="block text-gray-700 font-medium mb-2">
                Special Notes (Optional)
              </label>
              <textarea
                name="specialNotes"
                value={formData.specialNotes}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary h-32 resize-none"
                placeholder="Add any additional notes or comments..."
              />
            </div>
          </FormSection>
        );

      case 5:
        return (
          <FormSection title="Required Documents" icon={DocumentDuplicateIcon}>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-800">
                Please upload all required documents in PDF, JPG, or PNG format.
                Make sure the files are clear and readable.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUploadField
                label="Non-availability Certificate"
                name="nonAvailabilityCert"
                icon={DocumentDuplicateIcon}
                // required
              />
              <FileUploadField
                label="School Leaving Certificate"
                name="schoolLeavingCert"
                icon={DocumentDuplicateIcon}
                // required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <FileUploadField
                label="Joint Photo Affidavit"
                name="jointPhotoAffidavit"
                icon={DocumentDuplicateIcon}
                // required
              />
              <FileUploadField
                label="Passport Size Photographs"
                name="passportPhotos"
                icon={PhotoIcon}
                // required
              />
            </div>
            <div className="mt-6">
              <FileUploadField
                label="Hospital Certificate"
                name="hospitalCertificate"
                icon={DocumentDuplicateIcon}
                // required
              />
            </div>
          </FormSection>
        );
      
      case 6:
        return (
          <FormSection title="Registration Details" icon={DocumentTextIcon}>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Registration Information</h3>
              <p className="text-blue-800">Registration Number: {formData.registrationNumber}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-2">
                  Registration Date
                </label>
                <div className="relative">
                  <DatePicker
                    selected={formData.registrationDate}
                    onChange={(date) => handleDateChange(date, 'registrationDate')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <FileUploadField
                label="Digital Signature"
                name="signature"
                icon={PencilIcon}
              />
              <FileUploadField
                label="Photo ID"
                name="photoId"
                icon={PhotoIcon}
              />
            </div>
          </FormSection>
        );

      case 7:
        return renderSummary();
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Birth Certificate Registration
            </h1>
            <p className="text-gray-600">
              Please fill out all the required information carefully
            </p>
          </div>

          <StepIndicator currentStep={step} steps={steps} />

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
            
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <motion.button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 rounded-lg bg-white text-primary border-2 border-primary hover:bg-primary/5 transition-colors duration-200 flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Previous Step
                </motion.button>
              )}
              
              <motion.button
                type="submit"
                className={`px-6 py-3 rounded-lg ${
                  step === steps.length
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-primary hover:bg-secondary'
                } text-white transition-colors duration-200 flex items-center space-x-2 ml-auto`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {step === steps.length ? 'Complete Registration' : 'Next Step'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CertificateForm;