'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Zap, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism text-primary text-sm font-medium mb-4"
          >
            <Sparkles size={16} />
            <span>Next Generation Productivity</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            Manage Tasks with <br />
            <span className="text-gradient">Professional Elegance</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            OminSolution combines advanced task tracking with a premium interface, 
            helping you achieve more without the complexity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/auth/signup">
              <Button size="lg" className="rounded-full gap-2 group">
                Get Started for Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="glass" size="lg" className="rounded-full">
                View Features
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Floating elements decoration */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute left-20 top-1/3 opacity-20"
        >
          <CheckCircle2 size={120} className="text-primary" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute right-20 bottom-1/4 opacity-20"
        >
          <Zap size={100} className="text-blue-400" />
        </motion.div>
      </section>

      {/* Feature Preview Section */}
      <section className="py-24 px-6 md:px-12 bg-black/50 border-y">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap className="text-primary" />}
            title="Lightning Fast"
            description="Optimized for performance. Manage your workflow without any lag."
          />
          <FeatureCard 
            icon={<Shield className="text-blue-400" />}
            title="Secure by Design"
            description="Your data is encrypted and secure with OminSolution's enterprise-grade protection."
          />
          <FeatureCard 
            icon={<CheckCircle2 className="text-emerald-400" />}
            title="Smart Tracking"
            description="Intelligent analytics and insights into your daily productivity habits."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-2xl glass-morphism space-y-4 hover:border-primary/50 transition-colors border-transparent"
  >
    <div className="w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center border">
      {icon}
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">
      {description}
    </p>
  </motion.div>
);
