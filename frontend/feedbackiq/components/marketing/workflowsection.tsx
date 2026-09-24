import React from 'react';
import { Upload, Sparkles, CheckCircle2 } from 'lucide-react';

export default function WorkflowSection() {
    const steps = [
        {
            stepNum: '1',
            icon: <Upload className="w-5 h-5 text-purple-600" />,
            title: 'Upload Feedback',
            desc: 'Import reviews, support tickets, or survey data (CSV or integrations).',
        },
        {
            stepNum: '2',
            icon: <Sparkles className="w-5 h-5 text-purple-600" />,
            title: 'Get AI Insights',
            desc: 'We analyze, group, and identify key themes and trends.',
        },
        {
            stepNum: '3',
            icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
            title: 'Take Action',
            desc: 'Explore insights, validate with evidence, and turn them into decisions.',
        },
    ];

    return (
        <section className="pt-20 pb-10 bg-gradient-to-b from-white to-purple-50/20" id="use-cases">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100/60 text-purple-800 text-xs font-semibold mb-4">
                    SIMPLE WORKFLOW
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                    Go from feedback to action in 3 steps
                </h2>
                <p className="text-base text-gray-600 max-w-xl mx-auto mb-16">
                    Upload your data, let AI find the insights, and focus on what matters most.
                </p>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {steps.map((item, idx) => (
                        <div key={idx} className="relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm">
                                        {item.stepNum}
                                    </span>
                                    <div className="p-3 bg-gray-50 rounded-xl">
                                        {item.icon}
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}