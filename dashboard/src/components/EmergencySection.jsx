import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ambulance, ShieldAlert, Phone, Mic, AlertTriangle, Clock, X } from 'lucide-react';
import EmergencyButton from './EmergencyButton';

export default function EmergencySection() {
  const [activeMessage, setActiveMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [time, setTime] = useState('');

  // Real-time clock bonus feature
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Show random accident alert after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleAction = (service) => {
    setActiveMessage(`Calling ${service}...`);
    setTimeout(() => {
      setActiveMessage('');
    }, 3500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section className="relative w-full min-h-[400px] p-6 lg:p-10 bg-[#0b1120] text-white overflow-hidden rounded-2xl shadow-2xl border border-white/5">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Accident Alert Popup */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="absolute top-6 left-6 z-50 flex items-center gap-3 bg-red-950/80 border border-red-500/50 p-4 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] backdrop-blur-md"
          >
            <motion.div animate={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}>
              <AlertTriangle className="text-red-500 w-6 h-6" />
            </motion.div>
            <div>
              <p className="text-sm font-bold text-red-400">Accident Reported</p>
              <p className="text-xs text-red-200">2.5 km away - Route 44</p>
            </div>
            <button onClick={() => setShowAlert(false)} className="ml-2 text-white/50 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col gap-8"
      >
        {/* Header Area */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
              </span>
              <h2 className="text-3xl font-bold font-inter tracking-tight text-white drop-shadow-sm">
                Emergency Help
              </h2>
            </motion.div>
            <motion.p variants={itemVariants} className="text-slate-400 mt-2 font-medium">Quick access to rapid response services.</motion.p>
          </div>

          <motion.div variants={itemVariants} className="flex items-center gap-4">
            {/* Clock Widget */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 shadow-inner backdrop-blur-sm">
              <Clock className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold tracking-widest text-slate-200">{time}</span>
            </div>
            {/* Voice Command Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center p-3 rounded-full bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-all group shadow-[0_0_15px_rgba(37,99,235,0.2)]"
              title="Voice Input"
            >
              <Mic className="w-5 h-5 group-hover:animate-pulse" />
            </motion.button>
          </motion.div>
        </div>

        {/* Buttons Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-2">
          <EmergencyButton 
            title="Ambulance" 
            icon={Ambulance} 
            color="red" 
            onClick={() => handleAction('Ambulance')} 
          />
          <EmergencyButton 
            title="Police" 
            icon={ShieldAlert} 
            color="yellow" 
            onClick={() => handleAction('Police')} 
          />
          <EmergencyButton 
            title="Helpline" 
            icon={Phone} 
            color="green" 
            onClick={() => handleAction('Helpline')} 
          />
        </motion.div>

        {/* Interactive Toast / Message */}
        <div className="h-12 w-full flex items-center justify-center">
          <AnimatePresence>
            {activeMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="overflow-hidden relative flex items-center bg-white border border-transparent px-6 py-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-yellow-500 opacity-20" />
                <span className="relative z-10 text-slate-900 font-bold tracking-wide flex items-center gap-2">
                  <motion.span 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full block" 
                  />
                  {activeMessage}
                </span>
                
                {/* Ripple animation on the toast itself */}
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
