import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { MapPin, Navigation, Phone, Clock } from "lucide-react";

interface MapLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
}

const locations: MapLocation[] = [
  {
    id: "flat-burger-1",
    name: "Flat Burger 1",
    address: "Dobračina 4, Beograd",
    lat: 44.8186, // Approximate coordinates for Dobračina 4, Belgrade
    lng: 20.4589,
    phone: "066 809 6326",
    hours: {
      weekdays: "12:00–23:00",
      weekends: "15:00–23:00"
    }
  }
];

export const InteractiveMap: React.FC = () => {
  const { t, language } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(locations[0]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Load Google Maps API if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBFw0Qbyq9zTFTd-tUY6dMLLrJGNWVe_lA'}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) return;

    const mapOptions = {
      zoom: 16,
      center: { lat: locations[0].lat, lng: locations[0].lng },
      styles: [
        {
          featureType: "all",
          elementType: "geometry.fill",
          stylers: [{ color: "#FEEBCB" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#a2daf2" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }]
        },
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ],
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: false,
      fullscreenControl: true
    };

    const map = new google.maps.Map(mapRef.current, mapOptions);

    // Add markers for each location
    locations.forEach((location) => {
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.name,
        icon: {
          url: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#1C33C3" stroke="#FEEBCB" stroke-width="4"/>
              <circle cx="20" cy="20" r="8" fill="#FEEBCB"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 20)
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="font-family: 'Bricolage Grotesque', sans-serif; padding: 10px; min-width: 200px;">
            <h3 style="color: #1C33C3; margin: 0 0 10px 0; font-weight: bold; font-size: 18px;">${location.name}</h3>
            <div style="display: flex; align-items: center; margin-bottom: 8px; color: #1C33C3;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${location.address}</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 8px; color: #1C33C3;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>${location.phone}</span>
            </div>
            <div style="color: #1C33C3; font-size: 14px; margin-bottom: 12px;">
              <div>${t("locations.weekdays")}</div>
              <div>${t("locations.weekends")}</div>
            </div>
            <div style="text-align: center;">
              <a href="https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}" target="_blank" 
                 style="background: #1C33C3; color: #FEEBCB; padding: 8px 16px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 14px;">
                ${language === 'en' ? 'Get Directions' : 'Dobij Pravce'}
              </a>
            </div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        setSelectedLocation(location);
      });

      // Open info window for the first location by default
      if (location.id === locations[0].id) {
        infoWindow.open(map, marker);
      }
    });

    setIsMapLoaded(true);
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

      {/* Interactive Map */}
      <div className="relative">
        <div
          ref={mapRef}
          className="w-full h-96 bg-flat-beige/20 relative"
          style={{ minHeight: "400px" }}
        >
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

        {/* Quick Actions Overlay */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => {
              if (selectedLocation) {
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.lat},${selectedLocation.lng}`, '_blank');
              }
            }}
            className="bg-flat-blue text-flat-beige p-3 rounded-full shadow-lg hover:bg-flat-dark transition-all duration-300 group"
            title={language === 'en' ? 'Get Directions' : 'Dobij Pravce'}
          >
            <Navigation size={20} className="group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={() => {
              if (selectedLocation) {
                window.open(`tel:${selectedLocation.phone.replace(/\s/g, '')}`, '_self');
              }
            }}
            className="bg-flat-blue text-flat-beige p-3 rounded-full shadow-lg hover:bg-flat-dark transition-all duration-300 group"
            title={language === 'en' ? 'Call Us' : 'Pozovi Nas'}
          >
            <Phone size={20} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Location Details */}
      {selectedLocation && (
        <div className="p-6 border-t border-flat-blue/10">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4
                className="font-bold text-flat-blue mb-2 text-lg"
                style={{ fontFamily: "Bricolage Grotesque" }}
              >
                {selectedLocation.name}
              </h4>
              <p
                className="text-flat-blue/80 mb-4"
                style={{ fontFamily: "Bricolage Grotesque" }}
              >
                {selectedLocation.address}
              </p>
              
              <div className="flex items-center space-x-3 mb-4">
                <Clock size={20} className="text-flat-blue" />
                <div className="text-sm text-flat-blue/80" style={{ fontFamily: "Bricolage Grotesque" }}>
                  <div>{t("locations.weekdays")}</div>
                  <div>{t("locations.weekends")}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.lat},${selectedLocation.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-flat-blue text-flat-beige py-3 px-6 rounded-full font-bold text-center hover:bg-flat-dark transition-all duration-300 flex items-center justify-center space-x-2"
                style={{ fontFamily: "Bricolage Grotesque" }}
              >
                <Navigation size={18} />
                <span>{language === 'en' ? 'Get Directions' : 'Dobij Pravce'}</span>
              </a>
              
              <a
                href="https://wolt.com/sr/srb/belgrade/restaurant/flat-burger11"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-flat-beige border-2 border-flat-blue text-flat-blue py-3 px-6 rounded-full font-bold text-center hover:bg-flat-blue hover:text-flat-beige transition-all duration-300"
                style={{ fontFamily: "Bricolage Grotesque" }}
              >
                {t("order.now")}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
