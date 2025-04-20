import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// WORKING: Signup
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: 'All fields are required' });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ success: false, message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });

  try {
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ 
      success: true, 
      token, 
      user: { id: newUser._id, name: newUser.name, email: newUser.email } 
    });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// export const createUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password)
//     return res.status(400).json({ success: false, message: 'All fields are required' });

//   const existingUser = await User.findOne({ email });
//   if (existingUser)
//     return res.status(400).json({ success: false, message: 'User already exists' });

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new User({ name, email, password: hashedPassword });

//   try {
//     await newUser.save();
//     res.status(201).json({ success: true, message: 'User created successfully' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };
//--------------------------------------------
// WORKING : Login
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({ success: false, message: 'Email and password are required' });

//   try {
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(401).json({ success: false, message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ success: false, message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.status(200).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🚨 Don't cast email to string (deliberately vulnerable)
    const user = await User.findOne({ email }); // Vulnerable if email is an object

    // Don't check password if you just want to demonstrate login happens
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Skip password check just for demo purposes
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// import User from "../models/user.model.js";

// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // Create (Signup)
// export const createUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ success: false, message: 'All fields are required' });
//   }

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({ success: false, message: 'User already exists' });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

//   const newUser = new User({ name, email, password: hashedPassword });

//   try {
//     await newUser.save();
//     res.status(201).json({ success: true, data: { name: newUser.name, email: newUser.email } });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };


// const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ success: false, message: 'Email and password are required' });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '2h' });

//     res.status(200).json({
//       success: true,
//       token,
//       user: { name: user.name, email: user.email }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };