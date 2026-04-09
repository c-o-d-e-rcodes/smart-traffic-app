import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ambulance, 
  ShieldAlert, 
  Phone, 
  AlertTriangle, 
  X, 
  MapPin, 
  Clock, 
  CheckCircle,
  Activity,
  Users
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind classes
 */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * ============================================================================
 * LIVE INCIDENT FEED CHART COMPONENT
 * ============================================================================
 * Displays dynamic real-time incident data visualization.
 * Updates every 2 seconds to simulate live data flow.
 */
const LiveIncidentChart = () => {
  const [incidents, setIncidents] = useState([
    { time: '14:32', type: 'Accident', severity: 'High', location: 'Route 44', responseTime: 3.2 },
    { time: '14:28', type: 'Breakdown', severity: 'Medium', location: 'Highway 9', responseTime: 5.1 },
    { time: '14:20', type: 'Accident', severity: 'High', location: 'Downtown', responseTime: 2.8 },
  ]);

  // Simulate new incident every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const incidentTypes = ['Accident', 'Breakdown', 'Traffic Jam', 'Hazard'];
      const severities = ['Low', 'Medium', 'High', 'Critical'];
      const locations = ['Route 44', 'Highway 9', 'Downtown', 'Airport Road', 'Bridge Lane'];

      const newIncident = {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: incidentTypes[Math.floor(Math.random() * incidentTypes.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        responseTime: (Math.random() * 6 + 1).toFixed(1),
      };

      setIncidents((prev) => [newIncident, ...prev.slice(0, 9)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  /**
   * Determine severity color for UI consistency
   */
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-900/40 border-red-500/50 text-red-300';
      case 'High':
        return 'bg-orange-900/40 border-orange-500/50 text-orange-300';
      case 'Medium':
        return 'bg-yellow-900/40 border-yellow-500/50 text-yellow-300';
      default:
        return 'bg-green-900/40 border-green-500/50 text-green-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={cn(
        'my-incident-feed-container',
        'w-full p-6 rounded-2xl',
        'bg-slate-900/50 backdrop-blur-xl',
        'border border-white/10',
        'shadow-2xl'
      )}
    >
      {/* Header */}
      <div className="my-incident-feed-header flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="my-pulse-indicator relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">Live Incident Feed</h3>
        </div>
        <span className="my-incident-count px-4 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-sm font-medium">
          {incidents.length} Active
        </span>
      </div>

      {/* Incidents List */}
      <div className="my-incidents-list space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          {incidents.map((incident, idx) => (
            <motion.div
              key={`${incident.time}-${idx}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={cn(
                'my-incident-item',
                'p-4 rounded-lg border',
                getSeverityColor(incident.severity),
                'backdrop-blur-md transition-all hover:shadow-lg'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-sm">{incident.type}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-black/30">{incident.severity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs opacity-80">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{incident.location}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs opacity-70 mb-1">{incident.time}</div>
                  <div className="text-sm font-bold text-green-300">
                    {incident.responseTime}m
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer Stats */}
      <div className="my-feed-stats mt-6 pt-4 border-t border-white/5 grid grid-cols-3 gap-3">
        {[
          { label: 'Avg Response', value: '3.7m', icon: Clock },
          { label: 'Units On Duty', value: '24', icon: Users },
          { label: 'Success Rate', value: '98%', icon: CheckCircle },
        ].map((stat, idx) => (
          <div key={idx} className="my-stat-item text-center">
            <stat.icon className="w-4 h-4 mx-auto mb-2 opacity-60" />
            <div className="text-xs opacity-60">{stat.label}</div>
            <div className="text-sm font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

/**
 * ============================================================================
 * EMERGENCY ACTION BUTTON COMPONENT
 * ============================================================================
 * Reusable emergency button with pulse animation and interactive states.
 * Props: title, icon, color, onClick, isPulsing
 */
const QuickActionButton = ({ title, icon: Icon, color = 'red', onClick, isPulsing = true }) => {
  const colorStyles = {
    red: 'bg-red-600 hover:bg-red-500 shadow-red-500/40 text-white',
    blue: 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/40 text-white',
    yellow: 'bg-yellow-500 hover:bg-yellow-400 shadow-yellow-500/40 text-slate-900',
  };

  const pulseColors = {
    red: 'bg-red-500/50',
    blue: 'bg-blue-500/50',
    yellow: 'bg-yellow-400/50',
  };

  return (
    <div className={cn('my-action-button-wrapper', 'relative group w-full flex-1')}>
      {/* Pulse effect - infinite scaling loop */}
      {isPulsing && (
        <motion.div
          className={cn(
            'my-pulse-ring',
            'absolute -inset-1.5 rounded-xl blur z-0',
            pulseColors[color]
          )}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      <motion.button
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={cn(
          'my-action-button',
          'relative z-10 flex w-full flex-col items-center justify-center gap-3 p-6 md:p-8',
          'rounded-xl shadow-xl transition-colors border border-white/10',
          colorStyles[color],
          'font-semibold tracking-wide backdrop-blur-md overflow-hidden'
        )}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl pointer-events-none" />

        {/* Icon container */}
        <span className={cn(
          'my-icon-badge',
          'relative flex items-center justify-center p-3 rounded-[12px]',
          'bg-black/10 group-hover:bg-black/20 transition-all shadow-inner'
        )}>
          <Icon className="w-8 h-8 md:w-10 md:h-10 drop-shadow-md" />
        </span>

        {/* Button title */}
        <span className="text-base md:text-lg font-bold uppercase tracking-wider drop-shadow-sm">
          {title}
        </span>

        {/* Blinking indicator on hover */}
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
};

/**
 * ============================================================================
 * DISPATCH MODAL COMPONENT
 * ============================================================================
 * Modal that opens when user clicks an emergency action button.
 * Shows dispatch details and confirmation options.
 */
const DispatchModal = ({ isOpen, serviceType, onClose, onConfirm }) => {
  const [isDispatching, setIsDispatching] = useState(false);
  const [confirmationStep, setConfirmationStep] = useState('details');

  const serviceDetails = {
    Ambulance: {
      icon: Ambulance,
      color: 'text-red-500',
      description: 'Emergency Medical Services',
      eta: '3-5 minutes',
      units: '2 available nearby',
    },
    Police: {
      icon: ShieldAlert,
      color: 'text-blue-500',
      description: 'Police Emergency Response',
      eta: '2-4 minutes',
      units: '3 available nearby',
    },
    Helpline: {
      icon: Phone,
      color: 'text-yellow-500',
      description: 'Emergency Helpline',
      eta: 'Immediate',
      units: 'Direct connection',
    },
  };

  const service = serviceDetails[serviceType] || serviceDetails.Ambulance;
  const ServiceIcon = service.icon;

  /**
   * Handle dispatch confirmation
   */
  const handleDispatchConfirm = async () => {
    setIsDispatching(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setConfirmationStep('confirmed');

    // Notify parent component
    onConfirm && onConfirm(serviceType);

    // Auto-close after 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));
    handleModalClose();
  };

  /**
   * Reset and close modal
   */
  const handleModalClose = () => {
    setConfirmationStep('details');
    setIsDispatching(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClose}
            className={cn(
              'my-modal-backdrop',
              'fixed inset-0 bg-black/50 backdrop-blur-md z-40'
            )}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'my-modal-content',
              'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              'w-full max-w-md mx-auto px-4 z-50',
              'p-8 rounded-2xl',
              'bg-slate-900/95 backdrop-blur-xl',
              'border border-white/10',
              'shadow-2xl'
            )}
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleModalClose}
              className={cn(
                'my-modal-close',
                'absolute top-4 right-4 p-2 rounded-lg',
                'hover:bg-white/10 transition-colors'
              )}
            >
              <X className="w-5 h-5 text-white/60" />
            </motion.button>

            {confirmationStep === 'details' ? (
              <>
                {/* Service Icon and Title */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', damping: 15 }}
                  className="my-modal-header text-center mb-6"
                >
                  <div className={cn(
                    'my-service-icon',
                    'flex justify-center mb-4'
                  )}>
                    <div className={cn(
                      'p-4 rounded-full bg-gradient-to-br from-white/10 to-white/5',
                      'border border-white/10'
                    )}>
                      <ServiceIcon className={cn('w-12 h-12', service.color)} />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">{serviceType} Dispatch</h2>
                  <p className="text-slate-400 text-sm">{service.description}</p>
                </motion.div>

                {/* Details Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={cn(
                    'my-modal-details',
                    'space-y-4 mb-8 p-4 rounded-xl',
                    'bg-white/5 border border-white/5'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Estimated Time:</span>
                    <span className="font-semibold text-white">{service.eta}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Available Units:</span>
                    <span className="font-semibold text-green-400">{service.units}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Location Status:</span>
                    <span className="font-semibold text-cyan-400">Tracking Active</span>
                  </div>
                </motion.div>

                {/* Confirmation Message */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center text-slate-400 text-sm mb-6"
                >
                  Your location has been detected. Confirm to dispatch emergency services.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="my-modal-actions flex gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleModalClose}
                    className={cn(
                      'flex-1 px-4 py-3 rounded-lg',
                      'bg-white/10 hover:bg-white/15 border border-white/10',
                      'text-white font-semibold transition-colors'
                    )}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDispatchConfirm}
                    disabled={isDispatching}
                    className={cn(
                      'flex-1 px-4 py-3 rounded-lg',
                      'bg-gradient-to-r from-red-600 to-orange-600',
                      'hover:from-red-500 hover:to-orange-500',
                      'disabled:from-red-700 disabled:to-orange-700',
                      'text-white font-bold transition-all shadow-lg',
                      'flex items-center justify-center gap-2'
                    )}
                  >
                    {isDispatching ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Dispatching...
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4" />
                        Confirm Dispatch
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </>
            ) : (
              /* Confirmation Success State */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="my-modal-success text-center py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="flex justify-center mb-4"
                >
                  <div className="p-4 rounded-full bg-green-500/20 border border-green-500/50">
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Dispatch Confirmed!</h3>
                <p className="text-slate-400 mb-4">
                  Emergency unit is en route to your location.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-cyan-400 font-semibold">Unit ID: #EM-2847</p>
                  <p className="text-slate-400">ETA: 3-5 minutes</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/**
 * ============================================================================
 * MAIN EMERGENCY RESPONSE CENTER COMPONENT
 * ============================================================================
 * Unified Emergency Response Center for Smart Traffic Dashboard.
 * Integrates quick-action buttons, live incident feed, and modal system.
 * All classes prefixed with 'my-' to prevent merge conflicts.
 */
export default function EmergencyResponseCenter() {
  const [activeModal, setActiveModal] = useState(null);
  const [dispatchedServices, setDispatchedServices] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  /**
   * Handle emergency button click
   */
  const handleEmergencyAction = useCallback((serviceType) => {
    setActiveModal(serviceType);
  }, []);

  /**
   * Handle dispatch confirmation from modal
   */
  const handleDispatchConfirm = useCallback((serviceType) => {
    // Track dispatched services
    setDispatchedServices((prev) => [
      ...prev,
      { type: serviceType, timestamp: new Date().toLocaleTimeString() },
    ]);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 4000);
  }, []);

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className={cn(
      'my-emergency-response-center',
      'relative w-full min-h-screen p-4 md:p-8 lg:p-10',
      'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
      'text-white overflow-hidden'
    )}>
      {/* Ambient background glow effects */}
      <div className="my-bg-glow-1 absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="my-bg-glow-2 absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="my-bg-glow-3 absolute top-1/2 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className={cn(
          'my-content-container',
          'relative z-10 max-w-6xl mx-auto'
        )}
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className={cn(
            'my-header-section',
            'mb-12 text-center'
          )}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </div>
            <h1 className={cn(
              'my-main-title',
              'text-4xl md:text-5xl font-bold font-inter tracking-tight',
              'bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent'
            )}>
              Emergency Response Center
            </h1>
          </div>
          <motion.p
            variants={itemVariants}
            className={cn(
              'my-subtitle',
              'text-slate-400 text-lg font-medium max-w-2xl mx-auto'
            )}
          >
            Rapid response emergency services at your fingertips. Quick access to ambulance, police,
            and helpline services.
          </motion.p>
        </motion.div>

        {/* Quick Action Buttons Section */}
        <motion.div
          variants={itemVariants}
          className={cn(
            'my-quick-actions-section',
            'mb-12 p-8 rounded-2xl',
            'bg-slate-900/50 backdrop-blur-xl',
            'border border-white/10',
            'shadow-2xl'
          )}
        >
          <motion.h2
            variants={itemVariants}
            className={cn(
              'my-quick-actions-title',
              'text-2xl font-bold mb-8 text-center text-white'
            )}
          >
            Quick Emergency Actions
          </motion.h2>

          {/* Buttons Grid - Responsive */}
          <div className={cn(
            'my-buttons-grid',
            'grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4'
          )}>
            <QuickActionButton
              title="Ambulance"
              icon={Ambulance}
              color="red"
              onClick={() => handleEmergencyAction('Ambulance')}
              isPulsing={true}
            />
            <QuickActionButton
              title="Police"
              icon={ShieldAlert}
              color="blue"
              onClick={() => handleEmergencyAction('Police')}
              isPulsing={true}
            />
            <QuickActionButton
              title="Helpline"
              icon={Phone}
              color="yellow"
              onClick={() => handleEmergencyAction('Helpline')}
              isPulsing={true}
            />
          </div>
        </motion.div>

        {/* Live Incident Feed Section */}
        <motion.div
          variants={itemVariants}
          className={cn(
            'my-live-feed-section',
            'mb-12'
          )}
        >
          <LiveIncidentChart />
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          variants={itemVariants}
          className={cn(
            'my-stats-dashboard',
            'grid grid-cols-1 md:grid-cols-3 gap-6'
          )}
        >
          {[
            {
              label: 'Average Response Time',
              value: '3.2m',
              icon: Clock,
              color: 'from-orange-500/20 to-red-500/20',
            },
            {
              label: 'Active Units',
              value: '24',
              icon: Activity,
              color: 'from-green-500/20 to-emerald-500/20',
            },
            {
              label: 'Success Rate',
              value: '98.5%',
              icon: CheckCircle,
              color: 'from-blue-500/20 to-cyan-500/20',
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, scale: 1.02 }}
              className={cn(
                'my-stat-card',
                'p-6 rounded-xl',
                `bg-gradient-to-br ${stat.color}`,
                'border border-white/10',
                'backdrop-blur-md transition-all cursor-pointer'
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 opacity-60" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dispatched Services Log */}
        {dispatchedServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'my-dispatch-log',
              'mt-12 p-6 rounded-xl',
              'bg-slate-900/50 backdrop-blur-xl',
              'border border-white/10'
            )}
          >
            <h3 className="text-lg font-bold text-white mb-4">Recent Dispatch Activity</h3>
            <div className="my-dispatch-log-items space-y-3">
              {dispatchedServices.slice(-5).reverse().map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    'my-log-item',
                    'flex items-center justify-between p-3 rounded-lg',
                    'bg-white/5 border border-white/5'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-white font-medium">{service.type} Unit Dispatched</span>
                  </div>
                  <span className="text-xs text-slate-400">{service.timestamp}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Dispatch Modal */}
      <DispatchModal
        isOpen={activeModal !== null}
        serviceType={activeModal}
        onClose={() => setActiveModal(null)}
        onConfirm={handleDispatchConfirm}
      />

      {/* Success Alert Toast */}
      <AnimatePresence>
        {showSuccessAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              'my-success-toast',
              'fixed bottom-8 left-8 z-50',
              'p-4 rounded-xl',
              'bg-gradient-to-r from-green-600 to-emerald-600',
              'border border-green-500/50',
              'shadow-2xl backdrop-blur-md',
              'flex items-center gap-3'
            )}
          >
            <CheckCircle className="w-6 h-6 text-white" />
            <div>
              <p className="text-white font-bold text-sm">Unit Dispatched Successfully</p>
              <p className="text-green-100 text-xs">Emergency services are on the way</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styling */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
}
