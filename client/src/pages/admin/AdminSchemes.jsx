import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchemes, createScheme, updateScheme, deleteScheme } from '../../redux/slices/schemeSlice';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

const AdminSchemes = () => {
  const dispatch = useDispatch();
  const { schemes, loading } = useSelector((state) => state.schemes);
  const { categories } = useSelector((state) => state.categories);
  const [showModal, setShowModal] = useState(false);
  const [editingScheme, setEditingScheme] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    benefits: '',
    eligibility: {
      age: { min: 0, max: 150 },
      gender: ['all'],
      incomeGroup: ['all'],
      states: ['all'],
      other: ''
    },
    documentsRequired: '',
    applicationProcedure: '',
    officialWebsite: '',
    category: '',
    tags: '',
    ministry: ''
  });

  useEffect(() => {
    dispatch(fetchSchemes({ limit: 100 }));
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEligibilityChange = (field, value) => {
    setFormData({
      ...formData,
      eligibility: {
        ...formData.eligibility,
        [field]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const schemeData = {
      ...formData,
      benefits: formData.benefits.split('\n').filter(b => b.trim()),
      documentsRequired: formData.documentsRequired.split('\n').filter(d => d.trim()),
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
    };

    try {
      if (editingScheme) {
        await dispatch(updateScheme({ id: editingScheme._id, data: schemeData }));
        toast.success('Scheme updated successfully');
      } else {
        await dispatch(createScheme(schemeData));
        toast.success('Scheme created successfully');
      }
      resetForm();
      dispatch(fetchSchemes({ limit: 100 }));
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (scheme) => {
    setEditingScheme(scheme);
    setFormData({
      name: scheme.name,
      description: scheme.description,
      benefits: scheme.benefits.join('\n'),
      eligibility: scheme.eligibility,
      documentsRequired: scheme.documentsRequired.join('\n'),
      applicationProcedure: scheme.applicationProcedure,
      officialWebsite: scheme.officialWebsite || '',
      category: scheme.category._id,
      tags: scheme.tags.join(', '),
      ministry: scheme.ministry || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this scheme?')) {
      await dispatch(deleteScheme(id));
      toast.success('Scheme deleted successfully');
      dispatch(fetchSchemes({ limit: 100 }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      benefits: '',
      eligibility: {
        age: { min: 0, max: 150 },
        gender: ['all'],
        incomeGroup: ['all'],
        states: ['all'],
        other: ''
      },
      documentsRequired: '',
      applicationProcedure: '',
      officialWebsite: '',
      category: '',
      tags: '',
      ministry: ''
    });
    setEditingScheme(null);
    setShowModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Schemes</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
        >
          <FiPlus className="mr-2" />
          Add New Scheme
        </button>
      </div>

      {/* Schemes List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Views
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schemes.map((scheme) => (
              <tr key={scheme._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{scheme.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {scheme.category?.name}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {scheme.views}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(scheme)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(scheme._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full my-8">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">
                {editingScheme ? 'Edit Scheme' : 'Add New Scheme'}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <FiX className="text-2xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Scheme Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ministry</label>
                  <input
                    type="text"
                    name="ministry"
                    value={formData.ministry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Benefits (one per line) *</label>
                  <textarea
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Documents Required (one per line) *</label>
                  <textarea
                    name="documentsRequired"
                    value={formData.documentsRequired}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Application Procedure *</label>
                  <textarea
                    name="applicationProcedure"
                    value={formData.applicationProcedure}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Official Website</label>
                  <input
                    type="url"
                    name="officialWebsite"
                    value={formData.officialWebsite}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  {editingScheme ? 'Update' : 'Create'} Scheme
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSchemes;
