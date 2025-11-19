import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchemes } from '../redux/slices/schemeSlice';
import { FiFilter, FiX, FiHeart } from 'react-icons/fi';

const Schemes = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { schemes, loading, total, page, pages } = useSelector((state) => state.schemes);
  const { categories } = useSelector((state) => state.categories);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    state: '',
    gender: '',
    minAge: '',
    maxAge: '',
    incomeGroup: '',
    page: 1,
  });

  const [showFilters, setShowFilters] = useState(false);

  const indianStates = [
    'All States', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = {
      search: params.get('search') || '',
      category: params.get('category') || '',
      state: params.get('state') || '',
      gender: params.get('gender') || '',
      minAge: params.get('minAge') || '',
      maxAge: params.get('maxAge') || '',
      incomeGroup: params.get('incomeGroup') || '',
      page: params.get('page') || 1,
    };
    setFilters(newFilters);
    dispatch(fetchSchemes(newFilters));
  }, [location.search, dispatch]);

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value, page: 1 };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const updateURL = (newFilters) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    navigate(`/schemes?${params.toString()}`);
  };

  const clearFilters = () => {
    const newFilters = {
      search: '',
      category: '',
      state: '',
      gender: '',
      minAge: '',
      maxAge: '',
      incomeGroup: '',
      page: 1,
    };
    setFilters(newFilters);
    navigate('/schemes');
  };

  const handlePageChange = (newPage) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    updateURL(newFilters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Browse Government Schemes</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden bg-primary-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiFilter className="mr-2" />
          Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className={`md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:underline"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* State Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <select
                  value={filters.state}
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All States</option>
                  {indianStates.slice(1).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={filters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Age Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minAge}
                    onChange={(e) => handleFilterChange('minAge', e.target.value)}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxAge}
                    onChange={(e) => handleFilterChange('maxAge', e.target.value)}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Income Group */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Income Group
                </label>
                <select
                  value={filters.incomeGroup}
                  onChange={(e) => handleFilterChange('incomeGroup', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All</option>
                  <option value="below-poverty-line">Below Poverty Line</option>
                  <option value="low-income">Low Income</option>
                  <option value="middle-income">Middle Income</option>
                  <option value="high-income">High Income</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="spinner"></div>
            </div>
          ) : schemes.length > 0 ? (
            <>
              <div className="mb-4 text-gray-600">
                Found {total} scheme{total !== 1 ? 's' : ''}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {schemes.map((scheme) => (
                  <div key={scheme._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-800 flex-1">
                          {scheme.name}
                        </h3>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold text-white ml-2"
                          style={{ backgroundColor: scheme.category?.color }}
                        >
                          {scheme.category?.name}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {scheme.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <Link
                          to={`/schemes/${scheme.slug}`}
                          className="text-primary-600 hover:underline font-semibold"
                        >
                          View Details →
                        </Link>
                        <div className="flex items-center text-gray-500 text-sm">
                          <FiHeart className="mr-1" />
                          {scheme.favouriteCount || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Previous
                  </button>

                  {[...Array(pages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-4 py-2 border rounded-md ${
                        page === i + 1
                          ? 'bg-primary-600 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === pages}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No schemes found matching your criteria</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-primary-600 hover:underline"
              >
                Clear filters and try again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schemes;
