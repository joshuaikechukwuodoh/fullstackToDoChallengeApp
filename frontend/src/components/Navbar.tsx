'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckSquare, LayoutDashboard, Settings, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 h-16 glass-morphism border-b flex items-center justify-between px-6 md:px-12"
    >
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
          <CheckSquare className="text-primary-foreground w-5 h-5" />
        </div>
        <span className="text-xl font-bold tracking-tight text-gradient">
          OminSolution
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        <NavLink href="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <NavLink href="/tasks" icon={<CheckSquare size={18} />} label="Tasks" />
        <NavLink href="/profile" icon={<User size={18} />} label="Profile" />
      </nav>

      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium transition-colors hover:bg-accent"
        >
          <Settings size={16} />
          <span className="hidden sm:inline">Settings</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20"
        >
          <LogOut size={18} />
        </motion.button>
      </div>
    </motion.header>
  );
};

const NavLink = ({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
      active ? "text-primary" : "text-muted-foreground"
    )}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;
