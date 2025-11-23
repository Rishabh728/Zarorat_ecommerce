import React from 'react';
import { Facebook, Instagram, Twitter, Bookmark, Mail } from 'lucide-react';

// Social Media Icons Component (for better organization)
const SocialIcon = ({ Icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-400 hover:text-white transition duration-300"
    aria-label={Icon.displayName}
  >
    <Icon size={20} />
  </a>
);

// Navigation Link Component
const FooterLink = ({ children }) => (
  <a href="#" className="text-sm text-slate-400 hover:text-white transition duration-300 mb-2 block">
    {children}
  </a>
);

// Main Footer Component
const Footer = () => {
  // Use a very dark blue/slate for the background to match the screenshot
  const darkNavy = 'rgb(12 24 45)';

  return (
    <footer className="w-full text-white pt-10" style={{ backgroundColor: darkNavy }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Links and Subscription */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-10 border-b border-slate-700/50">

          {/* Column 1: Zapto Branding and Contact Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-red-500 tracking-wider">
              Zarort
            </h2>
            <p className="text-sm text-slate-400 max-w-xs">
              Powering your World with the Best in Electronics.
            </p>
            
            <div className="text-sm text-slate-400 space-y-1 pt-2">
              <p>123 Electronics St, Style City, NY 10001</p>
              <p>Email: <a href="mailto:support@zapto.com" className="hover:text-white">support@zarorat.com</a></p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <div className="space-y-1">
              <FooterLink>Contact Us</FooterLink>
              <FooterLink>Shipping & Returns</FooterLink>
              <FooterLink>FAQs</FooterLink>
              <FooterLink>Order Tracking</FooterLink>
              <FooterLink>Size Guide</FooterLink>
            </div>
          </div>

          {/* Column 3: Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* NOTE: Replaced non-existent PinterestIcon with Bookmark for compilation stability */}
              <SocialIcon Icon={Facebook} href="https://facebook.com" />
              <SocialIcon Icon={Instagram} href="https://instagram.com" />
              <SocialIcon Icon={Twitter} href="https://twitter.com" />
              <SocialIcon Icon={Bookmark} href="https://pinterest.com" />
            </div>
          </div>

          {/* Column 4: Stay in the Loop (Subscription) */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay in the Loop</h3>
            <p className="text-sm text-slate-400">
              Subscribe to get special offers, free giveaways, and more
            </p>
            
            <div className="flex">
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full p-3 pr-10 bg-slate-800 text-sm text-white border-none focus:ring-red-500 focus:border-red-500 rounded-l-md"
                  aria-label="Your email address"
                />
                <Mail size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-r-md transition duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="py-4 text-center text-sm text-slate-400">
          &copy; 2025 <span className="text-red-500">Zapto</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};


export default Footer;