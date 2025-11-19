import User from '../models/User.js';
import Scheme from '../models/Scheme.js';

// @desc    Add scheme to favourites
// @route   POST /api/users/favourites/:schemeId
// @access  Private
export const addToFavourites = async (req, res) => {
  try {
    const { schemeId } = req.params;

    // Check if scheme exists
    const scheme = await Scheme.findById(schemeId);
    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found'
      });
    }

    const user = await User.findById(req.user._id);

    // Check if already in favourites
    if (user.favouriteSchemes.includes(schemeId)) {
      return res.status(400).json({
        success: false,
        message: 'Scheme already in favourites'
      });
    }

    user.favouriteSchemes.push(schemeId);
    await user.save();

    // Update scheme favourite count
    await Scheme.findByIdAndUpdate(schemeId, { $inc: { favouriteCount: 1 } });

    res.status(200).json({
      success: true,
      message: 'Scheme added to favourites',
      data: user.favouriteSchemes
    });
  } catch (error) {
    console.error('Add to favourites error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to add to favourites'
    });
  }
};

// @desc    Remove scheme from favourites
// @route   DELETE /api/users/favourites/:schemeId
// @access  Private
export const removeFromFavourites = async (req, res) => {
  try {
    const { schemeId } = req.params;

    const user = await User.findById(req.user._id);

    // Check if scheme is in favourites
    if (!user.favouriteSchemes.includes(schemeId)) {
      return res.status(400).json({
        success: false,
        message: 'Scheme not in favourites'
      });
    }

    user.favouriteSchemes = user.favouriteSchemes.filter(
      id => id.toString() !== schemeId
    );
    await user.save();

    // Update scheme favourite count
    await Scheme.findByIdAndUpdate(schemeId, { $inc: { favouriteCount: -1 } });

    res.status(200).json({
      success: true,
      message: 'Scheme removed from favourites',
      data: user.favouriteSchemes
    });
  } catch (error) {
    console.error('Remove from favourites error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to remove from favourites'
    });
  }
};

// @desc    Get user's favourite schemes
// @route   GET /api/users/favourites
// @access  Private
export const getFavourites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'favouriteSchemes',
      populate: { path: 'category', select: 'name slug icon color' }
    });

    res.status(200).json({
      success: true,
      count: user.favouriteSchemes.length,
      data: user.favouriteSchemes
    });
  } catch (error) {
    console.error('Get favourites error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch favourites'
    });
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const users = await User.find(query)
      .select('-password')
      .sort('-createdAt')
      .limit(limitNum)
      .skip(skip);

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch users'
    });
  }
};

// @desc    Get user stats (Admin only)
// @route   GET /api/users/stats
// @access  Private/Admin
export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: 'admin' });

    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    const recentUsers = await User.find()
      .select('name email createdAt')
      .sort('-createdAt')
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        adminUsers,
        usersByRole,
        recentUsers
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch user stats'
    });
  }
};
