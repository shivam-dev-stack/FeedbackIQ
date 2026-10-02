'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { login } from '@/lib/authApi';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = await login({
            email,
            password
        });
        try {
            if (data.status === '200' && data.success) {
                // Redirect to dashboard or another page after successful login
                window.location.href = '/dashboard';
            } else {
                setError(data.message || 'Login failed. Please try again.');
                console.error('Login failed:', data);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again later.');
            console.error('Unexpected error:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                
                <div className="flex items-center gap-2 mb-6">
                    <span className="p-1.5 rounded-lg bg-purple-600 text-white font-bold text-sm">✦</span>
                    <span className="font-bold text-lg text-gray-900">FeedbackIQ</span>
                </div>

                <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Welcome back</h1>
                <p className="text-sm text-gray-500 mb-6">Sign in to your account</p>

                <form onSubmit={handleLogin} className="space-y-4">
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
                        />
                    </div>

                    <div className="flex items-center justify-between text-xs py-1">
                        <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            Remember me
                        </label>
                        <a href="#forgot" className="text-purple-600 font-semibold hover:underline">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-all shadow-md"
                    >
                        Sign in
                    </button>
                </form>

                {error && 
                <p className="text-red-500 text-sm mt-2">{error}</p>}

                <p className="text-center text-xs text-gray-500 mt-6">
                    Don't have an account? <Link href="/signup" className="text-purple-600 font-semibold hover:underline">Sign up</Link>
                </p>

            </div>
        </div>
    );
}