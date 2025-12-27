'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Navbar from "@/components/Navbar";

export default function ClientLayout({ children, geistSans, geistMono }: { 
  children: React.ReactNode;
  geistSans: { variable: string };
  geistMono: { variable: string };
}) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith('/dashboard') || 
                          pathname?.startsWith('/tasks') || 
                          pathname?.startsWith('/economy') || 
                          pathname?.startsWith('/leaderboard') || 
                          pathname?.startsWith('/quiz') || 
                          pathname?.startsWith('/analytics');

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {!isDashboardRoute && <Navbar />}
        <main className={cn("flex-1", !isDashboardRoute && "pt-16")}>
          {children}
        </main>
      </body>
    </html>
  );
}
