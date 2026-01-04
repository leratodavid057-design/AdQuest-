import React, { useState, useEffect, useCallback } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Users, 
  ShieldAlert, 
  Settings,
  TrendingUp,
  Award,
  Bell,
  ChevronRight,
  LogOut,
  Star,
  CheckCircle2,
  X
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import WalletView from './components/WalletView';
import ReferralView from './components/ReferralView';
import AdminPanel from './components/AdminPanel';
import { User, Transaction } from './types';
import { MOCK_USER, MOCK_TRANSACTIONS } from './services/mockDataService';

const NotificationToast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div className="fixed top-20 right-6 z-[200] animate-in slide-in-from-right-10 duration-500">
    <div className="bg-slate-900/90 backdrop-blur-2xl border border-blue-500/30 rounded-2xl p-4 flex items-center gap-4 shadow-2xl shadow-blue-500/10 min-w-[300px]">
      <div className="w-9 h-9 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/20">
         <CheckCircle2 className="text-blue-400" size={18} />
      </div>
      <div className="flex-1">
        <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-0.5">System Alert</p>
        <p className="text-xs font-bold text-white tracking-tight">{message}</p>
      </div>
      <button onClick={onClose} className="p-1 text-slate-500 hover:text-white transition-colors">
        <X size={14} />
      </button>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'wallet' | 'referrals' | 'admin'>('dashboard');
  const [user, setUser] = useState<User>(MOCK_USER);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [notification, setNotification] = useState<string | null>(null);
  const [isAdmin] = useState(true);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as any;
      if (['dashboard', 'wallet', 'referrals', 'admin'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const triggerNotification = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  }, []);

  const navigate = (tab: string) => {
    window.location.hash = tab;
  };

  const xpProgress = (user.xp % 1000) / 10;

  return (
    <div className="flex min-h-screen text-slate-200">
      {notification && <NotificationToast message={notification} onClose={() => setNotification(null)} />}

      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-slate-950/40 backdrop-blur-xl hidden lg:flex flex-col sticky top-0 h-screen z-40">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20 relative group cursor-pointer overflow-hidden">
             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <Award className="w-5 h-5 text-white relative z-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter text-white uppercase">ADQUEST</span>
            <span className="text-[7px] font-black text-blue-500 uppercase tracking-[0.3em]">Revenue Core</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1">
          <p className="px-4 mb-2 text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">Main Frame</p>
          <SidebarItem 
            icon={<LayoutDashboard size={18} />} 
            label="Live Auction" 
            active={activeTab === 'dashboard'} 
            onClick={() => navigate('dashboard')} 
          />
          <SidebarItem 
            icon={<Wallet size={18} />} 
            label="Digital Vault" 
            active={activeTab === 'wallet'} 
            onClick={() => navigate('wallet')} 
          />
          <SidebarItem 
            icon={<Users size={18} />} 
            label="Empire Network" 
            active={activeTab === 'referrals'} 
            onClick={() => navigate('referrals')} 
          />
          
          {isAdmin && (
            <div className="pt-6">
              <p className="px-4 mb-2 text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">Operations</p>
              <SidebarItem 
                icon={<ShieldAlert size={18} />} 
                label="Admin Engine" 
                active={activeTab === 'admin'} 
                onClick={() => navigate('admin')} 
              />
              <SidebarItem 
                icon={<Settings size={18} />} 
                label="System Config" 
                active={false} 
                onClick={() => {}} 
              />
            </div>
          )}
        </nav>

        <div className="p-4 space-y-4">
          <div className="space-y-1.5 px-1">
            <div className="flex justify-between items-end">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Lvl {user.level}</p>
              <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest">{user.xp % 1000}/1000 XP</p>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-1000"
                style={{ width: `${xpProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="p-3 rounded-xl glass-card border-white/10 bg-slate-900/60 transition-all hover:bg-slate-900 group">
            <div className="flex items-center gap-3">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
                alt="Avatar" 
                className="w-8 h-8 rounded-lg border border-white/10" 
              />
              <div className="overflow-hidden">
                <p className="text-xs font-black truncate text-white">{user.username}</p>
                <div className="flex items-center gap-1 mt-0.5">
                   <Star className="text-yellow-500 fill-yellow-500" size={7} />
                   <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Elite Publisher</p>
                </div>
              </div>
            </div>
          </div>
          
          <button className="w-full flex items-center justify-center gap-2 py-2 text-slate-500 hover:text-red-400 text-[9px] font-black uppercase tracking-[0.2em] transition-all rounded-lg">
            <LogOut size={12} />
            Detach
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen overflow-hidden bg-slate-950/20 backdrop-blur-md relative">
        <header className="h-16 border-b border-white/5 bg-slate-950/40 backdrop-blur-3xl flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="lg:hidden flex items-center gap-3">
             <div className="bg-blue-600 p-1.5 rounded-lg">
                <Award className="w-4 h-4 text-white" />
             </div>
             <span className="font-black text-lg tracking-tighter">ADQUEST</span>
          </div>
          
          <div className="hidden lg:flex flex-col">
             <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">Session / {activeTab}</p>
             <h1 className="text-lg font-black text-white tracking-tight capitalize">
               {activeTab === 'dashboard' ? 'Revenue Auction' : activeTab}
             </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-3 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 group hover:bg-white/10 transition-all">
              <div className="flex flex-col items-end">
                <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Network</p>
                <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">Secure</p>
              </div>
              <div className="w-0.5 h-6 bg-emerald-500/20 rounded-full overflow-hidden">
                 <div className="w-full h-4/5 bg-emerald-500 animate-pulse"></div>
              </div>
            </div>

            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all relative border border-white/5">
              <Bell size={16} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-2.5 bg-blue-600/10 hover:bg-blue-600/20 px-3 py-1.5 rounded-lg border border-blue-500/20 transition-all cursor-pointer group active:scale-95">
              <div className="w-6 h-6 rounded-md bg-yellow-500 flex items-center justify-center text-[9px] font-black text-slate-950 shadow-lg group-hover:scale-105 transition-transform">C</div>
              <div className="flex flex-col items-start">
                <span className="text-[7px] font-black text-blue-400 uppercase tracking-widest leading-none mb-0.5">Vault</span>
                <span className="text-sm font-black text-white tracking-tighter leading-none">{user.balance.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 flex-1 overflow-y-auto no-scrollbar">
          <div className="max-w-6xl mx-auto w-full">
            {activeTab === 'dashboard' && (
              <Dashboard 
                user={user} 
                setUser={setUser} 
                setTransactions={setTransactions} 
                onNotify={triggerNotification}
              />
            )}
            {activeTab === 'wallet' && <WalletView user={user} setUser={setUser} transactions={transactions} setTransactions={setTransactions} />}
            {activeTab === 'referrals' && <ReferralView user={user} />}
            {activeTab === 'admin' && isAdmin && <AdminPanel />}
          </div>
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="lg:hidden fixed bottom-4 left-4 right-4 h-14 bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-xl flex items-center justify-around z-50 px-2 shadow-2xl">
        <MobileNavItem icon={<LayoutDashboard size={18} />} active={activeTab === 'dashboard'} onClick={() => navigate('dashboard')} />
        <MobileNavItem icon={<Wallet size={18} />} active={activeTab === 'wallet'} onClick={() => navigate('wallet')} />
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center -translate-y-4 shadow-2xl border-2 border-slate-950 active:scale-95 transition-all">
          <TrendingUp className="text-white" size={20} />
        </div>
        <MobileNavItem icon={<Users size={18} />} active={activeTab === 'referrals'} onClick={() => navigate('referrals')} />
        {isAdmin && <MobileNavItem icon={<ShieldAlert size={18} />} active={activeTab === 'admin'} onClick={() => navigate('admin')} />}
      </nav>
    </div>
  );
};

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
      active 
        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
        : 'text-slate-500 hover:bg-white/5 hover:text-slate-100'
    }`}
  >
    <div className={`${active ? 'text-white' : 'text-slate-600 group-hover:text-blue-400'} transition-all`}>
      {icon}
    </div>
    <span className="text-[11px] font-black tracking-tight uppercase tracking-widest">{label}</span>
    {active && <div className="absolute right-3 w-1 h-1 bg-white rounded-full"></div>}
  </button>
);

const MobileNavItem: React.FC<{ icon: React.ReactNode; active: boolean; onClick: () => void }> = ({ icon, active, onClick }) => (
  <button onClick={onClick} className={`p-2 rounded-lg transition-all ${active ? 'text-blue-500 bg-blue-500/10' : 'text-slate-500'}`}>
    {icon}
  </button>
);

export default App;