import React from 'react';
import { ChevronRight, Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import { categories } from '../../utils/data';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <Sparkles className="mr-2 text-indigo-400" size={32} />
              <h3 className="text-3xl font-black">BookMart</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted partner for all educational needs. Quality books, stationery, and school supplies delivered to your doorstep.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  {social === 'facebook' && 'f'}
                  {social === 'twitter' && 't'}
                  {social === 'instagram' && 'i'}
                  {social === 'youtube' && 'y'}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'FAQs', 'Track Order', 'Returns'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <ChevronRight size={16} className="mr-1 transform group-hover:translate-x-1 transition-transform" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-bold text-lg mb-6">Categories</h4>
            <ul className="space-y-3">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <ChevronRight size={16} className="mr-1 transform group-hover:translate-x-1 transition-transform" />
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone size={20} className="mr-3 text-indigo-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400">Hotline</p>
                  <p className="font-semibold">+1 800 BOOKMART</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail size={20} className="mr-3 text-indigo-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400">Email</p>
                  <p className="font-semibold">info@bookmart.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin size={20} className="mr-3 text-indigo-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400">Locations</p>
                  <p className="font-semibold">3 Stores in NY, LA & Chicago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="text-gray-400">We Accept:</span>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded px-3 py-1 text-blue-600 font-bold">VISA</div>
              <div className="bg-white rounded px-3 py-1 text-red-600 font-bold">MasterCard</div>
              <div className="bg-blue-600 rounded px-3 py-1 text-white font-bold">PayPal</div>
              <div className="bg-green-600 rounded px-3 py-1 text-white font-bold">Apple Pay</div>
              <div className="bg-purple-600 rounded px-3 py-1 text-white font-bold">Stripe</div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
            &copy; 2025 BookMart. All rights reserved. Made with ❤️ in USA
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 