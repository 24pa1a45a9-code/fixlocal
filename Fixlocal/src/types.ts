export type TabType = 'home' | 'map' | 'report' | 'reports' | 'profile';

export type IssueCategory =
  | 'Streetlights'
  | 'Roads'
  | 'Water'
  | 'Graffiti'
  | 'Parks'
  | 'Signage'
  | 'Other';

export type IssueStatus = 'Reported' | 'In Progress' | 'Resolved' | 'Scheduled';

export type IssueSeverity = 'Low' | 'Medium' | 'High';

export interface IssueComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
  isOfficial?: boolean;
}

export interface IssueTimelineEntry {
  status: IssueStatus | string;
  date: string;
  note: string;
}

export interface CivicIssue {
  id: string;
  title: string;
  category: IssueCategory;
  status: IssueStatus;
  severity: IssueSeverity;
  locationName: string;
  address: string;
  coordinates: {
    x: number; // percentage on map (0-100)
    y: number; // percentage on map (0-100)
    lat?: number;
    lng?: number;
  };
  distance: string;
  timeAgo: string;
  createdAt: string;
  imageUrl: string;
  description: string;
  confirmationsCount: number;
  userConfirmed: boolean;
  isMyReport: boolean;
  aiConfidence?: number;
  assignedDepartment?: string;
  timeline: IssueTimelineEntry[];
  comments: IssueComment[];
}

export interface UserStats {
  myReports: number;
  inProgress: number;
  resolved: number;
  communityImpact: number;
  topPercentile: number;
  reportsSubmitted: number;
  issuesResolved: number;
  communityConfirmations: number;
  areasImproved: number;
  resolutionRate: number;
  monthlyData: Array<{ month: string; count: number }>;
  categoryData: Array<{ category: string; count: number; color: string }>;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  issueId?: string;
  type: 'status_change' | 'confirmation' | 'resolved' | 'announcement';
}
