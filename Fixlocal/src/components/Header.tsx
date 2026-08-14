import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenProfile,
}) => {
  return (
    <>
      {/* Desktop TopAppBar */}
      <header className="hidden md:flex bg-[#faf8ff] border-b border-[#c7c4d8]/60 justify-between items-center px-6 h-16 w-full z-40 sticky top-0 backdrop-blur-md bg-[#faf8ff]/95">
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => setActiveTab('home')}
        >
          <div className="w-9 h-9 rounded-xl bg-[#3525cd] text-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[22px]">location_city</span>
          </div>
          <span className="font-manrope text-[22px] font-bold tracking-tight text-[#3525cd]">
            FixLocal
          </span>
          <span className="text-[11px] font-semibold bg-[#eaedff] text-[#3525cd] px-2 py-0.5 rounded-full border border-[#c3c0ff]">
            Springfield
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('home')}
            className={`font-inter text-[14px] font-medium px-4 py-2 rounded-lg transition-all ${
              activeTab === 'home'
                ? 'text-[#3525cd] bg-[#eaedff] font-semibold shadow-xs'
                : 'text-[#464555] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`font-inter text-[14px] font-medium px-4 py-2 rounded-lg transition-all ${
              activeTab === 'map'
                ? 'text-[#3525cd] bg-[#eaedff] font-semibold shadow-xs'
                : 'text-[#464555] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
            }`}
          >
            Map
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`font-inter text-[14px] font-medium px-4 py-2 rounded-lg transition-all ${
              activeTab === 'report'
                ? 'text-[#3525cd] bg-[#eaedff] font-semibold shadow-xs'
                : 'text-[#464555] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
            }`}
          >
            Report
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`font-inter text-[14px] font-medium px-4 py-2 rounded-lg transition-all ${
              activeTab === 'reports'
                ? 'text-[#3525cd] bg-[#eaedff] font-semibold shadow-xs'
                : 'text-[#464555] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
            }`}
          >
            Reports
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`font-inter text-[14px] font-medium px-4 py-2 rounded-lg transition-all ${
              activeTab === 'profile'
                ? 'text-[#3525cd] bg-[#eaedff] font-semibold shadow-xs'
                : 'text-[#464555] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
            }`}
          >
            Your Impact
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNotifications}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#464555] hover:bg-[#f2f3ff] hover:text-[#131b2e] transition-colors relative"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-[#faf8ff] animate-pulse"></span>
            )}
          </button>

          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full hover:bg-[#f2f3ff] border border-[#c7c4d8]/50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#d0e1fb] overflow-hidden border border-[#b7c8e1]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYH8zLYvI_25VQXEaXhuxuNsZO5aizCGwrSaIcJwMWhCODgUucOdNNaZ4o9w420iufN0JMqRRbPsyLQmsT69mRf-7xLFTOC4dPbVRQhifQS_c-jXk4JxPMkyqdGAhNAmspelBi3B_wx3lbPUvBnlcNsXUGnpgGf5TPrggR8KYybEasVBeFXzIcDrhKFwEvK39NXRRR_xikbJEgpcbUnQy39fQlquhZDVZz8HmQHWGb1ObAOYZG1l8E"
                alt="Alex Springfield"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-[13px] font-semibold leading-tight text-[#131b2e]">Alex S.</p>
              <p className="text-[11px] text-[#00505f] font-medium leading-tight">Top 5% Civic</p>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-md border-b border-[#c7c4d8]/40 px-4 h-16 flex items-center justify-between w-full">
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => setActiveTab('home')}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#c7c4d8]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYH8zLYvI_25VQXEaXhuxuNsZO5aizCGwrSaIcJwMWhCODgUucOdNNaZ4o9w420iufN0JMqRRbPsyLQmsT69mRf-7xLFTOC4dPbVRQhifQS_c-jXk4JxPMkyqdGAhNAmspelBi3B_wx3lbPUvBnlcNsXUGnpgGf5TPrggR8KYybEasVBeFXzIcDrhKFwEvK39NXRRR_xikbJEgpcbUnQy39fQlquhZDVZz8HmQHWGb1ObAOYZG1l8E"
              alt="Alex"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-manrope text-[20px] text-[#3525cd] font-bold">FixLocal</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onOpenNotifications}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#464555] active:bg-[#eaedff] relative"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
            )}
          </button>
        </div>
      </header>
    </>
  );
};
