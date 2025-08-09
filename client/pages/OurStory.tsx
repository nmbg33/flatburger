import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Video, Image as ImageIcon } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: "story" | "news";
  imageUrl?: string;
  videoUrl?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Flat Burger at Los Silos Burger Festival 2025!",
    excerpt: "Belgrade will once again become the epicenter of burger culture! Join us at the most exciting gastronomic event in the region.",
    content: `🍔 Flat Burger at Los Silos Burger Festival 2025

Beograd will once again become the epicenter of burger culture! From August 29 to September 7, 2025, Flat Burger will proudly participate in the Los Silos Burger Festival, one of the most exciting gastronomic events in the region.

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
    date: "2025-08-09",
    author: "Nemanja Mladenovic",
    category: "news",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F60065f0b142349638ce5191622432261"
  },
  {
    id: "2",
    title: "🐔 New Addition: The Chicken Burger is Here!",
    excerpt: "We're excited to announce that the Chicken Burger has arrived at Flat Burger! Your new favorite is here.",
    content: `🐔 New Addition: The Chicken Burger is Here!

We're excited to announce that the Chicken Burger has arrived at Flat Burger! For all of you who love chicken as much as we do, this new addition is bound to be your new favorite.

Our Chicken Flat features the same attention to detail and quality that you've come to expect from us. We've applied our signature flat-pressing technique to create a perfectly crispy exterior while maintaining a juicy, tender interior.

The Chicken Flat comes with our specially crafted chicken sauce, fresh lettuce, tomatoes, and all the quality ingredients that make our burgers special. It's everything you love about Flat Burger, now in chicken form.

Whether you're a longtime chicken lover or just looking to try something new, the Chicken Flat is ready to become your go-to choice. Available now at all Flat Burger locations!`,
    date: "2024-12-15",
    author: "Nemanja Mladenovic",
    category: "news"
  },
  {
    id: "3",
    title: "🎬 Behind the Scenes: 'Ipeglaj Glad' Campaign",
    excerpt: "We're preparing something exciting! Get a behind-the-scenes look at our upcoming 'Ipeglaj Glad' campaign filming.",
    content: `🎬 Campaign Filming for "Ipeglaj Glad"

We're also preparing something exciting! Stay tuned for our upcoming campaign filming for "Ipeglaj Glad". You won't want to miss the behind-the-scenes look at this special project!

This campaign represents everything we stand for at Flat Burger - authenticity, Belgrade street culture, and the relentless pursuit of the perfect burger experience. "Ipeglaj Glad" captures the essence of what happens when you bite into a Flat Burger - that moment when hunger meets satisfaction.

The campaign will showcase real Belgrade locations, real people, and real reactions to our burgers. No scripts, no actors - just genuine moments of burger bliss throughout our beautiful city.

We're working with local talent and using locations that represent the true spirit of Belgrade. From the cobblestone streets of Skadarlija to the modern energy of Savamala, every shot will tell the story of how Flat Burger has become part of Belgrade's cultural fabric.

Follow our social media for exclusive behind-the-scenes content, bloopers, and first looks at what promises to be our most authentic campaign yet. The official launch is coming soon!`,
    date: "2024-11-20",
    author: "Nemanja Mladenovic",
    category: "news"
  },
  {
    id: "4",
    title: "How Flat Burger Started",
    excerpt: "From Belgrade streets to your plate - the story of how we revolutionized the burger game.",
    content: `It all started with a simple question: why do burgers have to be boring?

Back in 2023, we were just a group of friends from Belgrade who were tired of the same old fast food experience. We had a vision - to bring real street energy to burgers, to make them flatter, better, and more authentic.

The idea came during a late night in Dorćol. We were sitting around, talking about how Belgrade has this incredible food culture, but somehow burgers always felt like an afterthought. That's when it hit us - what if we made burgers the Belgrade way? Flat, pressed, and packed with attitude.

We started experimenting in a tiny kitchen, pressing beef patties until they were perfectly flat, creating our signature sauce, and testing it on anyone who would try it. The response was immediate - people couldn't get enough.

Our first location opened in Dorćol, right where the idea was born. We kept it simple: 2x60g beef patties, real ingredients, no BS. The neighborhood embraced us immediately, and word spread fast.

Today, every Flat Burger is still made with that same energy and passion. We're not just making food - we're creating an experience that represents Belgrade's street culture.`,
    date: "2024-08-09",
    author: "Nemanja Mladenovic",
    category: "story"
  },
  {
    id: "5",
    title: "New Partnership with Local Suppliers",
    excerpt: "We're expanding our commitment to Belgrade by partnering with local farmers and suppliers.",
    content: `We're excited to announce new partnerships with local Belgrade suppliers that will enhance our commitment to the community.

Starting this month, our beef comes exclusively from Serbian farms that meet our quality standards. Our vegetables are sourced from Vojvodina region, ensuring freshness and supporting local agriculture.

This isn't just about better ingredients (though they definitely are) - it's about building a network that supports our city and region. When you eat a Flat Burger, you're supporting Belgrade's food ecosystem.

We're also working on seasonal specials that will highlight the best of what local suppliers have to offer throughout the year.`,
    date: "2024-03-10",
    author: "Operations Team",
    category: "news"
  },
  {
    id: "6",
    title: "Behind the Scenes: Making Our Signature Sauce",
    excerpt: "Ever wondered what makes our flat sauce so addictive? Here's an inside look at our secret recipe development.",
    content: `Our signature flat sauce didn't happen overnight. It took months of experimentation to get the perfect balance of tangy, creamy, and just a little bit spicy.

The base starts with premium mayonnaise, but then we add our special blend of spices, a touch of mustard for sharpness, and a secret ingredient that we source locally in Belgrade (sorry, can't reveal that one!).

What makes it special is the texture - we developed a technique that makes it stick perfectly to our flat patties without dripping off. It's thick enough to stay put, but smooth enough to spread evenly.

The sauce is made fresh every morning in small batches. We never use preservatives, which means it has that fresh, bright taste that you can't get from mass-produced sauces.

Fun fact: our sauce recipe has been adjusted 47 times since we started. We're perfectionists, and it shows in every bottle.`,
    date: "2024-03-25",
    author: "Kitchen Team",
    category: "story",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

export const OurStory: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<"all" | "story" | "news">("all");
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
            const postId = entry.target.getAttribute('data-post-id');
            if (postId) {
              setVisiblePosts(prev => new Set([...prev, postId]));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.values(postRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const filteredPosts = selectedCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
            onClick={() => navigate('/')}
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
          <div className="bg-white rounded-full p-2 shadow-lg">
            {(["all", "story", "news"] as const).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-bold tracking-wider uppercase transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-flat-blue text-flat-beige"
                    : "text-flat-blue hover:bg-flat-blue/10"
                }`}
                style={{ fontFamily: "Bricolage Grotesque" }}
              >
                {category === "all" ? t("story.allPosts") : t(`story.${category}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              ref={(el) => { postRefs.current[post.id] = el; }}
              data-post-id={post.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 transform ${
                visiblePosts.has(post.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Media Section */}
              {(post.imageUrl || post.videoUrl) && (
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  {post.videoUrl ? (
                    <div className="w-full h-full flex items-center justify-center bg-flat-blue/10">
                      <div className="text-center">
                        <Video size={48} className="text-flat-blue mx-auto mb-4" />
                        <p className="text-flat-blue font-bold">Video Content</p>
                        <p className="text-sm text-flat-blue/70">Click to watch</p>
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
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
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
                      <span style={{ fontFamily: "Bricolage Grotesque" }}>{t("story.readFullStory")}</span>
                      <span className="transform transition-transform group-open:rotate-180">▼</span>
                    </span>
                  </summary>
                  <div className="mt-6 pt-6 border-t border-flat-blue/10">
                    <div
                      className="text-flat-blue/80 leading-relaxed space-y-4"
                      style={{ fontFamily: "Bricolage Grotesque" }}
                    >
                      {post.content.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </details>
              </div>
            </article>
          ))}
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
              href="https://wolt.com/en/srb/belgrade/restaurant/flat-burger"
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
