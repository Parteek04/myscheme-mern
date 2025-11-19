import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSchemes, fetchSuggestions, clearSuggestions } from '../redux/slices/schemeSlice';
import { FiSearch, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const { suggestions } = useSelector((state) => state.schemes);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/schemes?search=${searchQuery}`);
    }
  };

  const handleSearchInput = (value) => {
    setSearchQuery(value);
    if (value.length >= 2) {
      dispatch(fetchSuggestions(value));
      setShowSuggestions(true);
    } else {
      dispatch(clearSuggestions());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (slug) => {
    setShowSuggestions(false);
    setSearchQuery('');
    navigate(`/schemes/${slug}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Government Schemes Made for You
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Explore thousands of government schemes and benefits available across India
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  placeholder="Search schemes by name, keyword..."
                  className="flex-1 px-6 py-4 text-gray-800 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 transition"
                >
                  <FiSearch className="text-xl" />
                </button>
              </div>

              {/* Search Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white mt-2 rounded-lg shadow-lg overflow-hidden z-10">
                  {suggestions.map((scheme) => (
                    <button
                      key={scheme._id}
                      onClick={() => handleSuggestionClick(scheme.slug)}
                      className="block w-full text-left px-6 py-3 hover:bg-gray-100 text-gray-800 border-b last:border-b-0"
                    >
                      {scheme.name}
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/schemes?category=${category._id}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: category.color }}>
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {category.schemeCount} schemes
                  </span>
                  <FiArrowRight className="text-primary-600" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose MyScheme?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-3">Easy Search</h3>
              <p className="text-gray-600">
                Find schemes quickly with our powerful search and filter system
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-3">Complete Information</h3>
              <p className="text-gray-600">
                Get detailed information about eligibility, benefits, and application process
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Personalized</h3>
              <p className="text-gray-600">
                Save your favorite schemes and get recommendations based on your profile
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Exploring Schemes Today</h2>
          <p className="text-xl mb-8">Join thousands of Indians benefiting from government schemes</p>
          <Link
            to="/schemes"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Browse All Schemes
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
