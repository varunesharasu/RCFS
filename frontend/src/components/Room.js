// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Room.css';

// const rooms = [
//   {
//     id: 1,
//     name: 'Couple Room AC',
//     price: '₹ 2,594',
//     description: '(110 sq.ft (10 sq.mt) | Double Bed)',
//     image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-13432-81a16730e32711eda8160a58a9feac02.jpg?downsize=*:500&crop=990:500',
//     details: 'This deluxe room offers a stunning sea view, king-sized bed, and a private balcony. Perfect for couples or solo travelers looking for luxury.'
//   },
//   {
//     id: 2,
//     name: '4 Member Room AC',
//     price: '₹ 3,890',
//     description: '(160 sq.ft (15 sq.mt) | Double Bed)',
//     image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981494-900f2aa4e0bc11ed99480a58a9feac02.jpg?downsize=*:500&crop=990:500',
//     details: 'This standard room comes with a queen-sized bed, garden view, and basic amenities. Ideal for budget travelers.'
//   },
//   {
//     id: 3,
//     name: '6 Members Room AC',
//     price: '₹ 6,508',
//     description: '(220 sq.ft (20 sq.mt) | King Bed)',
//     image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981484-024d20a4e32811eda8160a58a9feac02.jpg?downsize=*:500&crop=990:500',
//     details: 'This family suite includes two bedrooms, a living area, and a kitchenette. Perfect for families or groups of friends.'
//   },
//   {
//     id: 4,
//     name: 'Hut NON AC',
//     price: '₹ 17,862',
//     description: '(680 sq.ft (63 sq.mt) | Queen Bed)',
//     image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-3712-7c6d8866e03911ed95310a58a9feac02.jpg?downsize=*:500&crop=990:500',
//     details: 'The executive suite features a large bedroom, private balcony, and premium amenities. Ideal for business travelers or those seeking luxury.'
//   },
//   {
//     id: 5,
//     name: 'Private Villa',
//     price: '₹ 24,184',
//     description: '(2600 sq.ft (242 sq.mt) | Futon)',
//     image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-15182-f2e76d04dff311ed8a570a58a9feac02.jpg?downsize=*:500&crop=990:500',
//     details: 'This private villa is perfect for those who seek comfort, space, and luxury. Comes with a pool and a private garden.'
//   },
//   {
//     id: 6,
//     name: 'Indoor Theatre Hall AC',
//     price: '₹ 26,893',
//     description: '(900 sq.ft (84 sq.mt) | King Bed)',
//     image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981440-f095a7fae03411edbaad0a58a9feac02.jpg?downsize=*:500&crop=990:500',
//     details: 'A luxurious indoor theatre hall with a massive screen, premium sound system, and elegant seating.'
//   },
// ];

// const Room = () => {
//   const [selectedRoom, setSelectedRoom] = useState(null);

//   const openModal = (room) => {
//     setSelectedRoom(room);
//   };

//   const closeModal = () => {
//     setSelectedRoom(null);
//   };

//   return (
//     <div className="room-container">
//       {rooms.map((room) => (
//         <div key={room.id} className="room-card">
//           <div className="room-image-wrapper">
//             <img src={room.image} alt={room.name} className="room-image" />
//           </div>
//           <h3>{room.name}</h3>
//           <p>{room.description}</p>
//           <p><strong>{room.price}/night</strong></p>
//           <div className="room-buttons">
//             <button className="view-more-btn" onClick={() => openModal(room)}>View More</button>
//             <Link to={`/book/${room.id}`}>
//               <button className="book-btn">Book Room</button>
//             </Link>
//           </div>
//         </div>
//       ))}

//       {selectedRoom && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h2>{selectedRoom.name}</h2>
//             <img src={selectedRoom.image} alt={selectedRoom.name} className="modal-image" />
//             <p>{selectedRoom.details}</p>
//             <button className="close-btn" onClick={closeModal}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Room;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Room.css';

const rooms = [
  {
    id: 1,
    name: 'Couple Room AC',
    price: '₹ 2,594',
    description: '(110 sq.ft (10 sq.mt) | Double Bed)',
    image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-13432-81a16730e32711eda8160a58a9feac02.jpg?downsize=*:500&crop=990:500',
    details: 'This deluxe room offers a stunning sea view, king-sized bed, and a private balcony. Perfect for couples or solo travelers looking for luxury.',
    amenities: ['Air Conditioning', 'Free Wi-Fi', 'TV', 'Private Bathroom', 'Sea View']
  },
  {
    id: 2,
    name: '4 Member Room AC',
    price: '₹ 3,890',
    description: '(160 sq.ft (15 sq.mt) | Double Bed)',
    image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981494-900f2aa4e0bc11ed99480a58a9feac02.jpg?downsize=*:500&crop=990:500',
    details: 'This standard room comes with a queen-sized bed, garden view, and basic amenities. Ideal for budget travelers.',
    amenities: ['Air Conditioning', 'Free Wi-Fi', 'TV', 'Private Bathroom', 'Garden View']
  },
  {
    id: 3,
    name: '6 Members Room AC',
    price: '₹ 6,508',
    description: '(220 sq.ft (20 sq.mt) | King Bed)',
    image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981484-024d20a4e32811eda8160a58a9feac02.jpg?downsize=*:500&crop=990:500',
    details: 'This family suite includes two bedrooms, a living area, and a kitchenette. Perfect for families or groups of friends.',
    amenities: ['Air Conditioning', 'Free Wi-Fi', 'TV', 'Private Bathroom', 'Kitchenette', 'Living Area']
  },
  {
    id: 4,
    name: 'Hut NON AC',
    price: '₹ 17,862',
    description: '(680 sq.ft (63 sq.mt) | Queen Bed)',
    image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-3712-7c6d8866e03911ed95310a58a9feac02.jpg?downsize=*:500&crop=990:500',
    details: 'The executive suite features a large bedroom, private balcony, and premium amenities. Ideal for business travelers or those seeking luxury.',
    amenities: ['Natural Ventilation', 'Free Wi-Fi', 'Private Bathroom', 'Private Balcony', 'Premium Amenities']
  },
  {
    id: 5,
    name: 'Private Villa',
    price: '₹ 24,184',
    description: '(2600 sq.ft (242 sq.mt) | Futon)',
    image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-15182-f2e76d04dff311ed8a570a58a9feac02.jpg?downsize=*:500&crop=990:500',
    details: 'This private villa is perfect for those who seek comfort, space, and luxury. Comes with a pool and a private garden.',
    amenities: ['Air Conditioning', 'Free Wi-Fi', 'Private Pool', 'Private Garden', 'Luxury Amenities', 'Kitchen']
  },
  {
    id: 6,
    name: 'Indoor Theatre Hall AC',
    price: '₹ 26,893',
    description: '(900 sq.ft (84 sq.mt) | King Bed)',
    image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981440-f095a7fae03411edbaad0a58a9feac02.jpg?downsize=*:500&crop=990:500',
    details: 'A luxurious indoor theatre hall with a massive screen, premium sound system, and elegant seating.',
    amenities: ['Air Conditioning', 'Premium Sound System', 'Massive Screen', 'Elegant Seating', 'Luxury Amenities']
  }
];

// Helper function to get amenity icon
const getAmenityIcon = (amenity) => {
  switch (amenity.toLowerCase()) {
    case 'air conditioning':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3v2M16 3v2M8 19v2M16 19v2M3 8h2M19 8h2M3 16h2M19 16h2M9 7h6M9 17h6M7 9v6M17 9v6"></path>
        </svg>
      );
    case 'free wi-fi':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"></path>
        </svg>
      );
    case 'tv':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
          <polyline points="17 2 12 7 7 2"></polyline>
        </svg>
      );
    case 'private bathroom':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path>
          <line x1="10" y1="10" x2="8" y2="12"></line>
          <line x1="8" y1="10" x2="10" y2="12"></line>
          <line x1="16" y1="7" x2="18" y2="9"></line>
          <line x1="18" y1="7" x2="16" y2="9"></line>
        </svg>
      );
    case 'sea view':
    case 'garden view':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h1M12 2v1M20 12h1M12 20v1M4.93 4.93l.7.7M18.36 4.93l-.7.7M4.93 19.07l.7-.7M18.36 19.07l-.7-.7"></path>
          <circle cx="12" cy="12" r="4"></circle>
        </svg>
      );
    case 'private pool':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h20M2 18h20M2 6h20"></path>
          <path d="M6 2v20M12 2v20M18 2v20"></path>
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4"></polyline>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      );
  }
};

const Room = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animatedCards, setAnimatedCards] = useState([]);

  useEffect(() => {
    // Animate cards on load with a staggered effect
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const roomId = parseInt(entry.target.getAttribute('data-room-id'));
          setAnimatedCards(prev => [...prev, roomId]);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const cards = document.querySelectorAll('.room-card');
    cards.forEach(card => observer.observe(card));

    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, []);

  const openModal = (room) => {
    setSelectedRoom(room);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 50);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedRoom(null);
    }, 300);
  };

  return (
    <div className="rooms-section">
      <div className="section-header">
        <h2>Our Accommodations</h2>
        <p>Choose from our selection of premium rooms and suites for your perfect stay</p>
      </div>

      <div className="room-container">
        {rooms.map((room) => (
          <div 
            key={room.id} 
            className={`room-card ${animatedCards.includes(room.id) ? 'animate' : ''}`}
            data-room-id={room.id}
            style={{ animationDelay: `${room.id * 0.1}s` }}
          >
            <div className="room-image-container">
              <img src={room.image || "/placeholder.svg"} alt={room.name} className="room-image" />
              <div className="room-price">
                <span>{room.price}</span>
                <small>per night</small>
              </div>
            </div>
            <div className="room-content">
              <h3 className="room-name">{room.name}</h3>
              <p className="room-description">{room.description}</p>
              
              <div className="room-amenities">
                {room.amenities.slice(0, 3).map((amenity, index) => (
                  <div key={index} className="amenity-tag">
                    {getAmenityIcon(amenity)}
                    {amenity}
                  </div>
                ))}
                {room.amenities.length > 3 && (
                  <div className="amenity-tag more">
                    +{room.amenities.length - 3} more
                  </div>
                )}
              </div>
              
              <button className="view-details-btn" onClick={() => openModal(room)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedRoom && (
        <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="modal-image-container">
              <img src={selectedRoom.image || "/placeholder.svg"} alt={selectedRoom.name} className="modal-image" />
              <div className="modal-price">
                <span>{selectedRoom.price}</span>
                <small>per night</small>
              </div>
            </div>
            
            <div className="modal-details">
              <h3 className="modal-title">{selectedRoom.name}</h3>
              <p className="modal-subtitle">{selectedRoom.description}</p>
              
              <div className="modal-description">
                <h4>Description</h4>
                <p>{selectedRoom.details}</p>
              </div>
              
              <div className="modal-amenities">
                <h4>Amenities</h4>
                <div className="amenities-grid">
                  {selectedRoom.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      {getAmenityIcon(amenity)}
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="modal-actions">
                <Link to={`/book/${selectedRoom.id}`}>
                  <button className="book-now-btn">Book Now</button>
                </Link>
                <button className="add-to-wishlist-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
