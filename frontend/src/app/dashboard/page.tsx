'use client';

import React from 'react';
import DashboardShell from '@/components/DashboardShell';
import StatCard from '@/components/StatCard';
import { CheckCircle2, Clock, Zap, TrendingUp, Plus, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  return (
    <DashboardShell>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
            <p className="text-muted-foreground mt-1">Welcome back, John! Here's what's happening today.</p>
          </div>
          <Button className="rounded-full gap-2 shadow-xl shadow-primary/20">
            <Plus size={18} />
            Create Task
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Tasks" 
            value="128" 
            icon={<CheckCircle2 size={24} />} 
            trend={{ value: "12%", isUp: true }}
          />
          <StatCard 
            title="Completed" 
            value="94" 
            icon={<Zap size={24} />} 
            trend={{ value: "8%", isUp: true }}
          />
          <StatCard 
            title="In Progress" 
            value="12" 
            icon={<Clock size={24} />} 
          />
          <StatCard 
            title="Success Rate" 
            value="89%" 
            icon={<TrendingUp size={24} />} 
            trend={{ value: "4%", isUp: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Tasks */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">Recent Tasks</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                View All
                <ArrowUpRight size={14} />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <TaskItem 
                  title="Finish project documentation" 
                  category="Work" 
                  priority="High" 
                  status="In Progress"
                />
                <TaskItem 
                  title="Design the new landing page" 
                  category="Design" 
                  priority="Medium" 
                  status="Completed"
                />
                <TaskItem 
                  title="Weekly team meeting" 
                  category="Management" 
                  priority="High" 
                  status="Pending"
                />
                 <TaskItem 
                  title="Update security protocols" 
                  category="Tech" 
                  priority="Critical" 
                  status="In Progress"
                />
              </div>
            </CardContent>
          </Card>

          {/* Activity/Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ActivityItem 
                user="JD" 
                action="completed" 
                target="Project setup" 
                time="2 hours ago"
              />
              <ActivityItem 
                user="AS" 
                action="commented on" 
                target="UI Design" 
                time="5 hours ago"
              />
              <ActivityItem 
                user="MK" 
                action="assigned" 
                target="Bug fix #102" 
                time="Yesterday"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}

const TaskItem = ({ title, category, priority, status }: { title: string, category: string, priority: string, status: string }) => (
  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group">
    <div className="flex items-center gap-4">
      <div className={cn(
        "w-2 h-2 rounded-full",
        status === "Completed" ? "bg-emerald-500" : status === "In Progress" ? "bg-primary" : "bg-zinc-500"
      )} />
      <div>
        <h4 className="text-sm font-medium group-hover:text-primary transition-colors">{title}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{category}</span>
          <span className="text-muted-foreground">•</span>
          <span className={cn(
            "text-[10px] uppercase tracking-wider font-bold",
            priority === "High" || priority === "Critical" ? "text-red-400" : "text-muted-foreground"
          )}>{priority}</span>
        </div>
      </div>
    </div>
    <div className="text-xs font-medium px-2 py-1 rounded bg-white/5 border border-white/5">
      {status}
    </div>
  </div>
);

const ActivityItem = ({ user, action, target, time }: { user: string, action: string, target: string, time: string }) => (
  <div className="flex gap-4">
    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">
      {user}
    </div>
    <div className="space-y-1">
      <p className="text-sm">
        <span className="font-semibold">{user}</span> {action} <span className="text-primary font-medium">{target}</span>
      </p>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
  </div>
);
