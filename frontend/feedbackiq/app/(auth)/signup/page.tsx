'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { register } from '@/lib/authApi';

export default function SignUp() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    // Whitespace hatane ke liye trim lagaya
    const isPasswordMismatch = confirmPassword && password.trim() !== confirmPassword.trim();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Agar password match nahi karta toh api call block karein
        if (password.trim() !== confirmPassword.trim()) {
            setError('Passwords do not match.');
            return;
        }

        setError(''); // Pehle ke errors ko clear karein

        try {
            const data = await register({
                email,
                password,
                organization_name: organizationName,
                owner_name: fullName
            });

            if (data.status === '200' && data.success) {
                window.location.href = '/dashboard';
            } else {
                console.error('Registration failed:', data);
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                
                <div className="flex items-center gap-2 mb-6">
                    <span className="p-1.5 rounded-lg bg-purple-600 text-white font-bold text-sm">✦</span>
                    <span className="font-bold text-lg text-gray-900">FeedbackIQ</span>
                </div>

                <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Create your account</h1>
                <p className="text-sm text-gray-500 mb-6">Start analyzing your customer feedback today.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Organization name</label>
                        <input
                            type="text"
                            placeholder="FeedbackIQ llc"
                            value={organizationName}
                            onChange={(e) => setOrganizationName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Full name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Work email</label>
                        <input
                            type="email"
                            placeholder="you@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-600"
                            required
                            // Accessibility attribute add kiya
                            aria-describedby={isPasswordMismatch ? "password-match-error" : undefined}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-600"
                            required
                            aria-describedby={isPasswordMismatch ? "password-match-error" : undefined}
                        />
                    </div>

                    {/* Cleaned up disabled logic */}
                    <button 
                        disabled={isPasswordMismatch || !fullName || !email || !organizationName || !password || !confirmPassword}
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md mt-2"
                    >
                        Create account
                    </button>
                </form>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                {/* Conditional statement updated with trim logic and accessibility roles */}
                {isPasswordMismatch && (
                    <p id="password-match-error" className="text-red-500 text-sm mt-2" role="alert" aria-live="assertive">
                        Passwords do not match.
                    </p>
                )}

                <p className="text-center text-xs text-gray-500 mt-6">
                    Already have an account? <Link href="/signin" className="text-purple-600 font-semibold hover:underline">Sign in</Link>
                </p>

            </div>
        </div>
    );
}
