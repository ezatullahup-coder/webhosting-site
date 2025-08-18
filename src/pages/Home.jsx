import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Server, 
  Shield, 
  Zap, 
  Globe, 
  HeadphonesIcon,
  CheckCircle,
  ArrowRight,
  Star,
  Code2,
  Database
} from 'lucide-react';

const Home = () => {
  const [domain, setDomain] = useState('');

  const features = [
    {
      icon: Server,
      title: '99.9% Uptime',
      description: 'Guaranteed reliability with our enterprise-grade infrastructure'
    },
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'DDoS protection, SSL certificates, and daily backups included'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'SSD storage and CDN for optimal performance worldwide'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Expert support team available around the clock'
    }
  ];

  const hostingPlans = [
    {
      name: 'Starter',
      price: 2.99,
      period: 'month',
      features: ['1 Website', '10 GB SSD Storage', 'Unlimited Bandwidth', 'Free SSL Certificate', 'Free Domain (1st year)'],
      popular: false
    },
    {
      name: 'Professional',
      price: 4.99,
      period: 'month',
      features: ['Unlimited Websites', '100 GB SSD Storage', 'Unlimited Bandwidth', 'Free SSL Certificate', 'Free Domain (1st year)', 'Daily Backups'],
      popular: true
    },
    {
      name: 'Business',
      price: 8.99,
      period: 'month',
      features: ['Unlimited Websites', '500 GB SSD Storage', 'Unlimited Bandwidth', 'Free SSL Certificate', 'Free Domain (1st year)', 'Daily Backups', 'Priority Support'],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      content: 'HostPro has been incredible for our startup. The performance and support are unmatched.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      company: 'Digital Agency',
      content: 'We host over 50 client websites on HostPro. Never had any issues with uptime or speed.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      company: 'E-commerce Store',
      content: 'The migration was seamless and our site loads 3x faster now. Highly recommended!',
      rating: 5
    }
  ];

  // Our Clients (logo + company name)
  const clients = [
    { name: 'Acme Corp' },
    { name: 'PixelWave' },
    { name: 'NovaLabs' },
    { name: 'Apex Systems' },
    { name: 'CloudNine' },
    { name: 'QuantumSoft' },
    { name: 'BlueOcean' },
    { name: 'Vertex Media' },
    { name: 'BrightPath' },
    { name: 'NextGen Apps' },
    { name: 'SummitWorks' },
    { name: 'Orbit Tech' },
  ];

  const clientGradients = [
    'bg-gradient-to-br from-primary-500 to-blue-600',
    'bg-gradient-to-br from-purple-500 to-pink-600',
    'bg-gradient-to-br from-emerald-500 to-teal-600',
    'bg-gradient-to-br from-orange-500 to-amber-600',
    'bg-gradient-to-br from-rose-500 to-red-600',
    'bg-gradient-to-br from-cyan-500 to-sky-600',
  ];

  const getInitials = (name) => {
    const words = name.trim().split(/\s+/);
    const first = words[0]?.[0] || '';
    const second = words[1]?.[0] || '';
    return (first + second).toUpperCase();
  };

  const handleDomainSearch = (e) => {
    e.preventDefault();
    // Mock domain search - would integrate with real API
    alert(`Searching for domain: ${domain}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Professional Web Hosting
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
                {' '}Made Simple
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Get lightning-fast hosting with 99.9% uptime guarantee, advanced security, 
              and 24/7 expert support. Perfect for businesses and developers.
            </p>
            
            {/* Domain Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <form onSubmit={handleDomainSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Enter your domain name..."
                    className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-primary-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Search Domain
                </button>
              </form>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/hosting-plans" className="btn-primary">
                View Hosting Plans
              </Link>
              <Link to="/about" className="btn-outline">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      

      {/* Services Overview (Hosting & Domain, Web Dev, Database Dev) */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Full-Stack Services for Your Business
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From domain to database, we design, build, and host scalable digital products
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Hosting & Domain */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary-500/10 blur-2xl" />
              <div className="p-8">
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center mb-5">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Hosting & Domain</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-5">
                  Blazing-fast hosting with managed DNS, SSL, backups, and global CDN. Seamless domain registration and management.
                </p>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> 99.9% uptime SLA</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Free SSL & DDoS protection</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> One-click staging & backups</li>
                </ul>
              </div>
            </motion.div>

            {/* Web Development */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl" />
              <div className="p-8">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-5">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Web Development</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-5">
                  Modern, responsive, and accessible web apps built with best practices and performance at the core.
                </p>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> React & Tailwind expertise</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> SEO & Core Web Vitals optimized</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> CI/CD and QA workflows</li>
                </ul>
              </div>
            </motion.div>

            {/* Database Development */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-emerald-500/10 blur-2xl" />
              <div className="p-8">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center mb-5">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Database Development</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-5">
                  Secure, scalable data architectures with backups, monitoring, and high availability baked in.
                </p>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> PostgreSQL, MySQL, MongoDB</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Schema design & migrations</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Observability & backups</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      



      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose HostPro?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We provide enterprise-grade hosting solutions with features that help your business grow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hosting Plans Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Perfect Plan
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Start with our affordable plans and scale as you grow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hostingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`card p-8 relative ${plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 ml-1">
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/hosting-plans" className="btn-primary w-full flex items-center justify-center">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/hosting-plans" className="btn-outline">
              View All Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Our Clients (moved after Hosting Plans Preview) */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Leading Teams
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We power websites for startups, agencies, and enterprises worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 sm:p-4 flex items-center sm:flex-col sm:items-center gap-3 hover:shadow-md transition-all duration-200"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-white font-semibold ${clientGradients[index % clientGradients.length]}`}>
                  {getInitials(client.name)}
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white text-left sm:text-center truncate w-full">
                  {client.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust HostPro with their websites
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of satisfied customers and get your website online today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
                Start Free Trial
              </Link>
              <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
