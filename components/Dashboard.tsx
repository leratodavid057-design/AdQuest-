
import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { 
  Zap, 
  Loader2, 
  TrendingUp, 
  ArrowRight, 
  Cpu,
  Terminal,
  Activity,
  PlayCircle,
  VideoOff,
  RefreshCw,
  Globe,
  Database,
  BarChart3,
  Sparkles,
  Link2,
  VolumeX,
  Volume2
} from 'lucide-react';
import { AdOffer, AdType, User, Transaction } from '../types';
import { MOCK_OFFERS } from '../services/mockDataService';
import { optimizeAdMediation, getAIEarningsAdvice } from '../services/geminiService';

const AdPlayer: React.FC<{
  offer: AdOffer;
  onComplete: (offer: AdOffer) => void;
}> = ({ offer, onComplete }) => {
  const [status, setStatus] = useState<string>('Initializing...');
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [useSimulation, setUseSimulation] = useState(offer.type !== AdType.VIDEO || !offer.videoUrl);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<number | null>(null);

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 4));
  }, []);

  const startSimulation = useCallback((forced: boolean = false) => {
    if (forced) {
      addLog(`[Failover] Proxy tunnel active. Verification sequence...`);
      setUseSimulation(true);
    }
    
    setIsVideoLoading(false);
    const duration = 6000;
    const step = 60;
    let elapsed = 0;
    
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    
    intervalRef.current = window.setInterval(() => {
      elapsed += step;
      const p = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(p);
      
      if (p === 10) addLog(`[Core] Session authenticated (0x8F2).`);
      if (p === 35) addLog(`[Neural] Syncing engagement telemetry...`);
      if (p === 65) addLog(`[AI] Validating clickstream ROI...`);
      if (p === 85) addLog(`[Reward] Confirming ledger settlement.`);
      
      if (p < 25) setStatus(`Syncing Link...`);
      else if (p < 50) setStatus(`Analyzing Feed...`);
      else if (p < 85) setStatus(`Verifying ROI...`);
      else setStatus(`Settling Vault...`);
      
      if (elapsed >= duration) {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        onComplete(offer);
      }
    }, step);
  }, [offer, addLog, onComplete]);

  useEffect(() => {
    addLog(`[System] Initializing session for ${offer.providerId}...`);
    if (useSimulation) startSimulation();
    else addLog(`[Stream] Handshaking with edge nodes...`);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [offer, addLog, useSimulation, startSimulation]);

  const handleVideoProgress = () => {
    if (videoRef.current && !useSimulation) {
      const p = Math.floor((videoRef.current.currentTime / videoRef.current.duration) * 100);
      setProgress(p);
      if (p < 20) setStatus('Buffer Handshake...');
      else if (p < 80) setStatus('Streaming Asset...');
      else setStatus('Audit Active...');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-3xl flex items-center justify-center p-4 lg:p-8 animate-in fade-in duration-500 overflow-hidden">
      <div className="w-full max-w-3xl bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
        <div className="p-4 md:p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-2xl border border-white/5 shadow-inner relative">
                {offer.icon}
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
             </div>
             <div>
                <h3 className="font-black text-white text-base tracking-tight mb-0.5">{offer.title}</h3>
                <div className="flex items-center gap-1.5">
                  <Link2 size={10} className="text-blue-400" />
                  <p className="text-[8px] text-blue-300 font-black uppercase tracking-[0.2em]">
                    {offer.providerId} {!useSimulation ? 'CDN_LIVE' : 'VIRTUAL_AUCTION'}
                  </p>
                </div>
             </div>
           </div>
           <div className="text-right">
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-0.5">Integrity</span>
              <div className="text-xl font-black text-white tracking-tighter">{progress}%</div>
           </div>
        </div>
        
        <div className="aspect-video bg-black flex items-center justify-center relative overflow-hidden">
           {!useSimulation && offer.videoUrl ? (
             <>
               <video 
                ref={videoRef} 
                src={offer.videoUrl} 
                autoPlay 
                muted={isMuted}
                playsInline
                onTimeUpdate={handleVideoProgress}
                onEnded={() => onComplete(offer)}
                onCanPlay={() => setIsVideoLoading(false)}
                className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoading ? 'opacity-20' : 'opacity-100'}`}
               />
               <button onClick={() => setIsMuted(!isMuted)} className="absolute top-4 right-4 z-40 p-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl text-white">
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
               </button>
             </>
           ) : (
             <div className="w-full h-full flex flex-col items-center justify-center space-y-6 px-6 relative">
               <div className="w-24 h-24 bg-slate-950/80 rounded-2xl flex items-center justify-center text-4xl border border-white/10 relative z-10">
                  <span className="animate-pulse">{offer.icon}</span>
               </div>
               <div className="text-center space-y-2 relative z-10">
                 <h4 className="text-white font-black text-2xl uppercase tracking-tighter italic">{status}</h4>
                 <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em]">Neural Verification Active</p>
               </div>
               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-sm animate-scan z-20"></div>
             </div>
           )}

           <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-xl p-4 h-20 flex flex-col-reverse font-mono text-[8px] shadow-3xl overflow-hidden z-30">
              {logs.map((log, i) => (
                <div key={i} className={`py-0.5 flex items-center gap-2 ${i === 0 ? 'text-blue-400' : 'text-slate-600'}`}>
                  <Terminal size={8} className={i === 0 ? 'animate-pulse' : ''} />
                  <span>{log}</span>
                </div>
              ))}
           </div>

           <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/5 z-40 overflow-hidden">
              <div 
                className="h-full bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,1)] transition-all duration-300 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
           </div>
        </div>

        <div className="p-4 md:p-6 flex items-center justify-between bg-slate-950/90 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/10 rounded-lg border border-blue-500/20 shadow-inner">
               <Activity className="w-5 h-5 text-blue-500" />
            </div>
            <div>
               <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Vault Status</p>
               <p className="text-xs font-black text-white tracking-tight">Session 0x{offer.rewardCoins.toString(16)}E</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <div className="text-right">
              <span className="text-[7px] font-black text-yellow-500 uppercase tracking-widest block">Auction Payout</span>
              <span className="text-xl font-black text-white tracking-tighter">+{offer.rewardCoins}</span>
            </div>
            <Zap className="w-6 h-6 text-yellow-500 fill-yellow-500" />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scan { 0% { top: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        .animate-scan { animation: scan 4s linear infinite; }
      `}</style>
    </div>
  );
};

const OfferCard = memo(({ offer, onLaunch }: { offer: AdOffer, onLaunch: (o: AdOffer) => void }) => (
  <div className="glass-card rounded-2xl p-6 flex flex-col h-full hover:-translate-y-1.5 transition-all duration-500 group border-white/5 hover:border-blue-500/30 shadow-lg">
    <div className="flex items-start gap-4 mb-6">
      <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-3xl group-hover:scale-105 transition-transform shadow-inner border border-white/5 shrink-0">
        <span className="relative z-10">{offer.icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
           <p className="text-[7px] font-black text-blue-400 uppercase tracking-widest">{offer.providerId}</p>
           <div className="w-0.5 h-0.5 rounded-full bg-slate-700"></div>
           <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">{offer.type}</p>
        </div>
        <h4 className="font-black text-white text-base tracking-tight leading-tight mb-1.5 group-hover:text-blue-200 truncate">{offer.title}</h4>
        <div className="flex items-center gap-1.5">
           <div className="px-1.5 py-0.5 bg-white/5 rounded-md border border-white/5 flex items-center gap-1">
              <RefreshCw size={7} className="text-emerald-500" />
              <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">{(offer.fillRate * 100).toFixed(0)}% Fill</span>
           </div>
           {offer.type === AdType.VIDEO && (
             <div className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-600/10 rounded-md border border-blue-500/20">
                <PlayCircle size={7} className="text-blue-500" />
                <span className="text-[7px] font-black text-blue-400 uppercase tracking-widest">Premium</span>
             </div>
           )}
        </div>
      </div>
    </div>
    <p className="text-slate-400 text-[11px] font-medium mb-6 line-clamp-2 opacity-80 leading-relaxed italic border-l border-white/10 pl-2.5">"{offer.description}"</p>
    
    <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
      <div className="flex flex-col">
         <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Bounty</span>
         <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-white font-black text-lg tracking-tighter">+{offer.rewardCoins}</span>
         </div>
      </div>
      <button 
        type="button"
        onClick={() => onLaunch(offer)}
        className="h-10 px-5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-black text-[9px] uppercase tracking-widest transition-all shadow-lg shadow-blue-600/10 active:scale-95 flex items-center gap-1.5"
      >
        <span>Launch</span>
        <ArrowRight size={12} />
      </button>
    </div>
  </div>
));

interface DashboardProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  onNotify: (msg: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setUser, setTransactions, onNotify }) => {
  const [offers, setOffers] = useState<AdOffer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<AdOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeOffer, setActiveOffer] = useState<AdOffer | null>(null);
  const [selectedType, setSelectedType] = useState<AdType | 'ALL'>('ALL');
  const [aiInsight, setAiInsight] = useState<string>("Analyzing local market conditions...");
  const initialFetchDone = useRef(false);

  useEffect(() => {
    if (initialFetchDone.current) return;
    
    const fetchOptimizedAds = async () => {
      setLoading(true);
      try {
        const optimized = await optimizeAdMediation(MOCK_OFFERS);
        setOffers(optimized);
        const insight = await getAIEarningsAdvice(user);
        setAiInsight(insight);
      } finally {
        setLoading(false);
        initialFetchDone.current = true;
      }
    };
    fetchOptimizedAds();
  }, [user]);

  useEffect(() => {
    let result = [...offers];
    if (selectedType !== 'ALL') result = result.filter(o => o.type === selectedType);
    setFilteredOffers(result);
  }, [offers, selectedType]);

  const handleCompleteOffer = useCallback((offer: AdOffer) => {
    const xpReward = 50;
    setUser(prev => {
      const newXp = prev.xp + xpReward;
      const newLevel = Math.floor(newXp / 1000) + 1;
      onNotify(newLevel > prev.level ? `PROMOTED: Reached Level ${newLevel}!` : `SETTLEMENT: +${offer.rewardCoins} Coins.`);
      return { ...prev, balance: prev.balance + offer.rewardCoins, totalEarned: prev.totalEarned + offer.rewardCoins, xp: newXp, level: newLevel };
    });
    setTransactions(prev => [{
      id: `tx_${offer.providerId.toLowerCase()}_${Date.now()}`,
      userId: user.id, amount: offer.rewardCoins, type: 'EARN', status: 'COMPLETED', timestamp: new Date().toISOString(), description: `${offer.provider}: ${offer.title}`
    }, ...prev]);
    setActiveOffer(null);
  }, [user.id, setUser, setTransactions, onNotify]);

  return (
    <div className="space-y-8 animate-in fade-in duration-1000 pb-16">
      <div className="bg-slate-900/60 border border-white/10 rounded-xl px-5 py-3 flex items-center justify-between overflow-hidden shadow-lg backdrop-blur-2xl">
        <div className="flex items-center gap-10 whitespace-nowrap animate-marquee">
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2.5">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
             Node-0x82A: STABLE
           </span>
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2.5">
             <TrendingUp size={12} className="text-blue-500" />
             CPM Peak: $44.80
           </span>
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2.5">
             <Globe size={12} className="text-purple-500" />
             Latency: 42ms
           </span>
        </div>
      </div>

      <div className="premium-gradient rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl border border-white/20 relative overflow-hidden group">
        <div className="text-center lg:text-left space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-white/10 rounded-lg border border-white/20 backdrop-blur-2xl">
            <Cpu size={14} className="text-blue-200" />
            <span className="text-[9px] font-black uppercase tracking-widest text-white">Neural Auctioneer v4.2</span>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter">
              Yield <br/><span className="text-blue-200 italic">Unlimited.</span>
            </h2>
            <p className="text-blue-100/70 text-base font-medium max-w-md mx-auto lg:mx-0">
              Programmatic auctions optimized by Gemini. <br className="hidden md:block"/> Real-time liquidity, zero friction.
            </p>
          </div>
        </div>
        
        <div className="bg-slate-950/40 backdrop-blur-3xl p-8 md:p-10 rounded-3xl border border-white/10 text-center shadow-xl min-w-[280px] relative z-10">
            <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-6 opacity-60">Vault Ledger</p>
            <div className="flex items-baseline justify-center gap-4">
              <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter">{user.balance.toLocaleString()}</h3>
              <Zap className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            </div>
            <div className="mt-8 space-y-3">
              <div className="flex items-center justify-center gap-4 text-[9px] font-black text-white/40 uppercase tracking-widest italic">
                 <div className="h-px w-6 bg-white/10"></div>
                 Session Vault
                 <div className="h-px w-6 bg-white/10"></div>
              </div>
              <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">+{(user.totalEarned * 0.05).toFixed(0)} Yield Bonus</p>
            </div>
        </div>
      </div>

      <div className="glass-card bg-blue-600/10 border-blue-500/20 rounded-2xl p-6 flex items-center gap-6 shadow-xl relative overflow-hidden">
         <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shrink-0">
            <Sparkles className="text-white" size={24} />
         </div>
         <div className="space-y-1.5 text-left relative z-10">
            <h4 className="text-sm font-black text-white uppercase tracking-tight">Gemini Live Insight</h4>
            <p className="text-blue-200 font-medium text-sm leading-snug italic">"{aiInsight}"</p>
         </div>
      </div>

      <div className="space-y-8 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
           <div className="space-y-1.5">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-blue-600/10 rounded-lg border border-blue-500/20">
                 <BarChart3 className="text-blue-500" size={20} />
               </div>
               <h3 className="text-2xl font-black text-white tracking-tighter">Inventory Pipeline</h3>
             </div>
             <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest ml-12 italic">Programmatic bidding stream...</p>
           </div>
           
           <div className="flex bg-slate-900/80 backdrop-blur-3xl p-1 rounded-2xl border border-white/5 shadow-xl">
              {['ALL', AdType.VIDEO, AdType.INSTALL, AdType.SURVEY].map(t => (
                <button key={t} onClick={() => setSelectedType(t as any)} className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedType === t ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500'}`}>{t}</button>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-32 flex flex-col items-center gap-6">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
              <p className="text-white font-black tracking-widest text-[9px] uppercase">Mediating Bids...</p>
            </div>
          ) : filteredOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} onLaunch={setActiveOffer} />
          ))}
        </div>
      </div>
      {activeOffer && <AdPlayer offer={activeOffer} onComplete={handleCompleteOffer} />}
    </div>
  );
};

export default Dashboard;
