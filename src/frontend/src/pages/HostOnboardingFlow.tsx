import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, CheckCircle, Upload, Shield, Users, Star, Leaf } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    title: 'Personal Details',
    icon: Users,
    description: 'Tell us about yourself and your community',
    items: [
      'Full name and contact information',
      'Community affiliation',
      'Years of hosting experience',
      'Languages spoken',
    ],
  },
  {
    id: 2,
    title: 'Location & Destination',
    icon: Leaf,
    description: 'Describe your destination and offerings',
    items: [
      'Exact location and address',
      'Type of experience offered',
      'Accommodation details',
      'Nearby attractions',
    ],
  },
  {
    id: 3,
    title: 'Document Verification',
    icon: Shield,
    description: 'Upload required verification documents',
    items: [
      'Government-issued ID',
      'Community endorsement letter',
      'Property ownership proof',
      'Safety compliance certificate',
    ],
  },
  {
    id: 4,
    title: 'Community Review',
    icon: Users,
    description: 'Get endorsed by your community',
    items: [
      '3 community member endorsements',
      'Local authority approval',
      'Cultural authenticity review',
      'Safety inspection report',
    ],
  },
  {
    id: 5,
    title: 'Final Approval',
    icon: Star,
    description: 'MoolYatra team review and approval',
    items: [
      'Profile review by MoolYatra team',
      'Trust score calculation',
      'Listing activation',
      'Welcome to MoolYatra!',
    ],
  },
];

export default function HostOnboardingFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  const step = STEPS.find((s) => s.id === currentStep)!;
  const StepIcon = step.icon;

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate({ to: '/user-selection' });
    }
  };

  if (completed) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: 'linear-gradient(to bottom, #fdfcf8, #faf7ef)' }}
      >
        <div className="animate-fadeSlideIn">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow"
            style={{ background: 'linear-gradient(135deg, #2d5f2d, #0d9488)' }}
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2" style={{ color: '#3a2a10' }}>
            Application Submitted!
          </h1>
          <p className="text-base mb-2" style={{ color: '#7a5e3a' }}>
            Welcome to the MoolYatra community
          </p>
          <p className="text-sm mb-8" style={{ color: '#9a7a4e' }}>
            Our team will review your application within 3–5 business days. You'll receive an email once approved.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Verified', 'Trusted', 'Community Host'].map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{ background: 'linear-gradient(135deg, #e8612c, #f5a623)', color: '#fff' }}
              >
                {badge}
              </span>
            ))}
          </div>
          <button
            onClick={() => navigate({ to: '/traveller/home' })}
            className="px-8 py-3 rounded-2xl font-display font-bold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #2d5f2d, #0d9488)' }}
          >
            Explore MoolYatra
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8" style={{ background: 'linear-gradient(to bottom, #fdfcf8, #faf7ef)' }}>
      {/* Header */}
      <div
        className="px-4 pt-12 pb-6"
        style={{ background: 'linear-gradient(135deg, #2d5f2d 0%, #0d9488 100%)' }}
      >
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-white font-display text-xl font-bold">Become a Host</h1>
        <p className="text-white/70 text-sm mt-0.5">
          Step {currentStep} of {STEPS.length}
        </p>
      </div>

      {/* Step progress */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-1">
          {STEPS.map((s) => {
            const isCompleted = s.id < currentStep;
            const isActive = s.id === currentStep;
            return (
              <div key={s.id} className="flex items-center flex-1">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300"
                  style={
                    isCompleted
                      ? { background: '#0d9488', color: '#fff' }
                      : isActive
                      ? { background: 'linear-gradient(135deg, #e8612c, #f5a623)', color: '#fff' }
                      : { background: '#e0ede0', color: '#9a7a4e' }
                  }
                >
                  {isCompleted ? <CheckCircle className="w-4 h-4" /> : s.id}
                </div>
                {s.id < STEPS.length && (
                  <div
                    className="flex-1 h-1 mx-1 rounded-full transition-all duration-500"
                    style={{ background: isCompleted ? '#0d9488' : '#e0ede0' }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="px-4 py-2 space-y-5 animate-fadeSlideIn" key={currentStep}>
        {/* Step header */}
        <div
          className="rounded-2xl p-5 flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg, #e0ede0, #d5f3f3)' }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #2d5f2d, #0d9488)' }}
          >
            <StepIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold" style={{ color: '#3a2a10' }}>
              {step.title}
            </h2>
            <p className="text-sm" style={{ color: '#7a5e3a' }}>
              {step.description}
            </p>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-3">
          {step.items.map((item, i) => (
            <div
              key={item}
              className="flex items-center gap-3 p-4 rounded-xl animate-fadeSlideIn"
              style={{
                background: '#fff',
                boxShadow: '0 2px 8px rgba(58,42,16,0.08)',
                animationDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: '#e0ede0' }}
              >
                <CheckCircle className="w-4 h-4" style={{ color: '#2d5f2d' }} />
              </div>
              <span className="text-sm" style={{ color: '#3a2a10' }}>
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Upload area (for step 3) */}
        {currentStep === 3 && (
          <div
            className="rounded-2xl p-6 flex flex-col items-center gap-3 border-2 border-dashed"
            style={{ borderColor: '#0d9488', background: '#f0fafa' }}
          >
            <Upload className="w-8 h-8" style={{ color: '#0d9488' }} />
            <p className="text-sm font-semibold" style={{ color: '#0d9488' }}>
              Upload Documents
            </p>
            <p className="text-xs text-center" style={{ color: '#7a5e3a' }}>
              Drag & drop or tap to upload PDF, JPG, or PNG files
            </p>
            <button
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-md"
              style={{ background: 'linear-gradient(135deg, #e8612c, #f5a623)' }}
            >
              Choose Files
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-4 mt-6 flex gap-3">
        <button
          onClick={handleBack}
          className="flex-1 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 hover:shadow-md"
          style={{ background: '#e0ede0', color: '#2d5f2d' }}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-3.5 rounded-2xl font-display font-bold text-white text-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #e8612c, #f5a623)' }}
        >
          {currentStep === STEPS.length ? 'Submit Application' : 'Continue'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
