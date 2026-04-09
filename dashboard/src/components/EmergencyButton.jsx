import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const colorStyles = {
  red: "bg-red-600 hover:bg-red-500 shadow-red-500/40 text-white",
  yellow: "bg-yellow-500 hover:bg-yellow-400 shadow-yellow-500/40 text-slate-900",
  green: "bg-green-600 hover:bg-green-500 shadow-green-500/40 text-white",
};

const pulseColors = {
  red: "bg-red-500/50",
  yellow: "bg-yellow-400/50",
  green: "bg-green-500/50",
};

export default function EmergencyButton({ title, icon: Icon, color = "red", onClick, isPulsing = true }) {
  return (
    <div className="relative group w-full flex-1">
      {/* Pulse effect */}
      {isPulsing && (
        <motion.div
          className={cn(
            "absolute -inset-1.5 rounded-xl blur z-0",
            pulseColors[color]
          )}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      
      <motion.button
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={cn(
          "relative z-10 flex w-full flex-col items-center justify-center gap-3 p-6",
          "rounded-xl shadow-xl transition-colors border border-white/10",
          colorStyles[color],
          "font-semibold tracking-wide backdrop-blur-md overflow-hidden"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl pointer-events-none" />
        
        <span className={cn(
          "relative flex items-center justify-center p-3 rounded-[12px] bg-black/10 group-hover:bg-black/20 transition-all shadow-inner"
        )}>
          <Icon className="w-9 h-9 drop-shadow-md" />
        </span>
        
        <span className="text-lg font-bold uppercase tracking-wider drop-shadow-sm">{title}</span>
        
        {/* Small blinking top right indicatdr for extra urgency feel */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.div 
            className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        </div>
      </motion.button>
    </div>
  );
}
