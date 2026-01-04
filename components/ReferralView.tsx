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
    <div className="space-y-10 animate-in zoom-in-95 duration-700 pb-16">
      <div className="relative premium-gradient rounded-3xl p-10 lg:p-14 overflow-hidden shadow-2xl border border-white/20">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-6 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 text-[9px] font-black uppercase tracking-widest text-white">
              <Star size={12} className="text-yellow-400 fill-yellow-400" /> Passive Engine
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tighter">Build Your <br/><span className="text-blue-200">Ad Empire.</span></h2>
            <p className="text-blue-100/70 text-base md:text-lg font-medium leading-relaxed">Earn <span className="text-white font-black">10% Lifetime Commission</span> on your network's yields. No caps.</p>
            <div className="pt-4 space-y-3">
               <div className="bg-slate-950/40 p-2 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center gap-2">
                  <div className="flex-1 px-4 py-3 bg-white/5 rounded-xl text-blue-200 font-mono text-xs truncate w-full">{referralLink}</div>
                  <button onClick={copyToClipboard} className="h-12 px-8 bg-white text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-105 transition-all w-full sm:w-auto">Copy</button>
               </div>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4 shrink-0">
             <GrowthStat icon={<Users size={16} className="text-blue-400" />} label="Size" value={user.referralsCount.toString()} trend="+3" />
             <GrowthStat icon={<Trophy size={16} className="text-yellow-400" />} label="Rewards" value="1.2k" trend="+15%" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RefCard title="Compound Growth" desc="Your network scales exponentially. Multi-tier income stream." icon={<Sparkles size={20} className="text-yellow-500" />} />
        <RefCard title="High-Yield Tiers" desc="Unlock Diamond status for 15% bonuses on ad views." icon={<Trophy size={20} className="text-blue-500" />} />
        <RefCard title="Instant Settle" desc="Rewards are settled millisecond offers are finished." icon={<Globe size={20} className="text-emerald-500" />} />
      </div>
    </div>
  );
};

const GrowthStat: React.FC<{ icon: React.ReactNode; label: string; value: string; trend: string }> = ({ icon, label, value, trend }) => (
  <div className="glass-card bg-slate-950/60 p-5 rounded-2xl border-white/10 w-32">
    <div className="mb-2">{icon}</div>
    <p className="text-[8px] text-blue-200 font-black uppercase tracking-widest mb-0.5">{label}</p>
    <div className="flex items-baseline gap-1">
      <p className="text-xl font-black text-white tracking-tighter">{value}</p>
      <span className="text-emerald-400 text-[8px] font-black">{trend}</span>
    </div>
  </div>
);

const RefCard: React.FC<{ title: string; desc: string; icon: React.ReactNode }> = ({ title, desc, icon }) => (
  <div className="glass-card bg-white/5 border-white/5 p-8 rounded-2xl space-y-3 hover:bg-white/[0.08] transition-all">
    <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center border border-white/5 text-slate-400">{icon}</div>
    <h4 className="font-black text-white text-base">{title}</h4>
    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{desc}</p>
    <button className="flex items-center gap-1.5 text-[9px] font-black text-blue-500 uppercase tracking-widest hover:translate-x-1 transition-transform pt-1">Learn <ArrowRight size={12} /></button>
  </div>
);

export default ReferralView;