import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Scheme name is required'],
    trim: true,
    maxlength: [200, 'Name cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [10000, 'Description cannot exceed 10000 characters']
  },
  benefits: {
    type: [String],
    required: [true, 'At least one benefit is required']
  },
  eligibility: {
    age: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 150 }
    },
    gender: {
      type: [String],
      enum: ['male', 'female', 'other', 'all'],
      default: ['all']
    },
    incomeGroup: {
      type: [String],
      enum: ['below-poverty-line', 'low-income', 'middle-income', 'high-income', 'all'],
      default: ['all']
    },
    states: {
      type: [String],
      default: ['all']
    },
    other: {
      type: String,
      default: ''
    }
  },
  documentsRequired: {
    type: [String],
    required: [true, 'Documents required is mandatory']
  },
  applicationProcedure: {
    type: String,
    required: [true, 'Application procedure is required'],
    maxlength: [1500, 'Application procedure cannot exceed 1500 characters']
  },
  officialWebsite: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Please provide a valid URL']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  tags: {
    type: [String],
    default: []
  },
  bannerImage: {
    type: String,
    default: ''
  },
  ministry: {
    type: String,
    trim: true
  },
  launchedDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  favouriteCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create text index for search functionality
schemeSchema.index({ 
  name: 'text', 
  description: 'text', 
  tags: 'text',
  benefits: 'text'
});

// Additional indexes for filtering
schemeSchema.index({ category: 1 });
schemeSchema.index({ isActive: 1 });
schemeSchema.index({ 'eligibility.states': 1 });

// Helper function to generate slug
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    + '-' + Date.now();
};

// Create slug from name before saving
schemeSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = generateSlug(this.name);
  }
  next();
});

// Create slug for insertMany operations
schemeSchema.pre('insertMany', function(next, docs) {
  if (Array.isArray(docs)) {
    docs.forEach((doc, index) => {
      if (doc.name && !doc.slug) {
        doc.slug = generateSlug(doc.name) + '-' + index;
      }
    });
  }
  next();
});

// Method to increment views
schemeSchema.methods.incrementViews = async function() {
  this.views += 1;
  return await this.save();
};

const Scheme = mongoose.model('Scheme', schemeSchema);

export default Scheme;
