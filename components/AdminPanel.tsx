
import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShieldAlert, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  AlertTriangle,
  Search,
  Zap,
  Cpu,
  ChevronRight
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from 'recharts';
import { MOCK_METRICS } from '../services/mockDataService';

const chartData = [
  { name: 'Mon', rev: 4200, pay: 2100 },
  { name: 'Tue', rev: 5500, pay: 2800 },
  { name: 'Wed', rev: 4800, pay: 3100 },
  { name: 'Thu', rev: 7200, pay: 3400 },
  { name: 'Fri', rev: 6900, pay: 2900 },
  { name: 'Sat', rev: 8400, pay: 4200 },
  { name: 'Sun', rev: 9200, pay: 4100 },
];

const AdminPanel: React.FC = () => {
  const [metrics] = useState(MOCK_METRICS);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
         <div className="relative max-w-sm w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Query User ID..." 
              className="w-full h-11 bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-blue-500 text-white"
            />
         </div>
         <div className="flex items-center gap-2">
            <button className="h-11 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">Report</button>
            <button className="h-11 w-11 flex items-center justify-center bg-white/5 border border-white/5 rounded-xl text-slate-400"><Filter size={18} /></button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ExecMetricCard label="Revenue" value={`$${(metrics.totalRevenue / 1000).toFixed(1)}k`} change="+12.5%" positive theme="emerald" />
        <ExecMetricCard label="Payouts" value={`$${(metrics.totalPayouts / 1000).toFixed(1)}k`} change="+8.2%" positive={false} theme="blue" />
        <ExecMetricCard label="Reach" value={metrics.activeUsers.toLocaleString()} change="+5.1%" positive theme="purple" />
        <ExecMetricCard label="Integrity" value={`${(100 - metrics.fraudRate).toFixed(1)}%`} change="-0.4%" positive theme="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 glass-card rounded-2xl p-6 md:p-8 bg-slate-900/40 min-h-[400px] min-w-0">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Activity className="text-blue-500" size={20} /> Dynamics
            </h3>
            <div className="flex gap-4 text-[8px] font-black uppercase tracking-widest text-slate-500">
               <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Revenue</span>
               <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500"></div> Payouts</span>
            </div>
          </div>
          {/* Fix: Added min-height and min-width to prevent Recharts -1 warning */}
          <div className="h-64 w-full min-h-[256px] min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs><linearGradient id="cRev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '10px' }}
                  itemStyle={{ padding: '2px 0' }}
                />
                <Area type="monotone" dataKey="rev" stroke="#3b82f6" fill="url(#cRev)" strokeWidth={3} animationDuration={1000} />
                <Area type="monotone" dataKey="pay" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" animationDuration={1000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6 min-w-0">
           <div className="glass-card rounded-2xl p-6 bg-white/5 border-white/5">
              <h3 className="font-black text-white text-sm mb-6 flex items-center justify-between">Alerts <ShieldAlert size={14} className="text-red-500" /></h3>
              <div className="space-y-3">
                 <AdminFraudItem user="user_8812" reason="Multi-acc" severity="high" />
                 <AdminFraudItem user="user_2193" reason="Location spoof" severity="medium" />
              </div>
           </div>
           <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 space-y-3">
              <Cpu className="text-blue-500" size={20} />
              <h4 className="font-black text-white text-sm">AI Advice</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed italic">Swap AdMob priority in APAC for higher yields.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

const ExecMetricCard: React.FC<{ label: string; value: string; change: string; positive: boolean; theme: string }> = ({ label, value, change, positive, theme }) => (
  <div className="glass-card rounded-2xl p-6 bg-white/5 border-white/5 group hover:bg-white/[0.08] transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2.5 rounded-lg border text-xs ${theme === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : theme === 'blue' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' : 'bg-purple-500/10 border-purple-500/20 text-purple-500'}`}>
        <BarChart3 size={14} />
      </div>
      <div className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${positive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>{change}</div>
    </div>
    <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-2xl font-black text-white tracking-tighter">{value}</h3>
  </div>
);

const AdminFraudItem: React.FC<{ user: string; reason: string; severity: string }> = ({ user, reason, severity }) => (
  <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-white/5">
     <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${severity === 'high' ? 'bg-red-500/20 text-red-500' : 'bg-amber-500/20 text-amber-500'}`}><AlertTriangle size={14} /></div>
        <div className="min-w-0">
           <p className="text-xs font-black text-white truncate">{user}</p>
           <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest truncate">{reason}</p>
        </div>
     </div>
     <ChevronRight size={14} className="text-slate-700" />
  </div>
);

export default AdminPanel;
