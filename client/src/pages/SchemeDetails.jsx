import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchemeBySlug } from '../redux/slices/schemeSlice';
import { addToFavourites, removeFromFavourites, fetchFavourites } from '../redux/slices/userSlice';
import { toast } from 'react-toastify';
import { FiHeart, FiExternalLink, FiFileText, FiCheckCircle, FiUsers, FiCalendar } from 'react-icons/fi';

const SchemeDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { currentScheme, loading } = useSelector((state) => state.schemes);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { favourites } = useSelector((state) => state.user);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    dispatch(fetchSchemeBySlug(slug));
    if (isAuthenticated) {
      dispatch(fetchFavourites());
    }
  }, [slug, dispatch, isAuthenticated]);

  useEffect(() => {
    if (currentScheme && favourites) {
      setIsFavourite(favourites.some(fav => fav._id === currentScheme._id));
    }
  }, [currentScheme, favourites]);

  const handleFavourite = async () => {
    if (!isAuthenticated) {
      toast.info('Please login to add to favourites');
      return;
    }

    if (isFavourite) {
      await dispatch(removeFromFavourites(currentScheme._id));
      toast.success('Removed from favourites');
      setIsFavourite(false);
    } else {
      await dispatch(addToFavourites(currentScheme._id));
      dispatch(fetchFavourites());
      toast.success('Added to favourites');
      setIsFavourite(true);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!currentScheme) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Scheme not found</h2>
          <Link to="/schemes" className="text-primary-600 hover:underline">
            Browse all schemes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600">
        <Link to="/" className="hover:text-primary-600">Home</Link>
        {' > '}
        <Link to="/schemes" className="hover:text-primary-600">Schemes</Link>
        {' > '}
        <span className="text-gray-800">{currentScheme.name}</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{currentScheme.name}</h1>
            <div className="flex flex-wrap gap-2 items-center">
              <span
                className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: currentScheme.category?.color }}
              >
                {currentScheme.category?.name}
              </span>
              {currentScheme.ministry && (
                <span className="text-sm text-gray-600">
                  <FiUsers className="inline mr-1" />
                  {currentScheme.ministry}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleFavourite}
            className={`mt-4 md:mt-0 flex items-center px-6 py-3 rounded-lg transition ${
              isFavourite
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FiHeart className={`mr-2 ${isFavourite ? 'fill-current' : ''}`} />
            {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
          </button>
        </div>

        <p className="text-gray-700 text-lg leading-relaxed">{currentScheme.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Benefits */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FiCheckCircle className="mr-2 text-green-500" />
              Benefits
            </h2>
            <ul className="space-y-2">
              {currentScheme.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FiUsers className="mr-2 text-blue-500" />
              Eligibility Criteria
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="font-semibold w-32">Age:</span>
                <span className="text-gray-700">
                  {currentScheme.eligibility.age.min} - {currentScheme.eligibility.age.max} years
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-32">Gender:</span>
                <span className="text-gray-700">
                  {currentScheme.eligibility.gender.join(', ')}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-32">States:</span>
                <span className="text-gray-700">
                  {currentScheme.eligibility.states.join(', ')}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-32">Income:</span>
                <span className="text-gray-700">
                  {currentScheme.eligibility.incomeGroup.join(', ')}
                </span>
              </div>
              {currentScheme.eligibility.other && (
                <div className="mt-2 p-3 bg-gray-50 rounded">
                  <p className="text-gray-700">{currentScheme.eligibility.other}</p>
                </div>
              )}
            </div>
          </div>

          {/* Documents Required */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FiFileText className="mr-2 text-purple-500" />
              Documents Required
            </h2>
            <ul className="space-y-2">
              {currentScheme.documentsRequired.map((doc, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-500 mr-2">📄</span>
                  <span className="text-gray-700">{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Application Procedure */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">How to Apply</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {currentScheme.applicationProcedure}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div className="bg-primary-50 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Quick Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Views</span>
                <p className="font-semibold">{currentScheme.views || 0}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Favourited By</span>
                <p className="font-semibold">{currentScheme.favouriteCount || 0} users</p>
              </div>
              {currentScheme.launchedDate && (
                <div>
                  <span className="text-sm text-gray-600">Launched</span>
                  <p className="font-semibold flex items-center">
                    <FiCalendar className="mr-2" />
                    {new Date(currentScheme.launchedDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Official Website */}
          {currentScheme.officialWebsite && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Official Website</h3>
              <a
                href={currentScheme.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
              >
                Visit Official Site
                <FiExternalLink className="ml-2" />
              </a>
            </div>
          )}

          {/* Tags */}
          {currentScheme.tags && currentScheme.tags.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {currentScheme.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemeDetails;
