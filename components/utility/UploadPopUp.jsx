import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { useRouter } from 'next/router';
// import Modal from '../Login/Modal';
// import Login from '../Login/Login';

const ResumeUploadForm = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([]);
  const [referenceFiles, setReferenceFiles] = useState([]);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const token = localStorage.getItem("token")
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  if (!isOpen) return null;

  const onSubmit = (data) => {
    console.log('Form data:', data);
    console.log('Resume files:', files);
    console.log('Reference files:', referenceFiles);
    reset();
    setFiles([]);
    setReferenceFiles([]);
    onClose();
   router.push('/payment')
 
  };

  const handleFileChange = (e, setFileState) => {
    const fileList = Array.from(e.target.files);
    setFileState(fileList);
  };
  const handleLoginClick = () => {
    setLoginOpen(true);
  };

//   if (!token) {
//     return (
//       <>
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
//             <h2 className="text-2xl font-bold mb-4 text-gray-800">Login Required</h2>
//             <p className="text-gray-600 mb-6">Please login to Submit the form</p>
//             <div className="space-x-4">
//               <button
//                 onClick={handleLoginClick}
//                 className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//               >
//                 Login
//               </button>
//               <button
//                 onClick={onClose}
//                 className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>

//         <Modal 
//           isOpen={isLoginOpen} 
//           onClose={() => setLoginOpen(false)}
//         >
//           <Login />
//         </Modal>
//       </>
//     );
//   }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Upload Resume</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              {...register('fullName', { required: 'Full name is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email & Contact */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number *
              </label>
              <input
                {...register('contact', { 
                  required: 'Contact number is required',
                  pattern: {
                    value: /^[0-9+-]+$/,
                    message: 'Please enter a valid contact number'
                  }
                })}
                type="tel"
                placeholder="Enter your contact number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                placeholder="Enter your email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* File Uploads */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Current Resume *
              </label>
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, setFiles)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
              </div>
              {files.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Selected files:</p>
                  <ul className="list-disc list-inside">
                    {files.map((file, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Reference Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reference Resume Upload
              </label>
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, setReferenceFiles)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              {referenceFiles.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Selected reference files:</p>
                  <ul className="list-disc list-inside">
                    {referenceFiles.map((file, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Job Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Targeted Job Link
            </label>
            <input
              {...register('jobLink', {
                pattern: {
                  value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                  message: 'Please enter a valid URL'
                }
              })}
              type="url"
              placeholder="https://example.com/job-posting"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.jobLink && (
              <p className="text-red-500 text-sm mt-1">{errors.jobLink.message}</p>
            )}
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>
            <textarea
              {...register('remarks')}
              rows={2}
              placeholder="Add any additional information or notes"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResumeUploadForm;