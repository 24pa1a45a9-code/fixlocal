/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, CivicIssue, UserStats, NotificationItem } from './types';
import { INITIAL_ISSUES, INITIAL_USER_STATS, INITIAL_NOTIFICATIONS } from './data/mockData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { MapView } from './components/MapView';
import { ReportIssueWizard } from './components/ReportIssueWizard';
import { ReportsListView } from './components/ReportsListView';
import { ProfileImpactView } from './components/ProfileImpactView';
import { IssueDetailModal } from './components/IssueDetailModal';
import { NotificationModal } from './components/NotificationModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [issues, setIssues] = useState<CivicIssue[]>(INITIAL_ISSUES);
  const [stats, setStats] = useState<UserStats>(INITIAL_USER_STATS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [selectedIssue, setSelectedIssue] = useState<CivicIssue | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [reportInitialCoords, setReportInitialCoords] = useState<{
    x: number;
    y: number;
    address?: string;
  } | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Confirm issue handler
  const handleConfirmIssue = (issueId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setIssues((prev) =>
      prev.map((item) => {
        if (item.id === issueId) {
          const nextConfirmed = !item.userConfirmed;
          const nextCount = nextConfirmed
            ? item.confirmationsCount + 1
            : Math.max(0, item.confirmationsCount - 1);

          showToast(
            nextConfirmed
              ? '✓ You confirmed this issue. Dispatch notified!'
              : 'Confirmation removed.'
          );

          // Update stats
          setStats((s) => ({
            ...s,
            communityConfirmations: nextConfirmed
              ? s.communityConfirmations + 1
              : Math.max(0, s.communityConfirmations - 1),
            communityImpact: nextConfirmed ? s.communityImpact + 1 : s.communityImpact,
          }));

          return {
            ...item,
            userConfirmed: nextConfirmed,
            confirmationsCount: nextCount,
          };
        }
        return item;
      })
    );

    // If modal is open on this issue, update selected issue state
    if (selectedIssue && selectedIssue.id === issueId) {
      setSelectedIssue((prev) => {
        if (!prev) return null;
        const nextConfirmed = !prev.userConfirmed;
        return {
          ...prev,
          userConfirmed: nextConfirmed,
          confirmationsCount: nextConfirmed
            ? prev.confirmationsCount + 1
            : Math.max(0, prev.confirmationsCount - 1),
        };
      });
    }
  };

  // Add comment handler
  const handleAddComment = (issueId: string, text: string) => {
    const newComment = {
      id: `comment-${Date.now()}`,
      author: 'Alex Springfield (You)',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBYH8zLYvI_25VQXEaXhuxuNsZO5aizCGwrSaIcJwMWhCODgUucOdNNaZ4o9w420iufN0JMqRRbPsyLQmsT69mRf-7xLFTOC4dPbVRQhifQS_c-jXk4JxPMkyqdGAhNAmspelBi3B_wx3lbPUvBnlcNsXUGnpgGf5TPrggR8KYybEasVBeFXzIcDrhKFwEvK39NXRRR_xikbJEgpcbUnQy39fQlquhZDVZz8HmQHWGb1ObAOYZG1l8E',
      text,
      time: 'Just now',
    };

    setIssues((prev) =>
      prev.map((item) => {
        if (item.id === issueId) {
          return {
            ...item,
            comments: [...item.comments, newComment],
          };
        }
        return item;
      })
    );

    if (selectedIssue && selectedIssue.id === issueId) {
      setSelectedIssue((prev) => (prev ? { ...prev, comments: [...prev.comments, newComment] } : null));
    }

    showToast('Comment posted to neighborhood log.');
  };

  // Create new issue handler
  const handleCreateIssue = (newIssue: CivicIssue) => {
    setIssues((prev) => [newIssue, ...prev]);

    // Update user stats
    setStats((s) => ({
      ...s,
      myReports: s.myReports + 1,
      reportsSubmitted: s.reportsSubmitted + 1,
      communityImpact: s.communityImpact + 1,
      monthlyData: s.monthlyData.map((m, idx) =>
        idx === s.monthlyData.length - 1 ? { ...m, count: m.count + 1 } : m
      ),
    }));

    // Add notification
    const newNotification: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Report Received by City Dispatch',
      description: `Your report for "${newIssue.title}" at ${newIssue.locationName} is being queued.`,
      time: 'Just now',
      read: false,
      issueId: newIssue.id,
      type: 'status_change',
    };
    setNotifications((prev) => [newNotification, ...prev]);

    showToast('🎉 Report submitted successfully!');
    setActiveTab('home');
    setReportInitialCoords(undefined);
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-inter selection:bg-[#3525cd]/15">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-[#131b2e] text-white font-inter text-[13px] font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-slide-up">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadNotificationsCount={unreadNotificationsCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setActiveTab('profile')}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full pb-20 md:pb-8">
        {activeTab === 'home' && (
          <HomeView
            issues={issues}
            stats={stats}
            onSelectIssue={(issue) => setSelectedIssue(issue)}
            onStartReport={() => setActiveTab('report')}
            onOpenMap={() => setActiveTab('map')}
            onViewAllReports={() => setActiveTab('reports')}
            onConfirmIssue={handleConfirmIssue}
          />
        )}

        {activeTab === 'map' && (
          <MapView
            issues={issues}
            onSelectIssue={(issue) => setSelectedIssue(issue)}
            onStartReport={(coords) => {
              setReportInitialCoords(coords);
              setActiveTab('report');
            }}
            onConfirmIssue={handleConfirmIssue}
          />
        )}

        {activeTab === 'report' && (
          <ReportIssueWizard
            initialCoords={reportInitialCoords}
            onCancel={() => {
              setActiveTab('home');
              setReportInitialCoords(undefined);
            }}
            onSubmit={handleCreateIssue}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsListView
            issues={issues}
            onSelectIssue={(issue) => setSelectedIssue(issue)}
            onStartReport={() => setActiveTab('report')}
            onConfirmIssue={handleConfirmIssue}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileImpactView
            stats={stats}
            onOpenReport={() => setActiveTab('report')}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <IssueDetailModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
          onConfirmIssue={(id) => handleConfirmIssue(id)}
          onAddComment={handleAddComment}
        />
      )}

      {/* Notification Center Modal */}
      <NotificationModal
        isOpen={isNotificationsOpen}
        notifications={notifications}
        onClose={() => setIsNotificationsOpen(false)}
        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
        onSelectNotification={(issueId) => {
          if (issueId) {
            const found = issues.find((i) => i.id === issueId);
            if (found) setSelectedIssue(found);
          }
        }}
      />
    </div>
  );
}
