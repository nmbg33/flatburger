import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Clock, Phone } from 'lucide-react';

const locations = [
  {
    id: 'dorcol',
    nameKey: 'locations.dorcol',
    address: 'Dobračina 4, Beograd',
    hours: '10:00 - 23:00',
    phone: '+381 11 123 4567',
    coords: { lat: 44.8176, lng: 20.4633 }
  },
  {
    id: 'vracar',
    nameKey: 'locations.vracar', 
    address: 'Njegoševa 10, Beograd',
    hours: '10:00 - 23:00',
    phone: '+381 11 765 4321',
    coords: { lat: 44.8092, lng: 20.4726 }
  }
];

export const Locations: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-flat-cream pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-flat-blue mb-4 tracking-wider uppercase">
            {t('locations.title')}
          </h1>
        </div>

        {/* Locations Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {locations.map((location) => (
            <div 
              key={location.id}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {/* Location Name */}
              <h3 className="text-2xl font-black text-flat-blue mb-4 tracking-wider uppercase">
                {t(location.nameKey)}
              </h3>

              {/* Address */}
              <div className="flex items-center mb-3 text-flat-dark">
                <MapPin size={20} className="mr-3 text-flat-blue" />
                <span>{location.address}</span>
              </div>

              {/* Hours */}
              <div className="flex items-center mb-3 text-flat-dark">
                <Clock size={20} className="mr-3 text-flat-blue" />
                <span>{location.hours}</span>
              </div>

              {/* Phone */}
              <div className="flex items-center mb-6 text-flat-dark">
                <Phone size={20} className="mr-3 text-flat-blue" />
                <span>{location.phone}</span>
              </div>

              {/* Order Button */}
              <button className="w-full bg-flat-blue text-flat-cream py-3 rounded-full font-bold tracking-wider uppercase hover:bg-flat-dark transition-colors duration-300">
                {t('locations.orderNow')}
              </button>
            </div>
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin size={48} className="mx-auto mb-4" />
              <p className="text-lg font-semibold">Interactive Map Coming Soon</p>
              <p className="text-sm">Google Maps integration will be added here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
