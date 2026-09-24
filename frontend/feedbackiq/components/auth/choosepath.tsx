import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


interface ChoosePathModalProps {
    isOpen: boolean;
    onClose: () => void;
}


export default function ChoosePathModal({ isOpen, onClose }: ChoosePathModalProps) {
    if (!isOpen) return null;
    const router = useRouter();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 text-center">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="p-2 rounded-lg bg-purple-600 text-white font-bold">✦</span>
                    <span className="font-bold text-xl text-gray-900 tracking-tight">FeedbackIQ</span>
                </div>

                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Welcome to FeedbackIQ</h2>
                <p className="text-sm text-gray-600 mb-8">Turn customer feedback into product decisions.</p>

                {/* Primary Actions */}
                <div className="space-y-4 mb-6">
                    <button
                        onClick={() => { router.push('/signup'); onClose(); }}
                        className="w-full flex items-center justify-center px-6 py-3.5 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all shadow-md group"
                    >
                        Create an account
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <button
                        onClick={() => { router.push('/signin'); onClose(); }}
                        className="w-full flex items-center justify-center px-6 py-3.5 rounded-xl bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 transition-all"
                    >
                        Sign in to existing account
                    </button>
                </div>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">or</span></div>
                </div>

                {/* Social Logins */}
                <div className="space-y-3">
                    <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                        <span>🌐</span> Continue with Google
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                        <span>🐙</span> Continue with GitHub
                    </button>
                </div>

            </div>
        </div>
    );
}