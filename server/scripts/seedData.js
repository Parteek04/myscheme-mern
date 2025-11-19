import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Scheme from '../models/Scheme.js';

// Load environment variables
dotenv.config();

// Sample data
const categories = [
  {
    name: 'Education',
    description: 'Scholarships and education related schemes for students',
    icon: '🎓',
    color: '#3B82F6'
  },
  {
    name: 'Healthcare',
    description: 'Health insurance and medical assistance schemes',
    icon: '🏥',
    color: '#EF4444'
  },
  {
    name: 'Women Empowerment',
    description: 'Schemes for women development and empowerment',
    icon: '👩',
    color: '#EC4899'
  },
  {
    name: 'Agriculture',
    description: 'Schemes for farmers and agricultural development',
    icon: '🌾',
    color: '#10B981'
  },
  {
    name: 'Business & Startup',
    description: 'Loans and support for entrepreneurs and startups',
    icon: '💼',
    color: '#8B5CF6'
  },
  {
    name: 'Social Security',
    description: 'Pension and social welfare schemes',
    icon: '🛡️',
    color: '#F59E0B'
  },
  {
    name: 'Housing',
    description: 'Affordable housing and shelter schemes',
    icon: '🏠',
    color: '#06B6D4'
  },
  {
    name: 'Skills & Employment',
    description: 'Skill development and employment generation schemes',
    icon: '💪',
    color: '#6366F1'
  }
];

const schemes = [
  {
    name: 'Pradhan Mantri Jan Dhan Yojana',
    description: 'Financial inclusion program to ensure access to financial services like banking, savings & deposit accounts, remittance, credit, insurance, pension in an affordable manner. The scheme aims to provide at least one basic banking account to every household.',
    benefits: [
      'Zero balance account',
      'RuPay Debit Card',
      'Accident insurance cover of ₹2 lakh',
      'Overdraft facility up to ₹10,000',
      'No minimum balance requirement'
    ],
    eligibility: {
      age: { min: 10, max: 150 },
      gender: ['all'],
      incomeGroup: ['all'],
      states: ['all'],
      other: 'Indian citizen, No existing bank account'
    },
    documentsRequired: [
      'Aadhaar Card',
      'PAN Card (optional)',
      'Voter ID or Driving License',
      'Passport size photograph',
      'Address proof'
    ],
    applicationProcedure: 'Visit nearest bank branch with required documents. Fill the account opening form. Submit documents and photograph. Bank will verify and open the account within 24-48 hours.',
    officialWebsite: 'https://pmjdy.gov.in/',
    ministry: 'Ministry of Finance',
    tags: ['banking', 'financial-inclusion', 'savings'],
    categoryName: 'Social Security'
  },
  {
    name: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana',
    description: 'World\'s largest health insurance scheme providing health coverage of ₹5 lakhs per family per year for secondary and tertiary care hospitalization. Free treatment at any empanelled public or private hospital across India.',
    benefits: [
      'Health cover of ₹5 lakh per family per year',
      'Cashless and paperless treatment',
      'Coverage for pre and post-hospitalization',
      'Covers over 1,393 procedures',
      'No restriction on family size, age or gender'
    ],
    eligibility: {
      age: { min: 0, max: 150 },
      gender: ['all'],
      incomeGroup: ['below-poverty-line', 'low-income'],
      states: ['all'],
      other: 'Must be listed in SECC 2011 database'
    },
    documentsRequired: [
      'Aadhaar Card',
      'Ration Card',
      'Mobile Number',
      'SECC data (automatic)'
    ],
    applicationProcedure: 'Eligible beneficiaries are automatically identified. Visit Common Service Centre with Aadhaar card. Biometric authentication will be done. Ayushman card will be generated on spot.',
    officialWebsite: 'https://pmjay.gov.in/',
    ministry: 'Ministry of Health and Family Welfare',
    tags: ['health', 'insurance', 'treatment'],
    categoryName: 'Healthcare'
  },
  {
    name: 'PM Kisan Samman Nidhi',
    description: 'Income support scheme for farmers providing financial benefit of ₹6,000 per year in three equal installments directly into bank accounts. Aims to supplement financial needs of farmers for procuring inputs and other needs.',
    benefits: [
      '₹6,000 per year in 3 installments',
      'Direct bank transfer',
      'Financial support for agriculture inputs',
      'No intermediaries',
      'Quick disbursal'
    ],
    eligibility: {
      age: { min: 18, max: 150 },
      gender: ['all'],
      incomeGroup: ['all'],
      states: ['all'],
      other: 'Small and marginal farmers with cultivable land'
    },
    documentsRequired: [
      'Aadhaar Card',
      'Land ownership documents',
      'Bank account details',
      'Mobile number'
    ],
    applicationProcedure: 'Visit PM-KISAN portal. Click on Farmers Corner. Select New Farmer Registration. Enter Aadhaar number and mobile. Fill registration form with land details. Submit and note registration number.',
    officialWebsite: 'https://pmkisan.gov.in/',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    tags: ['farming', 'income-support', 'agriculture'],
    categoryName: 'Agriculture'
  },
  {
    name: 'National Scholarship Portal',
    description: 'One-stop solution for various scholarship schemes for students. Provides scholarships from pre-matric to post-graduate level from Central and State Governments. Merit-cum-means based scholarships for minority, SC/ST, OBC students.',
    benefits: [
      'Multiple scholarship options',
      'Single platform for all scholarships',
      'Direct benefit transfer',
      'Covers tuition and maintenance',
      'Yearly renewal available'
    ],
    eligibility: {
      age: { min: 6, max: 35 },
      gender: ['all'],
      incomeGroup: ['below-poverty-line', 'low-income', 'middle-income'],
      states: ['all'],
      other: 'Varies by scheme - Merit based, Minority, SC/ST/OBC'
    },
    documentsRequired: [
      'Aadhaar Card',
      'Bank account passbook',
      'Income certificate',
      'Caste certificate (if applicable)',
      'Previous year mark sheet',
      'Current year admission receipt',
      'Bonafide certificate from institution'
    ],
    applicationProcedure: 'Register on NSP portal with basic details. Complete profile with educational and bank details. Select applicable scholarship schemes. Upload required documents. Submit application before deadline. Track status online.',
    officialWebsite: 'https://scholarships.gov.in/',
    ministry: 'Ministry of Electronics and Information Technology',
    tags: ['education', 'scholarship', 'students', 'financial-aid'],
    categoryName: 'Education'
  },
  {
    name: 'Deen Dayal Lado Lakshmi Yojana (DDLLY)',
    description: 'The aim of Deen Dayal Lado Lakshmi Yojana (DDLLY) is to promote women empowerment by strengthening financial independence and providing social security, thereby fostering their overall well-being and societal participation.',
    benefits: [
      'Rs. 2100/- per month for every eligible woman, unless the beneficiary voluntarily chooses to take a lesser amount'
    ],
    eligibility: {
      age: { min: 23, max: 60 },
      gender: ['female'],
      incomeGroup: ['below-poverty-line'],
      states: ['Haryana'],
      other: 'Woman must be a resident of Haryana for at least 15 years OR married into Haryana whose husband is a resident for 15 years or more. Exclusions: Women receiving benefits from Old Age Samman Allowance, Financial Assistance to Widows, Haryana Divyang Financial Assistance, Ladli Social Security Allowance, and other similar schemes (except cancer/rare disease assistance schemes).'
    },
    documentsRequired: [
      'Age proof: 23 years or above',
      'Verified annual family income not more than Rs. 1 lakh (as per FIDR database)',
      'Proof of Haryana residency for last 15 years or marriage certificate for women married into Haryana',
      'Aadhaar Card',
      'Bank account details',
      'Mobile number'
    ],
    applicationProcedure: 'Application must be submitted through the official mobile app of Deen Dayal Lado Lakshmi Yojana. Download the app, register with Aadhaar and mobile number, fill the application form with required details, upload necessary documents, and submit.',
    officialWebsite: 'https://socialjusticehry.gov.in/deen-dayal-lado-lakshmi-yojana-ddlly/',
    ministry: 'Directorate of Social Justice and Empowerment, Haryana',
    tags: ['women-empowerment', 'financial-assistance', 'haryana', 'social-security'],
    categoryName: 'Women Empowerment'
  },
  {
    name: 'Pradhan Mantri Mudra Yojana',
    description: 'Provides loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises. Three categories: Shishu (up to ₹50,000), Kishore (₹50,001 to ₹5 lakh), Tarun (₹5,00,001 to ₹10 lakh). Helps entrepreneurs start or expand business.',
    benefits: [
      'Collateral-free loans',
      'Flexible repayment terms',
      'Lower interest rates',
      'Support for business growth',
      'Easy documentation'
    ],
    eligibility: {
      age: { min: 18, max: 65 },
      gender: ['all'],
      incomeGroup: ['all'],
      states: ['all'],
      other: 'Small business owners, new entrepreneurs, manufacturers, traders, service sector'
    },
    documentsRequired: [
      'Aadhaar Card',
      'PAN Card',
      'Business plan or proposal',
      'Address proof',
      'Bank statement (6 months)',
      'Business registration documents',
      'Quotation of machinery/equipment'
    ],
    applicationProcedure: 'Prepare business plan with financial projections. Visit nearest bank, NBFC, or MFI. Fill loan application form. Submit required documents. Bank will assess and approve. Loan amount credited to account.',
    officialWebsite: 'https://www.mudra.org.in/',
    ministry: 'Ministry of Finance',
    tags: ['business', 'loan', 'startup', 'entrepreneur', 'mudra'],
    categoryName: 'Business & Startup'
  },
  {
    name: 'Beti Bachao Beti Padhao',
    description: 'Multi-sectoral initiative addressing declining Child Sex Ratio and promoting girls\' education and empowerment. Focuses on prevention of gender-biased sex selection, ensuring survival and protection, and ensuring education of girl child.',
    benefits: [
      'Financial assistance for girl child education',
      'Awareness about girl child rights',
      'Better sex ratio at birth',
      'Enhanced value of girl child',
      'Community mobilization'
    ],
    eligibility: {
      age: { min: 0, max: 21 },
      gender: ['female'],
      incomeGroup: ['all'],
      states: ['all'],
      other: 'Girl child, Indian citizen'
    },
    documentsRequired: [
      'Birth certificate of girl child',
      'Aadhaar Card of parents',
      'Bank account details',
      'School enrollment certificate',
      'Address proof'
    ],
    applicationProcedure: 'Open Sukanya Samriddhi Account in post office or bank. Submit birth certificate and parent\'s documents. Deposit minimum amount. Continue yearly deposits. Benefits accessible after maturity or for higher education.',
    officialWebsite: 'https://wcd.nic.in/bbbp-schemes',
    ministry: 'Ministry of Women and Child Development',
    tags: ['women', 'girl-child', 'education', 'empowerment'],
    categoryName: 'Women Empowerment'
  },
  {
    name: 'Pradhan Mantri Awas Yojana - Urban',
    description: 'Housing for All mission providing affordable housing to urban poor and EWS/LIG categories. Offers credit-linked subsidy, in-situ slum rehabilitation, affordable housing in partnership, and beneficiary-led construction.',
    benefits: [
      'Interest subsidy on home loans',
      'Subsidy up to ₹2.67 lakh',
      'Affordable housing units',
      'Pucca house with basic amenities',
      'Ground floor preference for disabled'
    ],
    eligibility: {
      age: { min: 21, max: 70 },
      gender: ['all'],
      incomeGroup: ['below-poverty-line', 'low-income', 'middle-income'],
      states: ['all'],
      other: 'EWS/LIG/MIG categories, No pucca house in India, Adult earning member'
    },
    documentsRequired: [
      'Aadhaar Card',
      'Income certificate',
      'Bank account details',
      'Caste certificate (if applicable)',
      'Self-declaration of no pucca house',
      'Address proof',
      'Voter ID'
    ],
    applicationProcedure: 'Visit PMAY portal or Common Service Centre. Select applicable component (CLSS/In-situ/AHP/BLC). Fill online application form. Upload documents. Submit application. Get application ID. Bank will process for CLSS.',
    officialWebsite: 'https://pmaymis.gov.in/',
    ministry: 'Ministry of Housing and Urban Affairs',
    tags: ['housing', 'subsidy', 'urban', 'affordable'],
    categoryName: 'Housing'
  },
  {
    name: 'Pradhan Mantri Kaushal Vikas Yojana',
    description: 'Flagship skill development scheme enabling youth to take up industry-relevant skill training. Short-term training, Recognition of Prior Learning (RPL), and Special Projects. Placement assistance after training completion.',
    benefits: [
      'Free skill training',
      'Government certification',
      'Placement assistance',
      'Monetary reward on certification',
      'Industry-aligned courses',
      'Digital literacy'
    ],
    eligibility: {
      age: { min: 15, max: 45 },
      gender: ['all'],
      incomeGroup: ['all'],
      states: ['all'],
      other: 'School/college dropouts, unemployed youth'
    },
    documentsRequired: [
      'Aadhaar Card',
      'Bank account details',
      'Educational certificates',
      'Photograph',
      'Mobile number'
    ],
    applicationProcedure: 'Visit PMKVY portal or nearest training center. Register with Aadhaar and personal details. Browse available courses and centers. Enroll in desired course. Attend training sessions. Complete assessment. Get government certificate.',
    officialWebsite: 'https://www.pmkvyofficial.org/',
    ministry: 'Ministry of Skill Development and Entrepreneurship',
    tags: ['skill-development', 'training', 'employment', 'youth'],
    categoryName: 'Skills & Employment'
  },
  {
    name: 'Atal Pension Yojana',
    description: 'Pension scheme for unorganized sector workers. Guaranteed minimum pension of ₹1,000 to ₹5,000 per month after age 60. Based on contribution amount and joining age. Government co-contribution for eligible subscribers.',
    benefits: [
      'Guaranteed pension after 60',
      'Minimum ₹1,000 pension',
      'Government co-contribution',
      'Spouse pension on death',
      'Nominee gets corpus on death',
      'Voluntary contributions allowed'
    ],
    eligibility: {
      age: { min: 18, max: 40 },
      gender: ['all'],
      incomeGroup: ['all'],
      states: ['all'],
      other: 'Indian citizen, Bank account holder, Mobile number'
    },
    documentsRequired: [
      'Aadhaar Card',
      'Bank account details',
      'Mobile number',
      'Nominee details'
    ],
    applicationProcedure: 'Visit bank where you have savings account. Fill APY registration form. Provide Aadhaar and bank details. Choose pension amount (₹1,000 to ₹5,000). Auto-debit will start. Contribution monthly/quarterly/half-yearly.',
    officialWebsite: 'https://npscra.nsdl.co.in/scheme-details.php',
    ministry: 'Ministry of Finance',
    tags: ['pension', 'retirement', 'social-security', 'savings'],
    categoryName: 'Social Security'
  },
  {
    name: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance scheme providing financial support to farmers in case of crop failure. Covers all food & oilseed crops and annual commercial/horticultural crops. Low premium rates with high insurance coverage.',
    benefits: [
      'Comprehensive risk coverage',
      'Low farmer premium (1.5-5%)',
      'Claims settled quickly',
      'Covers all stages of crop cycle',
      'Use of technology for claim settlement',
      'Minimum documentation'
    ],
    eligibility: {
      age: { min: 18, max: 150 },
      gender: ['all'],
      incomeGroup: ['all'],
      states: ['all'],
      other: 'Farmers (owner/tenant) growing notified crops'
    },
    documentsRequired: [
      'Aadhaar Card',
      'Bank account details',
      'Land ownership/tenancy documents',
      'Sowing certificate from Patwari',
      'Application form'
    ],
    applicationProcedure: 'Contact bank where KCC/loan account exists. Fill PMFBY application form. Submit land documents and sowing details. Pay premium amount. Insurance company will issue policy. In case of loss, inform bank within 72 hours.',
    officialWebsite: 'https://pmfby.gov.in/',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    tags: ['agriculture', 'insurance', 'crop', 'farmers', 'protection'],
    categoryName: 'Agriculture'
  },
  {
    name: 'Stand Up India Scheme',
    description: 'Facilitating loans between ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs for greenfield enterprises in manufacturing, services or trading sector. Each bank branch to provide loans to at least one SC/ST and one woman borrower.',
    benefits: [
      'Loan ₹10 lakh to ₹1 crore',
      'Composite loan for business',
      '7 years repayment period',
      'Convergence with other schemes',
      'Credit guarantee coverage',
      'Handholding support'
    ],
    eligibility: {
      age: { min: 18, max: 65 },
      gender: ['all'],
      incomeGroup: ['all'],
      states: ['all'],
      other: 'SC/ST and/or Women entrepreneurs, First-time business venture, Greenfield project'
    },
    documentsRequired: [
      'Aadhaar Card',
      'PAN Card',
      'Caste certificate (for SC/ST)',
      'Business plan',
      'Address proof',
      'Bank statement',
      'Quotations for machinery/equipment',
      'Project report'
    ],
    applicationProcedure: 'Visit Stand Up India portal. Register and complete profile. Fill loan application with business details. Upload project report and documents. Submit to bank. Bank will assess and approve. Loan disbursed in stages.',
    officialWebsite: 'https://www.standupmitra.in/',
    ministry: 'Ministry of Finance',
    tags: ['business', 'sc-st', 'women', 'entrepreneur', 'loan'],
    categoryName: 'Business & Startup'
  },
  {
    name: 'Sukanya Samriddhi Yojana',
    description: 'Small deposit scheme for girl child with attractive interest rate and tax benefits. Part of Beti Bachao Beti Padhao campaign. Can be opened till girl child turns 10 years. Matures after 21 years from opening or marriage after 18 years.',
    benefits: [
      'High interest rate (7.6% currently)',
      'Tax benefits under Section 80C',
      'Partial withdrawal for higher education',
      'Premature closure for marriage',
      'Compounding interest',
      'Flexible deposit amount'
    ],
    eligibility: {
      age: { min: 0, max: 10 },
      gender: ['female'],
      incomeGroup: ['all'],
      states: ['all'],
      other: 'Girl child below 10 years, Parents/guardian as account holder'
    },
    documentsRequired: [
      'Birth certificate of girl child',
      'Aadhaar Card of girl and parent',
      'PAN Card of parent',
      'Address proof',
      'Passport size photographs'
    ],
    applicationProcedure: 'Visit post office or authorized bank. Fill Sukanya Samriddhi Account opening form. Submit girl child birth certificate and parent\'s ID. Deposit minimum ₹250 to open account. Maximum ₹1.5 lakh per year. Continue deposits till 15 years.',
    officialWebsite: 'https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx',
    ministry: 'Ministry of Finance',
    tags: ['girl-child', 'savings', 'education', 'investment', 'tax-benefit'],
    categoryName: 'Women Empowerment'
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Category.deleteMany({});
    await Scheme.deleteMany({});
    
    // Drop indexes to prevent duplicate key errors
    try {
      await Category.collection.dropIndexes();
      await Scheme.collection.dropIndexes();
      console.log('✅ Indexes dropped and data cleared');
    } catch (err) {
      console.log('✅ Existing data cleared');
    }

    // Create admin user
    console.log('👤 Creating admin user...');
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@myscheme.com',
      password: 'admin123',
      role: 'admin',
      age: 30,
      gender: 'male'
    });
    console.log('✅ Admin user created:', adminUser.email);

    // Create test user
    console.log('👤 Creating test user...');
    const testUser = await User.create({
      name: 'Test User',
      email: 'user@test.com',
      password: 'user123',
      role: 'user',
      age: 25,
      gender: 'female',
      state: 'Maharashtra',
      incomeGroup: 'middle-income'
    });
    console.log('✅ Test user created:', testUser.email);

    // Create categories
    console.log('📁 Creating categories...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ ${createdCategories.length} categories created`);

    // Create category map
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    // Assign category IDs to schemes
    const schemesWithCategories = schemes.map(scheme => ({
      ...scheme,
      category: categoryMap[scheme.categoryName]
    }));

    // Remove categoryName field
    schemesWithCategories.forEach(scheme => delete scheme.categoryName);

    // Create schemes
    console.log('📋 Creating schemes...');
    const createdSchemes = await Scheme.insertMany(schemesWithCategories);
    console.log(`✅ ${createdSchemes.length} schemes created`);

    // Update category scheme counts
    console.log('🔄 Updating category counts...');
    for (const category of createdCategories) {
      const count = createdSchemes.filter(
        s => s.category.toString() === category._id.toString()
      ).length;
      await Category.findByIdAndUpdate(category._id, { schemeCount: count });
    }
    console.log('✅ Category counts updated');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: 2 (1 admin, 1 test user)`);
    console.log(`   Categories: ${createdCategories.length}`);
    console.log(`   Schemes: ${createdSchemes.length}`);
    console.log('\n🔐 Login Credentials:');
    console.log(`   Admin: admin@myscheme.com / admin123`);
    console.log(`   User:  user@test.com / user123`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed function
seedDatabase();
