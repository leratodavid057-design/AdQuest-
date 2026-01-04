import React, { useState, useMemo } from 'react';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  DollarSign, 
  Smartphone,
  Gift,
  Plus,
  ShieldCheck,
  Clock,
  ExternalLink,
  Info,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  BarChart3,
  ChevronRight,
  Target,
  Zap
} from 'lucide-react';
import { User, Transaction } from '../types';

interface WalletViewProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

type PayoutType = {
  id: 'UPI' | 'PAYPAL';
  name: string;
  icon: React.ReactNode;
  feePercent: number;
  minCoins: number;
  processingTime: string;
  theme: {
    bg: string;
    border: string;
    text: string;
  };
};

const PAYOUT_METHODS: PayoutType[] = [
  {
    id: 'UPI',
    name: 'Direct UPI Hub',
    icon: <Smartphone size={20} />,
    feePercent: 0,
    minCoins: 500,
    processingTime: 'Instant',
    theme: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-500' }
  },
  {
    id: 'PAYPAL',
    name: 'PayPal / Ledger',
    icon: <DollarSign size={20} />,
    feePercent: 2.5,
    minCoins: 1000,
    processingTime: '1h - 4h',
    theme: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' }
  }
];

const WalletView: React.FC<WalletViewProps> = ({ user, setUser, transactions, setTransactions }) => {
  const [selectedMethodId, setSelectedMethodId] = useState<'UPI' | 'PAYPAL'>('UPI');
  const selectedMethod = useMemo(() => PAYOUT_METHODS.find(m => m.id === selectedMethodId) || PAYOUT_METHODS[0], [selectedMethodId]);
  const feeAmount = useMemo(() => Math.floor((user.balance * selectedMethod.feePercent) / 100), [user.balance, selectedMethod.feePercent]);
  const netAmount = user.balance - feeAmount;

  const handleCashout = () => {
    if (user.balance < selectedMethod.minCoins) {
      alert(`Min cashout: ${selectedMethod.minCoins} coins.`);
      return;
    }
    const cashoutAmount = user.balance;
    setTransactions(prev => [{
      id: `tx_out_${Date.now()}`, userId: user.id, amount: cashoutAmount, type: 'WITHDRAW', status: 'PENDING', timestamp: new Date().toISOString(), description: `Settlement: ${selectedMethod.name}`
    }, ...prev]);
    setUser(prev => ({ ...prev, balance: 0 }));
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="premium-gradient rounded-3xl p-10 relative overflow-hidden shadow-2xl border border-white/20 transition-all duration-700">
            <div className="relative z-10 space-y-10">
              <div className="flex justify-between items-start">
                 <div>
                   <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-white/10 rounded-full border border-white/20 mb-4">
                      <ShieldCheck size={12} className="text-emerald-400" />
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">Encrypted Vault Balance</span>
                   </div>
                   <div className="flex items-baseline gap-4">
                      <h2 className="text-6xl font-black text-white tracking-tighter drop-shadow-xl">{user.balance.toLocaleString()}</h2>
                      <span className="text-xl font-black text-blue-200 uppercase tracking-tighter">COINS</span>
                   </div>
                 </div>
                 <div className="w-14 h-10 bg-white/20 backdrop-blur-3xl rounded-xl border border-white/20 flex items-center justify-center shadow-inner">
                    <CreditCard className="text-white" size={24} />
                 </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={handleCashout}
                  disabled={user.balance < selectedMethod.minCoins}
                  className="h-14 px-8 bg-white text-blue-600 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 disabled:opacity-50"
                >
                  <ArrowUpRight size={18} />
                  Settlement
                </button>
                <button className="h-14 px-8 bg-blue-700/50 backdrop-blur-3xl border border-white/10 text-white rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-3">
                  <Gift size={18} />
                  Gift Cards
                </button>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center gap-10">
                 <div className="flex flex-col">
                    <span className="text-blue-200/50 text-[9px] font-black uppercase tracking-widest mb-0.5">Lifetime Yield</span>
                    <span className="text-xl font-black text-white tracking-tighter">{(user.totalEarned / 1000).toFixed(1)}k <span className="text-xs">COINS</span></span>
                 </div>
                 <div className="w-px h-8 bg-white/10"></div>
                 <div className="flex flex-col">
                    <span className="text-blue-200/50 text-[9px] font-black uppercase tracking-widest mb-0.5">Settlement Est.</span>
                    <span className="text-xl font-black text-emerald-400 tracking-tighter">{netAmount.toLocaleString()} <span className="text-xs">NET</span></span>
                 </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
              <Target className="text-blue-500" size={24} />
              Settlement Endpoints
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PAYOUT_METHODS.map((m) => (
                <button key={m.id} onClick={() => setSelectedMethodId(m.id)} className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden group ${selectedMethodId === m.id ? 'bg-blue-600/10 border-blue-500 shadow-xl' : 'bg-white/5 border-white/5 hover:border-white/10'}`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${selectedMethodId === m.id ? 'bg-blue-600' : 'bg-slate-800'}`}>
                      {React.cloneElement(m.icon as React.ReactElement, { className: selectedMethodId === m.id ? 'text-white' : m.theme.text })}
                    </div>
                    {selectedMethodId === m.id && <CheckCircle2 size={18} className="text-blue-500" />}
                  </div>
                  <h4 className="font-black text-white text-base tracking-tight mb-2">{m.name}</h4>
                  <div className="flex items-center gap-2">
                    <p className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${selectedMethodId === m.id ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-900 text-slate-500'}`}>Fee: {m.feePercent}%</p>
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Min: {m.minCoins}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="glass-card rounded-2xl p-8 border-white/5 bg-slate-900/40 relative overflow-hidden">
              <div className="flex items-center gap-4 mb-8">
                 <ShieldCheck className="text-blue-500" size={24} />
                 <h3 className="text-base font-black text-white tracking-tight uppercase">Node Integrity</h3>
              </div>
              <div className="space-y-5">
                 <SmallMetric label="Security" value="AES-256" color="text-blue-400" />
                 <SmallMetric label="Vault Lock" value="Bypassed" color="text-emerald-400" />
                 <SmallMetric label="Last Audit" value="2m ago" color="text-slate-400" />
                 <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
                       <span>Audit Probability</span>
                       <span>2.4%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-600 w-[2.4%]"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-end justify-between border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
             <History className="text-blue-500" size={20} />
             <h3 className="text-xl font-black text-white tracking-tighter">Ledger</h3>
          </div>
        </div>
        <div className="glass-card rounded-2xl overflow-hidden border-white/5 bg-slate-900/40">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Transaction Trace</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Yield</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-6 py-6 font-bold text-white">{tx.description}</td>
                    <td className="px-6 py-6">
                      <span className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest ${tx.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>{tx.status}</span>
                    </td>
                    <td className="px-6 py-6 text-right font-black text-white">
                      {tx.type === 'WITHDRAW' ? '-' : '+'}{tx.amount.toLocaleString()} <span className="text-[8px] text-slate-500">C</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const SmallMetric: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className="flex justify-between items-center">
    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
    <span className={`text-xs font-black tracking-tight ${color}`}>{value}</span>
  </div>
);

export default WalletView;