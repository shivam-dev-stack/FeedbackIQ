'use client';
import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  FileText, 
  MessageSquare, 
  ListTree, 
  Lightbulb, 
  BarChart3, 
  Target, 
  CheckCircle2, 
  ArrowRight,
  User,
  ShieldAlert,
  Layers,
  Info
} from 'lucide-react';

export default function App() {
  const [projectName, setProjectName] = useState('My SaaS Product');
  const [projectDescription, setProjectDescription] = useState('Web application for small businesses to manage their invoices...');
  const [selectedSource, setSelectedSource] = useState('Customer Reviews');
  const [selectedGoal, setSelectedGoal] = useState('Understand sentiment');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const triggerMessage = (msg) => {
    setAlertMessage(msg);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans antialiased flex flex-col relative selection:bg-indigo-500 selection:text-white">
      
      {}
      {showAlert && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <Info className="w-5 h-5 text-indigo-400" />
          <span className="text-sm font-medium">{alertMessage}</span>
        </div>
      )}

      {}
      <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">FeedbackIQ</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => triggerMessage('Help center documentation is available!')}
            className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition"
            title="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" 
              alt="Shivam" 
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
              onError={(e)=>{e.target.src="https://placehold.co/100x100/6366f1/ffffff?text=S"}}
            />
            <span className="text-sm font-semibold text-slate-700 hidden sm:inline">Shivam</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </header>

      {}
      <div className="flex-1 max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 p-4 md:p-8 gap-8">

        {}
        <aside className="lg:col-span-3 flex flex-col justify-between space-y-8 bg-white lg:bg-transparent p-6 lg:p-0 rounded-2xl border lg:border-none border-slate-200 shadow-sm lg:shadow-none">
          <div className="space-y-8">
            {/* Steps Timeline */}
            <div className="space-y-6 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-200 -z-0"></div>

              {/* Step 1 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-md shadow-indigo-100 ring-4 ring-white">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">1. Account Created</h4>
                  <p className="text-sm font-medium text-slate-600">Welcome to FeedbackIQ!</p>
                </div>
              </div>

              {/* Step 2 (Active) */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-md shadow-indigo-200 ring-4 ring-indigo-50">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Create Your First Project</h4>
                  <p className="text-sm font-semibold text-slate-900">Add details about your product</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 text-slate-400 flex items-center justify-center text-sm font-bold ring-4 ring-white">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Import Feedback</h4>
                  <p className="text-sm font-medium text-slate-500">Upload your CSV or Excel file</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 text-slate-400 flex items-center justify-center text-sm font-bold ring-4 ring-white">
                  4
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Run Analysis</h4>
                  <p className="text-sm font-medium text-slate-500">Get insights from your data</p>
                </div>
              </div>
            </div>

            {/* Illustration Graphic Box */}
            <div className="hidden lg:flex flex-col items-center justify-center p-6 bg-gradient-to-b from-indigo-50/50 to-indigo-100/30 rounded-2xl border border-indigo-100/60 text-center relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-indigo-200/40 rounded-full blur-2xl"></div>
              <div className="flex gap-3 mb-4">
                <div className="w-12 h-16 bg-white rounded-lg shadow-md flex flex-col justify-end p-2 gap-1 animate-pulse">
                  <div className="w-full h-2 bg-indigo-200 rounded"></div>
                  <div className="w-3/4 h-2 bg-indigo-400 rounded"></div>
                </div>
                <div className="w-12 h-20 bg-indigo-600 rounded-lg shadow-lg flex flex-col justify-end p-2 gap-1">
                  <div className="w-full h-2 bg-indigo-400 rounded"></div>
                  <div className="w-1/2 h-2 bg-white rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Need Help Card */}
          <div className="bg-indigo-50/80 border border-indigo-100 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-xs">
                ?
              </div>
              <h5 className="font-semibold text-sm text-indigo-950">Need help?</h5>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Check our documentation or take a quick tour.
            </p>
            <button 
              onClick={() => triggerMessage('Opening documentation walkthrough...')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
            >
              View docs <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </aside>

        {}
        <main className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10 space-y-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-2">Create your first project</h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              A project represents a product, app or service whose customer feedback you want to analyze.
            </p>
          </div>

          <div className="space-y-6">
            {/* Project Name Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-900">
                Project name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  maxLength={150}
                  placeholder="e.g. My SaaS Product" 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition shadow-sm"
                />
                <span className="absolute right-3.5 bottom-3 text-xs text-slate-400 font-medium">
                  {projectName.length}/150
                </span>
              </div>
              <p className="text-xs text-slate-500">Choose a clear name for your product or service.</p>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-900">
                Description <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <textarea 
                  rows="3"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  maxLength={500}
                  placeholder="e.g. Web application for small businesses to manage their invoices..."
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition shadow-sm resize-none"
                ></textarea>
                <span className="absolute right-3.5 bottom-3 text-xs text-slate-400 font-medium">
                  {projectDescription.length}/500
                </span>
              </div>
              <p className="text-xs text-slate-500">A short description helps us understand your project.</p>
            </div>

            {/* Source Selection Cards */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-sm font-semibold text-slate-900">
                  What kind of feedback will you analyze? <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <p className="text-xs text-slate-500">Select the sources you plan to use. You can add more later.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Customer Reviews', title: 'Customer Reviews', desc: 'App stores, product reviews, website feedback', icon: FileText },
                  { id: 'Support Tickets', title: 'Support Tickets', desc: 'Customer support conversations', icon: MessageSquare },
                  { id: 'Surveys', title: 'Surveys', desc: 'NPS, CSAT or custom surveys', icon: ListTree }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedSource === item.id;
                  return (
                    <div 
                      key={item.id}
                      onClick={() => setSelectedSource(item.id)}
                      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50/20 shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs shadow-sm">
                          ✓
                        </div>
                      )}
                      <div className="space-y-3 mb-4">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-slate-900">{item.title}</h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Goal Selection Cards */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-sm font-semibold text-slate-900">
                  What is your primary goal? <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <p className="text-xs text-slate-500">This helps us tailor the analysis and recommendations.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Understand sentiment', title: 'Understand sentiment', desc: 'Find out what customers like or dislike', icon: Lightbulb },
                  { id: 'Identify common topics', title: 'Identify common topics', desc: 'Discover recurring themes and issues', icon: BarChart3 },
                  { id: 'Get actionable suggestions', title: 'Get actionable suggestions', desc: 'Receive AI-powered recommendations', icon: Target }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedGoal === item.id;
                  return (
                    <div 
                      key={item.id}
                      onClick={() => setSelectedGoal(item.id)}
                      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50/20 shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs shadow-sm">
                          ✓
                        </div>
                      )}
                      <div className="space-y-3 mb-4">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-slate-900">{item.title}</h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button 
                onClick={() => triggerMessage('Project creation skipped for now.')}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition px-2 py-1"
              >
                Skip for now
              </button>
              
              <button 
                onClick={() => triggerMessage(`Project "${projectName}" created successfully!`)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium text-sm shadow-lg shadow-indigo-200 transition flex items-center gap-2"
              >
                Create project <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>

        {}
        <aside className="lg:col-span-3 space-y-6">
          
          {/* Interactive Preview Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="inline-block bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Preview
            </div>

            {/* Simulated Dashboard UI Mockup */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center text-white text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-xs text-slate-900">FeedbackIQ</span>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-900 truncate">{projectName || 'My SaaS Product'}</h4>
                <p className="text-[10px] text-slate-500">Customer feedback and insights</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-semibold text-slate-400 block">Feedback records</span>
                  <span className="text-sm font-bold text-slate-900">1,240</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-semibold text-slate-400 block">Active themes</span>
                  <span className="text-sm font-bold text-slate-900">18</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-900 block">Sentiment distribution</span>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-emerald-500 border-r-amber-400 flex items-center justify-center text-[10px] font-bold text-slate-700">
                    72%
                  </div>
                  <div className="space-y-1 text-[10px]">
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Positive 72%</div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Neutral 18%</div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Negative 10%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tip Callout */}
          <div className="bg-indigo-50/50 border border-indigo-100/80 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-5 h-5 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <Info className="w-3.5 h-3.5" />
            </div>
            <div className="space-y-1">
              <h5 className="font-semibold text-xs text-slate-900">You can always change this later</h5>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Project settings, data sources and analysis options can be updated at any time.
              </p>
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
            <h4 className="font-bold text-sm text-slate-900">Next steps</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
                  3
                </div>
                <div>
                  <h5 className="font-semibold text-xs text-slate-900">Import your first file</h5>
                  <p className="text-[11px] text-slate-500">Upload a CSV or Excel file with customer feedback.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
                  4
                </div>
                <div>
                  <h5 className="font-semibold text-xs text-slate-900">Run your first analysis</h5>
                  <p className="text-[11px] text-slate-500">Get sentiment, topics and recommendations.</p>
                </div>
              </div>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}