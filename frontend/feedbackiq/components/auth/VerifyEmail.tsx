import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export default function VerifyEmail() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
                
                {/* Email Icon Envelope */}
                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600">
                    <Mail className="w-8 h-8" />
                </div>

                <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Check your email</h1>
                <p className="text-sm text-gray-600 mb-6">
                    We've sent a verification link to <span className="font-semibold text-gray-900">you@company.com</span>.
                </p>

                <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-4 text-xs text-purple-900 font-medium mb-6">
                    👉 Click the link in your email to continue. The link will expire in 24 hours.
                </div>

                <button
                    onClick={() => alert('Opening email client...')}
                    className="w-full py-3.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all shadow-md mb-4"
                >
                    Open Email
                </button>

                <p className="text-xs text-gray-500">
                    Didn't receive the email? <button className="text-purple-600 font-semibold hover:underline">Resend email</button>
                </p>

            </div>
        </div>
    );
}