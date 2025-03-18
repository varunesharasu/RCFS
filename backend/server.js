// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/resortBooking', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Check MongoDB connection
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // JWT Secret Key
// const JWT_SECRET = 'your_jwt_secret_key';

// // User Schema
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model('User', userSchema);

// // Booking Schema
// const bookingSchema = new mongoose.Schema({
//   roomId: String,
//   startDate: String,
//   endDate: String,
//   adults: Number,
//   children: Number,
//   totalAmount: Number,
//   userId: String, // To associate bookings with users
// });

// const Booking = mongoose.model('Booking', bookingSchema);

// // Middleware to verify JWT token
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).send('Access denied. No token provided.');
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).send('Invalid token.');
//     }

//     req.user = user; // Attach the user object to the request
//     next();
//   });
// };

// // Register Route
// app.post('/api/register', async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).send('User already exists');
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     res.status(201).send('User registered successfully');
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).send('Error registering user');
//   }
// });

// // Login Route
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).send('User not found');
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).send('Invalid credentials');
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({ token });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).send('Error logging in');
//   }
// });

// // Get User Details and Bookings (Protected Route)
// app.get('/api/user', authenticateToken, async (req, res) => {
//   const userId = req.user.userId;

//   try {
//     // Fetch user details
//     const user = await User.findById(userId).select('-password'); // Exclude password from response

//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     // Fetch user's bookings
//     const bookings = await Booking.find({ userId });

//     res.status(200).json({
//       user: user,
//       bookings: bookings,
//     });
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).send('Error fetching user data');
//   }
// });

// // Update User Details (Protected Route)
// app.put('/api/user/update', authenticateToken, async (req, res) => {
//   const userId = req.user.userId;
//   const { username, email } = req.body;

//   try {
//     // Find the user by ID
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     // Update user details
//     user.username = username || user.username;
//     user.email = email || user.email;

//     await user.save();

//     res.status(200).send('User details updated successfully');
//   } catch (error) {
//     console.error('Error updating user details:', error);
//     res.status(500).send('Error updating user details');
//   }
// });

// // Cancel Booking (Protected Route)
// app.delete('/api/bookings/:id', authenticateToken, async (req, res) => {
//   const bookingId = req.params.id;
//   const userId = req.user.userId;

//   try {
//     // Find the booking by ID and ensure it belongs to the logged-in user
//     const booking = await Booking.findOneAndDelete({ _id: bookingId, userId });

//     if (!booking) {
//       return res.status(404).send('Booking not found or you do not have permission to cancel it.');
//     }

//     res.status(200).send('Booking canceled successfully');
//   } catch (error) {
//     console.error('Error canceling booking:', error);
//     res.status(500).send('Error canceling booking');
//   }
// });

// // Save Booking Details (Protected Route)
// app.post('/api/book', authenticateToken, async (req, res) => {
//   const { roomId, startDate, endDate, adults, children, totalAmount } = req.body;

//   const newBooking = new Booking({
//     roomId,
//     startDate,
//     endDate,
//     adults,
//     children,
//     totalAmount,
//     userId: req.user.userId, // Associate booking with the logged-in user
//   });

//   try {
//     await newBooking.save();
//     console.log('Booking saved successfully:', newBooking);
//     res.status(200).send('Booking saved successfully!');
//   } catch (error) {
//     console.error('Error saving booking:', error);
//     res.status(500).send('Error saving booking.');
//   }
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/resortBooking', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Check MongoDB connection
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // JWT Secret Key
// const JWT_SECRET = 'your_jwt_secret_key';

// // User Schema
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model('User', userSchema);

// // Booking Schema
// const bookingSchema = new mongoose.Schema({
//   roomId: String,
//   startDate: String,
//   endDate: String,
//   adults: Number,
//   children: Number,
//   totalAmount: Number,
//   userId: String, // To associate bookings with users
// });

// const Booking = mongoose.model('Booking', bookingSchema);

// // Middleware to verify JWT token
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).send('Access denied. No token provided.');
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).send('Invalid token.');
//     }

//     req.user = user; // Attach the user object to the request
//     next();
//   });
// };

// // Register Route
// app.post('/api/register', async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).send('User already exists');
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     res.status(201).send('User registered successfully');
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).send('Error registering user');
//   }
// });

// // Login Route
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).send('User not found');
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).send('Invalid credentials');
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({ token });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).send('Error logging in');
//   }
// });

// // Get User Details and Bookings (Protected Route)
// app.get('/api/user', authenticateToken, async (req, res) => {
//   const userId = req.user.userId;

//   try {
//     // Fetch user details
//     const user = await User.findById(userId).select('-password'); // Exclude password from response

//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     // Fetch user's bookings
//     const bookings = await Booking.find({ userId });

//     res.status(200).json({
//       user: user,
//       bookings: bookings,
//     });
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).send('Error fetching user data');
//   }
// });

// // Update User Details (Protected Route)
// app.put('/api/user/update', authenticateToken, async (req, res) => {
//   const userId = req.user.userId;
//   const { username, email } = req.body;

//   try {
//     // Find the user by ID
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     // Update user details
//     user.username = username || user.username;
//     user.email = email || user.email;

//     await user.save();

//     res.status(200).send('User details updated successfully');
//   } catch (error) {
//     console.error('Error updating user details:', error);
//     res.status(500).send('Error updating user details');
//   }
// });

// app.get('/api/bookings/:roomId', async (req, res) => {
//   const { roomId } = req.params;
//   try {
//     // Fetch all bookings for the room
//     const bookings = await Booking.find({ roomId }, 'startDate endDate -_id');
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error('Error fetching booked dates:', error);
//     res.status(500).send('Error fetching booked dates');
//   }
// });

// // Save Booking Details (Protected Route)
// app.post('/api/book', authenticateToken, async (req, res) => {
//   const { roomId, startDate, endDate, adults, children, totalAmount } = req.body;
//   const userId = req.user.userId;

//   try {
//     // Convert dates to Date objects for comparison
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     // Check for overlapping bookings
//     const overlappingBookings = await Booking.find({
//       roomId,
//       $or: [
//         { startDate: { $lt: end }, endDate: { $gt: start } }, // Overlap condition
//         { startDate: { $gte: start, $lt: end } },            // Start date within range
//         { endDate: { $gt: start, $lte: end } },              // End date within range
//       ],
//     });

//     if (overlappingBookings.length > 0) {
//       return res.status(400).send('This room is already booked for the selected dates.');
//     }

//     // Create and save the new booking
//     const newBooking = new Booking({
//       roomId,
//       startDate,
//       endDate,
//       adults,
//       children,
//       totalAmount,
//       userId,
//     });

//     await newBooking.save();
//     console.log('Booking saved successfully:', newBooking);
//     res.status(200).send('Booking saved successfully!');
//   } catch (error) {
//     console.error('Error saving booking:', error);
//     res.status(500).send('Error saving booking.');
//   }
// });

// // Cancel Booking (Protected Route)
// app.delete('/api/bookings/:id', authenticateToken, async (req, res) => {
//   const bookingId = req.params.id;
//   const userId = req.user.userId;

//   try {
//     // Find the booking by ID and ensure it belongs to the logged-in user
//     const booking = await Booking.findOneAndDelete({ _id: bookingId, userId });

//     if (!booking) {
//       return res.status(404).send('Booking not found or you do not have permission to cancel it.');
//     }

//     res.status(200).send('Booking canceled successfully');
//   } catch (error) {
//     console.error('Error canceling booking:', error);
//     res.status(500).send('Error canceling booking');
//   }
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/resortBooking', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Check MongoDB connection
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // JWT Secret Key
// const JWT_SECRET = 'your_jwt_secret_key';

// // User Schema
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model('User', userSchema);

// // Booking Schema (with status field)
// const bookingSchema = new mongoose.Schema({
//   roomId: String,
//   startDate: Date, // Store as Date type
//   endDate: Date,   // Store as Date type
//   adults: Number,
//   children: Number,
//   totalAmount: Number,
//   userId: String,
//   status: { type: String, enum: ['active', 'canceled'], default: 'active' }, // Track booking status
// });

// const Booking = mongoose.model('Booking', bookingSchema);

// // Middleware to verify JWT token
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).send('Access denied. No token provided.');
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).send('Invalid token.');
//     }

//     req.user = user;
//     next();
//   });
// };

// // Register Route
// app.post('/api/register', async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).send('User already exists');
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();
//     res.status(201).send('User registered successfully');
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).send('Error registering user');
//   }
// });

// // Login Route
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).send('User not found');
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).send('Invalid credentials');
//     }

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({ token });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).send('Error logging in');
//   }
// });

// // Get User Details and Active Bookings (Protected Route)
// app.get('/api/user', authenticateToken, async (req, res) => {
//   const userId = req.user.userId;

//   try {
//     const user = await User.findById(userId).select('-password');
//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     const bookings = await Booking.find({ userId, status: 'active' }); // Fetch only active bookings
//     res.status(200).json({ user, bookings });
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).send('Error fetching user data');
//   }
// });

// // Update User Details (Protected Route)
// app.put('/api/user/update', authenticateToken, async (req, res) => {
//   const userId = req.user.userId;
//   const { username, email } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     user.username = username || user.username;
//     user.email = email || user.email;
//     await user.save();
//     res.status(200).send('User details updated successfully');
//   } catch (error) {
//     console.error('Error updating user details:', error);
//     res.status(500).send('Error updating user details');
//   }
// });

// // Save Booking Details (Protected Route)
// app.post('/api/book', authenticateToken, async (req, res) => {
//   const { roomId, startDate, endDate, adults, children, totalAmount } = req.body;
//   const userId = req.user.userId;

//   try {
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     // Check for overlapping ACTIVE bookings
//     const overlappingBookings = await Booking.find({
//       roomId,
//       status: 'active', // Only check active bookings
//       $or: [
//         { startDate: { $lt: end }, endDate: { $gt: start } },
//         { startDate: { $gte: start, $lt: end } },
//         { endDate: { $gt: start, $lte: end } },
//       ],
//     });

//     if (overlappingBookings.length > 0) {
//       return res.status(400).send('This room is already booked for the selected dates.');
//     }

//     const newBooking = new Booking({
//       roomId,
//       startDate: start,
//       endDate: end,
//       adults,
//       children,
//       totalAmount,
//       userId,
//       status: 'active',
//     });

//     await newBooking.save();
//     res.status(200).send('Booking saved successfully!');
//   } catch (error) {
//     console.error('Error saving booking:', error);
//     res.status(500).send('Error saving booking.');
//   }
// });

// // Cancel Booking (Mark as canceled instead of deleting)
// app.delete('/api/bookings/:id', authenticateToken, async (req, res) => {
//   const { id: bookingId } = req.params;
//   const userId = req.user.userId;

//   try {
//     const booking = await Booking.findOneAndUpdate(
//       { _id: bookingId, userId, status: 'active' }, // Only cancel active bookings
//       { status: 'canceled' },
//       { new: true }
//     );

//     if (!booking) {
//       return res.status(404).send('Booking not found or already canceled.');
//     }

//     res.status(200).send('Booking canceled successfully');
//   } catch (error) {
//     console.error('Error canceling booking:', error);
//     res.status(500).send('Error canceling booking');
//   }
// });

// // Fetch ACTIVE booked dates for a room (used by the frontend date picker)
// app.get('/api/bookings/:roomId', async (req, res) => {
//   const { roomId } = req.params;

//   try {
//     const bookings = await Booking.find(
//       { roomId, status: 'active' }, // Only active bookings
//       'startDate endDate -_id'
//     );
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error('Error fetching booked dates:', error);
//     res.status(500).send('Error fetching booked dates');
//   }
// });













// // Updated User Schema with role
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Add role field
// });

// // Admin Protected Route Middleware
// const isAdmin = (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).send('Access denied. Admin role required.');
//   }
//   next();
// };

// // Get All Users and Bookings (Admin Only)
// app.get('/api/admin/users', authenticateToken, isAdmin, async (req, res) => {
//   try {
//     const users = await User.find().select('-password');
//     const bookings = await Booking.find().populate('userId', 'username email'); // Include user details
//     res.status(200).json({ users, bookings });
//   } catch (error) {
//     res.status(500).send('Error fetching admin data');
//   }
// });





// // Login Route (Include role in token)
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).send('User not found');

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).send('Invalid credentials');

//     const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' }); // Include role
//     res.status(200).json({ token, role: user.role }); // Send role to frontend
//   } catch (error) {
//     res.status(500).send('Error logging in');
//   }
// });








// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/resortBooking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// JWT Secret Key
const JWT_SECRET = 'your_jwt_secret_key';

// User Schema (with role)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

const User = mongoose.model('User', userSchema);

// Booking Schema (with status)
const bookingSchema = new mongoose.Schema({
  roomId: String,
  startDate: Date,
  endDate: Date,
  adults: Number,
  children: Number,
  totalAmount: Number,
  userId: String,
  status: { type: String, enum: ['active', 'canceled'], default: 'active' },
});

const Booking = mongoose.model('Booking', bookingSchema);

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid token.');
    req.user = user;
    next();
  });
};
// Run this in MongoDB shell or via a seed script

// Admin Middleware
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Access denied. Admin role required.');
  }
  next();
};

// Register Route
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

// Login Route (includes role in token)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
});

// User Dashboard Route
app.get('/api/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).send('User not found');

    const bookings = await Booking.find({ 
      userId: req.user.userId,
      status: 'active'
    });
    
    res.status(200).json({ user, bookings });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Error fetching user data');
  }
});

// Admin Dashboard Route
app.get('/api/admin/users', async (req, res) => {
  try {
    // Fetch users and select only 'username' and 'email'
    const users = await User.find({}, 'username email'); // Select only 'username' and 'email'

    // Respond with success and the list of users
    res.status(200).json({ success: true, users });
  } catch (error) {
    // Log the error and respond with an error message
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
});


// Save Booking Route
app.post('/api/book', authenticateToken, async (req, res) => {
  const { roomId, startDate, endDate, adults, children, totalAmount } = req.body;
  const userId = req.user.userId;

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check for overlapping active bookings
    const overlappingBookings = await Booking.find({
      roomId,
      status: 'active',
      $or: [
        { startDate: { $lt: end }, endDate: { $gt: start } },
        { startDate: { $gte: start, $lt: end } },
        { endDate: { $gt: start, $lte: end } },
      ],
    });

    if (overlappingBookings.length > 0) {
      return res.status(400).send('Room already booked for these dates');
    }

    const newBooking = new Booking({ 
      roomId, 
      startDate: start,
      endDate: end,
      adults,
      children,
      totalAmount,
      userId,
    });

    await newBooking.save();
    res.status(200).send('Booking saved successfully');
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).send('Error saving booking');
  }
});

// Cancel Booking Route
app.delete('/api/bookings/:id', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { 
        _id: req.params.id,
        userId: req.user.userId,
        status: 'active'
      },
      { status: 'canceled' },
      { new: true }
    );

    if (!booking) return res.status(404).send('Booking not found');
    res.status(200).send('Booking canceled successfully');
  } catch (error) {
    console.error('Error canceling booking:', error);
    res.status(500).send('Error canceling booking');
  }
});

// Fetch Active Bookings for Date Picker
app.get('/api/bookings/:roomId', async (req, res) => {
  try {
    const bookings = await Booking.find({
      roomId: req.params.roomId,
      status: 'active'
    }, 'startDate endDate -_id');
    
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching booked dates:', error);
    res.status(500).send('Error fetching booked dates');
  }
});
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Admin not found" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id, role: admin.role }, "secretKey", { expiresIn: "1h" });

    res.json({ success: true, message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get('/api/admin/bookings', async (req, res) => {
  try {
    // Fetch all bookings from the Booking collection
    const bookings = await Booking.find({});

    // Array to store combined booking and user details
    const bookingsWithUserDetails = [];

    // Loop through each booking to fetch corresponding user details
    for (const booking of bookings) {
      // Find the user corresponding to the userId in the booking
      const user = await User.findById(booking.userId, 'username email');

      if (user) {
        // Combine booking details with user details
        bookingsWithUserDetails.push({
          bookingId: booking._id,
          roomId: booking.roomId,
          startDate: booking.startDate,
          endDate: booking.endDate,
          adults: booking.adults,
          children: booking.children,
          totalAmount: booking.totalAmount,
          status: booking.status,
          user: {
            username: user.username,
            email: user.email,
          },
        });
      }
    }

    // Respond with success and the combined booking and user details
    res.status(200).json({ success: true, bookings: bookingsWithUserDetails });
  } catch (error) {
    // Log the error and respond with an error message
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Error fetching bookings' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/resortBooking', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Check MongoDB connection
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // JWT Secret Key
// const JWT_SECRET = 'your_jwt_secret_key';

// // User Schema (with role)
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['user', 'admin'], default: 'user' },
// });

// const User = mongoose.model('User', userSchema);

// // Booking Schema (with status)
// const bookingSchema = new mongoose.Schema({
//   roomId: String,
//   startDate: Date,
//   endDate: Date,
//   adults: Number,
//   children: Number,
//   totalAmount: Number,
//   userId: String,
//   status: { type: String, enum: ['active', 'canceled'], default: 'active' },
// });

// const Booking = mongoose.model('Booking', bookingSchema);

// // Middleware to verify JWT token
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).send('Access denied. No token provided.');
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).send('Invalid token.');
//     req.user = user;
//     next();
//   });
// };

// // Admin Middleware
// const isAdmin = (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).send('Access denied. Admin role required.');
//   }
//   next();
// };

// // Register Route
// app.post('/api/register', async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).send('User already exists');

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();
//     res.status(201).send('User registered successfully');
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).send('Error registering user');
//   }
// });

// // Login Route (includes role in token)
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).send('User not found');

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).send('Invalid credentials');

//     const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({ token, role: user.role });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).send('Error logging in');
//   }
// });

// // User Dashboard Route
// app.get('/api/user', authenticateToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select('-password');
//     if (!user) return res.status(404).send('User not found');

//     const bookings = await Booking.find({
//       userId: req.user.userId,
//       status: 'active',
//     });

//     res.status(200).json({ user, bookings });
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).send('Error fetching user data');
//   }
// });

// // Update User Details Route (Username only)
// app.put('/api/user/update', authenticateToken, async (req, res) => {
//   const { username } = req.body; // Only accept username for updates

//   try {
//     const user = await User.findById(req.user.userId);
//     if (!user) return res.status(404).send('User not found');

//     // Update only the username (email remains read-only)
//     user.username = username || user.username;

//     await user.save();
//     res.status(200).send('User details updated successfully');
//   } catch (error) {
//     console.error('Error updating user details:', error);
//     res.status(500).send('Error updating user details');
//   }
// });

// // Admin Dashboard Route (Fetch Users)
// app.get('/api/admin/users', async (req, res) => {
//   try {
//     const users = await User.find({}, 'username email'); // Select only 'username' and 'email'
//     res.status(200).json({ success: true, users });
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ success: false, message: 'Error fetching users' });
//   }
// });

// // Admin Login Route
// app.post('/api/admin/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await User.findOne({ email, role: 'admin' });
//     if (!admin) return res.status(401).json({ success: false, message: 'Admin not found' });

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

//     const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, { expiresIn: '1h' });
//     res.json({ success: true, message: 'Login successful', token });
//   } catch (error) {
//     console.error('Error during admin login:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

// // Fetch All Bookings with User Details (Admin Only)
// app.get('/api/admin/bookings', async (req, res) => {
//   try {
//     const bookings = await Booking.find({});
//     const bookingsWithUserDetails = [];

//     for (const booking of bookings) {
//       const user = await User.findById(booking.userId, 'username email');
//       if (user) {
//         bookingsWithUserDetails.push({
//           bookingId: booking._id,
//           roomId: booking.roomId,
//           startDate: booking.startDate,
//           endDate: booking.endDate,
//           adults: booking.adults,
//           children: booking.children,
//           totalAmount: booking.totalAmount,
//           status: booking.status,
//           user: {
//             username: user.username,
//             email: user.email,
//           },
//         });
//       }
//     }

//     res.status(200).json({ success: true, bookings: bookingsWithUserDetails });
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     res.status(500).json({ success: false, message: 'Error fetching bookings' });
//   }
// });

// // Save Booking Route
// app.post('/api/book', authenticateToken, async (req, res) => {
//   const { roomId, startDate, endDate, adults, children, totalAmount } = req.body;
//   const userId = req.user.userId;

//   try {
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     const overlappingBookings = await Booking.find({
//       roomId,
//       status: 'active',
//       $or: [
//         { startDate: { $lt: end }, endDate: { $gt: start } },
//         { startDate: { $gte: start, $lt: end } },
//         { endDate: { $gt: start, $lte: end } },
//       ],
//     });

//     if (overlappingBookings.length > 0) {
//       return res.status(400).send('Room already booked for these dates');
//     }

//     const newBooking = new Booking({
//       roomId,
//       startDate: start,
//       endDate: end,
//       adults,
//       children,
//       totalAmount,
//       userId,
//     });

//     await newBooking.save();
//     res.status(200).send('Booking saved successfully');
//   } catch (error) {
//     console.error('Error saving booking:', error);
//     res.status(500).send('Error saving booking');
//   }
// });

// // Cancel Booking Route
// app.delete('/api/bookings/:id', authenticateToken, async (req, res) => {
//   try {
//     const booking = await Booking.findOneAndUpdate(
//       {
//         _id: req.params.id,
//         userId: req.user.userId,
//         status: 'active',
//       },
//       { status: 'canceled' },
//       { new: true }
//     );

//     if (!booking) return res.status(404).send('Booking not found');
//     res.status(200).send('Booking canceled successfully');
//   } catch (error) {
//     console.error('Error canceling booking:', error);
//     res.status(500).send('Error canceling booking');
//   }
// });

// // Fetch Active Bookings for Date Picker
// app.get('/api/bookings/:roomId', async (req, res) => {
//   try {
//     const bookings = await Booking.find(
//       { roomId: req.params.roomId, status: 'active' },
//       'startDate endDate -_id'
//     );
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error('Error fetching booked dates:', error);
//     res.status(500).send('Error fetching booked dates');
//   }
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });