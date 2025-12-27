'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin, CheckSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 md:px-12 glass-morphism border-t mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <CheckSquare className="text-primary-foreground w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gradient">
              OminSolution
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Revolutionizing your productivity with elegant and intelligent task management solutions.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={<Github size={20} />} href="#" />
            <SocialIcon icon={<Twitter size={20} />} href="#" />
            <SocialIcon icon={<Linkedin size={20} />} href="#" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Integrations</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Changelog</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Community</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Status</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} OminSolution. All rights reserved.</p>
        <p>Built with ❤️ for productivity.</p>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <Link
    href={href}
    className="p-2 rounded-full glass-morphism hover:bg-primary hover:text-primary-foreground transition-all duration-300"
  >
    {icon}
  </Link>
);

export default Footer;
