const jwt = require('jsonwebtoken');
const { User, Therapist } = require('../models');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  try {
    const { email, password, name, userType, profileData } = req.body;
    if (!email || !password || !name || !userType) {
      return res.status(400).json({ error: 'Email, password, name, and user type are required' });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const user = await User.create({ email, password, name, userType, profileData: profileData || {} });
    const token = generateToken(user.id);
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, email: user.email, name: user.name, userType: user.userType }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isValid = await user.validatePassword(password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    await user.update({ lastActive: new Date() });
    const token = generateToken(user.id);
    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name, userType: user.userType, profileData: user.profileData }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, { attributes: { exclude: ['password'] } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    let therapistData = null;
    if (user.userType === 'therapist') {
      therapistData = await Therapist.findOne({ where: { userId: user.id } });
    }
    res.json({ user, therapist: therapistData });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, profileData } = req.body;
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.update({ name: name || user.name, profileData: profileData || user.profileData });
    res.json({
      message: 'Profile updated successfully',
      user: { id: user.id, email: user.email, name: user.name, userType: user.userType, profileData: user.profileData }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
