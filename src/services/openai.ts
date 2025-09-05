// OpenAI service for processing prompts and generating dynamic dashboards
class OpenAIService {
  private apiKey: string | null = null;
  private baseURL = 'https://api.openai.com/v1/chat/completions';

  setApiKey(key: string) {
    this.apiKey = key;
  }

  async generateDashboard(prompt: string): Promise<{ response: string; config: any }> {
    if (!this.apiKey) {
      return this.generateDemoDashboard(prompt);
    }

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a dashboard generator AI. Based on user prompts, create dashboard configurations with relevant metrics, charts, and data. Always respond with a JSON object containing:
              {
                "response": "Brief explanation of the dashboard",
                "config": {
                  "title": "Dashboard Title",
                  "description": "Brief description",
                  "theme": "blue|green|purple|orange|red",
                  "metrics": [
                    {
                      "id": "unique-id",
                      "title": "Metric Name",
                      "value": "numeric value or string",
                      "subtitle": "description",
                      "icon": "lucide icon name",
                      "trend": "up|down|stable",
                      "status": "normal|warning|critical",
                      "unit": "unit of measurement"
                    }
                  ],
                  "charts": [
                    {
                      "id": "unique-id",
                      "title": "Chart Title",
                      "type": "line|bar|pie",
                      "color": "#hex-color",
                      "data": [{"time": "label", "value": number}]
                    }
                  ]
                }
              }`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '{}';
      
      try {
        return JSON.parse(content);
      } catch {
        return this.generateDemoDashboard(prompt);
      }
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return this.generateDemoDashboard(prompt);
    }
  }

  generateDemoDashboard(prompt: string): { response: string; config: any } {
    const lowerPrompt = prompt.toLowerCase();
    
    // Sales Dashboard
    if (lowerPrompt.includes('sales') || lowerPrompt.includes('revenue') || lowerPrompt.includes('business')) {
      return {
        response: "I've created a comprehensive sales dashboard with key performance metrics, revenue tracking, and growth indicators.",
        config: {
          title: "Sales Performance Dashboard",
          description: "Track revenue, conversions, and business growth metrics",
          theme: "green",
          metrics: [
            {
              id: "revenue",
              title: "Monthly Revenue",
              value: "$124,500",
              subtitle: "+12% from last month",
              icon: "DollarSign",
              trend: "up",
              status: "normal"
            },
            {
              id: "conversions",
              title: "Conversion Rate",
              value: "3.2%",
              subtitle: "Above industry average",
              icon: "TrendingUp",
              trend: "up",
              status: "normal"
            },
            {
              id: "customers",
              title: "New Customers",
              value: "847",
              subtitle: "This month",
              icon: "Users",
              trend: "stable",
              status: "normal"
            }
          ],
          charts: [
            {
              id: "revenue-chart",
              title: "Revenue Trend",
              type: "line",
              color: "#10B981",
              data: Array.from({length: 12}, (_, i) => ({
                time: new Date(Date.now() - (11-i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
                value: 80000 + Math.random() * 50000 + i * 3000
              }))
            }
          ]
        }
      };
    }
    
    // Website Analytics
    if (lowerPrompt.includes('website') || lowerPrompt.includes('analytics') || lowerPrompt.includes('traffic')) {
      return {
        response: "I've generated a website analytics dashboard showing traffic, engagement, and performance metrics.",
        config: {
          title: "Website Analytics Dashboard",
          description: "Monitor website traffic, user engagement, and performance",
          theme: "blue",
          metrics: [
            {
              id: "visitors",
              title: "Daily Visitors",
              value: "12,847",
              subtitle: "+8% vs yesterday",
              icon: "Eye",
              trend: "up",
              status: "normal"
            },
            {
              id: "bounce-rate",
              title: "Bounce Rate",
              value: "32%",
              subtitle: "Below average",
              icon: "MousePointer",
              trend: "down",
              status: "normal"
            },
            {
              id: "page-speed",
              title: "Page Load Time",
              value: "1.2s",
              subtitle: "Excellent performance",
              icon: "Zap",
              trend: "stable",
              status: "normal"
            }
          ],
          charts: [
            {
              id: "traffic-chart",
              title: "Daily Traffic",
              type: "line",
              color: "#3B82F6",
              data: Array.from({length: 30}, (_, i) => ({
                time: new Date(Date.now() - (29-i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
                value: 8000 + Math.random() * 8000 + Math.sin(i/5) * 2000
              }))
            }
          ]
        }
      };
    }
    
    // Health/Fitness Dashboard
    if (lowerPrompt.includes('health') || lowerPrompt.includes('fitness') || lowerPrompt.includes('workout')) {
      return {
        response: "I've created a health and fitness dashboard to track your wellness metrics and progress.",
        config: {
          title: "Health & Fitness Dashboard",
          description: "Track your health metrics, workouts, and wellness goals",
          theme: "orange",
          metrics: [
            {
              id: "steps",
              title: "Daily Steps",
              value: "8,432",
              subtitle: "Goal: 10,000 steps",
              icon: "Activity",
              trend: "up",
              status: "normal"
            },
            {
              id: "calories",
              title: "Calories Burned",
              value: "2,150",
              subtitle: "Today",
              icon: "Flame",
              trend: "up",
              status: "normal"
            },
            {
              id: "heart-rate",
              title: "Avg Heart Rate",
              value: "72 BPM",
              subtitle: "Resting rate",
              icon: "Heart",
              trend: "stable",
              status: "normal"
            }
          ],
          charts: [
            {
              id: "activity-chart",
              title: "Weekly Activity",
              type: "bar",
              color: "#F59E0B",
              data: Array.from({length: 7}, (_, i) => ({
                time: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
                value: 5000 + Math.random() * 8000
              }))
            }
          ]
        }
      };
    }
    
    // Default Dashboard
    return {
      response: "I've created a general analytics dashboard based on your request. You can customize it further by being more specific about your needs.",
      config: {
        title: "Custom Analytics Dashboard",
        description: "General purpose dashboard with key metrics",
        theme: "purple",
        metrics: [
          {
            id: "total-users",
            title: "Total Users",
            value: "24,891",
            subtitle: "Active users",
            icon: "Users",
            trend: "up",
            status: "normal"
          },
          {
            id: "performance",
            title: "Performance Score",
            value: "94%",
            subtitle: "System health",
            icon: "Gauge",
            trend: "stable",
            status: "normal"
          },
          {
            id: "growth",
            title: "Growth Rate",
            value: "+15.3%",
            subtitle: "Month over month",
            icon: "TrendingUp",
            trend: "up",
            status: "normal"
          }
        ],
        charts: [
          {
            id: "trend-chart",
            title: "Trend Analysis",
            type: "line",
            color: "#8B5CF6",
            data: Array.from({length: 20}, (_, i) => ({
              time: new Date(Date.now() - (19-i) * 60 * 60 * 1000).toLocaleTimeString(),
              value: 50 + Math.random() * 50 + Math.sin(i/3) * 20
            }))
          }
        ]
      }
    };
  }
}

export const openaiService = new OpenAIService();