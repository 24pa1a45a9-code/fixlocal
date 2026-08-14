import React, { useState } from 'react';
import { CivicIssue } from '../types';

interface IssueDetailModalProps {
  issue: CivicIssue | null;
  onClose: () => void;
  onConfirmIssue: (issueId: string) => void;
  onAddComment: (issueId: string, text: string) => void;
}

export const IssueDetailModal: React.FC<IssueDetailModalProps> = ({
  issue,
  onClose,
  onConfirmIssue,
  onAddComment,
}) => {
  const [commentText, setCommentText] = useState('');

  if (!issue) return null;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(issue.id, commentText);
    setCommentText('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#131b2e]/50 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-[#c7c4d8] flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image */}
        <div className="relative h-56 sm:h-64 bg-[#eaedff] shrink-0">
          <img src={issue.imageUrl} alt={issue.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/80 via-transparent to-black/30"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {/* Top category badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-[#3525cd] text-white font-inter text-[12px] font-bold px-3 py-1 rounded-full shadow-sm">
              {issue.category}
            </span>
            <span
              className={`font-inter text-[12px] font-bold px-3 py-1 rounded-full shadow-sm ${
                issue.severity === 'High'
                  ? 'bg-[#ba1a1a] text-white'
                  : issue.severity === 'Medium'
                  ? 'bg-[#505f76] text-white'
                  : 'bg-[#00505f] text-white'
              }`}
            >
              {issue.severity} Priority
            </span>
          </div>

          {/* Title on banner */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h2 className="font-manrope text-[22px] sm:text-[26px] font-bold leading-tight">
              {issue.title}
            </h2>
            <p className="font-inter text-[13px] sm:text-[14px] text-white/90 flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              {issue.address}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-6">
          {/* Quick Confirmation Bar */}
          <div className="bg-[#eaedff]/60 border border-[#c3c0ff] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#006a7c] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <div>
                <h4 className="font-inter text-[14px] font-bold text-[#131b2e]">
                  {issue.confirmationsCount} Citizen Confirmations
                </h4>
                <p className="font-inter text-[12px] text-[#464555]">
                  High community verification raises dispatch priority.
                </p>
              </div>
            </div>

            <button
              onClick={() => onConfirmIssue(issue.id)}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-inter text-[13px] font-bold transition-all shadow-xs ${
                issue.userConfirmed
                  ? 'bg-[#3525cd] text-white'
                  : 'bg-white border border-[#3525cd] text-[#3525cd] hover:bg-[#eaedff]'
              }`}
            >
              {issue.userConfirmed ? '✓ You Confirmed This' : '+ Confirm This Issue'}
            </button>
          </div>

          {/* Issue Description */}
          <div>
            <h3 className="font-manrope text-[16px] font-bold text-[#131b2e] mb-2">Description</h3>
            <p className="font-inter text-[14px] text-[#464555] leading-relaxed bg-[#faf8ff] p-4 rounded-xl border border-[#c7c4d8]/50">
              {issue.description}
            </p>
          </div>

          {/* Department & AI Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white border border-[#c7c4d8]/70 p-3.5 rounded-xl">
              <span className="text-[11px] font-semibold text-[#464555] uppercase tracking-wider block mb-1">
                Assigned Agency
              </span>
              <span className="font-inter text-[13px] font-bold text-[#131b2e]">
                {issue.assignedDepartment || 'Dept. of Transportation & Public Works'}
              </span>
            </div>

            <div className="bg-white border border-[#c7c4d8]/70 p-3.5 rounded-xl">
              <span className="text-[11px] font-semibold text-[#464555] uppercase tracking-wider block mb-1">
                AI Vision Confidence
              </span>
              <span className="font-inter text-[13px] font-bold text-[#00505f] flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                {issue.aiConfidence || 94}% Automated Match
              </span>
            </div>
          </div>

          {/* Progress Timeline */}
          <div>
            <h3 className="font-manrope text-[16px] font-bold text-[#131b2e] mb-3">
              Resolution Progress
            </h3>
            <div className="border-l-2 border-[#3525cd]/30 ml-3 pl-4 flex flex-col gap-4">
              {issue.timeline.map((entry, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-[#3525cd] border-2 border-white ring-2 ring-[#eaedff]"></div>
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-[13px] font-bold text-[#131b2e]">
                      {entry.status}
                    </span>
                    <span className="font-inter text-[11px] text-[#464555]">{entry.date}</span>
                  </div>
                  <p className="font-inter text-[12px] text-[#464555] mt-0.5">{entry.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Citizen Comments & Updates */}
          <div>
            <h3 className="font-manrope text-[16px] font-bold text-[#131b2e] mb-3">
              Community Discussion ({issue.comments.length})
            </h3>

            {issue.comments.length > 0 ? (
              <div className="flex flex-col gap-3 mb-4">
                {issue.comments.map((c) => (
                  <div
                    key={c.id}
                    className={`p-3.5 rounded-xl border ${
                      c.isOfficial
                        ? 'bg-[#eaedff]/50 border-[#c3c0ff]'
                        : 'bg-white border-[#c7c4d8]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <img
                          src={c.avatar}
                          alt={c.author}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span
                          className={`font-inter text-[12px] font-bold ${
                            c.isOfficial ? 'text-[#3525cd]' : 'text-[#131b2e]'
                          }`}
                        >
                          {c.author}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#464555]">{c.time}</span>
                    </div>
                    <p className="font-inter text-[13px] text-[#464555] leading-relaxed pl-8">
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-inter text-[12px] text-[#777587] mb-4 italic">
                No community comments yet. Add the first update below.
              </p>
            )}

            {/* Add Comment Form */}
            <form onSubmit={handleSubmitComment} className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a message or update on this issue..."
                className="flex-1 h-11 px-3.5 bg-[#faf8ff] border border-[#c7c4d8] rounded-xl font-inter text-[13px] text-[#131b2e] outline-none focus:border-[#3525cd]"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="px-4 bg-[#3525cd] disabled:opacity-50 text-white rounded-xl font-inter text-[13px] font-bold hover:bg-[#4d44e3] transition-colors flex items-center gap-1"
              >
                <span>Send</span>
                <span className="material-symbols-outlined text-[16px]">send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#c7c4d8]/60 bg-[#faf8ff] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white border border-[#c7c4d8] font-inter text-[13px] font-semibold text-[#464555] hover:bg-[#eaedff]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
