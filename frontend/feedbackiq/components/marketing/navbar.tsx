'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import ChoosePathModal from '@/components/auth/choosepath'; // Modal component import karein
import Link from 'next/link';

export default function Navbar({ Logo }: { Logo?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const navLinks = [
    { name: 'Product', href: '#product' },
    { name: 'Use Cases', href: '#use-cases' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Resources', href: '#resources' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section */}
            <div className="flex items-center gap-2 cursor-pointer">
              <Image src={Logo || '/web/icon/logo.svg'} alt="FeedbackIQ Logo" width={175} height={35}/>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Right Actions (Sign In & CTA) */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="./signin"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Sign in
              </Link>
              {/* Get Started Button configured as Modal Trigger */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all shadow-sm hover:shadow group cursor-pointer"
              >
                Get Started 
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-gray-900 focus:outline-none p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-4 shadow-lg">
            <div className="flex flex-col space-y-3 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-gray-700 hover:text-gray-900 px-2 py-1 rounded-md hover:bg-gray-50"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
              <a
                href="#signin"
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-gray-700 text-center py-2"
              >
                Sign in
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center justify-center w-full px-5 py-3 rounded-full bg-gray-900 text-white text-base font-medium hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Render the ChoosePath Modal */}
      <ChoosePathModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}