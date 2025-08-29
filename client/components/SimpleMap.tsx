import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { MapPin, Navigation, Phone, ExternalLink } from "lucide-react";

export const SimpleMap: React.FC = () => {
  const { t, language } = useLanguage();
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Flat Burger location coordinates
  const location = {
    name: "Flat Burger 1",
    address: "Dobračina 4, Beograd",
    lat: 44.8186,
    lng: 20.4589,
    phone: "066 809 6326"
  };

  const openInGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`, '_blank');
  };

  const openDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`, '_blank');
  };

  const callPhone = () => {
    window.open(`tel:${location.phone.replace(/\s/g, '')}`, '_self');
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
      {/* Map Header */}
      <div className="bg-flat-blue text-flat-beige p-6">
        <h3
          className="text-2xl font-black mb-2 tracking-tight"
          style={{ fontFamily: "Bricolage Grotesque" }}
        >
          {t("nav.locations")}
        </h3>
        <p
          className="text-flat-beige/90"
          style={{ fontFamily: "Bricolage Grotesque" }}
        >
          {t("tagline.visitUsToday")}
        </p>
      </div>

      {/* Map Display */}
      <div className="relative">
        <div className="w-full h-96 bg-flat-beige/20 relative overflow-hidden">
          {/* OpenStreetMap Embed */}
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=20.4489%2C44.8086%2C20.4689%2C44.8286&layer=mapnik&marker=${location.lat}%2C${location.lng}`}
            className="w-full h-full border-0"
            onLoad={() => setIsMapLoaded(true)}
            title="Flat Burger Location Map"
          />


          {/* Quick Actions Overlay */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button
              onClick={openDirections}
              className="bg-flat-blue text-flat-beige p-3 rounded-full shadow-lg hover:bg-flat-dark transition-all duration-300 group pointer-events-auto"
              title={language === 'en' ? 'Get Directions' : 'Dobij Pravce'}
            >
              <Navigation size={20} className="group-hover:scale-110 transition-transform" />
            </button>
            
            <button
              onClick={callPhone}
              className="bg-flat-blue text-flat-beige p-3 rounded-full shadow-lg hover:bg-flat-dark transition-all duration-300 group pointer-events-auto"
              title={language === 'en' ? 'Call Us' : 'Pozovi Nas'}
            >
              <Phone size={20} className="group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={openInGoogleMaps}
              className="bg-flat-blue text-flat-beige p-3 rounded-full shadow-lg hover:bg-flat-dark transition-all duration-300 group pointer-events-auto"
              title={language === 'en' ? 'Open in Google Maps' : 'Otvori u Google Maps'}
            >
              <ExternalLink size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Loading Indicator */}
          {!isMapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-flat-beige/50">
              <div className="text-center">
                <MapPin size={48} className="text-flat-blue mx-auto mb-4 animate-pulse" />
                <p
                  className="text-flat-blue font-bold"
                  style={{ fontFamily: "Bricolage Grotesque" }}
                >
                  {language === 'en' ? 'Loading map...' : 'Učitava mapu...'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Location Details */}
      <div className="p-6 border-t border-flat-blue/10">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4
              className="font-bold text-flat-blue mb-2 text-lg"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              {location.name}
            </h4>
            <p
              className="text-flat-blue/80 mb-4"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              {location.address}
            </p>
            
            <div className="flex items-center space-x-3 mb-4">
              <Phone size={20} className="text-flat-blue" />
              <p
                className="text-flat-blue/80"
                style={{ fontFamily: "Bricolage Grotesque" }}
              >
                {location.phone}
              </p>
            </div>

            <div className="text-sm text-flat-blue/80" style={{ fontFamily: "Bricolage Grotesque" }}>
              <div className="mb-1">{t("locations.weekdays")}</div>
              <div>{t("locations.weekends")}</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={openDirections}
              className="bg-flat-blue text-flat-beige py-3 px-6 rounded-full font-bold text-center hover:bg-flat-dark transition-all duration-300 flex items-center justify-center space-x-2"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              <Navigation size={18} />
              <span>{language === 'en' ? 'Get Directions' : 'Dobij Pravce'}</span>
            </button>
            
            <a
              href="https://wolt.com/sr/srb/belgrade/restaurant/flat-burger11"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-flat-beige border-2 border-flat-blue text-flat-blue py-3 px-6 rounded-full font-bold text-center hover:bg-flat-blue hover:text-flat-beige transition-all duration-300"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              {t("order.now")}
            </a>

            <button
              onClick={callPhone}
              className="bg-transparent border-2 border-flat-blue text-flat-blue py-3 px-6 rounded-full font-bold text-center hover:bg-flat-blue hover:text-flat-beige transition-all duration-300 flex items-center justify-center space-x-2"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              <Phone size={18} />
              <span>{language === 'en' ? 'Call Us' : 'Pozovi Nas'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
