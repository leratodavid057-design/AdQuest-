
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
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
         <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Query User ID or Transaction..." 
              className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600"
            />
         </div>
         <div className="flex items-center gap-3">
            <button type="button" className="h-14 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20">
               Generate Report
            </button>
            <button type="button" className="h-14 w-14 flex items-center justify-center bg-white/5 border border-white/5 rounded-2xl text-slate-400 hover:text-white transition-all">
               <Filter size={20} />
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ExecMetricCard label="Net Revenue" value={`$${(metrics.totalRevenue / 1000).toFixed(1)}k`} change="+12.5%" positive icon={<TrendingUp className="text-emerald-500" />} theme="emerald" />
        <ExecMetricCard label="Total Payouts" value={`$${(metrics.totalPayouts / 1000).toFixed(1)}k`} change="+8.2%" positive={false} icon={<BarChart3 className="text-blue-500" />} theme="blue" />
        <ExecMetricCard label="Active Reach" value={metrics.activeUsers.toLocaleString()} change="+5.1%" positive icon={<Users className="text-purple-500" />} theme="purple" />
        <ExecMetricCard label="Integrity Score" value={`${(100 - metrics.fraudRate).toFixed(1)}%`} change="-0.4%" positive icon={<ShieldAlert className="text-red-500" />} theme="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 glass-card rounded-[3rem] p-10 border-white/5 bg-slate-900/40 min-h-[500px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                <Activity className="text-blue-500" size={24} />
                Financial Dynamics
              </h3>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Payout Analysis</p>
            </div>
            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest">
               <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                 <span className="text-slate-300">Revenue</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                 <span className="text-slate-300">Payouts</span>
               </div>
            </div>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} dy={15} />
                <YAxis stroke="#64748b" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '15px' }}
                  itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="rev" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRev)" strokeWidth={4} />
                <Area type="monotone" dataKey="pay" stroke="#ef4444" fillOpacity={0} strokeWidth={3} strokeDasharray="8 8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="glass-card rounded-[3rem] p-8 bg-white/5 border-white/5">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="font-black text-white text-lg">System Alerts</h3>
                 <div className="p-2 bg-red-500/10 rounded-lg">
                    <ShieldAlert size={16} className="text-red-500" />
                 </div>
              </div>
              <div className="space-y-4">
                 <AdminFraudItem user="user_8812" reason="Multi-acc session" severity="high" />
                 <AdminFraudItem user="user_2193" reason="Location spoofing" severity="medium" />
                 <AdminFraudItem user="user_0045" reason="High rate-limit" severity="low" />
              </div>
           </div>

           <div className="bg-gradient-to-br from-indigo-600/10 to-blue-600/10 border border-blue-500/20 rounded-[3rem] p-10 relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                 <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                    <Cpu className="text-white" size={24} />
                 </div>
                 <h4 className="font-black text-white text-xl">Gemini Insights</h4>
                 <p className="text-xs text-slate-400 font-medium leading-relaxed">
                   AI recommends swapping AdMob priority in APAC regions for Unity Ads to capture 18% higher yield.
                 </p>
                 <button type="button" className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest group-hover:translate-x-2 transition-transform pt-2">
                    Auto-Optimize
                    <ArrowUpRight size={14} />
                 </button>
              </div>
              <Zap className="absolute -bottom-10 -right-10 w-40 h-40 text-blue-500/5 rotate-12" />
           </div>
        </div>
      </div>
    </div>
  );
};

const ExecMetricCard: React.FC<{ label: string; value: string; change: string; positive: boolean; icon: React.ReactNode; theme: 'emerald' | 'blue' | 'purple' | 'red' }> = ({ label, value, change, positive, icon, theme }) => {
  const themes = {
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500',
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-500',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-500',
    red: 'bg-red-500/10 border-red-500/20 text-red-500',
  };

  return (
    <div className="glass-card rounded-[2.5rem] p-8 relative overflow-hidden group bg-white/5 border-white/5">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 rounded-2xl border transition-transform duration-300 group-hover:scale-110 ${themes[theme]}`}>
          {icon}
        </div>
        <div className={`flex items-center text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${positive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
          {positive ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
          {change}
        </div>
      </div>
      <div className="space-y-1">
         <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{label}</p>
         <h3 className="text-3xl font-black text-white tracking-tighter">{value}</h3>
      </div>
    </div>
  );
};

const AdminFraudItem: React.FC<{ user: string; reason: string; severity: 'low' | 'medium' | 'high' }> = ({ user, reason, severity }) => (
  <div className="flex items-center justify-between p-4 bg-slate-950/40 rounded-2xl border border-white/5 group hover:bg-white/5 transition-all">
     <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
          severity === 'high' ? 'bg-red-500 shadow-red-500/20' : severity === 'medium' ? 'bg-amber-500 shadow-amber-500/20' : 'bg-blue-500 shadow-blue-500/20'
        }`}>
          <AlertTriangle size={18} className="text-slate-950" />
        </div>
        <div>
           <p className="text-sm font-black text-white group-hover:text-blue-400 transition-colors">{user}</p>
           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{reason}</p>
        </div>
     </div>
     <button type="button" className="p-2 text-slate-600 hover:text-white transition-colors">
        <ChevronRight size={16} />
     </button>
  </div>
);

export default AdminPanel;
