
import React from 'react';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

interface HeroSectionProps {
    dashboardImageSrc?: string;
}

export default function HeroSection({
    dashboardImageSrc,
}: HeroSectionProps) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/20 to-indigo-50/30">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-purple-200/30 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-indigo-100/30 blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
                <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-8">

                    {/* LEFT: Hero Content */}
                    <div className="max-w-xl text-center lg:text-left">

                        {/* Badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-purple-900">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-purple-600" />
                            Turn Feedback into Smarter Product Decisions
                        </div>

                        {/* Heading */}
                        <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                            Understand your customers.{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Build what matters.
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mb-8 text-base leading-relaxed text-gray-600 sm:text-lg">
                            FeedbackIQ uses AI to analyze customer reviews,
                            support feedback, and surveys — and turns them
                            into prioritized insights your product team
                            can act on.
                        </p>

                        {/* CTAs */}
                        <div className="mb-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                            <a
                                href="#get-started"
                                className="group inline-flex items-center justify-center rounded-xl bg-gray-900 px-6 py-3.5 font-medium text-white shadow-lg transition hover:bg-gray-800"
                            >
                                Get Started Free
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </a>

                            <a
                                href="#demo"
                                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-medium text-gray-900 shadow-sm transition hover:bg-gray-50"
                            >
                                <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white">
                                    <Play className="h-3 w-3 fill-current" />
                                </span>
                                Watch Demo
                            </a>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-gray-600 lg:justify-start">
                            {[
                                'No credit card required',
                                'Setup in minutes',
                                'Works with your data',
                            ].map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-2"
                                >
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-purple-600" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Dashboard Visual */}
                    <div className="relative mx-auto w-full max-w-2xl lg:ml-auto">

                        {/* Glow */}
                        <div className="absolute inset-0 -z-10 scale-90 rounded-full bg-purple-300/30 blur-3xl" />

                        {/* Dashboard */}
                        <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-white/70 shadow-2xl backdrop-blur-sm">
                            <Image
                                src={dashboardImageSrc || '/placeholder.png'}
                                alt="FeedbackIQ Product Insights Dashboard"
                                width={1200}
                                height={750}
                                className="block h-auto w-full"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}