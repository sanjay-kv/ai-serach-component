import React, { useState } from 'react';
import { Send, Bot, User, AlertCircle } from 'lucide-react';
import { openaiService } from '../services/openai';
import { AIResponse } from '../types';

interface AIPromptInterfaceProps {
  onResponse: (response: AIResponse) => void;
}

export const AIPromptInterface: React.FC<AIPromptInterfaceProps> = ({ onResponse }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    
    try {
      let content: string;
      
      if (apiKey) {
        openaiService.setApiKey(apiKey);
        content = await openaiService.processPrompt(prompt);
      } else {
        // Use demo responses if no API key
        content = openaiService.generateDemoResponse(prompt);
      }

      const response: AIResponse = {
        content,
        timestamp: Date.now(),
        type: 'analysis'
      };

      setResponses(prev => [...prev, response]);
      onResponse(response);
      setPrompt('');
    } catch (error) {
      const errorResponse: AIResponse = {
        content: error instanceof Error ? error.message : 'An error occurred',
        timestamp: Date.now(),
        type: 'alert'
      };
      setResponses(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    setShowApiKeyInput(false);
    openaiService.setApiKey(key);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-gray-800">AI Compliance Assistant</h3>
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
      </div>

      {showApiKeyInput && (
        <div className="p-4 bg-yellow-50 border-b border-gray-100">
          <div className="flex items-start gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
            <p className="text-sm text-orange-700">
              Add your OpenAI API key to enable real AI responses. Without it, demo responses will be used.
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="sk-..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              onChange={(e) => handleApiKeySubmit(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="p-4 max-h-64 overflow-y-auto">
        {responses.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Bot className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p>Ask me about compliance, emissions, or Ringelmann readings</p>
          </div>
        ) : (
          <div className="space-y-3">
            {responses.map((response, index) => (
              <div key={index} className="flex gap-3">
                <Bot className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-gray-800">{response.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(response.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask about compliance, emissions, or data analysis..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};