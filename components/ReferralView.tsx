import React from 'react';
import { Share2, Copy, Users, Trophy, Sparkles, Megaphone, ArrowRight, Star, Globe } from 'lucide-react';
import { User } from '../types';

interface ReferralViewProps {
  user: User;
}

const ReferralView: React.FC<ReferralViewProps> = ({ user }) => {
  const referralLink = `https://adquest.app/join?ref=${user.referralCode}`;
  const copyToClipboard = () => { navigator.clipboard.writeText(referralLink); alert('Copied!'); };

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-700 pb-16">
      <div className="relative premium-gradient rounded-3xl p-8 lg:p-10 overflow-hidden shadow-2xl border border-white/20">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-5 text-center lg:text-left max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 text-[9px] font-black uppercase tracking-widest text-white">
              <Star size={12} className="text-yellow-400 fill-yellow-400" /> Passive Engine
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight tracking-tighter">Build Your <br/><span className="text-blue-200">Ad Empire.</span></h2>
            <p className="text-blue-100/70 text-base font-medium leading-relaxed">Earn <span className="text-white font-black">10% Lifetime Commission</span> on your network's yields.</p>
            <div className="pt-2 bg-slate-950/40 p-1.5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center gap-2">
               <div className="flex-1 px-4 py-2.5 bg-white/5 rounded-xl text-blue-200 font-mono text-[10px] truncate w-full">{referralLink}</div>
               <button onClick={copyToClipboard} className="h-10 px-6 bg-white text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-105 transition-all w-full sm:w-auto">Copy</button>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4 shrink-0">
             <GrowthStat icon={<Users size={14} className="text-blue-400" />} label="Size" value={user.referralsCount.toString()} trend="+3" />
             <GrowthStat icon={<Trophy size={14} className="text-yellow-400" />} label="Yield" value="1.2k" trend="+15%" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RefCard title="Compound Growth" desc="Scale exponentially. Lifetime multi-tier income streams." icon={<Sparkles size={18} className="text-yellow-500" />} />
        <RefCard title="High-Yield Tiers" desc="Unlock status for 15% bonuses on global ad traffic." icon={<Trophy size={18} className="text-blue-500" />} />
        <RefCard title="Instant Settle" desc="P2P rewards are settled real-time upon verification." icon={<Globe size={18} className="text-emerald-500" />} />
      </div>
    </div>
  );
};

const GrowthStat: React.FC<{ icon: React.ReactNode; label: string; value: string; trend: string }> = ({ icon, label, value, trend }) => (
  <div className="glass-card bg-slate-950/60 p-4 rounded-xl border-white/10 w-28">
    <div className="mb-1.5">{icon}</div>
    <p className="text-[7px] text-blue-200 font-black uppercase tracking-widest mb-0.5">{label}</p>
    <div className="flex items-baseline gap-1">
      <p className="text-lg font-black text-white tracking-tighter">{value}</p>
      <span className="text-emerald-400 text-[7px] font-black">{trend}</span>
    </div>
  </div>
);

const RefCard: React.FC<{ title: string; desc: string; icon: React.ReactNode }> = ({ title, desc, icon }) => (
  <div className="glass-card bg-white/5 border-white/5 p-6 rounded-2xl space-y-3 hover:bg-white/[0.08] transition-all">
    <div className="w-9 h-9 bg-slate-950 rounded-xl flex items-center justify-center border border-white/5 text-slate-400">{icon}</div>
    <h4 className="font-black text-white text-sm">{title}</h4>
    <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">"{desc}"</p>
    <button className="flex items-center gap-1 text-[8px] font-black text-blue-500 uppercase tracking-widest hover:translate-x-1 transition-transform pt-1">Learn <ArrowRight size={10} /></button>
  </div>
);

export default ReferralView;