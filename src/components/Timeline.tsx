import React from 'react';
import { Application } from '../data/types';
import { motion } from 'framer-motion';
import { Check, Clock, X } from 'lucide-react';
import { cn } from '../lib/utils';

const steps = ['Submitted', 'Committee', 'Dean', 'Principal', 'Decision'];

const Timeline: React.FC<{ application: Application }> = ({ application }) => {
  const currentIndex = (() => {
    switch (application.status) {
      case 'Pending': return 0;
      case 'Committee Review': return 1;
      case 'Dean Review': return 2;
      case 'Principal Review': return 3;
      case 'Approved': return 4;
      case 'Denied': return 4;
      default: return 0;
    }
  })();

  const isDenied = application.status === 'Denied'

  return (
    <div className="w-full py-4">
      <div className="relative flex items-center justify-between">
        {/* Progress Bar Background */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted rounded-full -z-10" />
        
        {/* Active Progress Bar */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 h-1 rounded-full -z-10",
            isDenied ? "bg-destructive" : "bg-primary"
          )}
        />

        {steps.map((step, i) => {
          const isCompleted = i <= currentIndex;
          const isCurrent = i === currentIndex;
          const isLast = i === steps.length - 1;
          const isFailed = isLast && isDenied && isCompleted;

          return (
            <div key={step} className="flex flex-col items-center gap-2 relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300 bg-background",
                  isFailed ? "border-destructive text-destructive" :
                  isCompleted ? "border-primary bg-primary text-primary-foreground" : 
                  "border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {isFailed ? (
                  <X className="w-4 h-4" />
                ) : isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-medium">{i + 1}</span>
                )}
              </motion.div>
              <span className={cn(
                "text-xs font-medium absolute -bottom-6 whitespace-nowrap transition-colors duration-300",
                isFailed ? "text-destructive" :
                isCompleted ? "text-primary" : "text-muted-foreground"
              )}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
