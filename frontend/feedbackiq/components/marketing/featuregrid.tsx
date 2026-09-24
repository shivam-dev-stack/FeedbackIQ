import React from 'react';
import { Cpu, Lightbulb, ShieldCheck, Users } from 'lucide-react';

export default function FeatureGrid() {
    const logos = ['coolhub', 'Taskly', 'NovaCRM', 'PixelForge', 'Worklenz', 'Sproutly'];

    const features = [
        {
            icon: <Cpu className="w-6 h-6 text-purple-600" />,
            title: 'AI-Powered Analysis',
            description: 'Find patterns, themes, and sentiment in thousands of feedback items.',
        },
        {
            icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
            title: 'Prioritized Insights',
            description: 'Know what to fix, what to build, and what to ignore.',
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
            title: 'Evidence-Backed',
            description: 'Every insight links to real customer feedback.',
        },
        {
            icon: <Users className="w-6 h-6 text-blue-600" />,
            title: 'Built for SaaS Teams',
            description: 'Designed for founders, product managers, and customer success teams.',
        },
    ];

    return (
        <section className="py-16 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Trusted Teams Header */}
                <p className="text-center text-xs font-semibold tracking-wider text-gray-400 uppercase mb-8">
                    TRUSTED BY EARLY TEAMS AND BUILDERS
                </p>

                {/* Logos Bar */}
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-75 mb-20 grayscale hover:grayscale-0 transition-all">
                    {logos.map((logo, index) => (
                        <span key={index} className="text-lg font-bold tracking-tight text-gray-600 flex items-center gap-1">
                            ✦ {logo}
                        </span>
                    ))}
                </div>

                {/* 4 Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-gray-50/60 border border-gray-100 hover:shadow-md transition-all">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}