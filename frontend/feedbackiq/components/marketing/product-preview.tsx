import React from 'react';
import { ArrowRight, BarChart2, MessageSquare, TrendingUp, CheckCircle, Share2 } from 'lucide-react';
import Image from 'next/image';

interface ProductPreviewProps {
    previewImageSrc?: string;
}

export default function ProductPreview({ previewImageSrc }: ProductPreviewProps) {
    const listItems = [
        { icon: <BarChart2 className="w-4 h-4 text-purple-600" />, text: 'Theme deep dives' },
        { icon: <MessageSquare className="w-4 h-4 text-purple-600" />, text: 'Customer quotes' },
        { icon: <TrendingUp className="w-4 h-4 text-purple-600" />, text: 'Trend analysis' },
        { icon: <CheckCircle className="w-4 h-4 text-purple-600" />, text: 'Recommended actions' },
        { icon: <Share2 className="w-4 h-4 text-purple-600" />, text: 'Share with your team' },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-purple-50/20 overflow-hidden" id="product">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left: Dashboard Mockup Image */}
                    <div className="lg:col-span-7">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
                            <Image 
                                src={previewImageSrc || "/placeholder-preview.png"} 
                                alt="Theme Details Mockup" 
                                width={800}
                                height={500}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    </div>

                    {/* Right: Content details */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100/60 text-purple-800 text-xs font-semibold">
                            REAL INSIGHTS, REAL IMPACT
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                            See the why behind every insight.
                        </h2>
                        <p className="text-base text-gray-600 leading-relaxed">
                            Go beyond surface-level sentiment. Explore detailed theme analysis, customer quotes, and recommended actions — all in one place.
                        </p>

                        <a 
                            href="#action" 
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all shadow-md group"
                        >
                            See It in Action 
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>

                        {/* Feature list bullets */}
                        <div className="pt-6 border-t border-gray-100 space-y-3">
                            {listItems.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                    <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}