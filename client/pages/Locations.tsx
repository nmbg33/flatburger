import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Clock, Phone } from 'lucide-react';

const locations = [
  {
    id: 'dorcol',
    nameKey: 'locations.dorcol',
    address: 'Dobračina 4, Belgrade',
    hours: '10:00 - 23:00',
    phone: '+381 11 123 4567',
    coords: { lat: 44.8176, lng: 20.4633 }
  }
];

export const Locations: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-flat-cream pt-24 pb-12 relative">
      {/* Clean background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-flat-blue animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-flat-blue animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-flat-blue mb-4 leading-tight tracking-tight">
            {t('locations.title')}
          </h1>
        </div>

        {/* Location */}
        <div className="max-w-2xl mx-auto">
          {locations.map((location, index) => (
            <div
              key={location.id}
              className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
            >
              {/* Location Name */}
              <h3 className="text-4xl font-black text-flat-blue mb-6 tracking-tight">
                {t(location.nameKey)}
              </h3>

              {/* Address */}
              <div className="flex items-center mb-4 text-flat-dark text-lg">
                <MapPin size={24} className="mr-4 text-flat-blue" />
                <span className="font-medium">{location.address}</span>
              </div>

              {/* Hours */}
              <div className="flex items-center mb-4 text-flat-dark text-lg">
                <Clock size={24} className="mr-4 text-flat-blue" />
                <span className="font-medium">{location.hours}</span>
              </div>

              {/* Phone */}
              <div className="flex items-center mb-8 text-flat-dark text-lg">
                <Phone size={24} className="mr-4 text-flat-blue" />
                <span className="font-medium">{location.phone}</span>
              </div>

              {/* Order Button */}
              <button className="w-full bg-flat-blue text-flat-cream py-4 rounded-full text-xl font-black tracking-wider uppercase hover:bg-flat-dark transition-all duration-300 transform hover:scale-105">
                {t('locations.orderNow')}
              </button>
            </div>
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-flat-blue/20 to-flat-blue/10 rounded-3xl h-96 flex items-center justify-center border-4 border-dashed border-flat-blue/30">
            <div className="text-center text-flat-blue">
              <MapPin size={64} className="mx-auto mb-6" />
              <p className="text-2xl font-black mb-2">Interactive Map Coming Soon</p>
              <p className="text-lg font-medium">Google Maps integration will be added here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
