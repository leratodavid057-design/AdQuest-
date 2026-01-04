
import { AdOffer, AdType, User, Transaction, PlatformMetrics } from "../types";

export const MOCK_USER: User = {
  id: 'user_123',
  username: 'QuestMaster99',
  email: 'quest@example.com',
  balance: 1250,
  xp: 450,
  level: 4,
  referralCode: 'ADQ-8821',
  referralsCount: 12,
  fraudScore: 5,
  isFlagged: false,
  totalEarned: 5800,
  joinedDate: '2023-10-01'
};

export const MOCK_OFFERS: AdOffer[] = [
  {
    id: 'off_admob_1',
    provider: 'AdMob (Google)',
    providerId: 'ADMOB',
    title: 'Clash Royale: Hero Quest',
    description: 'Experience the new arena with premium rewards.',
    rewardCoins: 150,
    cpm: 28.5,
    type: AdType.VIDEO,
    durationSeconds: 15,
    icon: '🏰',
    fillRate: 0.98,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-animation-of-a-futuristic-city-with-neon-lights-40143-large.mp4'
  },
  {
    id: 'off_unity_1',
    provider: 'Unity Ads',
    providerId: 'UNITY_ADS',
    title: 'Subway Surfers: Cyberpunk',
    description: 'Watch the trailer for exclusive in-game items.',
    rewardCoins: 120,
    cpm: 22.2,
    type: AdType.VIDEO,
    durationSeconds: 10,
    icon: '🏃',
    fillRate: 0.95,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-driving-in-a-futuristic-city-at-night-40144-large.mp4'
  },
  {
    id: 'off_applovin_1',
    provider: 'AppLovin MAX',
    providerId: 'APPLOVIN',
    title: 'Solitaire: Grand Harvest',
    description: 'Complete the tutorial to unlock vault access.',
    rewardCoins: 2800,
    cpm: 155.0,
    type: AdType.INSTALL,
    icon: '🃏',
    fillRate: 0.88
  },
  {
    id: 'off_ironsource_1',
    provider: 'IronSource',
    providerId: 'IRONSOURCE',
    title: 'Match 3: Masters Arena',
    description: 'Puzzle your way to crypto rewards.',
    rewardCoins: 90,
    cpm: 15.0,
    type: AdType.VIDEO,
    durationSeconds: 12,
    icon: '🧩',
    fillRate: 0.99,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-buildings-at-night-with-neon-lights-40145-large.mp4'
  },
  {
    id: 'off_admob_2',
    provider: 'AdMob (Google)',
    providerId: 'ADMOB',
    title: 'Coin Master: Viking Blitz',
    description: 'Join the raid and earn your daily chest.',
    rewardCoins: 180,
    cpm: 32.0,
    type: AdType.VIDEO,
    durationSeconds: 15,
    icon: '🐷',
    fillRate: 0.97,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-rotating-hologram-of-a-human-head-40140-large.mp4'
  },
  {
    id: 'off_pollfish_1',
    provider: 'Pollfish',
    providerId: 'POLLFISH',
    title: 'Global Tech Census 2025',
    description: 'High-yield 2-minute market research.',
    rewardCoins: 750,
    cpm: 85.0,
    type: AdType.SURVEY,
    icon: '📊',
    fillRate: 0.75
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx_1', userId: 'user_123', amount: 500, type: 'EARN', status: 'COMPLETED', timestamp: new Date().toISOString(), description: 'Unity Ads: Subway Surfers' },
  { id: 'tx_2', userId: 'user_123', amount: 50, type: 'EARN', status: 'COMPLETED', timestamp: new Date(Date.now() - 3600000).toISOString(), description: 'AdMob: Hero Quest' },
  { id: 'tx_3', userId: 'user_123', amount: 150, type: 'REFERRAL', status: 'COMPLETED', timestamp: new Date(Date.now() - 86400000).toISOString(), description: 'Network: Level 2 Bonus' },
  { id: 'tx_4', userId: 'user_123', amount: 1200, type: 'WITHDRAW', status: 'PENDING', timestamp: new Date(Date.now() - 172800000).toISOString(), description: 'Vault: External Transfer' }
];

export const MOCK_METRICS: PlatformMetrics = {
  totalRevenue: 452000,
  totalPayouts: 218500,
  activeUsers: 84200,
  averageCPM: 24.5,
  fraudRate: 1.2,
  roi: 2.07
};
