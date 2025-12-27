import React, { useState, useEffect } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { 
  Trophy, 
  Medal, 
  Target, 
  Users, 
  ArrowUp, 
  ArrowDown, 
  Minus,
  Search,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';

export default function LeaderboardPage() {
  const [allPlayers, setAllPlayers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await api.leaderboard.list();
        setAllPlayers(data);
      } catch (err) {
        console.error('Failed to fetch leaderboard', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const topPlayers = allPlayers.slice(0, 3);
  const remainingPlayers = allPlayers.slice(3);

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
          <Loader2 className="animate-spin" size={32} />
          <p>Loading ranking data...</p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gradient">Leaderboard</h1>
            <p className="text-muted-foreground mt-1">Compete with others and climb the ranks to earn rewards.</p>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" className="rounded-full gap-2">
              <Users size={18} />
              Friends
            </Button>
            <Button className="rounded-full gap-2">
              <Target size={18} />
              My Rank
            </Button>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 items-end">
          {/* Rank 2 */}
          <div className="order-2 md:order-1">
             <PodiumCard player={topPlayers[1]} height="h-48" color="bg-zinc-400" />
          </div>
          {/* Rank 1 */}
          <div className="order-1 md:order-2">
             <PodiumCard player={topPlayers[0]} height="h-64" color="bg-amber-400" isMain />
          </div>
          {/* Rank 3 */}
          <div className="order-3 md:order-3">
             <PodiumCard player={topPlayers[2]} height="h-40" color="bg-orange-500" />
          </div>
        </div>

        {/* Search and List */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
             <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input className="pl-10 h-11 bg-white/5" placeholder="Search players..." />
             </div>
             <Button variant="outline" className="h-11">Filter</Button>
          </div>

          <Card>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-muted-foreground font-bold">
                           <th className="px-6 py-4">Rank</th>
                           <th className="px-6 py-4">User</th>
                           <th className="px-6 py-4">Status</th>
                           <th className="px-6 py-4 text-right">Score</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        {remainingPlayers.length === 0 ? (
                           <tr>
                              <td colSpan={4} className="px-6 py-10 text-center text-muted-foreground">
                                 No additional players found.
                              </td>
                           </tr>
                        ) : (
                           remainingPlayers.map((player) => (
                              <tr key={player.rank} className="group hover:bg-white/[0.02] transition-colors">
                                 <td className="px-6 py-4">
                                    <span className="text-sm font-bold text-muted-foreground">#{player.rank}</span>
                                 </td>
                                 <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                       <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                                          {player.avatar || player.name.charAt(0)}
                                       </div>
                                       <span className="text-sm font-semibold group-hover:text-primary transition-colors">{player.name}</span>
                                    </div>
                                 </td>
                                 <td className="px-6 py-4">
                                    <div className="flex items-center gap-1 text-xs">
                                       {player.change === 'up' ? <ArrowUp size={14} className="text-emerald-500" /> : 
                                        player.change === 'down' ? <ArrowDown size={14} className="text-red-500" /> : 
                                        <Minus size={14} className="text-zinc-500" />}
                                       <span className={cn(
                                          player.change === 'up' ? "text-emerald-500" : 
                                          player.change === 'down' ? "text-red-500" : "text-zinc-500"
                                       )}>
                                          {player.change === 'same' || !player.change ? 'Stationary' : player.change.charAt(0).toUpperCase() + player.change.slice(1)}
                                       </span>
                                    </div>
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                    <span className="text-sm font-black tabular-nums">{player.score.toLocaleString()}</span>
                                 </td>
                              </tr>
                           ))
                        )}
                     </tbody>
                  </table>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}

const PodiumCard = ({ player, height, color, isMain }: { player: any, height: string, color: string, isMain?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: player.rank * 0.1 }}
    className="flex flex-col items-center gap-4"
  >
    <div className="relative">
      <div className={cn(
        "w-16 h-16 rounded-full border-4 flex items-center justify-center text-lg font-bold transition-all shadow-2xl",
        isMain ? "w-24 h-24 border-primary shadow-primary/40 ring-4 ring-primary/20 scale-110" : "border-white/10"
      )}>
        {player.avatar}
      </div>
      <div className={cn(
        "absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg",
        color,
        isMain ? "w-10 h-10 -bottom-1 -right-1 text-base" : ""
      )}>
        {player.rank}
      </div>
    </div>
    
    <div className="text-center">
       <h3 className={cn("font-bold truncate max-w-[120px]", isMain ? "text-xl" : "text-sm")}>{player.name}</h3>
       <p className="text-primary font-black tracking-tight">{player.score.toLocaleString()} pts</p>
    </div>

    <div className={cn(
      "w-full rounded-t-2xl glass-morphism flex flex-col items-center justify-center p-4 gap-2",
      height,
      isMain ? "bg-primary/20 border-primary/20" : ""
    )}>
       {isMain && <Trophy size={48} className="text-primary animate-bounce mb-2" />}
       {!isMain && player.rank === 2 && <Medal size={32} className="text-zinc-400" />}
       {!isMain && player.rank === 3 && <Medal size={32} className="text-orange-500" />}
    </div>
  </motion.div>
);
