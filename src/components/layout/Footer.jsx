import { Link } from 'react-router-dom';
import { Server, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Careers', path: '#' },
      { name: 'Blog', path: '#' },
    ],
    services: [
      { name: 'Web Hosting', path: '/hosting-plans' },
      { name: 'Domain Registration', path: '/domain-search' },
      { name: 'SSL Certificates', path: '#' },
      { name: 'Email Hosting', path: '#' },
    ],
    support: [
      { name: 'Help Center', path: '#' },
      { name: 'Live Chat', path: '#' },
      { name: 'Knowledge Base', path: '#' },
      { name: 'Status Page', path: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Acceptable Use Policy', path: '#' },
      { name: 'GDPR Compliance', path: '#' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, path: '#' },
    { name: 'Twitter', icon: Twitter, path: '#' },
    { name: 'Instagram', icon: Instagram, path: '#' },
    { name: 'LinkedIn', icon: Linkedin, path: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Server className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">HostPro</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Professional web hosting solutions for businesses and individuals. 
              Fast, reliable, and secure hosting with 24/7 expert support.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-400" />
                <span className="text-sm">support@hostpro.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span className="text-sm">123 Hosting Street, Tech City, TC 12345</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm break-words"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm break-words"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm break-words"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 min-w-0">
              <p className="text-sm text-gray-400">
                © {currentYear} HostPro. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200 break-words"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 justify-center">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.path}
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-200 group"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
