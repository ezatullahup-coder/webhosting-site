import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Globe, 
  CheckCircle, 
  XCircle, 
  ShoppingCart,
  Star,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';

const DomainSearch = () => {
  const [domain, setDomain] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTLDs, setSelectedTLDs] = useState(['com', 'net', 'org']);

  const popularTLDs = [
    { extension: '.com', price: 12.99, popular: true },
    { extension: '.net', price: 14.99, popular: false },
    { extension: '.org', price: 13.99, popular: false },
    { extension: '.co', price: 24.99, popular: false },
    { extension: '.io', price: 39.99, popular: true },
    { extension: '.dev', price: 19.99, popular: false },
    { extension: '.app', price: 19.99, popular: false },
    { extension: '.tech', price: 19.99, popular: false }
  ];

  const domainSuggestions = [
    'business', 'store', 'shop', 'blog', 'news', 'tech', 'digital', 'creative',
    'agency', 'studio', 'design', 'marketing', 'consulting', 'solutions', 'services'
  ];

  const mockSearchDomain = async (domainName) => {
    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const results = [];
    const baseName = domainName.split('.')[0];
    
    // Generate mock results for different TLDs
    popularTLDs.forEach(tld => {
      const fullDomain = `${baseName}${tld.extension}`;
      const isAvailable = Math.random() > 0.3; // 70% chance of being available
      
      results.push({
        domain: fullDomain,
        available: isAvailable,
        price: tld.price,
        popular: tld.popular,
        features: isAvailable ? [
          'Free DNS Management',
          'Free Email Forwarding',
          'Domain Lock Protection',
          '24/7 Support'
        ] : []
      });
    });
    
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (domain.trim()) {
      mockSearchDomain(domain.trim());
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const newDomain = `${domain.split('.')[0] || ''}${suggestion}`;
    setDomain(newDomain);
    mockSearchDomain(newDomain);
  };

  const getStatusIcon = (available) => {
    return available ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  const getStatusText = (available) => {
    return available ? 'Available' : 'Taken';
  };

  const getStatusColor = (available) => {
    return available ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Find Your Perfect Domain
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Search for domain availability and secure your online presence. 
            Get the perfect domain name for your business or project.
          </p>
        </motion.div>

        {/* Domain Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Enter your domain name..."
                className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-primary-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg"
              />
            </div>
            <button 
              type="submit" 
              disabled={isSearching}
              className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? 'Searching...' : 'Search Domain'}
            </button>
          </form>

          {/* Domain Suggestions */}
          {domain && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Popular domain suggestions:
              </p>
              <div className="flex flex-wrap gap-2">
                {domainSuggestions.slice(0, 8).map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Domain Search Results
            </h2>
            
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <motion.div
                  key={result.domain}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="card p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Globe className="w-5 h-5 text-primary-600" />
                        <span className="text-xl font-semibold text-gray-900 dark:text-white">
                          {result.domain}
                        </span>
                        {result.popular && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                            Popular
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(result.available)}
                          <span className={`font-medium ${getStatusColor(result.available)}`}>
                            {getStatusText(result.available)}
                          </span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${result.price}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">/year</span>
                      </div>

                      {result.available && result.features.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {result.features.map((feature) => (
                            <span
                              key={feature}
                              className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      {result.available ? (
                        <>
                          <button className="btn-primary flex items-center justify-center">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </button>
                          <button className="btn-outline">
                            Transfer
                          </button>
                        </>
                      ) : (
                        <button className="btn-secondary">
                          Make Offer
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Popular TLDs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Popular Domain Extensions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTLDs.map((tld, index) => (
              <motion.div
                key={tld.extension}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover:scale-105 transition-transform duration-200"
              >
                {tld.popular && (
                  <Star className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
                )}
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {tld.extension}
                </div>
                <div className="text-2xl font-bold text-primary-600 mb-3">
                  ${tld.price}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  per year
                </div>
                <button className="btn-outline w-full">
                  Register Now
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Why Choose Our Domain Services?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Secure & Protected
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced security features including domain lock, privacy protection, and SSL certificates
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Instant Setup
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get your domain up and running instantly with our automated setup process
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Growth Ready
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Scale your domain portfolio as your business grows with flexible management tools
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Secure Your Domain?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Start building your online presence today with the perfect domain name
          </p>
          <button 
            onClick={() => document.querySelector('input[type="text"]').focus()}
            className="btn-primary"
          >
            Search for Your Domain
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default DomainSearch;
