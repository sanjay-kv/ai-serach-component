import React, { useState } from 'react';
import { DashboardGenerator } from './components/DashboardGenerator';
import { GeneratedDashboard } from './components/GeneratedDashboard';
import { DashboardConfig } from './types';

function App() {
  const [currentDashboard, setCurrentDashboard] = useState<DashboardConfig | null>(null);
  const [aiResponse, setAiResponse] = useState<string>('');

  const handleDashboardGenerated = (config: DashboardConfig, response: string) => {
    setCurrentDashboard(config);
    setAiResponse(response);
  };

  const handleReset = () => {
    setCurrentDashboard(null);
    setAiResponse('');
  };

  if (currentDashboard) {
    return (
      <GeneratedDashboard
        config={currentDashboard}
        aiResponse={aiResponse}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Dashboard Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Describe what you want to track and I'll instantly create a beautiful, 
            custom dashboard with relevant metrics and visualizations.
          </p>
        </div>

        <DashboardGenerator onDashboardGenerated={handleDashboardGenerated} />

        <div className="mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Analysis</h3>
              <p className="text-sm text-gray-600">AI understands your needs and creates relevant metrics</p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Creation</h3>
              <p className="text-sm text-gray-600">Get a fully functional dashboard in seconds</p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Beautiful Design</h3>
              <p className="text-sm text-gray-600">Professional layouts with interactive charts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;