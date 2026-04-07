import React from 'react';
import EmergencySection from './components/EmergencySection';

function App() {
  return (
    <div className="min-h-screen bg-[#050810] flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white tracking-wide">Smart Traffic Dashboard</h1>
          <p className="text-slate-400 mt-2">Real-time monitoring and emergency response</p>
        </header>

        {/* Emergency Section Module */}
        <EmergencySection />
      </div>
    </div>
  );
}

export default App;
