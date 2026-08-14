import React from 'react';
import { CivicIssue, UserStats } from '../types';

interface HomeViewProps {
  issues: CivicIssue[];
  stats: UserStats;
  onSelectIssue: (issue: CivicIssue) => void;
  onStartReport: () => void;
  onOpenMap: () => void;
  onViewAllReports: () => void;
  onConfirmIssue: (issueId: string, e: React.MouseEvent) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  issues,
  stats,
  onSelectIssue,
  onStartReport,
  onOpenMap,
  onViewAllReports,
  onConfirmIssue,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      {/* Welcome Section */}
      <section className="mb-6 md:mb-8">
        <h1 className="font-manrope text-[24px] md:text-[32px] font-bold text-[#131b2e] mb-1 flex items-center gap-2">
          Good morning <span className="inline-block hover:rotate-12 transition-transform cursor-default">👋</span>
        </h1>
        <p className="font-inter text-[14px] md:text-[16px] text-[#464555]">
          Here’s what’s happening around your neighborhood.
        </p>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        {/* Stat Card 1: My Reports */}
        <div className="bg-white border border-[#c7c4d8]/70 rounded-xl p-4 flex flex-col justify-center items-start shadow-xs hover:border-[#3525cd]/40 transition-colors">
          <span className="font-inter text-[12px] font-semibold text-[#464555] uppercase tracking-wider mb-1">
            My Reports
          </span>
          <span className="font-manrope text-[28px] md:text-[32px] font-bold text-[#3525cd]">
            {stats.myReports}
          </span>
        </div>

        {/* Stat Card 2: In Progress */}
        <div className="bg-white border border-[#c7c4d8]/70 rounded-xl p-4 flex flex-col justify-center items-start shadow-xs hover:border-[#00505f]/40 transition-colors">
          <span className="font-inter text-[12px] font-semibold text-[#464555] uppercase tracking-wider mb-1">
            In Progress
          </span>
          <span className="font-manrope text-[28px] md:text-[32px] font-bold text-[#00505f]">
            {stats.inProgress}
          </span>
        </div>

        {/* Stat Card 3: Resolved */}
        <div className="bg-white border border-[#c7c4d8]/70 rounded-xl p-4 flex flex-col justify-center items-start shadow-xs hover:border-[#3525cd]/40 transition-colors">
          <span className="font-inter text-[12px] font-semibold text-[#464555] uppercase tracking-wider mb-1">
            Resolved
          </span>
          <span className="font-manrope text-[28px] md:text-[32px] font-bold text-[#3525cd]">
            {stats.resolved}
          </span>
        </div>

        {/* Stat Card 4: Community Impact */}
        <div className="bg-white border border-[#c7c4d8]/70 rounded-xl p-4 flex flex-col justify-center items-start shadow-xs hover:border-[#505f76]/40 transition-colors">
          <span className="font-inter text-[12px] font-semibold text-[#464555] uppercase tracking-wider mb-1">
            Community Impact
          </span>
          <span className="font-manrope text-[28px] md:text-[32px] font-bold text-[#505f76]">
            {stats.communityImpact}
          </span>
        </div>
      </section>

      {/* Main Content Split: Left (Nearby Issues), Right (Area Overview & Quick Stats) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Left Column: Nearby Issues List */}
        <section className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4 border-b border-[#c7c4d8]/50 pb-2">
            <h2 className="font-manrope text-[20px] font-bold text-[#131b2e]">Nearby Issues</h2>
            <button
              onClick={onViewAllReports}
              className="font-inter text-[13px] font-semibold text-[#3525cd] flex items-center gap-1 hover:underline group"
            >
              View All{' '}
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {issues.slice(0, 4).map((issue) => (
              <article
                key={issue.id}
                onClick={() => onSelectIssue(issue)}
                className="bg-white border border-[#c7c4d8]/70 rounded-xl overflow-hidden hover:shadow-md hover:border-[#3525cd]/50 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Photo Thumbnail */}
                  <div className="sm:w-52 h-48 sm:h-auto shrink-0 relative bg-[#eaedff] overflow-hidden">
                    <img
                      src={issue.imageUrl}
                      alt={issue.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 sm:hidden">
                      <span className="bg-[#131b2e]/80 backdrop-blur-md text-white font-inter text-[11px] font-medium px-2 py-0.5 rounded-full">
                        {issue.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 md:p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-[#3525cd] text-[18px]">
                              {issue.category === 'Streetlights'
                                ? 'lightbulb'
                                : issue.category === 'Roads'
                                ? 'warning'
                                : issue.category === 'Water'
                                ? 'water_drop'
                                : 'report'}
                            </span>
                            <span className="font-inter text-[12px] font-bold text-[#3525cd] uppercase tracking-wide">
                              {issue.title.toUpperCase()}
                            </span>
                          </div>
                          <h3 className="font-manrope text-[16px] md:text-[17px] font-bold text-[#131b2e] line-clamp-1 group-hover:text-[#3525cd] transition-colors">
                            {issue.locationName}
                          </h3>
                        </div>

                        {/* Status Badge */}
                        <span
                          className={`font-inter text-[12px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap ${
                            issue.status === 'In Progress'
                              ? 'bg-[#006a7c]/10 text-[#00505f] border border-[#006a7c]/20'
                              : issue.status === 'Resolved'
                              ? 'bg-[#e2dfff] text-[#3525cd] border border-[#c3c0ff]'
                              : 'bg-[#eaedff] text-[#505f76] border border-[#c7c4d8]/60'
                          }`}
                        >
                          {issue.status}
                        </span>
                      </div>

                      {/* Distance & Time */}
                      <div className="flex items-center gap-4 text-[#464555] font-inter text-[13px] mb-4">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-[#505f76]">
                            location_on
                          </span>{' '}
                          {issue.distance}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-[#505f76]">
                            schedule
                          </span>{' '}
                          {issue.timeAgo}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer: Confirmations & View Action */}
                    <div className="border-t border-[#c7c4d8]/40 pt-3 mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#464555] font-inter text-[13px]">
                        <div className="flex -space-x-2 overflow-hidden">
                          <div className="w-6 h-6 rounded-full bg-[#eaedff] border border-white flex items-center justify-center text-[10px] text-[#3525cd] font-bold">
                            A
                          </div>
                          <div className="w-6 h-6 rounded-full bg-[#d0e1fb] border border-white flex items-center justify-center text-[10px] text-[#00505f] font-bold">
                            M
                          </div>
                          <div className="w-6 h-6 rounded-full bg-[#e2dfff] border border-white flex items-center justify-center text-[10px] text-[#505f76] font-bold">
                            E
                          </div>
                        </div>
                        <span className="font-medium">
                          {issue.confirmationsCount} people confirmed
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => onConfirmIssue(issue.id, e)}
                          className={`px-2.5 py-1 rounded-md text-[12px] font-semibold border transition-all ${
                            issue.userConfirmed
                              ? 'bg-[#3525cd] text-white border-[#3525cd]'
                              : 'bg-[#faf8ff] text-[#3525cd] border-[#c7c4d8] hover:bg-[#eaedff]'
                          }`}
                          title="Confirm this issue exists"
                        >
                          {issue.userConfirmed ? '✓ Confirmed' : '+ Confirm'}
                        </button>
                        <button className="text-[#3525cd] font-inter text-[13px] font-semibold hover:underline">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Right Column: Area Overview Map Card */}
        <aside className="flex flex-col gap-6">
          <div className="bg-white border border-[#c7c4d8]/70 rounded-xl overflow-hidden flex flex-col shadow-xs">
            <div className="p-3.5 border-b border-[#c7c4d8]/50 flex justify-between items-center bg-white z-10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#3525cd]">map</span>
                <span className="font-inter text-[14px] font-bold text-[#131b2e]">Area Overview</span>
              </div>
              <button
                onClick={onOpenMap}
                className="text-[#3525cd] hover:bg-[#eaedff] p-1.5 rounded-lg transition-colors flex items-center gap-1 text-[12px] font-semibold"
              >
                <span>Full Map</span>
                <span className="material-symbols-outlined text-[18px]">fullscreen</span>
              </button>
            </div>

            {/* Interactive Mini Map */}
            <div
              onClick={onOpenMap}
              className="h-64 md:h-80 relative bg-[#eaedff] cursor-pointer group overflow-hidden"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChxJS4s18hTtUY0UH8VO8Z_m4bEFopuPZX9V7HdYKmnY7O_NK2K5DM4SmwRsveqXgOKXm0RAPrq6DkPvF44O5JWfJFf9p6uxiGHxQiAK6JlfdN-oKlPfej1WnJ-miwRWOjaxbX4XMhE0cdQWgcKbqKHDIDBaXyZzNt9Wf-XNKIoCmnAQevCTaeJqGhGrUlfFshp-xm6J2v-NouBZBt74LXq_-xueaR4kDdjBOriFGj4QpwYwY3wejZ"
                alt="Area Map"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Simulated Map Markers with Pulse */}
              <div className="absolute top-[28%] left-[34%] bg-[#3525cd] text-white rounded-full p-1.5 shadow-md border-2 border-white transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
                <span className="material-symbols-outlined text-[16px] block">lightbulb</span>
              </div>

              <div className="absolute top-[52%] left-[68%] bg-[#00505f] text-white rounded-full p-1.5 shadow-md border-2 border-white transform -translate-x-1/2 -translate-y-1/2">
                <span className="material-symbols-outlined text-[16px] block">water_drop</span>
              </div>

              <div className="absolute bottom-[35%] left-[52%] bg-[#ba1a1a] text-white rounded-full p-1.5 shadow-md border-2 border-white transform -translate-x-1/2 -translate-y-1/2">
                <span className="material-symbols-outlined text-[16px] block">warning</span>
              </div>

              {/* Overlay Prompt */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md px-3 py-2 rounded-lg border border-[#c7c4d8]/60 flex items-center justify-between text-[12px] font-medium text-[#131b2e] shadow-sm">
                <span>📍 {issues.length} active issues in Springfield</span>
                <span className="text-[#3525cd] font-semibold flex items-center">
                  Explore <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Guide / Civic Tips */}
          <div className="bg-[#eaedff]/60 border border-[#c7c4d8]/60 rounded-xl p-4">
            <h4 className="font-manrope text-[15px] font-bold text-[#131b2e] mb-1.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#3525cd] text-[18px]">verified</span>
              How Community Verification Works
            </h4>
            <p className="font-inter text-[13px] text-[#464555] leading-relaxed">
              When 5 or more neighbors confirm an issue, municipal dispatch elevates it to Priority Queue for faster crew scheduling.
            </p>
          </div>
        </aside>
      </div>

      {/* Prominent Floating Action Button for "Report Issue" */}
      <button
        onClick={onStartReport}
        className="fixed bottom-20 md:bottom-8 right-4 md:right-8 bg-[#4f46e5] text-white hover:bg-[#3525cd] shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl p-4 flex items-center justify-center gap-2 z-40 active:scale-95 group"
      >
        <span className="material-symbols-outlined text-[24px] fill group-hover:rotate-90 transition-transform duration-300">
          add
        </span>
        <span className="font-inter text-[14px] font-semibold pr-2 tracking-wide">
          Report Issue
        </span>
      </button>
    </div>
  );
};
