import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  User,
  Video,
  Image as ImageIcon,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface BlogPost {
  id: string;
  title: { en: string; sr: string };
  excerpt: { en: string; sr: string };
  content: { en: string; sr: string };
  date: string;
  author: { en: string; sr: string };
  category: "story" | "news";
  imageUrl?: string;
  videoUrl?: string;
  sourceUrl?: string;
  gallery?: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: {
      en: "Flat Burger at Los Silos Burger Festival 2025!",
      sr: "Flat Burger na Los Silos Burger Festival 2025!",
    },
    excerpt: {
      en: "Belgrade will once again become the epicenter of burger culture! Join us at the most exciting gastronomic event in the region.",
      sr: "Beograd će ponovo postati epicentar burger kulture! Pridružite nam se na najuzbudljivijem gastronomskom događaju u regionu.",
    },
    content: {
      en: `🍔 Flat Burger at Los Silos Burger Festival 2025

Belgrade will once again become the epicenter of burger culture! From August 29 to September 7, 2025, Flat Burger will proudly participate in the Los Silos Burger Festival, one of the most exciting gastronomic events in the region.

📍 Where Can You Find Us?
The festival will take place at the unique location of Silosi Beograd, Dunavski kej 46. This space, known for its four concrete silos shaped like a honeycomb, provides the perfect setting to enjoy top-tier burgers, craft beers, DJ performances, and various other activities.

🔥 What to Expect?
At the festival, you will have the chance to enjoy:

• Specialties prepared by Flat Burger – Our most popular burgers, including Classic Flat, Pyro Flat, Fancy Flat, Bacon Jam Flat, Crispy Alabama, and Chicken Flat, will be available for tasting.

• Craft beers and gin cocktails – Enjoy perfect beverages to accompany our burgers.

• Live music and DJ performances – Relax and enjoy the sounds that will enhance the festival atmosphere.

• Activities for kids – Keep the little ones entertained in a dedicated area.

• Riverside lounge zone – Relax by the river and enjoy beautiful sunsets.

📅 When Can You Visit Us?
The festival will be open every day from August 29 to September 7, 2025. Check the official festival website or our social media for exact hours of operation.

Don't miss the chance to enjoy top-notch burgers and an unforgettable experience at the Los Silos Burger Festival 2025. See you at Silos!`,
      sr: `🍔 Flat Burger na Los Silos Burger Festival 2025

Beograd će ponovo postati epicentar burger kulture! Od 29. avgusta do 7. septembra 2025. godine, Flat Burger će ponosno učestvovati na Los Silos Burger Festival-u, jednom od najuzbudljivijih gastronomskih događaja u regionu.

📍 Gde možete da nas nađete?
Festival će se održati na jedinstvenoj lokaciji Silosi Beograd, Dunavski kej 46. Ovaj prostor, poznat po svoja četiri betonska silosa u obliku saća, pruža savršeno okruženje za uživanje u vrhunskim burgerima, kraft pivima, DJ nastupima i raznim drugim aktivnostima.

🔥 Šta možete da očekujete?
Na festivalu ćete imati priliku da uživate u:

• Specijalitetima koje priprema Flat Burger – Naši najpopularniji burgeri, uključujući Classic Flat, Pyro Flat, Fancy Flat, Bacon Jam Flat, Crispy Alabama i Chicken Flat, biće dostupni za degustaciju.

• Kraft piva i gin kokteli – Uživajte u savršenim pićima koja prate naše burgere.

• Živa muzika i DJ nastupi – Opustite se uz zvuke koji će poboljšati festivalsku atmosferu.

• Aktivnosti za decu – Zabavite mališane u namenjenom prostoru.

• Lounge zona pored reke – Opustite se pored reke i uživajte u prelepim zalascima sunca.

📅 Kada možete da nas posetite?
Festival će biti otvoren svaki dan od 29. avgusta do 7. septembra 2025. godine. Proverite zvanični sajt festivala ili naše društvene mreže za tačno radno vreme.

Ne propustite priliku da uživate u vrhunskim burgerima i nezaboravnom iskustvu na Los Silos Burger Festival 2025. Vidimo se na Silosima!`,
    },
    date: "2025-08-09",
    author: {
      en: "Nemanja Mladenovic",
      sr: "Nemanja Mladenović",
    },
    category: "news",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F60065f0b142349638ce5191622432261",
  },
  {
    id: "journal-flat-burger",
    title: {
      en: "Journal.rs: Flat Burger – Belgrade Street Food",
      sr: "Journal.rs: Flat Burger – beogradski street food",
    },
    excerpt: {
      en: "Journal.rs covered Flat Burger with a full feature, gallery, and clips. Read and watch on Journal.rs.",
      sr: "Journal.rs je objavio tekst o Flat Burgeru uz galeriju i video klipove. Pročitaj i pogledaj na Journal.rs.",
    },
    content: {
      en: `External feature: Journal.rs published an article about Flat Burger with photos and videos. See the full post and media on their site:`,
      sr: `Eksterni tekst: Journal.rs je objavio članak o Flat Burgeru sa fotografijama i video klipovima. Ceo tekst i medije pogledaj na njihovom sajtu:`,
    },
    date: "2024-08-17",
    author: {
      en: "Journal.rs",
      sr: "Journal.rs",
    },
    category: "news",
    sourceUrl:
      "https://www.journal.rs/lifestyle/gastro/flat-burger-street-food-beograd/",
  },

  {
    id: "2",
    title: {
      en: "🐔 New Addition: The Chicken Burger is Here!",
      sr: "🐔 Novi Dodatak: Chicken Burger je Stigao!",
    },
    excerpt: {
      en: "We're excited to announce that the Chicken Burger has arrived at Flat Burger! Your new favorite is here.",
      sr: "Sa uzbuđenjem objavljujemo da je Chicken Burger stigao u Flat Burger! Vaš novi omiljeni je ovde.",
    },
    content: {
      en: `🐔 New Addition: The Chicken Burger is Here!

We're excited to announce that the Chicken Burger has arrived at Flat Burger! For all of you who love chicken as much as we do, this new addition is bound to be your new favorite.

Our Chicken Flat features the same attention to detail and quality that you've come to expect from us. We've applied our signature flat-pressing technique to create a perfectly crispy exterior while maintaining a juicy, tender interior.

The Chicken Flat comes with our specially crafted chicken sauce, fresh lettuce, tomatoes, and all the quality ingredients that make our burgers special. It's everything you love about Flat Burger, now in chicken form.

Whether you're a longtime chicken lover or just looking to try something new, the Chicken Flat is ready to become your go-to choice. Available now at all Flat Burger locations!`,
      sr: `🐔 Novi Dodatak: Chicken Burger je Stigao!

Sa uzbuđenjem objavljujemo da je Chicken Burger stigao u Flat Burger! Za sve vas koji volite piletinu koliko i mi, ovaj novi dodatak sigurno će postati vaš novi omiljeni.

Naš Chicken Flat ima istu pažnju prema detaljima i kvalitetu koju očekujete od nas. Primenili smo našu prepoznatljivu tehniku ravnog presovanja da stvorimo savršeno hrskavu spoljašnost uz zadržavanje sočnog, nežnog unutrašnjeg dela.

Chicken Flat dolazi sa našim posebno napravljenim chicken sossom, svežom salatom, paradajzom i svim kvalitetnim sastojcima koji naše burgere čine posebnim. To je sve što volite kod Flat Burger-a, sada u chicken varijanti.

Bilo da ste dugogodišnji ljubitelj piletine ili samo želite da probate nešto novo, Chicken Flat je spreman da postane vaš glavni izbor. Dostupan je odmah u svim Flat Burger lokacijama!`,
    },
    date: "2024-12-15",
    author: {
      en: "Nemanja Mladenovic",
      sr: "Nemanja Mladenović",
    },
    category: "news",
  },
  {
    id: "3",
    title: {
      en: "🎬 Behind the Scenes: 'Ipeglaj Glad' Campaign",
      sr: "🎬 Iza Kulisa: 'Ipeglaj Glad' Kampanja",
    },
    excerpt: {
      en: "We're preparing something exciting! Get a behind-the-scenes look at our upcoming 'Ipeglaj Glad' campaign filming.",
      sr: "Pripremamo nešto uzbudljivo! Pogledajte iza kulisa našeg nadolazećeg snimanja 'Ipeglaj Glad' kampanje.",
    },
    content: {
      en: `🎬 Campaign Filming for "Ipeglaj Glad"

We're also preparing something exciting! Stay tuned for our upcoming campaign filming for "Ipeglaj Glad". You won't want to miss the behind-the-scenes look at this special project!

This campaign represents everything we stand for at Flat Burger - authenticity, Belgrade street culture, and the relentless pursuit of the perfect burger experience. "Ipeglaj Glad" captures the essence of what happens when you bite into a Flat Burger - that moment when hunger meets satisfaction.

The campaign will showcase real Belgrade locations, real people, and real reactions to our burgers. No scripts, no actors - just genuine moments of burger bliss throughout our beautiful city.

We're working with local talent and using locations that represent the true spirit of Belgrade. From the cobblestone streets of Skadarlija to the modern energy of Savamala, every shot will tell the story of how Flat Burger has become part of Belgrade's cultural fabric.

Follow our social media for exclusive behind-the-scenes content, bloopers, and first looks at what promises to be our most authentic campaign yet. The official launch is coming soon!`,
      sr: `🎬 Snimanje Kampanje "Ipeglaj Glad"

Takođe pripremamo nešto uzbudljivo! Ostanite u toku za naše nadolazeće snimanje kampanje "Ipeglaj Glad". Nećete želeti da propustite pogled iza kulisa ovog posebnog projekta!

Ova kampanja predstavlja sve za šta se zauzimamo u Flat Burger-u - autentičnost, beogradsku uličnu kulturu i neumoljivo težnju ka savršenom burger iskustvu. "Ipeglaj Glad" hvata suštinu onoga što se dešava kada ugriziete Flat Burger - taj trenutak kada se glad susreće sa zadovoljstvom.

Kampanja će prikazati prave beogradske lokacije, prave ljude i prave reakcije na naše burgere. Bez scenarija, bez glumaca - samo istinski trenuci burger blaženstva kroz naš prelepi grad.

Radimo sa lokalnim talentima i koristimo lokacije koje predstavljaju pravi duh Beograda. Od kaldrmisanih ulica Skadarlije do moderne energije Savamale, svaki kadar će ispričati priču o tome kako je Flat Burger postao deo beogradskog kulturnog tkiva.

Pratite naše društvene mreže za ekskluzivan sadržaj iza kulisa, blupere i prve poglede na ono što obećava da bude naša najautentičnija kampanja do sada. Zvanično lansiranje uskoro!`,
    },
    date: "2024-11-20",
    author: {
      en: "Nemanja Mladenovic",
      sr: "Nemanja Mladenović",
    },
    category: "news",
  },
  {
    id: "4",
    title: {
      en: "How Flat Burger Started",
      sr: "Kako je Počeo Flat Burger",
    },
    excerpt: {
      en: "From Belgrade streets to your plate - the story of how we revolutionized the burger game.",
      sr: "Od beogradskih ulica do vašeg tanjira - priča o tome kako smo revolucionirali burger igru.",
    },
    content: {
      en: `It all started with a simple question: why do burgers have to be boring?

Back in 2023, we were just a group of friends from Belgrade who were tired of the same old fast food experience. We had a vision - to bring real street energy to burgers, to make them flatter, better, and more authentic.

The idea came during a late night in Dorćol. We were sitting around, talking about how Belgrade has this incredible food culture, but somehow burgers always felt like an afterthought. That's when it hit us - what if we made burgers the Belgrade way? Flat, pressed, and packed with attitude.

We started experimenting in a tiny kitchen, pressing beef patties until they were perfectly flat, creating our signature sauce, and testing it on anyone who would try it. The response was immediate - people couldn't get enough.

Our first location opened in Dorćol, right where the idea was born. We kept it simple: 2x60g beef patties, real ingredients, no BS. The neighborhood embraced us immediately, and word spread fast.

Today, every Flat Burger is still made with that same energy and passion. We're not just making food - we're creating an experience that represents Belgrade's street culture.`,
      sr: `Sve je počelo jednostavnim pitanjem: zašto burgeri moraju da budu dosadni?

2023. godine, bili smo samo grupa prijatelja iz Beograda koji su se umorili od istog onog fast food iskustva. Imali smo viziju - da donesemo pravu uličnu energiju u burgere, da ih učinimo ravnijim, boljim i autentičnijim.

Ideja je došla tokom kasne noći u Dorćolu. Sedeli smo okolo, pričali o tome kako Beograd ima ovu neverovatnu hranu kulturu, ali nekako su burgeri uvek delovali kao naknadna misao. Tu nas je pogodilo - šta ako napravimo burgere na beogradski način? Ravno, presovano i napunjeno stavom.

Počeli smo da eksperimentišemo u maloj kuhinji, presujući govedine pljeskavice dok nisu bile savršeno ravne, stvarajući naš prepoznatljivi sos i testirajući na svima koji su hteli da probaju. Odgovor je bio trenutan - ljudi nisu mogli dovoljno da dobiju.

Naša prva lokacija otvorena je u Dorćolu, tačno tamo gde je ideja rođena. Držali smo se jednostavno: 2x60g govedine pljeskavice, pravi sastojci, bez BS-a. Komšiluk nas je odmah prihvatio, i vest se brzo proširila.

Danas se svaki Flat Burger i dalje pravi sa istom energijom i strašću. Ne samo da pravimo hranu - stvaramo iskustvo koje predstavlja beogradsku uličnu kulturu.`,
    },
    date: "2024-08-09",
    author: {
      en: "Nemanja Mladenovic",
      sr: "Nemanja Mladenović",
    },
    category: "story",
  },
];

export const OurStory: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "story" | "news"
  >("all");
  const [visiblePosts, setVisiblePosts] = useState<Set<string>>(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const postRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const postId = entry.target.getAttribute("data-post-id");
            if (postId) {
              setVisiblePosts((prev) => new Set([...prev, postId]));
            }
          }
        });
      },
      { threshold: 0.2 },
    );

    Object.values(postRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const filteredPosts =
    selectedCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const locale = language === "en" ? "en-US" : "sr-RS";
    return new Date(dateString).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < filteredPosts.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Reset slide when category changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-flat-beige pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-flat-blue hover:text-flat-dark transition-colors duration-300 font-bold touch-manipulation p-3 rounded-lg active:bg-flat-blue/10"
            style={{ fontFamily: "Bricolage Grotesque" }}
          >
            <ArrowLeft size={20} />
            <span>{t("story.backToHome")}</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-flat-blue mb-6 leading-tight tracking-tight"
            style={{ fontFamily: "Bricolage Grotesque" }}
          >
            {t("story.title")}
          </h1>
          <p
            className="text-xl md:text-2xl text-flat-blue/80 font-medium max-w-3xl mx-auto"
            style={{ fontFamily: "Bricolage Grotesque" }}
          >
            {t("story.subtitle")}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1 shadow-xl border border-flat-blue/10">
            {(["all", "story", "news"] as const).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentSlide(0); // Reset slide when category changes
                }}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-bold tracking-wider uppercase transition-all duration-300 text-sm md:text-base ${
                  selectedCategory === category
                    ? "bg-flat-blue text-flat-beige shadow-lg transform scale-105"
                    : "text-flat-blue hover:bg-flat-blue/10 hover:text-flat-dark"
                }`}
                style={{ fontFamily: "Bricolage Grotesque" }}
              >
                {category === "all"
                  ? t("story.allPosts")
                  : t(`story.${category}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              ref={(el) => {
                postRefs.current[post.id] = el;
              }}
              data-post-id={post.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 transform ${
                visiblePosts.has(post.id)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Media Section */}
              {(post.imageUrl || post.videoUrl) && (
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  {post.videoUrl ? (
                    <div className="w-full h-full flex items-center justify-center bg-flat-blue/10">
                      <div className="text-center">
                        <Video
                          size={48}
                          className="text-flat-blue mx-auto mb-4"
                        />
                        <p className="text-flat-blue font-bold">
                          {t("story.videoContent")}
                        </p>
                        <p className="text-sm text-flat-blue/70">
                          {t("story.clickToWatch")}
                        </p>
                      </div>
                    </div>
                  ) : post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title[language]}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-flat-blue/5">
                      <ImageIcon size={48} className="text-flat-blue/30" />
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        post.category === "story"
                          ? "bg-flat-blue text-flat-beige"
                          : "bg-flat-beige text-flat-blue"
                      }`}
                      style={{ fontFamily: "Bricolage Grotesque" }}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-8">
                {/* Meta Info */}
                <div className="flex items-center space-x-4 mb-4 text-sm text-flat-blue/60">
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span style={{ fontFamily: "Bricolage Grotesque" }}>
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User size={16} />
                    <span style={{ fontFamily: "Bricolage Grotesque" }}>
                      {post.author[language]}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2
                  className="text-2xl md:text-3xl font-black text-flat-blue mb-4 leading-tight tracking-tight"
                  style={{ fontFamily: "Bricolage Grotesque" }}
                >
                  {post.title[language]}
                </h2>

                {/* Excerpt */}
                <p
                  className="text-flat-blue/80 text-lg mb-6 leading-relaxed"
                  style={{ fontFamily: "Bricolage Grotesque" }}
                >
                  {post.excerpt[language]}
                </p>

                {/* Full Content (expandable) */}
                <details className="group">
                  <summary className="cursor-pointer text-flat-blue font-bold hover:text-flat-dark transition-colors list-none">
                    <span className="flex items-center space-x-2">
                      <span style={{ fontFamily: "Bricolage Grotesque" }}>
                        {t("story.readFullStory")}
                      </span>
                      <span className="transform transition-transform group-open:rotate-180">
                        ▼
                      </span>
                    </span>
                  </summary>
                  <div className="mt-6 pt-6 border-t border-flat-blue/10">
                    <div
                      className="text-flat-blue/80 leading-relaxed space-y-4"
                      style={{ fontFamily: "Bricolage Grotesque" }}
                    >
                      {post.content[language]
                        .split("\n\n")
                        .map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                  </div>
                </details>

                {post.sourceUrl && (
                  <div className="mt-6">
                    <a
                      href={post.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-flat-blue text-flat-beige px-6 py-3 rounded-full font-black tracking-wider uppercase hover:bg-flat-dark transition-all duration-300 transform hover:scale-105"
                      style={{ fontFamily: "Bricolage Grotesque" }}
                    >
                      {language === "en"
                        ? "Read on Journal.rs"
                        : "Pročitaj na Journal.rs"}
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Mobile Swipe Cards */}
        <div className="lg:hidden">
          <div
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-all duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {filteredPosts.map((post, index) => (
                <article key={post.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                    {/* Media Section */}
                    {(post.imageUrl || post.videoUrl) && (
                      <div className="aspect-video bg-gray-100 relative overflow-hidden">
                        {post.videoUrl ? (
                          <div className="w-full h-full flex items-center justify-center bg-flat-blue/10">
                            <div className="text-center">
                              <Video
                                size={48}
                                className="text-flat-blue mx-auto mb-4"
                              />
                              <p className="text-flat-blue font-bold">
                                {t("story.videoContent")}
                              </p>
                              <p className="text-sm text-flat-blue/70">
                                {t("story.clickToWatch")}
                              </p>
                            </div>
                          </div>
                        ) : post.imageUrl ? (
                          <img
                            src={post.imageUrl}
                            alt={post.title[language]}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-flat-blue/5">
                            <ImageIcon
                              size={48}
                              className="text-flat-blue/30"
                            />
                          </div>
                        )}

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                              post.category === "story"
                                ? "bg-flat-blue text-flat-beige"
                                : "bg-flat-beige text-flat-blue"
                            }`}
                            style={{ fontFamily: "Bricolage Grotesque" }}
                          >
                            {post.category}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta Info */}
                      <div className="flex items-center space-x-4 mb-4 text-sm text-flat-blue/60">
                        <div className="flex items-center space-x-1">
                          <Calendar size={16} />
                          <span style={{ fontFamily: "Bricolage Grotesque" }}>
                            {formatDate(post.date)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User size={16} />
                          <span style={{ fontFamily: "Bricolage Grotesque" }}>
                            {post.author[language]}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2
                        className="text-xl font-black text-flat-blue mb-4 leading-tight tracking-tight"
                        style={{ fontFamily: "Bricolage Grotesque" }}
                      >
                        {post.title[language]}
                      </h2>

                      {/* Excerpt */}
                      <p
                        className="text-flat-blue/80 text-base mb-6 leading-relaxed"
                        style={{ fontFamily: "Bricolage Grotesque" }}
                      >
                        {post.excerpt[language]}
                      </p>

                      {/* Full Content (expandable) */}
                      <details className="group">
                        <summary className="cursor-pointer text-flat-blue font-bold hover:text-flat-dark transition-colors list-none">
                          <span className="flex items-center space-x-2">
                            <span style={{ fontFamily: "Bricolage Grotesque" }}>
                              {t("story.readFullStory")}
                            </span>
                            <span className="transform transition-transform group-open:rotate-180">
                              ▼
                            </span>
                          </span>
                        </summary>
                        <div className="mt-6 pt-6 border-t border-flat-blue/10">
                          <div
                            className="text-flat-blue/80 leading-relaxed space-y-4 text-sm"
                            style={{ fontFamily: "Bricolage Grotesque" }}
                          >
                            {post.content[language]
                              .split("\n\n")
                              .map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                              ))}
                          </div>
                        </div>
                      </details>

                      {post.sourceUrl && (
                        <div className="mt-4">
                          <a
                            href={post.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-flat-blue text-flat-beige px-5 py-2 rounded-full font-black tracking-wider uppercase text-sm hover:bg-flat-dark transition-all duration-300"
                            style={{ fontFamily: "Bricolage Grotesque" }}
                          >
                            {language === "en"
                              ? "Read on Journal.rs"
                              : "Pročitaj na Journal.rs"}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="mt-6">
            {/* Story Counter */}
            <div className="text-center mb-4">
              <p
                className="text-flat-blue font-bold text-lg"
                style={{ fontFamily: "Bricolage Grotesque" }}
              >
                {currentSlide + 1} / {filteredPosts.length}
              </p>
              <p
                className="text-flat-blue/60 text-sm"
                style={{ fontFamily: "Bricolage Grotesque" }}
              >
                {selectedCategory === "all"
                  ? t("story.allStoriesText")
                  : selectedCategory === "story"
                    ? t("story.ourStoryText")
                    : t("story.latestNewsText")}
              </p>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2 mb-4">
              {filteredPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 touch-manipulation ${
                    currentSlide === index
                      ? "bg-flat-blue scale-125 shadow-lg"
                      : "bg-flat-blue/30 hover:bg-flat-blue/50"
                  }`}
                />
              ))}
            </div>

            {/* Swipe Instruction */}
            <div className="text-center">
              <p
                className="text-flat-blue/60 text-sm"
                style={{ fontFamily: "Bricolage Grotesque" }}
              >
                {t("story.swipeInstruction")}
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-flat-blue text-flat-beige p-8 rounded-3xl max-w-2xl mx-auto">
            <h3
              className="text-3xl font-black mb-4 tracking-tight"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              {t("story.ctaTitle")}
            </h3>
            <p
              className="text-flat-beige/90 text-lg mb-6"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              {t("story.ctaSubtitle")}
            </p>
            <a
              href="https://wolt.com/sr/srb/belgrade/restaurant/flat-burger11?srsltid=AfmBOop99ec-lBKnlyj1yDoIojJHB9b4a9IxwRhF7eKxQLCmfo_Gb0Ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-flat-beige text-flat-blue px-8 py-4 rounded-full font-black tracking-wider uppercase hover:bg-white transition-all duration-300 transform hover:scale-105"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              {t("story.orderNow")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
