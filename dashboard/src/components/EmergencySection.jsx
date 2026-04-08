import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ambulance, ShieldAlert, Phone, Mic, AlertTriangle, Clock, X } from 'lucide-react';
import EmergencyButton from './EmergencyButton';

/**
 * EmergencySection Component
 * Main dashboard section for emergency service access with real-time alerts and responsive design
 * Features include: real-time clock, accident alerts, voice command button, and emergency service buttons
 */
export default function EmergencySection() {
  // === STATE MANAGEMENT ===
  const [activeMessage, setActiveMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [time, setTime] = useState('');

  // === EFFECTS ===

  /**
   * Effect: Real-time clock update
   * Updates displayed time every second for real-time monitoring capability
   */
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Effect: Automatic accident alert display
   * Triggers an accident notification after 5 seconds for demonstration
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // === EVENT HANDLERS ===

  /**
   * Handle emergency service action
   * Displays feedback message when a service button is clicked
   * Message automatically clears after 3.5 seconds
   */
  const handleAction = (service) => {
    setActiveMessage(`Calling ${service}...`);
    setTimeout(() => {
      setActiveMessage('');
    }, 3500);
  };

  // === ANIMATION VARIANTS ===

  /**
   * Container animation: staggered entrance effect
   * Creates cascading animation for child elements
   */
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut", 
        staggerChildren: 0.15 
      }
    }
  };

  /**
   * Individual item animation: smooth fade and slide
   * Applied to each major section for professional entrance
   */
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section className="relative w-full min-h-[400px] sm:min-h-[450px] md:min-h-[500px] p-4 sm:p-6 lg:p-10 bg-[#0b1120] text-white overflow-hidden rounded-2xl shadow-2xl border border-white/5">
      
      {/* BACKGROUND AMBIENT GLOW EFFECTS */}
      <div className="absolute top-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ACCIDENT ALERT POPUP */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-center gap-2 sm:gap-3 bg-red-950/80 border border-red-500/50 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] backdrop-blur-md max-w-xs"
          >
            {/* Animated alert icon */}
            <motion.div 
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }} 
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              className="flex-shrink-0"
            >
              <AlertTriangle className="text-red-500 w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
            
            {/* Alert content */}
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-bold text-red-400 truncate">Accident Reported</p>
              <p className="text-xs text-red-200 truncate">2.5 km away - Route 44</p>
            </div>
            
            {/* Close button */}
            <button 
              onClick={() => setShowAlert(false)} 
              className="flex-shrink-0 text-white/50 hover:text-white transition-colors"
              aria-label="Close alert"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT CONTAINER */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-6 sm:gap-8"
      >
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          {/* Title and Description */}
          <div className="flex-1">
            <motion.div 
              variants={itemVariants} 
              className="flex items-center gap-2 sm:gap-3"
            >
              {/* Live indicator pulse */}
              <span className="relative flex h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-red-500"></span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
                Emergency Help
              </h2>
            </motion.div>
            <motion.p 
              variants={itemVariants} 
              className="text-xs sm:text-sm text-slate-400 mt-2 font-medium"
            >
              Quick access to rapid response services
            </motion.p>
          </div>

          {/* Utilities Section: Clock and Voice Command */}
          <motion.div 
            variants={itemVariants} 
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0 w-full sm:w-auto"
          >
            {/* Real-time Clock Widget */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/5 rounded-full border border-white/10 shadow-inner backdrop-blur-sm flex-1 sm:flex-none min-w-0">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-slate-200 truncate">
                {time || '00:00:00'}
              </span>
            </div>
            
            {/* Voice Command Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center p-2 sm:p-3 rounded-full bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-all group shadow-[0_0_15px_rgba(37,99,235,0.2)] flex-shrink-0"
              title="Voice Input"
              aria-label="Voice command button"
            >
              <Mic className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
            </motion.button>
          </motion.div>
        </div>

        {/* EMERGENCY BUTTONS GRID */}
        <motion.div 
          variants={itemVariants} 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {/* Ambulance Button */}
          <EmergencyButton 
            title="Ambulance" 
            icon={Ambulance} 
            color="red" 
            onClick={() => handleAction('Ambulance')} 
          />
          
          {/* Police Button */}
          <EmergencyButton 
            title="Police" 
            icon={ShieldAlert} 
            color="yellow" 
            onClick={() => handleAction('Police')} 
          />
          
          {/* Helpline Button */}
          <EmergencyButton 
            title="Helpline" 
            icon={Phone} 
            color="green" 
            onClick={() => handleAction('Helpline')} 
          />
        </motion.div>

        {/* FEEDBACK MESSAGE TOAST */}
        <div className="h-12 sm:h-14 w-full flex items-center justify-center">
          <AnimatePresence>
            {activeMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="overflow-hidden relative flex items-center gap-2 sm:gap-3 bg-white border border-transparent px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                {/* Gradient overlay for visual depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-yellow-500 opacity-20" />
                
                {/* Loading spinner animation */}
                <motion.span 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-slate-900 border-t-transparent rounded-full flex-shrink-0" 
                />
                
                {/* Message text */}
                <span className="relative z-10 text-slate-900 font-bold tracking-wide text-sm sm:text-base truncate">
                  {activeMessage}
                </span>
                
                {/* Ripple animation background */}
                <motion.div 
                  className="absolute inset-0 bg-black/10 rounded-full z-0"
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
