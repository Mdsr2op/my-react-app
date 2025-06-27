import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Star } from 'lucide-react';
import { stores } from '../../utils/data';

const StoresPage = () => {
  const [selectedCity, setSelectedCity] = useState('');
  
  const filteredStores = selectedCity 
    ? stores.filter(store => store.city === selectedCity)
    : stores;

  const cities = [...new Set(stores.map(store => store.city))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-red-500 to-orange-500 p-4 rounded-2xl">
              <MapPin size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Store Locator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find your nearest Booktime store. Visit us for personalized assistance 
            and explore our complete collection of books and educational materials.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Filter by City</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCity('')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedCity === '' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Cities
            </button>
            {cities.map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedCity === city 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStores.map((store, index) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-48 bg-gradient-to-br from-red-100 to-orange-100 relative overflow-hidden">
                <img 
                  src={store.image} 
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    store.status === 'Open' 
                      ? 'bg-green-400 text-green-900' 
                      : 'bg-red-400 text-red-900'
                  }`}>
                    {store.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{store.name}</h3>
                    <p className="text-gray-600">{store.type}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{store.rating}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <MapPin size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 font-medium">{store.address}</p>
                    <p className="text-gray-600 text-sm">{store.city}, {store.area}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <Phone size={18} className="text-red-500" />
                  <a 
                    href={`tel:${store.phone}`}
                    className="text-gray-700 hover:text-red-500 transition-colors"
                  >
                    {store.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <Clock size={18} className="text-red-500" />
                  <span className="text-gray-700">{store.hours}</span>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {store.services.map((service, serviceIndex) => (
                      <span
                        key={serviceIndex}
                        className="bg-red-100 text-red-800 px-2 py-1 rounded-lg text-xs font-medium"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                    <Navigation size={16} />
                    Get Directions
                  </button>
                  <button className="flex-1 border-2 border-red-500 text-red-500 py-2 px-4 rounded-xl font-medium hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-2">
                    <Phone size={16} />
                    Call Store
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                  <span className="text-sm text-gray-500">
                    📍 {store.distance} from your location
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Visit Our Stores</h3>
            <p className="text-gray-600 text-lg">Experience the Booktime difference in person</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin size={32} className="text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">Multiple Locations</h4>
              <p className="text-gray-600">Conveniently located stores across major cities for easy access.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star size={32} className="text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">Expert Assistance</h4>
              <p className="text-gray-600">Knowledgeable staff ready to help you find exactly what you need.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock size={32} className="text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">Flexible Hours</h4>
              <p className="text-gray-600">Extended hours to accommodate your busy schedule.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoresPage; 