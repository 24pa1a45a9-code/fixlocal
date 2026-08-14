import React, { useState, useMemo } from 'react';
import { CivicIssue, IssueCategory, IssueStatus } from '../types';

interface ReportsListViewProps {
  issues: CivicIssue[];
  onSelectIssue: (issue: CivicIssue) => void;
  onStartReport: () => void;
  onConfirmIssue: (issueId: string, e: React.MouseEvent) => void;
}

export const ReportsListView: React.FC<ReportsListViewProps> = ({
  issues,
  onSelectIssue,
  onStartReport,
  onConfirmIssue,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'my' | 'in_progress' | 'resolved'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      // Tab filter
      if (filterTab === 'my' && !issue.isMyReport) return false;
      if (filterTab === 'in_progress' && issue.status !== 'In Progress') return false;
      if (filterTab === 'resolved' && issue.status !== 'Resolved') return false;

      // Category filter
      if (selectedCategory !== 'All' && issue.category !== selectedCategory) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          issue.title.toLowerCase().includes(q) ||
          issue.locationName.toLowerCase().includes(q) ||
          issue.address.toLowerCase().includes(q) ||
          issue.description.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [issues, filterTab, selectedCategory, searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="font-manrope text-[24px] md:text-[32px] font-bold text-[#131b2e] mb-1">
            Community Reports
          </h1>
          <p className="font-inter text-[14px] md:text-[16px] text-[#464555]">
            Browse, confirm, and monitor status updates across municipal work orders.
          </p>
        </div>

        <button
          onClick={onStartReport}
          className="bg-[#3525cd] hover:bg-[#4d44e3] text-white px-5 py-2.5 rounded-xl font-inter text-[14px] font-bold flex items-center gap-2 self-start sm:self-auto shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          New Report
        </button>
      </div>

      {/* Tabs & Search Controls */}
      <div className="flex flex-col gap-3 mb-6">
        {/* Status Filter Tabs */}
        <div className="flex gap-2 border-b border-[#c7c4d8]/50 pb-2 overflow-x-auto scrollbar-hide">
          {[
            { key: 'all', label: `All Reports (${issues.length})` },
            { key: 'my', label: `My Reports (${issues.filter((i) => i.isMyReport).length})` },
            {
              key: 'in_progress',
              label: `In Progress (${issues.filter((i) => i.status === 'In Progress').length})`,
            },
            {
              key: 'resolved',
              label: `Resolved (${issues.filter((i) => i.status === 'Resolved').length})`,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterTab(tab.key as any)}
              className={`px-4 py-2 rounded-lg font-inter text-[13px] font-semibold whitespace-nowrap transition-all ${
                filterTab === tab.key
                  ? 'bg-[#3525cd] text-white shadow-xs'
                  : 'text-[#464555] hover:bg-[#eaedff] hover:text-[#131b2e]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Category Filter Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 bg-white border border-[#c7c4d8] rounded-xl h-11 flex items-center px-3 shadow-xs">
            <span className="material-symbols-outlined text-[#464555] mr-2 text-[20px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports by keyword, address, or issue type..."
              className="w-full bg-transparent border-none outline-none font-inter text-[13px] text-[#131b2e] placeholder:text-[#777587]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#464555] hover:text-[#131b2e] p-1"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {['All', 'Streetlights', 'Roads', 'Water', 'Graffiti', 'Parks'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-inter text-[12px] font-medium whitespace-nowrap border transition-all ${
                  selectedCategory === cat
                    ? 'border-[#3525cd] bg-[#eaedff] text-[#3525cd] font-semibold'
                    : 'border-[#c7c4d8] bg-white text-[#464555] hover:bg-[#faf8ff]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      {filteredIssues.length === 0 ? (
        <div className="bg-white border border-[#c7c4d8]/70 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[#eaedff] text-[#3525cd] flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-[28px]">search_off</span>
          </div>
          <h3 className="font-manrope text-[18px] font-bold text-[#131b2e] mb-1">
            No matching civic reports found
          </h3>
          <p className="font-inter text-[14px] text-[#464555] max-w-sm mb-4">
            Try adjusting your search criteria or report a new issue in this neighborhood.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setFilterTab('all');
            }}
            className="text-[#3525cd] font-inter text-[13px] font-semibold hover:underline"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              onClick={() => onSelectIssue(issue)}
              className="bg-white border border-[#c7c4d8]/70 rounded-xl overflow-hidden hover:border-[#3525cd]/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 relative bg-[#eaedff] overflow-hidden">
                  <img
                    src={issue.imageUrl}
                    alt={issue.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-[#131b2e]/85 backdrop-blur-md text-white font-inter text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                      {issue.category}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={`font-inter text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-xs ${
                        issue.status === 'In Progress'
                          ? 'bg-[#00505f] text-white'
                          : issue.status === 'Resolved'
                          ? 'bg-[#3525cd] text-white'
                          : 'bg-white/95 text-[#131b2e] border border-[#c7c4d8]'
                      }`}
                    >
                      {issue.status}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#3525cd] mb-1">
                    <span>{issue.severity} Priority</span>
                    {issue.isMyReport && (
                      <span className="bg-[#eaedff] text-[#3525cd] px-1.5 py-0.2 rounded">
                        • My Report
                      </span>
                    )}
                  </div>
                  <h3 className="font-manrope text-[16px] font-bold text-[#131b2e] group-hover:text-[#3525cd] transition-colors line-clamp-1 mb-1">
                    {issue.title}
                  </h3>
                  <p className="font-inter text-[13px] text-[#464555] flex items-center gap-1 mb-2 line-clamp-1">
                    <span className="material-symbols-outlined text-[15px] text-[#505f76]">
                      location_on
                    </span>{' '}
                    {issue.address}
                  </p>
                  <p className="font-inter text-[12px] text-[#464555] line-clamp-2 leading-relaxed">
                    {issue.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-[#c7c4d8]/40 mt-2">
                <div className="flex items-center justify-between pt-2.5">
                  <span className="text-[12px] font-semibold text-[#00505f] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    {issue.confirmationsCount} confirmations
                  </span>

                  <button
                    onClick={(e) => onConfirmIssue(issue.id, e)}
                    className={`text-[12px] font-semibold px-2.5 py-1 rounded-md border transition-all ${
                      issue.userConfirmed
                        ? 'bg-[#3525cd] text-white border-[#3525cd]'
                        : 'bg-[#faf8ff] text-[#3525cd] border-[#c7c4d8] hover:bg-[#eaedff]'
                    }`}
                  >
                    {issue.userConfirmed ? '✓ Confirmed' : '+ Confirm'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
