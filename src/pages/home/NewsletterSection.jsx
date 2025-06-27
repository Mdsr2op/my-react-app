import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotification } from '../../context';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const { addNotification } = useNotification();

  const handleSubscribe = () => {
    if (email) {
      addNotification('Successfully subscribed to newsletter!');
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-red-500 to-orange-500">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Bell size={48} className="mx-auto mb-6 text-white animate-bounce" />
          <h3 className="text-4xl font-black text-white mb-4">Stay Updated</h3>
          <p className="text-xl text-white/90 mb-8">
            Get exclusive offers and new arrival alerts straight to your inbox
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-xl outline-none text-gray-800"
            />
            <button 
              onClick={handleSubscribe}
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Subscribe
            </button>
          </div>
          
          <p className="text-white/70 text-sm mt-4">
            Join 50,000+ subscribers. No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection; 