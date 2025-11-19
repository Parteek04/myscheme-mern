import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

// Import models
import User from '../models/User.js';
import Scheme from '../models/Scheme.js';
import Category from '../models/Category.js';
import Feedback from '../models/Feedback.js';

const clearDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Clearing all collections...');
    
    await User.deleteMany({});
    console.log('✅ Users cleared');
    
    await Scheme.deleteMany({});
    console.log('✅ Schemes cleared');
    
    await Category.deleteMany({});
    console.log('✅ Categories cleared');
    
    await Feedback.deleteMany({});
    console.log('✅ Feedback cleared');

    console.log('\n🎉 Database cleared successfully!');
    console.log('💡 You can now run: npm run seed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  }
};

clearDatabase();
