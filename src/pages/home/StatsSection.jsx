import React from 'react';
import { Book, Users, Truck, Award } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { icon: Book, value: '50,000+', label: 'Books Available', color: 'text-red-600' },
    { icon: Users, value: '100,000+', label: 'Happy Customers', color: 'text-orange-600' },
    { icon: Truck, value: '24hr', label: 'Fast Delivery', color: 'text-red-500' },
    { icon: Award, value: '15+', label: 'Years of Service', color: 'text-orange-600' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className={`${stat.color} mb-4 flex justify-center`}>
                  <Icon size={48} className="group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 