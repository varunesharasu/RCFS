import React, { useState, useEffect } from "react";
import "./Gallery.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import placeholder from '/placeholder.svg?height=1080&width=1920';

import { faSearch, faTimes, faChevronLeft, faChevronRight, faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const categories = ["all", "accommodations", "activities", "dining", "nature"];

// Enhanced image data with more details
// const initialImages = [
//   { 
//     id: 1, 
//     category: "accommodations", 
//     title: "Luxury Royal Suite", 
//     description: "Our premium accommodation with scenic mountain views and private balcony",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 2, 
//     category: "accommodations", 
//     title: "Family Cottage", 
//     description: "Spacious cottage perfect for families with garden access",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 3, 
//     category: "accommodations", 
//     title: "Heritage Villa", 
//     description: "Experience traditional architecture with modern amenities",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 4, 
//     category: "accommodations", 
//     title: "Honeymoon Suite", 
//     description: "Romantic setting with private jacuzzi and panoramic views",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 5, 
//     category: "activities", 
//     title: "Horse Riding", 
//     description: "Explore our vast estate on horseback with experienced guides",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 6, 
//     category: "activities", 
//     title: "Farm Tour", 
//     description: "Learn about organic farming practices and sustainable agriculture",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 7, 
//     category: "activities", 
//     title: "Yoga Retreat", 
//     description: "Find peace and balance with our morning yoga sessions",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 8, 
//     category: "activities", 
//     title: "Cooking Workshop", 
//     description: "Learn to prepare traditional Tamil cuisine with our expert chefs",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 9, 
//     category: "dining", 
//     title: "Farm-to-Table Dining", 
//     description: "Fresh ingredients harvested from our organic gardens",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 10, 
//     category: "dining", 
//     title: "Royal Feast", 
//     description: "Experience the grandeur of traditional royal cuisine",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 11, 
//     category: "dining", 
//     title: "Sunset Barbecue", 
//     description: "Enjoy grilled specialties under the stars with mountain views",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 12, 
//     category: "dining", 
//     title: "Organic Breakfast", 
//     description: "Start your day with nutritious farm-fresh breakfast options",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 13, 
//     category: "nature", 
//     title: "Sunrise View", 
//     description: "Breathtaking morning views from our eastern viewpoint",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 14, 
//     category: "nature", 
//     title: "Flower Gardens", 
//     description: "Stroll through our colorful and fragrant flower gardens",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 15, 
//     category: "nature", 
//     title: "Farm Animals", 
//     description: "Meet our friendly farm residents including cows, goats and chickens",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 16, 
//     category: "nature", 
//     title: "Lakeside Retreat", 
//     description: "Peaceful moments by our private lake with fishing opportunities",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
// ];

// // Additional images for load more functionality
// const additionalImages = [
//   { 
//     id: 17, 
//     category: "accommodations", 
//     title: "Garden View Room", 
//     description: "Comfortable rooms overlooking our lush gardens",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 18, 
//     category: "activities", 
//     title: "Pottery Making", 
//     description: "Learn traditional pottery techniques from local artisans",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 19, 
//     category: "dining", 
//     title: "Tea Garden", 
//     description: "Afternoon tea service with homemade pastries in our garden",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 20, 
//     category: "nature", 
//     title: "Herb Garden", 
//     description: "Explore our aromatic herb garden used in our farm-to-table cuisine",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 21, 
//     category: "accommodations", 
//     title: "Royal Castle Suite", 
//     description: "Our most luxurious accommodation with antique furnishings",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 22, 
//     category: "activities", 
//     title: "Bird Watching", 
//     description: "Guided tours to spot local and migratory birds in our sanctuary",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 23, 
//     category: "dining", 
//     title: "Wine Tasting", 
//     description: "Sample local and international wines paired with artisanal cheeses",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
//   { 
//     id: 24, 
//     category: "nature", 
//     title: "Organic Vegetable Garden", 
//     description: "See where we grow the fresh produce used in our restaurant",
//     src: "/placeholder.svg?height=600&width=800" 
//   },
// ];

const initialImages = [
    { 
      id: 1, 
      category: "accommodations", 
      title: "Luxury Royal Suite", 
      description: "Our premium accommodation with scenic mountain views and private balcony",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
    { 
      id: 2, 
      category: "accommodations", 
      title: "Family Cottage", 
      description: "Spacious cottage perfect for families with garden access",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
    { 
      id: 3, 
      category: "accommodations", 
      title: "Heritage Villa", 
      description: "Experience traditional architecture with modern amenities",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
    { 
      id: 4, 
      category: "accommodations", 
      title: "Honeymoon Suite", 
      description: "Romantic setting with private jacuzzi and panoramic views",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7"
 
    },
    { 
      id: 5, 
      category: "activities", 
      title: "Horse Riding", 
      description: "Explore our vast estate on horseback with experienced guides",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7"
    },
    { 
      id: 6, 
      category: "activities", 
      title: "Farm Tour", 
      description: "Learn about organic farming practices and sustainable agriculture",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7"
    },
    { 
      id: 7, 
      category: "activities", 
      title: "Yoga Retreat", 
      description: "Find peace and balance with our morning yoga sessions",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7"
    },
    { 
      id: 8, 
      category: "activities", 
      title: "Cooking Workshop", 
      description: "Learn to prepare traditional Tamil cuisine with our expert chefs",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
    { 
      id: 9, 
      category: "dining", 
      title: "Farm-to-Table Dining", 
      description: "Fresh ingredients harvested from our organic gardens",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
    { 
      id: 10, 
      category: "dining", 
      title: "Royal Feast", 
      description: "Experience the grandeur of traditional royal cuisine",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
    { 
      id: 11, 
      category: "dining", 
      title: "Sunset Barbecue", 
      description: "Enjoy grilled specialties under the stars with mountain views",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
    { 
      id: 12, 
      category: "dining", 
      title: "Organic Breakfast", 
      description: "Start your day with nutritious farm-fresh breakfast options",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
    { 
      id: 13, 
      category: "nature", 
      title: "Sunrise View", 
      description: "Breathtaking morning views from our eastern viewpoint",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
    { 
      id: 14, 
      category: "nature", 
      title: "Flower Gardens", 
      description: "Stroll through our colorful and fragrant flower gardens",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
    { 
      id: 15, 
      category: "nature", 
      title: "Farm Animals", 
      description: "Meet our friendly farm residents including cows, goats and chickens",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
    { 
      id: 16, 
      category: "nature", 
      title: "Lakeside Retreat", 
      description: "Peaceful moments by our private lake with fishing opportunities",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
  ];
  
  const additionalImages = [
    { 
      id: 17, 
      category: "accommodations", 
      title: "Garden View Room", 
      description: "Comfortable rooms overlooking our lush gardens",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
    { 
      id: 18, 
      category: "activities", 
      title: "Pottery Making", 
      description: "Learn traditional pottery techniques from local artisans",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
    { 
      id: 19, 
      category: "dining", 
      title: "Tea Garden", 
      description: "Afternoon tea service with homemade pastries in our garden",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
    { 
      id: 20, 
      category: "nature", 
      title: "Herb Garden", 
      description: "Explore our aromatic herb garden used in our farm-to-table cuisine",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
    { 
      id: 21, 
      category: "accommodations", 
      title: "Royal Castle Suite", 
      description: "Our most luxurious accommodation with antique furnishings",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
    { 
      id: 22, 
      category: "activities", 
      title: "Bird Watching", 
      description: "Guided tours to spot local and migratory birds in our sanctuary",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
    { 
      id: 23, 
      category: "dining", 
      title: "Wine Tasting", 
      description: "Sample local and international wines paired with artisanal cheeses",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
    { 
      id: 24, 
      category: "nature", 
      title: "Organic Vegetable Garden", 
      description: "See where we grow the fresh produce used in our restaurant",
      src: "https://www.zenhotels.com/hotel/en-rs/india/vijayamangalam/mid10902845/royal_castle_farm_stay_resort/?popup=photos_hotel&photoNum=7" 
    },
  ];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [images, setImages] = useState(initialImages);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [clickCount, setClickCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const filteredImages = images.filter(
    (img) => selectedCategory === "all" || img.category === selectedCategory
  );

  const openLightbox = (index) => {
    setLightbox({ open: true, index });
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };
  
  const closeLightbox = () => {
    setLightbox({ open: false, index: 0 });
    document.body.style.overflow = ''; // Restore scrolling
  };
  
  const nextImage = () =>
    setLightbox((prev) => ({ ...prev, index: (prev.index + 1) % filteredImages.length }));
  
  const prevImage = () =>
    setLightbox((prev) => ({ ...prev, index: (prev.index - 1 + filteredImages.length) % filteredImages.length }));

  const loadMore = () => {
    setIsLoading(true);
    setClickCount((prev) => prev + 1);
    
    // Simulate loading delay
    setTimeout(() => {
      if (clickCount === 0) {
        setImages([...images, ...additionalImages.slice(0, 4)]);
      } else if (clickCount === 1) {
        setImages([...images, ...additionalImages.slice(4)]);
      }
      setIsLoading(false);
    }, 800);
  };

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.open) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  return (
    <div className="gallery-container">
      {/* Hero Section */}
      <div className="hero-section gallery-hero">
        <div className="carousel-content">
          <h1 className="slide-title">Our Gallery</h1>
          <p className="slide-subtitle">Explore the beauty and experiences at Royal Castle Farm Stay</p>
        </div>
      </div>
      
      {/* About Section */}
      <section className="welcome-section">
        <div className="container">
          <div className="section-header">
            <h2>Welcome to Royal Castle Farm Stay</h2>
            <div className="divider"></div>
            <p>Experience luxury and nature in perfect harmony at our historic estate</p>
          </div>
          
          <div className="welcome-content">
            <div className="welcome-text">
              <p>
                Nestled in the serene countryside of Erode, Royal Castle Farm Stay offers a unique blend of luxury, 
                heritage, and natural beauty. Our estate spans over 25 acres of lush greenery, organic farms, 
                and beautiful gardens.
              </p>
              <p>
                Whether you're seeking a peaceful retreat, a family vacation, or an adventure in nature, 
                Royal Castle Farm Stay provides an unforgettable experience with our world-class accommodations, 
                farm-to-table dining, and curated activities.
              </p>
              <p>
                Our commitment to sustainable practices ensures that your stay not only rejuvenates you 
                but also contributes to the preservation of our environment and local heritage.
              </p>
            </div>
            <div className="welcome-image">
              <img src="/placeholder.svg?height=600&width=800" alt="Royal Castle Farm Stay" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <div className="section-header">
            <h2>Photo Gallery</h2>
            <div className="divider"></div>
            <p>Discover the charm and beauty of our farm stay through our collection of photographs</p>
          </div>
          
          <div className="gallery-filter">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="gallery-grid">
            {filteredImages.map((img, index) => (
              <div key={img.id} className="gallery-item" data-category={img.category}>
                <div className="gallery-image">
                  <img src={img.src || "/placeholder.svg"} alt={img.title} />
                  <div className="gallery-overlay">
                    <div className="gallery-info">
                      <h3>{img.title}</h3>
                      <p>{img.description}</p>
                    </div>
                    <button className="gallery-zoom" onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(index);
                    }}>
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {(clickCount < 2 && images.length < initialImages.length + additionalImages.length) && (
            <div className="gallery-load-more">
              <button 
                className={`secondary-btn ${isLoading ? 'loading' : ''}`} 
                onClick={loadMore} 
                disabled={isLoading || clickCount >= 2}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Location Section */}
      <section className="location-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Location</h2>
            <div className="divider"></div>
            <p>Find us nestled in the beautiful countryside of Erode, Tamil Nadu</p>
          </div>
          
          <div className="location-content">
            <div className="location-info">
              <div className="address-block">
                <h3>Address</h3>
                <div className="info-with-icon">
                  <div className="icon">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <div className="info-text">
                    <p>Royal Castle Farm Stay</p>
                    <p>SF.No.328/4, Andipalayam Road</p>
                    <p>EnneiKadai Karar, Odathurai</p>
                    <p>Erode, Tamil Nadu, 638455</p>
                  </div>
                </div>
              </div>
              
              <div className="contact-block">
                <h3>Contact Us</h3>
                <div className="info-with-icon">
                  <div className="icon">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div className="info-text">
                    <p>+91 98765 43210</p>
                  </div>
                </div>
                <div className="info-with-icon">
                  <div className="icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div className="info-text">
                    <p>info@royalcastlefarmstay.com</p>
                  </div>
                </div>
              </div>
              
              <div className="directions-block">
                <h3>Getting Here</h3>
                <div className="info-text">
                  <p>• 15 km from Erode Junction Railway Station</p>
                  <p>• 25 km from Erode Bus Terminal</p>
                  <p>• 80 km from Coimbatore International Airport</p>
                  <p>• We offer pickup services from these locations (charges apply)</p>
                </div>
              </div>
            </div>
            
            <div className="map-container">
              <img 
                src="/placeholder.svg?height=600&width=800" 
                alt="Map to Royal Castle Farm Stay" 
                className="fallback-map"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience Royal Castle Farm Stay?</h2>
            <p>Book your stay now and create memories that will last a lifetime</p>
            <button className="cta-btn">Book Now</button>
          </div>
        </div>
      </section>
      
      {/* Lightbox */}
      {lightbox.open && (
        <div className="lightbox active">
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={closeLightbox}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <button className="lightbox-prev" onClick={prevImage}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className="lightbox-image-container">
              <img 
                src={filteredImages[lightbox.index].src || "/placeholder.svg"} 
                alt={filteredImages[lightbox.index].title} 
                className="lightbox-image"
              />
              <div className="lightbox-caption">
                <h3>{filteredImages[lightbox.index].title}</h3>
                <p>{filteredImages[lightbox.index].description}</p>
              </div>
            </div>
            <button className="lightbox-next" onClick={nextImage}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
