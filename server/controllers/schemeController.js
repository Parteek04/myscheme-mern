import Scheme from '../models/Scheme.js';
import Category from '../models/Category.js';

// @desc    Get all schemes with filters and pagination
// @route   GET /api/schemes
// @access  Public
export const getSchemes = async (req, res) => {
  try {
    const {
      search,
      category,
      state,
      gender,
      minAge,
      maxAge,
      incomeGroup,
      page = 1,
      limit = 12,
      sort = '-createdAt'
    } = req.query;

    // Build query
    const query = { isActive: true };

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // State filter
    if (state && state !== 'all') {
      query['eligibility.states'] = { $in: [state, 'all'] };
    }

    // Gender filter
    if (gender && gender !== 'all') {
      query['eligibility.gender'] = { $in: [gender, 'all'] };
    }

    // Age filter
    if (minAge || maxAge) {
      if (minAge) {
        query['eligibility.age.min'] = { $lte: Number(minAge) };
      }
      if (maxAge) {
        query['eligibility.age.max'] = { $gte: Number(maxAge) };
      }
    }

    // Income group filter
    if (incomeGroup && incomeGroup !== 'all') {
      query['eligibility.incomeGroup'] = { $in: [incomeGroup, 'all'] };
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const schemes = await Scheme.find(query)
      .populate('category', 'name slug icon color')
      .sort(sort)
      .limit(limitNum)
      .skip(skip);

    // Get total count
    const total = await Scheme.countDocuments(query);

    res.status(200).json({
      success: true,
      count: schemes.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: schemes
    });
  } catch (error) {
    console.error('Get schemes error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch schemes'
    });
  }
};

// @desc    Get single scheme by slug
// @route   GET /api/schemes/:slug
// @access  Public
export const getSchemeBySlug = async (req, res) => {
  try {
    const scheme = await Scheme.findOne({ slug: req.params.slug })
      .populate('category', 'name slug icon color');

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found'
      });
    }

    // Increment views
    await scheme.incrementViews();

    res.status(200).json({
      success: true,
      data: scheme
    });
  } catch (error) {
    console.error('Get scheme error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch scheme'
    });
  }
};

// @desc    Create new scheme (Admin only)
// @route   POST /api/schemes
// @access  Private/Admin
export const createScheme = async (req, res) => {
  try {
    const scheme = await Scheme.create(req.body);

    // Update category scheme count
    await Category.findByIdAndUpdate(
      scheme.category,
      { $inc: { schemeCount: 1 } }
    );

    res.status(201).json({
      success: true,
      message: 'Scheme created successfully',
      data: scheme
    });
  } catch (error) {
    console.error('Create scheme error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create scheme'
    });
  }
};

// @desc    Update scheme (Admin only)
// @route   PUT /api/schemes/:id
// @access  Private/Admin
export const updateScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found'
      });
    }

    const oldCategory = scheme.category;
    const updatedScheme = await Scheme.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Update category counts if category changed
    if (req.body.category && req.body.category !== oldCategory.toString()) {
      await Category.findByIdAndUpdate(oldCategory, { $inc: { schemeCount: -1 } });
      await Category.findByIdAndUpdate(req.body.category, { $inc: { schemeCount: 1 } });
    }

    res.status(200).json({
      success: true,
      message: 'Scheme updated successfully',
      data: updatedScheme
    });
  } catch (error) {
    console.error('Update scheme error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update scheme'
    });
  }
};

// @desc    Delete scheme (Admin only)
// @route   DELETE /api/schemes/:id
// @access  Private/Admin
export const deleteScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found'
      });
    }

    // Update category scheme count
    await Category.findByIdAndUpdate(
      scheme.category,
      { $inc: { schemeCount: -1 } }
    );

    await scheme.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Scheme deleted successfully'
    });
  } catch (error) {
    console.error('Delete scheme error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete scheme'
    });
  }
};

// @desc    Get search suggestions
// @route   GET /api/schemes/suggestions
// @access  Public
export const getSearchSuggestions = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }

    const suggestions = await Scheme.find({
      isActive: true,
      name: { $regex: q, $options: 'i' }
    })
    .select('name slug')
    .limit(5);

    res.status(200).json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    console.error('Get suggestions error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch suggestions'
    });
  }
};

// @desc    Get scheme stats (Admin)
// @route   GET /api/schemes/stats
// @access  Private/Admin
export const getSchemeStats = async (req, res) => {
  try {
    const totalSchemes = await Scheme.countDocuments({ isActive: true });
    const totalViews = await Scheme.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);

    const topSchemes = await Scheme.find({ isActive: true })
      .sort('-views')
      .limit(5)
      .select('name views slug');

    const schemesByCategory = await Scheme.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
      { $unwind: '$category' },
      { $project: { name: '$category.name', count: 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalSchemes,
        totalViews: totalViews[0]?.total || 0,
        topSchemes,
        schemesByCategory
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch stats'
    });
  }
};
