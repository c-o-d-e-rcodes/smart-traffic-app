import React from 'react';
import EmergencySection from './components/EmergencySection';

/**
 * App Component
 * Main application container that serves as the Smart Traffic Dashboard
 * Provides responsive layout and houses the EmergencySection module
 */
function App() {
  return (
    <div className="min-h-screen bg-[#050810] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 gap-6 sm:gap-8">
      {/* Main content container with max-width constraint */}
      <div className="w-full max-w-5xl">
        
        {/* Dashboard Header Section */}
        <header className="mb-8 sm:mb-10 md:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide drop-shadow-lg">
            Smart Traffic Dashboard
          </h1>
          <p className="text-slate-400 mt-2 sm:mt-3 text-sm sm:text-base font-medium">
            Real-time monitoring and emergency response
          </p>
        </header>

        {/* Emergency Section Module - Main Feature */}
        <EmergencySection />
      </div>
    </div>
  );
}

export default App;
