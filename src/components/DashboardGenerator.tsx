import React, { useState } from 'react';
import { Search, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { openaiService } from '../services/openai';
import { DashboardConfig } from '../types';

interface DashboardGeneratorProps {
  onDashboardGenerated: (config: DashboardConfig, response: string) => void;
}

export const DashboardGenerator: React.FC<DashboardGeneratorProps> = ({ onDashboardGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    
    try {
      if (apiKey) {
        openaiService.setApiKey(apiKey);
      }

      const result = await openaiService.generateDashboard(prompt);
      onDashboardGenerated(result.config, result.response);
      setPrompt('');
    } catch (error) {
      console.error('Error generating dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    setShowApiKeyInput(false);
    openaiService.setApiKey(key);
  };

  const examplePrompts = [
    "Create a sales dashboard for my e-commerce business",
    "I need a website analytics dashboard",
    "Build a health and fitness tracking dashboard",
    "Show me a social media performance dashboard",
    "Create a project management dashboard"
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Dashboard Generator</h2>
              <p className="text-sm text-gray-600">Describe what you want to track and I'll create a custom dashboard</p>
            </div>
          </div>
          <button
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              apiKey 
                ? 'bg-green-100 text-green-700' 
                : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
            }`}
          >
            {apiKey ? 'API Connected' : 'Add API Key'}
          </button>
        </div>

        {showApiKeyInput && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
              <p className="text-sm text-orange-700">
                Add your OpenAI API key for advanced AI-generated dashboards. Without it, I'll use smart demo templates.
              </p>
            </div>
            <input
              type="password"
              placeholder="sk-..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              onChange={(e) => handleApiKeySubmit(e.target.value)}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Create a sales dashboard for my online store' or 'I need to track website analytics'"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-medium"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating Dashboard...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Dashboard
              </>
            )}
          </button>
        </form>
      </div>

      <div className="p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Try these examples:</h3>
        <div className="grid grid-cols-1 gap-2">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              className="text-left p-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100 hover:border-gray-200"
              disabled={isLoading}
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};