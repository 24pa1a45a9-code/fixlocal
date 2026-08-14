import React, { useState } from 'react';
import { UserStats } from '../types';

interface ProfileImpactViewProps {
  stats: UserStats;
  onOpenReport: () => void;
}

export const ProfileImpactView: React.FC<ProfileImpactViewProps> = ({
  stats,
  onOpenReport,
}) => {
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // SVG Gauge Calculations for 84%
  const radius = 64;
  const strokeWidth = 14;
  const circumference = Math.PI * radius; // semi-circle
  const strokeDashoffset = circumference - (circumference * stats.resolutionRate) / 100;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="font-manrope text-[24px] md:text-[32px] font-bold text-[#131b2e] mb-1">
          Your Impact
        </h1>
        <p className="font-inter text-[14px] md:text-[16px] text-[#464555]">
          Track your contributions to the Springfield community.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Left Column: Hero & Bento Achievements */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          {/* Total Impact Hero Card */}
          <div className="bg-[#faf8ff] border border-[#c7c4d8]/80 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xs">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#3525cd]/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col gap-2 z-10 text-center md:text-left">
              <h3 className="font-manrope text-[20px] font-bold text-[#131b2e]">Total Impact</h3>
              <div className="flex items-baseline gap-2 justify-center md:justify-start">
                <span className="font-manrope text-[44px] md:text-[52px] font-extrabold text-[#3525cd] tracking-tight">
                  {stats.issuesResolved}
                </span>
                <span className="font-manrope text-[22px] md:text-[24px] font-semibold text-[#464555]">
                  Issues Resolved
                </span>
              </div>
              <p className="font-inter text-[14px] md:text-[15px] text-[#464555] max-w-md leading-relaxed">
                You've directly helped improve {stats.issuesResolved} local issues. Your efforts are
                making Springfield a better place for everyone.
              </p>
            </div>

            {/* Celebration Illustration Badge */}
            <div className="w-28 h-28 md:w-36 md:h-36 z-10 flex-shrink-0 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[#d0e1fb]/60 rounded-full scale-95 animate-pulse"></div>
              <div className="w-24 h-24 rounded-full bg-[#eaedff] flex items-center justify-center shadow-inner relative z-10">
                <span className="material-symbols-outlined text-[52px] text-[#3525cd] fill">
                  celebration
                </span>
              </div>
            </div>
          </div>

          {/* Top Performer Achievement Card */}
          <div className="bg-[#f2f3ff] border border-[#c7c4d8]/70 rounded-xl p-4 md:p-5 flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 bg-[#006a7c] text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[24px] fill">emoji_events</span>
            </div>
            <div>
              <h4 className="font-inter text-[15px] font-bold text-[#131b2e]">Top Performer</h4>
              <p className="font-inter text-[13px] text-[#464555]">
                You are in the <strong className="text-[#00505f] font-bold">Top {stats.topPercentile}%</strong> of
                Springfield contributors this month!
              </p>
            </div>
          </div>

          {/* Bento Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {/* Stat 1: Reports Submitted */}
            <div className="bg-white border border-[#c7c4d8]/70 rounded-xl p-4 hover:border-[#3525cd]/50 hover:shadow-xs transition-all">
              <div className="w-8 h-8 rounded-full bg-[#eaedff] text-[#3525cd] flex items-center justify-center mb-2.5">
                <span className="material-symbols-outlined text-[18px]">assignment</span>
              </div>
              <p className="font-inter text-[12px] font-semibold text-[#464555] mb-0.5">
                Reports Submitted
              </p>
              <p className="font-manrope text-[24px] md:text-[28px] font-bold text-[#131b2e]">
                {stats.reportsSubmitted}
              </p>
            </div>

            {/* Stat 2: Issues Resolved */}
            <div className="bg-white border border-[#c7c4d8]/70 rounded-xl p-4 hover:border-[#505f76]/50 hover:shadow-xs transition-all">
              <div className="w-8 h-8 rounded-full bg-[#d0e1fb] text-[#505f76] flex items-center justify-center mb-2.5">
                <span className="material-symbols-outlined text-[18px] fill">check_circle</span>
              </div>
              <p className="font-inter text-[12px] font-semibold text-[#464555] mb-0.5">
                Issues Resolved
              </p>
              <p className="font-manrope text-[24px] md:text-[28px] font-bold text-[#131b2e]">
                {stats.issuesResolved}
              </p>
            </div>

            {/* Stat 3: Community Confirmations */}
            <div className="bg-white border border-[#c7c4d8]/70 rounded-xl p-4 hover:border-[#00505f]/50 hover:shadow-xs transition-all">
              <div className="w-8 h-8 rounded-full bg-[#e2dfff] text-[#00505f] flex items-center justify-center mb-2.5">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </div>
              <p className="font-inter text-[12px] font-semibold text-[#464555] mb-0.5">
                Community Confirmations
              </p>
              <p className="font-manrope text-[24px] md:text-[28px] font-bold text-[#131b2e]">
                {stats.communityConfirmations}
              </p>
            </div>

            {/* Stat 4: Areas Improved */}
            <div className="bg-white border border-[#c7c4d8]/70 rounded-xl p-4 hover:border-[#3525cd]/50 hover:shadow-xs transition-all">
              <div className="w-8 h-8 rounded-full bg-[#eaedff] text-[#3525cd] flex items-center justify-center mb-2.5">
                <span className="material-symbols-outlined text-[18px]">location_city</span>
              </div>
              <p className="font-inter text-[12px] font-semibold text-[#464555] mb-0.5">
                Areas Improved
              </p>
              <p className="font-manrope text-[24px] md:text-[28px] font-bold text-[#131b2e]">
                {stats.areasImproved}
              </p>
            </div>
          </div>

          {/* Citizen Rewards / Badge Showcase */}
          <div className="bg-white border border-[#c7c4d8]/70 rounded-xl p-5 shadow-xs">
            <h4 className="font-manrope text-[16px] font-bold text-[#131b2e] mb-3">
              Earned Badges & Recognition
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#faf8ff] rounded-lg border border-[#c7c4d8]/50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#eaedff] text-[#3525cd] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                </div>
                <div>
                  <h5 className="font-inter text-[13px] font-bold text-[#131b2e]">First Responder</h5>
                  <p className="font-inter text-[11px] text-[#464555]">Reported 10+ hazards first</p>
                </div>
              </div>

              <div className="p-3 bg-[#faf8ff] rounded-lg border border-[#c7c4d8]/50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d0e1fb] text-[#00505f] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">streetview</span>
                </div>
                <div>
                  <h5 className="font-inter text-[13px] font-bold text-[#131b2e]">Street Guardian</h5>
                  <p className="font-inter text-[11px] text-[#464555]">Verified 100+ block items</p>
                </div>
              </div>

              <div className="p-3 bg-[#faf8ff] rounded-lg border border-[#c7c4d8]/50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">military_tech</span>
                </div>
                <div>
                  <h5 className="font-inter text-[13px] font-bold text-[#131b2e]">Civic Champion</h5>
                  <p className="font-inter text-[11px] text-[#464555]">Springfield Top 5%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Charts & Analytics */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          {/* Resolution Rate Semi-Circle Gauge */}
          <div className="bg-white border border-[#c7c4d8]/70 rounded-xl p-5 flex flex-col items-center text-center shadow-xs">
            <h3 className="font-inter text-[14px] font-bold text-[#131b2e] w-full text-left mb-3 border-b border-[#c7c4d8]/50 pb-2">
              Resolution Rate
            </h3>

            <div className="relative w-52 h-36 flex items-end justify-center">
              <svg className="w-48 h-32 overflow-visible" viewBox="0 0 160 90">
                {/* Background arc */}
                <path
                  d="M 16 80 A 64 64 0 0 1 144 80"
                  fill="none"
                  stroke="#eaedff"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                {/* Active progress arc */}
                <path
                  d="M 16 80 A 64 64 0 0 1 144 80"
                  fill="none"
                  stroke="#3525cd"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                <span className="font-manrope text-[32px] font-extrabold text-[#3525cd] leading-none">
                  {stats.resolutionRate}%
                </span>
                <span className="font-inter text-[12px] font-semibold text-[#464555] mt-1">
                  Success Rate
                </span>
              </div>
            </div>
          </div>

          {/* Monthly Reports Bar Chart */}
          <div className="bg-white border border-[#c7c4d8]/70 rounded-xl p-5 shadow-xs">
            <div className="flex justify-between items-center mb-3 border-b border-[#c7c4d8]/50 pb-2">
              <h3 className="font-inter text-[14px] font-bold text-[#131b2e]">Monthly Reports</h3>
              <span className="text-[11px] text-[#464555] font-semibold">2026 Year-to-date</span>
            </div>

            <div className="w-full h-44 flex items-end justify-between pt-6 px-2 gap-2">
              {stats.monthlyData.map((item, idx) => {
                const maxVal = 35;
                const heightPercent = (item.count / maxVal) * 100;
                const isHovered = hoveredBarIndex === idx;

                return (
                  <div
                    key={item.month}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                    onMouseEnter={() => setHoveredBarIndex(idx)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                  >
                    {/* Tooltip on hover */}
                    <div
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#131b2e] text-white mb-1 transition-opacity ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {item.count}
                    </div>

                    {/* Bar */}
                    <div
                      className={`w-full max-w-[28px] rounded-t-md transition-all duration-300 ${
                        isHovered
                          ? 'bg-[#4d44e3] scale-y-105'
                          : 'bg-[#3525cd]'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    ></div>

                    {/* Label */}
                    <span className="font-inter text-[11px] font-medium text-[#464555] mt-2">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Impact by Category Doughnut Chart */}
          <div className="bg-white border border-[#c7c4d8]/70 rounded-xl p-5 shadow-xs">
            <h3 className="font-inter text-[14px] font-bold text-[#131b2e] mb-3 border-b border-[#c7c4d8]/50 pb-2">
              Impact by Category
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* SVG Doughnut */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Potholes 45% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#3525cd"
                    strokeWidth="16"
                    strokeDasharray="107.5 238.8"
                    strokeDashoffset="0"
                  />
                  {/* Lighting 25% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#505f76"
                    strokeWidth="16"
                    strokeDasharray="59.7 238.8"
                    strokeDashoffset="-107.5"
                  />
                  {/* Graffiti 20% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#00505f"
                    strokeWidth="16"
                    strokeDasharray="47.8 238.8"
                    strokeDashoffset="-167.2"
                  />
                  {/* Other 10% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#c7c4d8"
                    strokeWidth="16"
                    strokeDasharray="23.9 238.8"
                    strokeDashoffset="-215"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-manrope text-[18px] font-bold text-[#131b2e]">100%</span>
                  <span className="font-inter text-[10px] text-[#464555]">Impact</span>
                </div>
              </div>

              {/* Legend with matching dots */}
              <div className="flex flex-col gap-2 font-inter text-[13px] text-[#464555]">
                {stats.categoryData.map((cat) => (
                  <div key={cat.category} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      ></span>
                      <span className="text-[#131b2e] font-medium">{cat.category}</span>
                    </div>
                    <span className="font-semibold">{cat.count}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
