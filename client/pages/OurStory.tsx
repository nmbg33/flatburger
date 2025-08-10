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
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Flat Burger na Los Silos Burger Festival 2025!",
    excerpt:
      "Beograd će ponovo postati epicentar burger kulture! Pridružite nam se na najuzbudljivijem gastronomskom događaju u regionu.",
    content: `🍔 Flat Burger na Los Silos Burger Festival 2025

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
    date: "2025-08-09",
    author: "Nemanja Mladenović",
    category: "news",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F60065f0b142349638ce5191622432261",
  },
  {
    id: "2",
    title: "🐔 Novi Dodatak: Chicken Burger je Stigao!",
    excerpt:
      "Sa uzbuđenjem objavljujemo da je Chicken Burger stigao u Flat Burger! Vaš novi omiljeni je ovde.",
    content: `🐔 Novi Dodatak: Chicken Burger je Stigao!

Sa uzbuđenjem objavljujemo da je Chicken Burger stigao u Flat Burger! Za sve vas koji volite piletinu koliko i mi, ovaj novi dodatak sigurno će postati vaš novi omiljeni.

Naš Chicken Flat ima istu pažnju prema detaljima i kvalitetu koju očekujete od nas. Primenili smo našu prepoznatljivu tehniku ravnog presovanja da stvorimo savršeno hrskavu spoljašnost uz zadržavanje sočnog, nežnog unutrašnjeg dela.

Chicken Flat dolazi sa našim posebno napravljenim chicken sossom, svežom salatom, paradajzom i svim kvalitetnim sastojcima koji naše burgere čine posebnim. To je sve što volite kod Flat Burger-a, sada u chicken varijanti.

Bilo da ste dugogodišnji ljubitelj piletine ili samo želite da probate nešto novo, Chicken Flat je spreman da postane vaš glavni izbor. Dostupan je odmah u svim Flat Burger lokacijama!`,
    date: "2024-12-15",
    author: "Nemanja Mladenović",
    category: "news",
  },
  {
    id: "3",
    title: "🎬 Iza Kulisa: 'Ipeglaj Glad' Kampanja",
    excerpt:
      "Pripremamo nešto uzbudljivo! Pogledajte iza kulisa našeg nadolazećeg snimanja 'Ipeglaj Glad' kampanje.",
    content: `🎬 Snimanje Kampanje "Ipeglaj Glad"

Takođe pripremamo nešto uzbudljivo! Ostanite u toku za naše nadolazeće snimanje kampanje "Ipeglaj Glad". Nećete želeti da propustite pogled iza kulisa ovog posebnog projekta!

Ova kampanja predstavlja sve za šta se zauzimamo u Flat Burger-u - autentičnost, beogradsku uličnu kulturu i neumoljivo težnju ka savršenom burger iskustvu. "Ipeglaj Glad" hvata suštinu onoga što se dešava kada ugriziete Flat Burger - taj trenutak kada se glad susreće sa zadovoljstvom.

Kampanja će prikazati prave beogradske lokacije, prave ljude i prave reakcije na naše burgere. Bez scenarija, bez glumaca - samo istinski trenuci burger blaženstva kroz naš prelepi grad.

Radimo sa lokalnim talentima i koristimo lokacije koje predstavljaju pravi duh Beograda. Od kaldrmisanih ulica Skadarlije do moderne energije Savamale, svaki kadar će ispričati priču o tome kako je Flat Burger postao deo beogradskog kulturnog tkiva.

Pratite naše društvene mreže za ekskluzivan sadržaj iza kulisa, blupere i prve poglede na ono što obećava da bude naša najautentičnija kampanja do sada. Zvanično lansiranje uskoro!`,
    date: "2024-11-20",
    author: "Nemanja Mladenović",
    category: "news",
  },
  {
    id: "4",
    title: "Kako je Počeo Flat Burger",
    excerpt:
      "Od beogradskih ulica do vašeg tanjira - priča o tome kako smo revolucionirali burger igru.",
    content: `Sve je počelo jednostavnim pitanjem: zašto burgeri moraju da budu dosadni?

2023. godine, bili smo samo grupa prijatelja iz Beograda koji su se umorili od istog onog fast food iskustva. Imali smo viziju - da donesemo pravu uličnu energiju u burgere, da ih učinimo ravnijim, boljim i autentičnijim.

Ideja je došla tokom kasne noći u Dorćolu. Sedeli smo okolo, pričali o tome kako Beograd ima ovu neverovatnu hranu kulturu, ali nekako su burgeri uvek delovali kao naknadna misao. Tu nas je pogodilo - šta ako napravimo burgere na beogradski način? Ravno, presovano i napunjeno stavom.

Počeli smo da eksperimentišemo u maloj kuhinji, presujući govedine pljeskavice dok nisu bile savršeno ravne, stvarajući naš prepoznatljivi sos i testirajući na svima koji su hteli da probaju. Odgovor je bio trenutan - ljudi nisu mogli dovoljno da dobiju.

Naša prva lokacija otvorena je u Dorćolu, tačno tamo gde je ideja rođena. Držali smo se jednostavno: 2x60g govedine pljeskavice, pravi sastojci, bez BS-a. Komšiluk nas je odmah prihvatio, i vest se brzo proširila.

Danas se svaki Flat Burger i dalje pravi sa istom energijom i strašću. Ne samo da pravimo hranu - stvaramo iskustvo koje predstavlja beogradsku uličnu kulturu.`,
    date: "2024-08-09",
    author: "Nemanja Mladenović",
    category: "story",
  },
  {
    id: "5",
    title: "Novo Partnerstvo sa Lokalnim Dobavljačima",
    excerpt:
      "Proširujemo našu posvećenost Beogradu kroz partnerstvo sa lokalnim poljoprivrednicima i dobavljačima.",
    content: `Sa uzbuđenjem objavljujemo nova partnerstva sa lokalnim beogradskim dobavljačima koja će poboljšati našu posvećenost zajednici.

Počevši od ovog meseca, naša govedina dolazi isključivo sa srpskih farmi koje ispunjavaju naše standarde kvaliteta. Naše povrće se nabavlja iz vojvođanskog regiona, obezbeđujući svežinu i podržavajući lokalnu poljoprivredu.

Ovo nije samo o boljim sastojcima (mada oni definitivno jesu) - ovo je o izgradnji mreže koja podržava naš grad i region. Kada jedete Flat Burger, podržavate beogradski prehrambeni ekosistem.

Takođe radimo na sezonskim specijalitetima koji će tokom godine istaći najbolje što lokalni dobavljači imaju da ponude.`,
    date: "2024-03-10",
    author: "Operacioni Tim",
    category: "news",
  },
];

export const OurStory: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
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
    return new Date(dateString).toLocaleDateString("sr-RS", {
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
                      alt={post.title}
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
                      {post.author}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2
                  className="text-2xl md:text-3xl font-black text-flat-blue mb-4 leading-tight tracking-tight"
                  style={{ fontFamily: "Bricolage Grotesque" }}
                >
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p
                  className="text-flat-blue/80 text-lg mb-6 leading-relaxed"
                  style={{ fontFamily: "Bricolage Grotesque" }}
                >
                  {post.excerpt}
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
                      {post.content.split("\n\n").map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </details>
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
                            alt={post.title}
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
                            {post.author}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2
                        className="text-xl font-black text-flat-blue mb-4 leading-tight tracking-tight"
                        style={{ fontFamily: "Bricolage Grotesque" }}
                      >
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p
                        className="text-flat-blue/80 text-base mb-6 leading-relaxed"
                        style={{ fontFamily: "Bricolage Grotesque" }}
                      >
                        {post.excerpt}
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
                            {post.content
                              .split("\n\n")
                              .map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                              ))}
                          </div>
                        </div>
                      </details>
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
