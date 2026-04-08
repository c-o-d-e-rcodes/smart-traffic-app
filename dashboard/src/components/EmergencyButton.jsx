import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS class names
 * Combines clsx and tailwind-merge for optimal class name handling
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Color theme presets for emergency buttons
 * Each color includes base color, hover state, shadow, and text color
 */
const colorStyles = {
  red: "bg-red-600 hover:bg-red-500 shadow-red-500/40 text-white",
  yellow: "bg-yellow-500 hover:bg-yellow-400 shadow-yellow-500/40 text-slate-900",
  green: "bg-green-600 hover:bg-green-500 shadow-green-500/40 text-white",
};

/**
 * Pulse animation colors corresponding to button color themes
 * Used for the background glow effect
 */
const pulseColors = {
  red: "bg-red-500/50",
  yellow: "bg-yellow-400/50",
  green: "bg-green-500/50",
};

/**
 * EmergencyButton Component
 * A highly interactive, animated button for emergency actions with pulse effect and hover animations
 * 
 * @param {string} title - The text displayed on the button
 * @param {React.Component} icon - Lucide React icon component to display
 * @param {string} color - Color theme: 'red', 'yellow', or 'green'
 * @param {function} onClick - Callback function when button is clicked
 * @param {boolean} isPulsing - Whether to show the pulsing background glow animation (default: true)
 */
export default function EmergencyButton({ 
  title, 
  icon: Icon, 
  color = "red", 
  onClick, 
  isPulsing = true 
}) {
  return (
    <div className="relative group w-full flex-1">
      {/* Animated pulse background glow effect */}
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
      
      {/* Main interactive button */}
      <motion.button
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={cn(
          "relative z-10 flex w-full flex-col items-center justify-center gap-3 p-6 sm:p-8",
          "rounded-xl shadow-xl transition-colors border border-white/10",
          colorStyles[color],
          "font-semibold tracking-wide backdrop-blur-md overflow-hidden"
        )}
      >
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl pointer-events-none" />
        
        {/* Icon container with background */}
        <span className={cn(
          "relative flex items-center justify-center p-3 sm:p-4 rounded-lg bg-black/10 group-hover:bg-black/20 transition-all shadow-inner"
        )}>
          <Icon className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-md" />
        </span>
        
        {/* Button title text */}
        <span className="text-base sm:text-lg font-bold uppercase tracking-wider drop-shadow-sm text-center">
          {title}
        </span>
        
        {/* Blinking indicator dot for urgency emphasis */}
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
