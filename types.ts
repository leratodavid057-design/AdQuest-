
export enum AdType {
  VIDEO = 'VIDEO',
  INSTALL = 'INSTALL',
  SURVEY = 'SURVEY'
}

export type AdProvider = 'ADMOB' | 'UNITY_ADS' | 'APPLOVIN' | 'IRONSOURCE' | 'POLLFISH';

export interface AdOffer {
  id: string;
  provider: string;
  providerId: AdProvider;
  title: string;
  description: string;
  rewardCoins: number;
  cpm: number; // Cost Per Mille (Earnings for AdQuest)
  type: AdType;
  durationSeconds?: number;
  icon: string;
  fillRate: number; // Percentage likelihood of ad loading successfully
  videoUrl?: string; // Real video URL for playback
}

export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  xp: number;
  level: number;
  referralCode: string;
  referralsCount: number;
  fraudScore: number;
  isFlagged: boolean;
  totalEarned: number;
  joinedDate: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'EARN' | 'WITHDRAW' | 'REFERRAL';
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  timestamp: string;
  description: string;
}

export interface PlatformMetrics {
  totalRevenue: number;
  totalPayouts: number;
  activeUsers: number;
  averageCPM: number;
  fraudRate: number;
  roi: number;
}
