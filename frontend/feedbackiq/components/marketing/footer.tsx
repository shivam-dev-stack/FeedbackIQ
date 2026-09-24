import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white pt-12 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Dark CTA Box */}
                <div className="relative rounded-3xl bg-[#0B0F19] text-white p-8 sm:p-16 overflow-hidden text-center mb-16 shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                            Ready to turn feedback into growth?
                        </h2>
                        <p className="text-gray-400 text-base mb-8">
                            Join early users who are building better products with FeedbackIQ.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="#get-started"
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-gray-900 font-medium hover:bg-gray-100 transition-all shadow-lg group"
                            >
                                Get Started Free 
                                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">No credit card required</p>
                    </div>
                </div>

                {/* Simple copyright / bottom row */}
                <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-8">
                    <div className="flex items-center gap-2 font-bold text-gray-900 mb-4 sm:mb-0">
                        <span>✦</span> FeedbackIQ
                    </div>
                    <p>© {new Date().getFullYear()} FeedbackIQ. All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
}