import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { MapPin, Clock, Phone, ArrowLeft } from "lucide-react";

export const Locations: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-flat-beige pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-flat-blue hover:text-flat-dark transition-colors duration-300 font-bold touch-manipulation p-3 rounded-lg active:bg-flat-blue/10"
            style={{ fontFamily: "Bricolage Grotesque" }}
          >
            <ArrowLeft size={20} />
            <span>{t("locations.backToHome")}</span>
          </button>
        </div>
        {/* Title */}
        <div className="text-center mb-16">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-flat-blue mb-4 leading-tight tracking-tight"
            style={{ fontFamily: "Bricolage Grotesque" }}
          >
            {t("locations.title")}
          </h1>
          <p
            className="text-xl md:text-2xl text-flat-blue/70 font-medium"
            style={{ fontFamily: "Bricolage Grotesque" }}
          >
            {t("tagline.madeInBelgrade")}
          </p>
        </div>

        {/* Location Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500">
            {/* Location Name */}
            <h3
              className="text-4xl font-black text-flat-blue mb-8 tracking-tight text-center"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              {t("locations.name")}
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Location Details */}
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <MapPin
                    size={24}
                    className="text-flat-blue mt-1 flex-shrink-0"
                  />
                  <div>
                    <h4
                      className="font-bold text-flat-blue mb-1"
                      style={{ fontFamily: "Bricolage Grotesque" }}
                    >
                      {t("locations.address")}
                    </h4>
                    <p
                      className="text-flat-blue/80 text-lg"
                      style={{ fontFamily: "Bricolage Grotesque" }}
                    >
                      {t("locations.locationAddress")}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <Clock
                    size={24}
                    className="text-flat-blue mt-1 flex-shrink-0"
                  />
                  <div>
                    <h4
                      className="font-bold text-flat-blue mb-1"
                      style={{ fontFamily: "Bricolage Grotesque" }}
                    >
                      {t("locations.hours")}
                    </h4>
                    <p
                      className="text-flat-blue/80"
                      style={{ fontFamily: "Bricolage Grotesque" }}
                    >
                      {t("locations.weekdays")}
                      <br />
                      {t("locations.weekends")}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <Phone
                    size={24}
                    className="text-flat-blue mt-1 flex-shrink-0"
                  />
                  <div>
                    <h4
                      className="font-bold text-flat-blue mb-1"
                      style={{ fontFamily: "Bricolage Grotesque" }}
                    >
                      {t("contact.phone")}
                    </h4>
                    <p
                      className="text-flat-blue/80"
                      style={{ fontFamily: "Bricolage Grotesque" }}
                    >
                      <a
                        href="tel:+38166809632"
                        className="hover:text-flat-blue transition-colors"
                      >
                        {t("contact.phoneNumber")}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <span className="text-flat-blue mt-1 flex-shrink-0 text-xl">
                    @
                  </span>
                  <div>
                    <h4
                      className="font-bold text-flat-blue mb-1"
                      style={{ fontFamily: "Bricolage Grotesque" }}
                    >
                      {t("contact.email")}
                    </h4>
                    <p
                      className="text-flat-blue/80"
                      style={{ fontFamily: "Bricolage Grotesque" }}
                    >
                      <a
                        href="mailto:flatburgerbg@gmail.com"
                        className="hover:text-flat-blue transition-colors"
                      >
                        {t("contact.emailAddress")}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Order Button */}
                <div className="pt-4">
                  <a
                    href="https://wolt.com/sr/srb/belgrade/restaurant/flat-burger11?srsltid=AfmBOop99ec-lBKnlyj1yDoIojJHB9b4a9IxwRhF7eKxQLCmfo_Gb0Ui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-flat-blue text-flat-beige py-4 rounded-full text-xl font-black tracking-wider uppercase hover:bg-flat-dark transition-all duration-300 transform hover:scale-105 shadow-lg text-center touch-manipulation"
                    style={{ fontFamily: "Bricolage Grotesque" }}
                  >
                    {t("order.now")}
                  </a>
                </div>
              </div>

              {/* Map Section */}
              <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center">
                <div className="text-center text-flat-blue">
                  <MapPin size={48} className="mx-auto mb-4" />
                  <p className="text-lg font-bold mb-2">Interactive Map</p>
                  <p
                    className="text-sm text-flat-blue/70 mb-4"
                    style={{ fontFamily: "Bricolage Grotesque" }}
                  >
                    Click to open in Google Maps
                  </p>
                  <a
                    href="https://maps.google.com/?q=Dobračina 4, Belgrade, Serbia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-flat-blue text-flat-beige px-6 py-3 rounded-full font-bold text-sm uppercase hover:bg-flat-dark transition-colors duration-300"
                    style={{ fontFamily: "Bricolage Grotesque" }}
                  >
                    Open Map
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <div className="bg-flat-blue text-flat-beige p-8 rounded-3xl">
            <h3
              className="text-2xl font-black mb-4 tracking-tight"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              {t("tagline.visitUsToday")}
            </h3>
            <p
              className="text-flat-beige/90 text-lg"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              {t("tagline.visitDescription")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
