import React from 'react';
import { NotificationItem } from '../types';

interface NotificationModalProps {
  notifications: NotificationItem[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onSelectNotification: (issueId?: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAllAsRead,
  onSelectNotification,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end p-4 md:p-6 bg-[#131b2e]/30 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#c7c4d8] overflow-hidden flex flex-col max-h-[85vh] animate-slide-up mt-12 md:mt-14"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-[#c7c4d8]/60 flex items-center justify-between bg-[#faf8ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#3525cd]">
              notifications
            </span>
            <h3 className="font-manrope text-[16px] font-bold text-[#131b2e]">Notifications</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-[12px] text-[#3525cd] font-semibold hover:underline"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="text-[#464555] hover:text-[#131b2e] p-1 rounded-md"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#c7c4d8]/40">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-[#464555] text-[13px]">
              No new notifications right now.
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.issueId) {
                    onSelectNotification(item.issueId);
                    onClose();
                  }
                }}
                className={`p-4 hover:bg-[#faf8ff] transition-colors cursor-pointer flex items-start gap-3 ${
                  !item.read ? 'bg-[#eaedff]/30' : ''
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    item.type === 'resolved'
                      ? 'bg-[#3525cd] text-white'
                      : item.type === 'status_change'
                      ? 'bg-[#006a7c] text-white'
                      : 'bg-[#d0e1fb] text-[#505f76]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {item.type === 'resolved'
                      ? 'celebration'
                      : item.type === 'status_change'
                      ? 'engineering'
                      : 'verified'}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="font-inter text-[13px] font-bold text-[#131b2e]">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-[#777587]">{item.time}</span>
                  </div>
                  <p className="font-inter text-[12px] text-[#464555] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
