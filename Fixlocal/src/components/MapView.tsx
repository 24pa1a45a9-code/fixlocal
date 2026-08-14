import React, { useState, useMemo } from 'react';
import { CivicIssue } from '../types';

interface MapViewProps {
  issues: CivicIssue[];
  onSelectIssue: (issue: CivicIssue) => void;
  onStartReport: (initialCoords?: { x: number; y: number; address?: string }) => void;
  onConfirmIssue: (issueId: string, e: React.MouseEvent) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  issues,
  onSelectIssue,
  onStartReport,
  onConfirmIssue,
}) => {
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>('issue-1');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCenterNotification, setShowCenterNotification] = useState(false);

  // Filter issues
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      // Category filter
      if (activeCategory === 'Roads' && issue.category !== 'Roads') return false;
      if (activeCategory === 'Streetlights' && issue.category !== 'Streetlights') return false;
      if (activeCategory === 'Water' && issue.category !== 'Water') return false;
      if (activeCategory === 'Urgent' && issue.severity !== 'High') return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = issue.title.toLowerCase().includes(query);
        const matchLocation = issue.locationName.toLowerCase().includes(query);
        const matchAddress = issue.address.toLowerCase().includes(query);
        return matchTitle || matchLocation || matchAddress;
      }

      return true;
    });
  }, [issues, activeCategory, searchQuery]);

  const selectedIssue = useMemo(() => {
    if (!selectedIssueId) return null;
    return issues.find((i) => i.id === selectedIssueId) || null;
  }, [issues, selectedIssueId]);

  const handleCenterLocation = () => {
    setShowCenterNotification(true);
    setTimeout(() => setShowCenterNotification(false), 2500);
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If user clicks on empty map area, allow reporting at this location
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    // Only if not clicking a marker or card
    if ((e.target as HTMLElement).closest('.map-control-element')) {
      return;
    }
    // Deselect current preview if clicking empty area or allow new report
    setSelectedIssueId(null);
  };

  return (
    <div className="relative w-full h-[calc(100dvh-64px)] overflow-hidden flex flex-col">
      {/* Main Map Canvas / Simulated Interactive Background */}
      <div
        className="absolute inset-0 bg-cover bg-center w-full h-full cursor-crosshair select-none"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD5GcnYP_8lm-I93YOyxolufMlRGppf3H_6LmliFEpTcVbS3MVkxm004KBZ67GQ08E9z0UNVbViQ9uPQvZ9w7AOgEjHR1HZOtqoPyaJVeHIsyJHlplANTs6O7ubymkQnR_fkug0j2xWSlqlADUODXDOJHLTC7ydzc_SDvFDeuYYcnFbF4SkEYcHaU9rLd7QQ8p4GgDgZo7zeRZEL5vi5KUdUisy4hWYeztQppVB-Q8nPhynQ2WfCZ-K')",
        }}
        onClick={handleMapClick}
      >
        {/* Subtle grid vector layer */}
        <div className="absolute inset-0 bg-[#3525cd]/5 pointer-events-none"></div>

        {/* Dynamic Map Pins */}
        {filteredIssues.map((issue) => {
          const isSelected = selectedIssueId === issue.id;
          const isUrgent = issue.severity === 'High';

          return (
            <div
              key={issue.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIssueId(issue.id);
              }}
              style={{ top: `${issue.coordinates.y}%`, left: `${issue.coordinates.x}%` }}
              className={`absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-full cursor-pointer group map-control-element transition-transform duration-200 ${
                isSelected ? 'z-30 scale-125' : 'z-10 hover:scale-110'
              }`}
            >
              {/* Pin Icon Bubble */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 border-white relative z-10 transition-all ${
                  isUrgent
                    ? 'bg-[#ba1a1a] text-white ring-4 ring-[#ba1a1a]/20'
                    : isSelected
                    ? 'bg-[#3525cd] text-white ring-4 ring-[#3525cd]/25'
                    : 'bg-[#00505f] text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isUrgent
                    ? 'warning'
                    : issue.category === 'Streetlights'
                    ? 'lightbulb'
                    : issue.category === 'Roads'
                    ? 'construction'
                    : 'location_on'}
                </span>
              </div>

              {/* Pin Needle Triangle */}
              <div
                className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] -mt-1 relative z-0 ${
                  isUrgent
                    ? 'border-t-[#ba1a1a]'
                    : isSelected
                    ? 'border-t-[#3525cd]'
                    : 'border-t-[#00505f]'
                }`}
              ></div>

              {/* Mini Label on hover */}
              <div className="hidden group-hover:block absolute bottom-full mb-1 px-2 py-0.5 bg-[#131b2e] text-white text-[10px] font-medium rounded-md whitespace-nowrap shadow-md pointer-events-none">
                {issue.title}
              </div>
            </div>
          );
        })}

        {/* Cluster Marker Demo (Seattle North Hub) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setActiveCategory('All');
            setSearchQuery('');
          }}
          className="absolute top-[35%] left-[45%] map-control-element cursor-pointer group z-20"
        >
          <div className="absolute -inset-2 rounded-full bg-[#3525cd]/25 animate-ping opacity-75"></div>
          <div className="w-12 h-12 bg-[#3525cd] text-white rounded-full flex items-center justify-center font-manrope text-[15px] font-bold shadow-lg border-2 border-white transform group-hover:scale-110 transition-transform relative z-10">
            12
          </div>
          <div className="hidden group-hover:block absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-[#131b2e] text-white text-[11px] font-medium px-2 py-1 rounded shadow-md whitespace-nowrap z-30">
            12 Neighborhood Reports
          </div>
        </div>
      </div>

      {/* Search & Filter Overlay (Top Left) */}
      <div className="absolute top-4 left-4 right-4 md:left-8 md:top-6 md:w-[420px] md:right-auto z-20 flex flex-col gap-2.5 pointer-events-none map-control-element">
        {/* Search Bar */}
        <div className="bg-white border border-[#c7c4d8] rounded-xl h-12 flex items-center px-4 shadow-sm hover:shadow-md transition-shadow pointer-events-auto">
          <span className="material-symbols-outlined text-[#464555] mr-3 text-[22px]">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search locations or issues..."
            className="flex-1 bg-transparent border-none focus:ring-0 font-inter text-[14px] text-[#131b2e] placeholder:text-[#464555] outline-none"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#464555] hover:text-[#131b2e] p-1"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          ) : (
            <div className="hidden md:flex items-center justify-center bg-[#eaedff] px-2 py-1 rounded text-[11px] font-semibold text-[#464555] border border-[#c7c4d8]/50">
              ⌘K
            </div>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide pointer-events-auto">
          {['All', 'Roads', 'Streetlights', 'Water', 'Urgent'].map((cat) => {
            const isActive = activeCategory === cat;
            const isUrgentBtn = cat === 'Urgent';

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-inter text-[12px] font-semibold whitespace-nowrap shadow-xs transition-all ${
                  isActive
                    ? isUrgentBtn
                      ? 'bg-[#ba1a1a] text-white border border-[#ba1a1a]'
                      : 'bg-[#3525cd] text-white border border-[#3525cd]'
                    : isUrgentBtn
                    ? 'bg-white text-[#ba1a1a] border border-[#ffdad6] hover:bg-[#ffdad6]/40'
                    : 'bg-white text-[#131b2e] border border-[#c7c4d8] hover:bg-[#f2f3ff]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Issue Preview Card */}
      {selectedIssue && (
        <div className="absolute bottom-[90px] md:bottom-8 left-4 right-4 md:left-8 md:w-[420px] z-30 bg-white rounded-xl border border-[#c7c4d8] shadow-[0px_12px_32px_rgba(15,23,42,0.12)] p-5 animate-slide-up pointer-events-auto map-control-element">
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-3 items-start">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                  selectedIssue.severity === 'High'
                    ? 'bg-[#ffdad6] text-[#ba1a1a]'
                    : 'bg-[#eaedff] text-[#3525cd]'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {selectedIssue.severity === 'High'
                    ? 'warning'
                    : selectedIssue.category === 'Streetlights'
                    ? 'lightbulb'
                    : 'location_on'}
                </span>
              </div>
              <div>
                <h3 className="font-manrope text-[18px] font-bold text-[#131b2e] leading-snug">
                  {selectedIssue.title}
                </h3>
                <p className="font-inter text-[13px] text-[#464555] flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[16px] text-[#3525cd]">
                    location_on
                  </span>{' '}
                  {selectedIssue.locationName}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedIssueId(null)}
              className="text-[#464555] hover:text-[#131b2e] hover:bg-[#f2f3ff] rounded-full p-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[12px] font-medium text-[#464555] border-t border-[#c7c4d8]/50 pt-2.5 mt-2">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">schedule</span> Reported{' '}
              {selectedIssue.timeAgo}
            </span>
            <span className="flex items-center gap-1 text-[#00505f] font-semibold">
              <span className="material-symbols-outlined text-[16px]">verified</span>{' '}
              {selectedIssue.confirmationsCount} confirmations
            </span>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={(e) => onConfirmIssue(selectedIssue.id, e)}
              className={`flex-1 h-12 rounded-lg font-inter text-[14px] font-semibold border transition-all ${
                selectedIssue.userConfirmed
                  ? 'bg-[#3525cd] text-white border-[#3525cd]'
                  : 'bg-white border-[#c7c4d8] text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              {selectedIssue.userConfirmed ? '✓ Confirmed by You' : 'Confirm Issue'}
            </button>
            <button
              onClick={() => onSelectIssue(selectedIssue)}
              className="flex-1 bg-[#3525cd] hover:bg-[#4d44e3] text-white h-12 rounded-lg font-inter text-[14px] font-semibold transition-colors shadow-xs"
            >
              View Details
            </button>
          </div>
        </div>
      )}

      {/* Controls (Center Location & FAB) */}
      <div className="absolute bottom-[90px] md:bottom-8 right-4 md:right-8 z-20 flex flex-col gap-3 items-end pointer-events-auto map-control-element">
        {/* Toast / Center feedback */}
        {showCenterNotification && (
          <div className="bg-[#131b2e] text-white text-[12px] font-medium px-3 py-1.5 rounded-lg shadow-md animate-slide-up">
            📍 Centered on your current location (Springfield)
          </div>
        )}

        {/* Center Location */}
        <button
          onClick={handleCenterLocation}
          className="w-12 h-12 bg-white rounded-full shadow-md border border-[#c7c4d8] flex items-center justify-center text-[#131b2e] hover:bg-[#f2f3ff] hover:text-[#3525cd] transition-all group"
          title="Center on my location"
        >
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
            my_location
          </span>
        </button>

        {/* FAB for Reporting */}
        <button
          onClick={() => onStartReport()}
          className="w-14 h-14 bg-[#3525cd] text-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-[#4d44e3] transition-all hover:scale-105 active:scale-95 group"
          title="Report an Issue"
        >
          <span className="material-symbols-outlined text-[28px] group-hover:rotate-90 transition-transform duration-200">
            add
          </span>
        </button>
      </div>
    </div>
  );
};
