'use client';

import { useState, useRef, useEffect } from 'react';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
// 1. Import Firebase dependencies
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 
// Note: Adjust '../lib/firebase' if your file is in a different folder structure
import { db } from '@/lib/firebase'; 

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    apartment: '',
    locality: '',
    pincode: '',
    age: '',
    interests: [] as string[],
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [interestsError, setInterestsError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedInterests = checked
        ? [...prevData.interests, value]
        : prevData.interests.filter((interest) => interest !== value);

      setInterestsError(updatedInterests.length === 0);

      return {
        ...prevData,
        interests: updatedInterests,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (formData.interests.length === 0) {
      setInterestsError(true);
      setSubmitMessage("Please select at least one Area of Interest.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // 1. Fire and Forget Google Sheets (don't block UI)
      // We will log the result but not hold up the user flow for it.
      const sheetsPromise = fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      .then(res => {
         if(!res.ok) console.error("Google Sheets API rejected:", res.status);
         else console.log("Google Sheets submitted");
      })
      .catch(err => console.error("Google Sheets API error:", err));

      // 2. Firebase Submission with Timeout
      // Since we enabled persistence, this should resume in background if network is slow.
      // But we still want to show a success message quickly.
      const firebasePromise = addDoc(collection(db, "registrations"), {
          ...formData,
          submittedAt: serverTimestamp(),
          source: 'web-form'
      });

      // Race against a 4-second timer. If Firebase takes longer, we assume it's handling it in background/offline mode.
      const TIMEOUT_MS = 4000;
      await Promise.race([
        firebasePromise,
        new Promise(resolve => setTimeout(resolve, TIMEOUT_MS))
      ]);

      // Whether it finished or timed out, we show success to the user.
      // If it failed with an error (e.g. permission denied), it would have thrown.
      
      console.log("Submission flow complete (optimistic)");
      setSubmitMessage("Thank you! Your information has been recorded.");
      setSubmitted(true);
      
      // Reset Form
      setFormData({
        name: "",
        mobileNumber: "",
        email: "",
        apartment: "",
        locality: "",
        pincode: "",
        age: "",
        interests: [],
        notes: "",
      });
      setInterestsError(false);

    } catch (error) {
      console.error("Submission error:", error);
      // Only show error if it's a hard failure (like validation or permission denied)
      setSubmitMessage("❌ An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll to success message when it appears
  useEffect(() => {
    if (submitted && successRef.current) {
      setTimeout(() => {
        successRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center'
        });
      }, 100);
    }
  }, [submitted]);

  const areaOfInterestOptions = [
    { label: 'Bala Bharathi (5-12 years)', value: 'bala-bharathi' },
    { label: 'Kishora Bharathi (12-16 years)', value: 'kishora-bharathi' },
    { label: 'Yuva (boys and girls of 18-28 years)', value: 'yuva' },
    { label: 'IT Milan (male working professionals)', value: 'it-milan' },
    { label: 'Sevika Samithi (female working professionals and homemakers)', value: 'sevika-samithi' },
  ];

  if (submitted) {
    return (
      <div ref={successRef} className="relative bg-white/90 backdrop-blur-md rounded-xl p-8 md:p-10 shadow-2xl border border-white/20">
        <div className="text-center py-6 md:py-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-green-600 text-3xl" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Registration Successful!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for your interest! We have received your information and will contact you shortly.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setSubmitMessage("");
            }}
            className="px-6 py-3 bg-gradient-to-r from-[#7c0f00] to-[#E65911] text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white/90 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-2xl border border-white/20">
      <div className="absolute -inset-4 bg-gradient-to-b from-[#7c0f00]/5 to-[#E65911]/5 rounded-2xl blur-lg opacity-70 -z-10"></div>
      
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#7c0f00] to-[#E65911] bg-clip-text text-transparent">
          Register for Our Initiatives
        </h2>
        <p className="text-gray-600 mt-3 text-sm md:text-base">
          Fill out this form to get involved and learn more about our programs.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        {/* Row 1: Name and Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E65911] focus:border-transparent transition-all duration-300"
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E65911] focus:border-transparent transition-all duration-300"
              required
              placeholder="Enter your mobile number"
            />
          </div>
        </div>

        {/* Row 2: Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E65911] focus:border-transparent transition-all duration-300"
            required
            placeholder="Enter your email address"
          />
        </div>

        {/* Row 3: Apartment (New) and Locality */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
              Apartment / Flat No <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="apartment"
              name="apartment"
              value={formData.apartment}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E65911] focus:border-transparent transition-all duration-300"
              placeholder="e.g. Flat 101, Sunshine Apts"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="locality" className="block text-sm font-medium text-gray-700">
              Locality <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="locality"
              name="locality"
              value={formData.locality}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E65911] focus:border-transparent transition-all duration-300"
              required
              placeholder="Enter your locality"
            />
          </div>
        </div>

        {/* Row 4: Pincode and Age */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E65911] focus:border-transparent transition-all duration-300"
              required
              placeholder="Enter your pincode"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E65911] focus:border-transparent transition-all duration-300"
              placeholder="Enter your age"
            />
          </div>
        </div>

        {/* Areas of Interest */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Area of Interest (select one or more) <span className="text-red-500">*</span>
          </label>
          <div className={`grid grid-cols-1 gap-3 p-4 rounded-xl transition-colors duration-300 ${interestsError ? 'bg-red-50 border border-red-200' : 'bg-gray-50 border border-gray-200'}`}>
            {areaOfInterestOptions.map((option) => (
              <div key={option.value} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id={option.value}
                    name="interests"
                    value={option.value}
                    checked={formData.interests.includes(option.value)}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-[#7c0f00] border-gray-300 rounded focus:ring-[#E65911]"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={option.value} className="font-medium text-gray-700">
                    {option.label}
                  </label>
                </div>
              </div>
            ))}
          </div>
          {interestsError && (
            <p className="mt-1 text-sm text-red-600 font-medium">
              Please select at least one area of interest.
            </p>
          )}
        </div>
        
        {/* Additional Notes */}
        <div className="space-y-2">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E65911] focus:border-transparent transition-all duration-300"
            placeholder="Any additional information you'd like to share..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center px-6 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-[#7c0f00] to-[#E65911] hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              Register Now <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      {submitMessage && !submitted && (
        <div className={`mt-6 p-4 rounded-lg text-center font-medium ${submitMessage.includes('Failed') || submitMessage.includes('error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {submitMessage}
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;