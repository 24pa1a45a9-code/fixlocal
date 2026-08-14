import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CivicIssue, IssueCategory, IssueSeverity } from '../types';

interface ReportIssueWizardProps {
  onCancel: () => void;
  onSubmit: (newIssue: CivicIssue) => void;
  initialCoords?: { x: number; y: number; address?: string };
}

const SAMPLE_PRESETS = [
  {
    title: 'Broken Streetlight',
    category: 'Streetlights' as IssueCategory,
    confidence: 94,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAbJT0O3YXN0RfdDZ6bJCwLJEfvvebdwEqasDs8KH0yz2146e1ttkqYnuRdQlHonIOSlC_TSSnOkszUlYwZC-aLrLJUlvh-xoRoQHqnXjm6JWrWsjW-he8lRz4usm4UtbTdo2t7WqbRMQGAm76GZhP9Y6LNTWh-bcxlAzNBJVj2sA0OzNaeqMDLtTpYqrRQC0PCACs9FJvV0_pol-lWLjUYKMIoLGX6B6c6pJ7LiRePQGHCXNEPSW2_',
    defaultAddress: '123 Main St, Springfield, SP 12345',
  },
  {
    title: 'Pothole & Asphalt Crack',
    category: 'Roads' as IssueCategory,
    confidence: 91,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDl99wTF6-v3mqaV1MySsOjU7GOzQR44Pdjwu6QEismRBYemQVicYu8Xt2rtp0F7rg1JsdxlBAEquEc-6x0YeFdUV4H1lAWPdpgd4Xy2LLdNMwXu3Y5JKsV5VzVCQoTlCm1kfWOBj7wtAuhw9mVQifw9nl98QFuf53my6CAARH3j754eOTZoaGp0GfYNxfYEwKGWM9QoBlCmuYNqzPA1zMg9Wdph0HSR35NzEFnlSgffOXs0RYm57OS',
    defaultAddress: '450 Oak Ave, Springfield, SP 12345',
  },
  {
    title: 'Water Main Leak',
    category: 'Water' as IssueCategory,
    confidence: 97,
    imageUrl:
      'https://images.unsplash.com/photo-1542013936693-884638332954?w=800&auto=format&fit=crop&q=80',
    defaultAddress: '810 Pine St, Springfield, SP 12345',
  },
  {
    title: 'Graffiti on Public Property',
    category: 'Graffiti' as IssueCategory,
    confidence: 88,
    imageUrl:
      'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=800&auto=format&fit=crop&q=80',
    defaultAddress: '1000 4th Ave, Springfield, SP 12345',
  },
];

export const ReportIssueWizard: React.FC<ReportIssueWizardProps> = ({
  onCancel,
  onSubmit,
  initialCoords,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [category, setCategory] = useState<IssueCategory>('Streetlights');
  const [confidence, setConfidence] = useState<number>(94);
  const [address, setAddress] = useState<string>(
    initialCoords?.address || '123 Main St, Springfield, SP 12345'
  );
  const [description, setDescription] = useState<string>('');
  const [severity, setSeverity] = useState<IssueSeverity>('Medium');
  const [department, setDepartment] = useState<string>(
    'Dept. of Transportation & Public Works'
  );
  const [notifyByEmail, setNotifyByEmail] = useState<boolean>(true);
  const [isEditingCategory, setIsEditingCategory] = useState<boolean>(false);
  const [isEditingLocation, setIsEditingLocation] = useState<boolean>(false);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeImage = customImage || SAMPLE_PRESETS[selectedPresetIndex].imageUrl;
  const activeTitle =
    category === 'Streetlights'
      ? 'Broken Streetlight'
      : category === 'Roads'
      ? 'Damaged Roadway / Pothole'
      : category === 'Water'
      ? 'Water Leak / Hydrant Fault'
      : category === 'Graffiti'
      ? 'Graffiti Abatement'
      : category === 'Parks'
      ? 'Park Facility Damage'
      : 'Civic Infrastructure Hazard';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAnalyzingImage(true);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setCustomImage(uploadEvent.target?.result as string);
        // Simulate AI classification
        setTimeout(() => {
          setIsAnalyzingImage(false);
          setConfidence(Math.floor(Math.random() * 8) + 91);
        }, 800);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIndex(idx);
    setCustomImage(null);
    setCategory(SAMPLE_PRESETS[idx].category);
    setConfidence(SAMPLE_PRESETS[idx].confidence);
    setAddress(SAMPLE_PRESETS[idx].defaultAddress);
  };

  const handleFinalSubmit = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3525cd', '#4f46e5', '#00505f', '#4cd7f6'],
    });

    const newIssue: CivicIssue = {
      id: `issue-${Date.now()}`,
      title: activeTitle,
      category,
      status: 'Reported',
      severity,
      locationName: address.split(',')[0] || 'Springfield',
      address,
      coordinates: initialCoords || {
        x: Math.floor(Math.random() * 40) + 30,
        y: Math.floor(Math.random() * 40) + 30,
      },
      distance: 'Just now',
      timeAgo: 'Just now',
      createdAt: new Date().toISOString(),
      imageUrl: activeImage,
      description: description.trim() || 'Reported via FixLocal mobile portal. Awaiting technician assignment.',
      confirmationsCount: 1,
      userConfirmed: true,
      isMyReport: true,
      aiConfidence: confidence,
      assignedDepartment: department,
      timeline: [
        {
          status: 'Reported',
          date: 'Just now',
          note: `AI classified with ${confidence}% confidence as ${category}.`,
        },
      ],
      comments: [],
    };

    onSubmit(newIssue);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 md:py-8 flex flex-col gap-5 min-h-[calc(100vh-80px)]">
      {/* Mobile Top Header with Back Button */}
      <div className="flex items-center justify-between border-b border-[#c7c4d8]/40 pb-3">
        <button
          onClick={onCancel}
          className="flex items-center gap-1 text-[#464555] hover:text-[#131b2e] p-1 rounded-lg"
        >
          <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          <span className="font-inter text-[13px] font-medium hidden sm:inline">Back</span>
        </button>

        <h1 className="font-manrope text-[18px] md:text-[20px] font-bold text-[#131b2e] text-center">
          Report an Issue
        </h1>

        <button
          onClick={onCancel}
          className="text-[#464555] hover:text-[#131b2e] text-[13px] font-medium p-1"
        >
          Cancel
        </button>
      </div>

      {/* Step Indicator & Progress */}
      <div>
        <div className="flex items-center justify-between text-[#464555] font-inter text-[12px] mb-1.5">
          <span className="font-semibold text-[#131b2e]">Step {currentStep} of 4</span>
          <span className="font-medium">
            {currentStep === 1
              ? 'Photo & AI'
              : currentStep === 2
              ? 'Location & Routing'
              : currentStep === 3
              ? 'Details & Impact'
              : 'Review & Submit'}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-[#eaedff] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#3525cd] transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* STEP 1: PHOTO & AI (Exactly as in Image 5) */}
      {currentStep === 1 && (
        <div className="flex flex-col gap-5 animate-slide-up">
          {/* Photo Upload / Preview Container */}
          <section className="bg-white border border-[#c7c4d8] rounded-xl overflow-hidden relative group shadow-xs">
            <div className="h-56 md:h-64 relative bg-[#eaedff] overflow-hidden flex items-center justify-center">
              <img
                src={activeImage}
                alt="Civic Issue Upload"
                className={`w-full h-full object-cover transition-opacity ${
                  isAnalyzingImage ? 'opacity-40 animate-pulse' : 'opacity-100'
                }`}
              />

              {isAnalyzingImage && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#131b2e]/30 backdrop-blur-xs text-white">
                  <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
                  <span className="font-inter text-[13px] font-semibold">Gemini Vision Analyzing...</span>
                </div>
              )}

              {/* Hover / Retake Button */}
              <div className="absolute inset-0 bg-[#131b2e]/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white text-[#3525cd] font-inter text-[13px] font-semibold px-4 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-[#f2f3ff] transition-transform active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  Upload Custom Photo
                </button>
              </div>

              {/* Image Uploaded Tag */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-[#3525cd] font-inter text-[12px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs border border-[#c7c4d8]/40">
                <span className="material-symbols-outlined text-[16px] text-[#3525cd]">
                  check_circle
                </span>
                Image Uploaded
              </div>
            </div>

            {/* Quick Sample Selector */}
            <div className="p-3 bg-[#faf8ff] border-t border-[#c7c4d8]/50 flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide">
              <span className="text-[11px] font-semibold text-[#464555] uppercase tracking-wider shrink-0">
                Quick Samples:
              </span>
              <div className="flex gap-1.5">
                {SAMPLE_PRESETS.map((preset, idx) => (
                  <button
                    key={preset.title}
                    type="button"
                    onClick={() => handleSelectPreset(idx)}
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-md transition-all ${
                      selectedPresetIndex === idx && !customImage
                        ? 'bg-[#3525cd] text-white font-semibold'
                        : 'bg-white text-[#464555] border border-[#c7c4d8]/60 hover:bg-[#eaedff]'
                    }`}
                  >
                    {preset.category}
                  </button>
                ))}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </section>

          {/* AI Detection Card */}
          <section className="bg-[#e2dfff]/40 border border-[#c3c0ff] rounded-xl p-4 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#3525cd] text-white flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[22px]">smart_toy</span>
              </div>
              <div>
                <h3 className="font-inter text-[14px] font-bold text-[#131b2e] mb-0.5">
                  AI Detection Result
                </h3>
                <p className="font-inter text-[13px] text-[#464555]">
                  Detected:{' '}
                  <strong className="text-[#131b2e] font-semibold">{activeTitle}</strong>{' '}
                  <span className="text-[#3525cd] font-semibold ml-1.5">
                    ({confidence}% confidence)
                  </span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditingCategory(!isEditingCategory)}
              className="text-[#3525cd] hover:bg-[#3525cd]/10 p-2 rounded-full transition-colors shrink-0"
              title="Change detected category"
            >
              <span className="material-symbols-outlined text-[20px]">edit</span>
            </button>
          </section>

          {/* Category Edit Dropdown (if triggered) */}
          {isEditingCategory && (
            <div className="bg-white border border-[#c7c4d8] rounded-xl p-3.5 flex flex-col gap-2 shadow-sm animate-slide-up">
              <label className="font-inter text-[12px] font-semibold text-[#131b2e]">
                Select Correct Category:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(
                  ['Streetlights', 'Roads', 'Water', 'Graffiti', 'Parks', 'Other'] as IssueCategory[]
                ).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setCategory(cat);
                      setIsEditingCategory(false);
                    }}
                    className={`p-2 rounded-lg text-[13px] font-medium border text-left flex items-center justify-between ${
                      category === cat
                        ? 'border-[#3525cd] bg-[#eaedff] text-[#3525cd] font-semibold'
                        : 'border-[#c7c4d8] hover:bg-[#faf8ff] text-[#131b2e]'
                    }`}
                  >
                    <span>{cat}</span>
                    {category === cat && <span className="material-symbols-outlined text-[16px]">check</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Incident Location Card */}
          <section className="bg-white border border-[#c7c4d8] rounded-xl p-4 flex flex-col gap-3 shadow-xs">
            <div className="flex justify-between items-center">
              <h3 className="font-inter text-[14px] font-bold text-[#131b2e] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#3525cd]">
                  location_on
                </span>
                Incident Location
              </h3>
              <button
                type="button"
                onClick={() => setIsEditingLocation(!isEditingLocation)}
                className="text-[#3525cd] font-inter text-[12px] font-semibold hover:underline"
              >
                {isEditingLocation ? 'Done' : 'Edit Location'}
              </button>
            </div>

            {/* Map Preview Graphic */}
            <div className="rounded-lg overflow-hidden border border-[#c7c4d8]/60 h-32 relative bg-[#eaedff] flex items-center justify-center">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2gJo3MAshSetXZeS7bZ2_KVMrSWsmeZ2GK-14LGhgrIxJTioZv3BYCmF5y7wOXdPzPap5QScpumWJLUMfjgitwes7m61-ry0cVKQ5W9d3_f7Y2e3tNDgq1LP9rEqsLBT4hWpq0Osr3jsNdMNkvEwqWMP0C12TC2QcrYNr-7OxkCvfOF1P9u_ZZ8ZTE0T2cIOLFgmE9DqPLjXf_lNlpEsVDG-2r8fcNH_SHRbjED33lqDHGbo6zva3"
                alt="Location Pin"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10 flex flex-col items-center animate-bounce">
                <div className="w-8 h-8 rounded-full bg-[#3525cd] text-white flex items-center justify-center shadow-md border-2 border-white">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                </div>
              </div>
            </div>

            {isEditingLocation ? (
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter street address or intersection..."
                className="w-full h-11 px-3 bg-[#faf8ff] border border-[#3525cd] rounded-lg font-inter text-[13px] text-[#131b2e] outline-none"
              />
            ) : (
              <p className="font-inter text-[13px] text-[#464555] text-center font-medium">
                {address}
              </p>
            )}
          </section>

          {/* Form Fields: Description & Severity */}
          <section className="flex flex-col gap-4">
            <div>
              <label className="block font-inter text-[12px] font-semibold text-[#464555] mb-1.5">
                Description (Optional but helpful)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide any additional details..."
                className="w-full h-24 bg-white border border-[#c7c4d8] rounded-xl p-3 font-inter text-[14px] text-[#131b2e] placeholder:text-[#777587] focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/15 outline-none resize-none transition-all shadow-xs"
              ></textarea>
            </div>

            <div>
              <label className="block font-inter text-[12px] font-semibold text-[#464555] mb-2">
                Estimated Severity
              </label>
              <div className="flex gap-2.5">
                {(['Low', 'Medium', 'High'] as IssueSeverity[]).map((lvl) => {
                  const isSelected = severity === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSeverity(lvl)}
                      className={`flex-1 py-2.5 rounded-xl font-inter text-[13px] font-semibold transition-all border ${
                        isSelected
                          ? lvl === 'High'
                            ? 'bg-[#ffdad6] border-[#ba1a1a] text-[#ba1a1a] font-bold shadow-xs'
                            : 'bg-[#3525cd]/10 border-2 border-[#3525cd] text-[#3525cd] font-bold shadow-xs'
                          : 'bg-white border-[#c7c4d8] text-[#464555] hover:bg-[#f2f3ff]'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* STEP 2: LOCATION & ROUTING */}
      {currentStep === 2 && (
        <div className="flex flex-col gap-5 animate-slide-up">
          <div className="bg-white border border-[#c7c4d8] rounded-xl p-5 shadow-xs">
            <h3 className="font-manrope text-[16px] font-bold text-[#131b2e] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3525cd]">account_balance</span>
              Assigned Municipal Department
            </h3>
            <p className="font-inter text-[13px] text-[#464555] mb-4">
              FixLocal will automatically route this ticket to the appropriate city agency for prompt dispatch:
            </p>

            <div className="flex flex-col gap-2.5">
              {[
                {
                  dept: 'Dept. of Transportation & Public Works',
                  types: 'Streetlights, Traffic Signals, Road Hazards',
                },
                {
                  dept: 'Municipal Water & Sewer Authority',
                  types: 'Hydrants, Water Main Leaks, Drainage',
                },
                {
                  dept: 'Parks & Civic Beautification',
                  types: 'Graffiti, Overgrown Trees, Public Playgrounds',
                },
                {
                  dept: 'Building & Safety Enforcement',
                  types: 'Structural Hazards, Unsafe Sidewalks',
                },
              ].map((item) => (
                <div
                  key={item.dept}
                  onClick={() => setDepartment(item.dept)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    department === item.dept
                      ? 'border-[#3525cd] bg-[#eaedff] shadow-xs'
                      : 'border-[#c7c4d8]/70 bg-white hover:bg-[#faf8ff]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-inter text-[14px] font-bold text-[#131b2e]">
                      {item.dept}
                    </span>
                    {department === item.dept && (
                      <span className="material-symbols-outlined text-[#3525cd] text-[20px]">
                        check_circle
                      </span>
                    )}
                  </div>
                  <p className="font-inter text-[12px] text-[#464555]">{item.types}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: DETAILS & COMMUNITY IMPACT */}
      {currentStep === 3 && (
        <div className="flex flex-col gap-5 animate-slide-up">
          <div className="bg-white border border-[#c7c4d8] rounded-xl p-5 shadow-xs">
            <h3 className="font-manrope text-[16px] font-bold text-[#131b2e] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3525cd]">mark_email_read</span>
              Tracking & Notification Preferences
            </h3>

            <div className="flex flex-col gap-4">
              <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-[#c7c4d8]/60 hover:bg-[#faf8ff]">
                <input
                  type="checkbox"
                  checked={notifyByEmail}
                  onChange={(e) => setNotifyByEmail(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#3525cd] rounded focus:ring-[#3525cd]"
                />
                <div>
                  <span className="font-inter text-[13px] font-bold text-[#131b2e] block">
                    Receive Live Dispatch Updates
                  </span>
                  <span className="font-inter text-[12px] text-[#464555]">
                    Get notified when the city crew arrives on-site and marks the repair as completed.
                  </span>
                </div>
              </label>

              <div className="bg-[#f2f3ff] p-4 rounded-xl border border-[#c7c4d8]/50">
                <div className="flex items-center gap-2 mb-1 text-[#00505f]">
                  <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  <span className="font-inter text-[13px] font-bold">Community Impact Points</span>
                </div>
                <p className="font-inter text-[12px] text-[#464555]">
                  Submitting this report will award +10 Impact Points to your civic profile and help neighbors verify hazards in real time.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: REVIEW & SUBMIT */}
      {currentStep === 4 && (
        <div className="flex flex-col gap-5 animate-slide-up">
          <div className="bg-white border border-[#c7c4d8] rounded-xl overflow-hidden shadow-xs">
            <div className="h-40 relative bg-[#eaedff]">
              <img src={activeImage} alt={activeTitle} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-[#3525cd] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                Ready for Dispatch
              </div>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <div>
                <span className="text-[12px] font-bold text-[#3525cd] uppercase tracking-wide">
                  {category} • {severity} Priority
                </span>
                <h2 className="font-manrope text-[20px] font-bold text-[#131b2e] mt-0.5">
                  {activeTitle}
                </h2>
                <p className="font-inter text-[13px] text-[#464555] mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#3525cd]">
                    location_on
                  </span>{' '}
                  {address}
                </p>
              </div>

              {description && (
                <div className="bg-[#faf8ff] p-3 rounded-lg border border-[#c7c4d8]/40">
                  <p className="font-inter text-[13px] text-[#131b2e] italic">"{description}"</p>
                </div>
              )}

              <div className="border-t border-[#c7c4d8]/50 pt-3 text-[13px] text-[#464555] flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <span>Routing to:</span>
                  <strong className="text-[#131b2e]">{department}</strong>
                </div>
                <div className="flex justify-between">
                  <span>AI Verification:</span>
                  <strong className="text-[#00505f]">{confidence}% Verified Match</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Action Buttons */}
      <div className="mt-auto pt-6 pb-4">
        {currentStep < 4 ? (
          <button
            type="button"
            onClick={() => setCurrentStep((s) => s + 1)}
            className="w-full h-12 bg-[#3525cd] hover:bg-[#4d44e3] text-white rounded-xl font-inter text-[14px] font-bold flex justify-center items-center gap-2 shadow-md transition-all active:scale-98"
          >
            Continue to {currentStep === 1 ? 'Location' : currentStep === 2 ? 'Details' : 'Review'}
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-5 h-12 rounded-xl border border-[#c7c4d8] font-inter text-[14px] font-semibold text-[#464555] hover:bg-[#f2f3ff]"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="flex-1 h-12 bg-[#3525cd] hover:bg-[#4d44e3] text-white rounded-xl font-inter text-[14px] font-bold flex justify-center items-center gap-2 shadow-lg transition-all active:scale-98"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
              Submit Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
