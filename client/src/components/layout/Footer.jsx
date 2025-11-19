import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">MyScheme</h3>
            <p className="text-gray-400">
              One-stop platform for all government schemes and benefits available for Indian citizens.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="text-gray-400 hover:text-white transition">
                  Browse Schemes
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white transition">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Education</li>
              <li className="text-gray-400">Healthcare</li>
              <li className="text-gray-400">Agriculture</li>
              <li className="text-gray-400">Business</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <FiMail className="mr-2" /> info@myscheme.com
              </li>
              <li className="flex items-center text-gray-400">
                <FiPhone className="mr-2" /> +91 1800-xxx-xxxx
              </li>
              <li className="flex items-center text-gray-400">
                <FiMapPin className="mr-2" /> New Delhi, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MyScheme. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
