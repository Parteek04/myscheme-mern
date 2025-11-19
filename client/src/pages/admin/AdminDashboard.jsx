import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/axios';
import { FiUsers, FiFileText, FiFolder, FiEye, FiHeart, FiTrendingUp } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [schemeStats, userStats, categories] = await Promise.all([
        API.get('/schemes/admin/stats'),
        API.get('/users/admin/stats'),
        API.get('/categories')
      ]);

      setStats({
        schemes: schemeStats.data.data,
        users: userStats.data.data,
        categories: categories.data.data
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
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
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600">Total Users</h3>
            <FiUsers className="text-2xl text-blue-500" />
          </div>
          <p className="text-3xl font-bold">{stats?.users?.totalUsers || 0}</p>
          <p className="text-sm text-gray-500 mt-1">
            {stats?.users?.activeUsers || 0} active
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600">Total Schemes</h3>
            <FiFileText className="text-2xl text-green-500" />
          </div>
          <p className="text-3xl font-bold">{stats?.schemes?.totalSchemes || 0}</p>
          <p className="text-sm text-gray-500 mt-1">
            Across {stats?.categories?.length || 0} categories
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600">Total Views</h3>
            <FiEye className="text-2xl text-purple-500" />
          </div>
          <p className="text-3xl font-bold">{stats?.schemes?.totalViews || 0}</p>
          <p className="text-sm text-gray-500 mt-1">Scheme views</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600">Categories</h3>
            <FiFolder className="text-2xl text-orange-500" />
          </div>
          <p className="text-3xl font-bold">{stats?.categories?.length || 0}</p>
          <p className="text-sm text-gray-500 mt-1">Active categories</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          to="/admin/schemes"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition text-center"
        >
          <FiFileText className="text-4xl text-primary-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2">Manage Schemes</h3>
          <p className="text-gray-600">Add, edit, or delete schemes</p>
        </Link>

        <Link
          to="/admin/categories"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition text-center"
        >
          <FiFolder className="text-4xl text-primary-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2">Manage Categories</h3>
          <p className="text-gray-600">Organize scheme categories</p>
        </Link>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FiUsers className="text-4xl text-primary-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2">User Management</h3>
          <p className="text-gray-600">View and manage users</p>
        </div>
      </div>

      {/* Top Schemes */}
      {stats?.schemes?.topSchemes && stats.schemes.topSchemes.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FiTrendingUp className="mr-2 text-green-500" />
            Top Viewed Schemes
          </h2>
          <div className="space-y-3">
            {stats.schemes.topSchemes.map((scheme, index) => (
              <div key={scheme._id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center">
                  <span className="font-bold text-lg text-gray-400 w-8">{index + 1}</span>
                  <span className="font-semibold">{scheme.name}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiEye className="mr-2" />
                  {scheme.views} views
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Users */}
      {stats?.users?.recentUsers && stats.users.recentUsers.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FiUsers className="mr-2 text-blue-500" />
            Recent Users
          </h2>
          <div className="space-y-3">
            {stats.users.recentUsers.map((user) => (
              <div key={user._id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
