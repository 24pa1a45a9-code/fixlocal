import React from 'react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-3 py-2 bg-[#faf8ff] border-t border-[#c7c4d8]/60 shadow-lg rounded-t-2xl">
      {/* Home */}
      <button
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all ${
          activeTab === 'home'
            ? 'bg-[#4f46e5] text-white shadow-sm scale-95'
            : 'text-[#464555] hover:bg-[#e2e7ff]/50'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[22px] ${
            activeTab === 'home' ? 'fill text-white' : 'text-[#464555]'
          }`}
        >
          home
        </span>
        <span className="font-inter text-[11px] font-semibold mt-0.5">Home</span>
      </button>

      {/* Map */}
      <button
        onClick={() => setActiveTab('map')}
        className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all ${
          activeTab === 'map'
            ? 'bg-[#4f46e5] text-white shadow-sm scale-95'
            : 'text-[#464555] hover:bg-[#e2e7ff]/50'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[22px] ${
            activeTab === 'map' ? 'fill text-white' : 'text-[#464555]'
          }`}
        >
          map
        </span>
        <span className="font-inter text-[11px] font-semibold mt-0.5">Map</span>
      </button>

      {/* Report */}
      <button
        onClick={() => setActiveTab('report')}
        className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all ${
          activeTab === 'report'
            ? 'bg-[#4f46e5] text-white shadow-sm scale-95'
            : 'text-[#464555] hover:bg-[#e2e7ff]/50'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[22px] ${
            activeTab === 'report' ? 'fill text-white' : 'text-[#464555]'
          }`}
        >
          add_circle
        </span>
        <span className="font-inter text-[11px] font-semibold mt-0.5">Report</span>
      </button>

      {/* Reports */}
      <button
        onClick={() => setActiveTab('reports')}
        className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all ${
          activeTab === 'reports'
            ? 'bg-[#4f46e5] text-white shadow-sm scale-95'
            : 'text-[#464555] hover:bg-[#e2e7ff]/50'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[22px] ${
            activeTab === 'reports' ? 'fill text-white' : 'text-[#464555]'
          }`}
        >
          assignment
        </span>
        <span className="font-inter text-[11px] font-semibold mt-0.5">Reports</span>
      </button>

      {/* Profile */}
      <button
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all ${
          activeTab === 'profile'
            ? 'bg-[#4f46e5] text-white shadow-sm scale-95'
            : 'text-[#464555] hover:bg-[#e2e7ff]/50'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[22px] ${
            activeTab === 'profile' ? 'fill text-white' : 'text-[#464555]'
          }`}
        >
          person
        </span>
        <span className="font-inter text-[11px] font-semibold mt-0.5">Profile</span>
      </button>
    </nav>
  );
};
