import React, { useState } from 'react';
import { Download, FileText, Save, CheckCircle } from 'lucide-react';

interface ComplianceReportingProps {
  ringelmannNumber: number;
  carbonEmissionRate: number;
  chartData: any[];
}

export const ComplianceReporting: React.FC<ComplianceReportingProps> = ({
  ringelmannNumber,
  carbonEmissionRate,
  chartData
}) => {
  const [reportSaved, setReportSaved] = useState(false);

  const handleSaveReport = () => {
    // Simulate saving to Firestore
    setReportSaved(true);
    setTimeout(() => setReportSaved(false), 3000);
  };

  const handleExportReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      ringelmannNumber,
      carbonEmissionRate,
      dataPoints: chartData.length,
      complianceStatus: ringelmannNumber < 5 ? 'Compliant' : 'Non-Compliant',
      generatedBy: 'Ringelmann Compliance Dashboard'
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Compliance Reporting</h3>
      
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Save a snapshot of the current data for EPA reporting.
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Current Status:</span>
            <span className={`ml-2 font-medium ${
              ringelmannNumber < 5 ? 'text-green-600' : 'text-red-600'
            }`}>
              {ringelmannNumber < 5 ? 'Compliant' : 'Non-Compliant'}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Data Points:</span>
            <span className="ml-2 font-medium text-gray-800">{chartData.length}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSaveReport}
            disabled={reportSaved}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
              reportSaved
                ? 'bg-green-100 text-green-700 border-green-200'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {reportSaved ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Report Saved
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Report to Firestore
              </>
            )}
          </button>

          <button
            onClick={handleExportReport}
            className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            title="Export JSON Report"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FileText className="w-3 h-3" />
            <span>Reports include timestamp, readings, and compliance status</span>
          </div>
        </div>
      </div>
    </div>
  );
};