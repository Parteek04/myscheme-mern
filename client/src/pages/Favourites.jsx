import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavourites, removeFromFavourites } from '../redux/slices/userSlice';
import { Link } from 'react-router-dom';
import { FiHeart, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Favourites = () => {
  const dispatch = useDispatch();
  const { favourites, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchFavourites());
  }, [dispatch]);

  const handleRemove = async (schemeId) => {
    if (window.confirm('Remove this scheme from favourites?')) {
      await dispatch(removeFromFavourites(schemeId));
      toast.success('Removed from favourites');
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <FiHeart className="text-3xl text-red-500 mr-3" />
          <h1 className="text-3xl font-bold">My Favourite Schemes</h1>
        </div>

        {favourites.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <FiHeart className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No favourites yet</h2>
            <p className="text-gray-600 mb-6">
              Start exploring schemes and add them to your favourites
            </p>
            <Link
              to="/schemes"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              Browse Schemes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favourites.map((scheme) => (
              <div key={scheme._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: scheme.category?.color }}
                    >
                      {scheme.category?.name}
                    </span>
                    <button
                      onClick={() => handleRemove(scheme._id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Remove from favourites"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {scheme.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {scheme.description}
                  </p>

                  <Link
                    to={`/schemes/${scheme.slug}`}
                    className="inline-block text-primary-600 hover:underline font-semibold"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
