'use client';

import React, { useState, useEffect } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { Plus, Search, Filter, MoreVertical, Calendar, Tag as TagIcon, Flag, CheckCircle2, Circle, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';

export default function TasksPage() {
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const fetchTasks = async () => {
    try {
      const data = await api.tasks.list();
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const newTask = await api.tasks.create({ title: newTaskTitle, status: 'Pending' });
      setTasks([newTask, ...tasks]);
      setNewTaskTitle('');
    } catch (err) {
      console.error('Failed to add task', err);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';
    try {
      await api.tasks.update(id, { status: newStatus });
      setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'todo') return t.status === 'Pending';
    if (filter === 'in-progress') return t.status === 'In Progress';
    if (filter === 'completed') return t.status === 'Completed';
    return true;
  });

  return (
    <DashboardShell>
      <div className="space-y-6 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground mt-1">Manage and organize your work efficiently.</p>
          </div>
          <form onSubmit={handleAddTask} className="flex items-center gap-2">
            <Input 
              value={newTaskTitle} 
              onChange={(e) => setNewTaskTitle(e.target.value)} 
              placeholder="Quick add task..." 
              className="w-64 glass-morphism"
            />
            <Button type="submit" className="rounded-full gap-2 shadow-xl shadow-primary/20">
              <Plus size={18} />
              Add
            </Button>
          </form>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input className="pl-10 h-11 bg-white/5" placeholder="Search tasks..." />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" className="h-11 gap-2 flex-1 sm:flex-initial">
              <Filter size={16} />
              Filter
            </Button>
            <Button variant="outline" className="h-11 gap-2 flex-1 sm:flex-initial">
              <Calendar size={16} />
              Schedule
            </Button>
          </div>
        </div>

        {/* Task List Groups */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm font-medium border-b border-white/5 pb-2">
            {['all', 'todo', 'in-progress', 'completed'].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "pb-2 px-1 border-b-2 transition-colors capitalize", 
                  filter === f ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {f.replace('-', ' ')}
              </button>
            ))}
          </div>

          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
                <Loader2 className="animate-spin" size={32} />
                <p>Loading your tasks...</p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                No tasks found in this category.
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onToggle={() => handleToggleStatus(task.id, task.status)} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardShell>
  );
}

const TaskCard = ({ task, onToggle }: { task: any, onToggle: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    layout
  >
    <Card className="hover:border-primary/50 transition-all duration-300 group cursor-pointer overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-center gap-4 p-5">
           <button 
             onClick={(e) => { e.stopPropagation(); onToggle(); }}
             className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
           >
            {task.status === "Completed" ? <CheckCircle2 className="text-emerald-500" size={24} /> : <Circle size={24} />}
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className={cn(
                "font-semibold truncate text-lg transition-all",
                task.status === "Completed" ? "text-muted-foreground line-through" : "text-foreground group-hover:text-primary"
              )}>
                {task.title}
              </h3>
              <button className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={18} />
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <TagIcon size={14} />
                <span>{task.category || 'General'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flag size={14} className={cn(
                  task.priority === "Critical" ? "text-red-500" : task.priority === "High" ? "text-orange-500" : "text-blue-500"
                )} />
                <span className="font-medium">{task.priority || 'Medium'} Priority</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar size={14} />
                <span>{task.dueDate ? `Due ${task.dueDate}` : 'No due date'}</span>
              </div>
              <div className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                task.status === "Completed" ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary"
              )}>
                {task.status}
              </div>
            </div>
          </div>
        </div>
        {task.status === "In Progress" && (
            <div className="h-1 w-full bg-white/5">
                <div className="h-full bg-primary w-1/2" />
            </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);
