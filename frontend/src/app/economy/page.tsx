'use client';

import React, { useState, useEffect } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  TrendingUp, 
  ShieldCheck,
  Zap,
  Gift,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import StatCard from '@/components/StatCard';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';

export default function EconomyPage() {
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletData, txData] = await Promise.all([
          api.economy.getWallet(),
          api.economy.getTransactions()
        ]);
        setWallet(walletData);
        setTransactions(txData);
      } catch (err) {
        console.error('Failed to fetch economy data', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
          <Loader2 className="animate-spin" size={32} />
          <p>Loading your financial overview...</p>
        </div>
      </DashboardShell>
    );
  }
  return (
    <DashboardShell>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gradient">Economy</h1>
            <p className="text-muted-foreground mt-1">Manage your rewards, tokens, and staking activities.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="glass" className="rounded-full gap-2">
              <ArrowDownLeft size={18} />
              Redeem
            </Button>
            <Button className="rounded-full gap-2 shadow-xl shadow-primary/20">
              <ArrowUpRight size={18} />
              Stake Tokens
            </Button>
          </div>
        </div>

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Total Balance" 
            value={`${wallet?.balance || '0.00'} OMIN`} 
            icon={<Wallet size={24} />} 
            className="md:col-span-1"
          />
          <StatCard 
            title="Staked Amount" 
            value={`${wallet?.staked || '0.00'} OMIN`} 
            icon={<ShieldCheck size={24} />} 
          />
          <StatCard 
            title="Total Earnings" 
            value={`${wallet?.totalEarnings || '0.00'} OMIN`} 
            icon={<TrendingUp size={24} />} 
            trend={{ value: wallet?.earningsTrend || "0%", isUp: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Staking Section */}
          <Card className="lg:col-span-2 premium-gradient border-none overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap size={160} />
            </div>
            <CardHeader>
              <CardTitle className="text-white">Active Staking</CardTitle>
              <p className="text-white/60 text-sm">Earn more rewards by committing your tokens to the platform.</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-white/40 font-bold">Estimated APY</p>
                  <p className="text-4xl font-black text-white">{wallet?.apy || '12.5'}%</p>
                </div>
                <div className="space-y-2 text-right sm:text-left">
                  <p className="text-xs uppercase tracking-wider text-white/40 font-bold">Next Reward In</p>
                  <p className="text-4xl font-black text-white">{wallet?.nextReward || '14h 22m'}</p>
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <Button className="bg-white text-primary hover:bg-white/90 rounded-full font-bold">
                  Manage Stake
                </Button>
                <Button variant="glass" className="text-white border-white/20 rounded-full">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Special Offers */}
          <Card className="bg-emerald-500/5 border-emerald-500/20">
            <CardHeader>
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-2">
                <Gift size={20} />
              </div>
              <CardTitle className="text-lg">Bonus Rewards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Complete 5 tasks today to earn an extra <span className="text-emerald-500 font-bold">10 OMIN</span>.</p>
              <div className="h-2 w-full bg-emerald-500/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[60%]" />
              </div>
              <p className="text-[10px] text-muted-foreground text-right italic">3/5 tasks completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <History size={18} className="text-primary" />
              <CardTitle className="text-lg">Transaction History</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">Export CSV</Button>
          </CardHeader>
          <CardContent>
             <div className="space-y-0 divide-y divide-white/5">
                {transactions.length === 0 ? (
                  <div className="py-10 text-center text-muted-foreground">No transactions found.</div>
                ) : (
                  transactions.map((tx, idx) => (
                    <TransactionRow 
                      key={idx}
                      title={tx.title} 
                      date={new Date(tx.createdAt).toLocaleDateString()} 
                      amount={`${tx.type === 'income' ? '+' : '-'}${tx.amount} OMIN`} 
                      type={tx.type}
                    />
                  ))
                )}
             </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}

const TransactionRow = ({ title, date, amount, type }: { title: string, date: string, amount: string, type: 'income' | 'expense' }) => (
  <div className="flex items-center justify-between py-4 group cursor-pointer hover:bg-white/[0.01]">
    <div className="flex items-center gap-4">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center border transition-colors",
        type === 'income' ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500" : "bg-red-500/5 border-red-500/20 text-red-500"
      )}>
        {type === 'income' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
      </div>
      <div>
        <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
    </div>
    <div className={cn(
      "text-sm font-bold tracking-tight",
      type === 'income' ? "text-emerald-500" : "text-red-500"
    )}>
      {amount}
    </div>
  </div>
);
