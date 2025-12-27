'use client';

import React, { useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { 
  BrainCircuit, 
  Upload, 
  FileText, 
  Sparkles, 
  Play, 
  History,
  CheckCircle2,
  X,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function QuizPage() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleGenerate = async () => {
    if (!file) return;
    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      const quiz = await api.quiz.generate(formData);
      // Redirect to a take-quiz page or show success
      // สำหรับเดโม่เราจะแค่แสดงความสำเร็จ
      alert('Quiz generated successfully! Check your history.');
      setFile(null);
    } catch (err: any) {
      setError(err.message || 'Failed to generate quiz');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gradient">AI Quiz Generator</h1>
            <p className="text-muted-foreground mt-1">Convert your study materials into interactive quizzes using AI.</p>
          </div>
          <Button variant="outline" className="rounded-full gap-2">
            <History size={18} />
            Quiz History
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card className="border-dashed border-2 bg-primary/5 hover:bg-primary/10 transition-colors group cursor-pointer relative overflow-hidden">
               <input 
                 type="file" 
                 className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                 onChange={handleFileChange}
                 accept=".pdf,.doc,.docx,.txt"
               />
               <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                     {file ? <FileText size={32} /> : <Upload size={32} />}
                  </div>
                  <div className="text-center">
                     <p className="text-lg font-bold">{file ? file.name : "Drop your file here"}</p>
                     <p className="text-sm text-muted-foreground">PDF, Word, or Text files (Max 10MB)</p>
                  </div>
                  <Button variant="glass" className="pointer-events-none">
                    {file ? "Change File" : "Select File"}
                  </Button>
               </CardContent>
            </Card>

            <AnimatePresence>
               {(file || error) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    {error && (
                      <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center font-medium">
                        {error}
                      </div>
                    )}
                    {file && (
                      <Card className="bg-primary shadow-xl shadow-primary/20 border-none">
                        <CardContent className="p-6 flex items-center justify-between text-white">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                  <Sparkles size={24} />
                              </div>
                              <div>
                                  <h3 className="font-bold">Generate Quiz</h3>
                                  <p className="text-white/60 text-sm">Our AI is ready to analyze your document.</p>
                              </div>
                            </div>
                            <Button 
                              className="bg-white text-primary hover:bg-white/90 rounded-full gap-2 font-bold px-6"
                              onClick={handleGenerate}
                              disabled={isUploading}
                            >
                                {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Play size={20} />}
                                {isUploading ? "Analyzing..." : "Start AI Magic"}
                            </Button>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
               )}
            </AnimatePresence>
          </div>

          {/* Features/Info Section */}
          <div className="space-y-6">
             <Card>
                <CardHeader>
                   <CardTitle className="text-lg">How it works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <StepItem 
                     num="1" 
                     title="Upload Material" 
                     desc="Upload any PDF, document, or text file containing your study content." 
                   />
                   <StepItem 
                     num="2" 
                     title="AI Analysis" 
                     desc="Our advanced AI model extracts key concepts and generates relevant questions." 
                   />
                   <StepItem 
                     num="3" 
                     title="Practice & Learn" 
                     desc="Take the quiz, get instant feedback, and earn OMIN tokens for correct answers." 
                   />
                </CardContent>
             </Card>

             <Card className="premium-gradient border-none">
                <CardContent className="p-6">
                   <div className="flex items-center gap-4 text-white">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                         <BrainCircuit size={20} />
                      </div>
                      <div>
                         <h3 className="font-bold">Did you know?</h3>
                         <p className="text-white/70 text-sm">Active recall through quizzes can improve retention by up to 50%!</p>
                      </div>
                   </div>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

const StepItem = ({ num, title, desc }: { num: string, title: string, desc: string }) => (
  <div className="flex gap-4">
     <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
        {num}
     </div>
     <div className="space-y-1">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{desc}</p>
     </div>
  </div>
);
