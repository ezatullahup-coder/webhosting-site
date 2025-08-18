import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Server, 
  Shield, 
  Zap,
  Globe,
  Database,
  Mail,
  Lock,
  HeadphonesIcon,
  Clock
} from 'lucide-react';

const HostingPlans = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 2.99,
      yearlyPrice: 29.99,
      description: 'Perfect for personal websites and small projects',
      features: {
        websites: 1,
        storage: '10 GB',
        bandwidth: 'Unlimited',
        databases: 5,
        emailAccounts: 5,
        ssl: true,
        backups: false,
        support: '24/7',
        cpanel: true,
        oneClickInstall: true,
        freeDomain: true,
        migration: false,
        prioritySupport: false
      },
      popular: false
    },
    {
      name: 'Professional',
      monthlyPrice: 4.99,
      yearlyPrice: 49.99,
      description: 'Ideal for growing businesses and multiple websites',
      features: {
        websites: 'Unlimited',
        storage: '100 GB',
        bandwidth: 'Unlimited',
        databases: 25,
        emailAccounts: 25,
        ssl: true,
        backups: true,
        support: '24/7',
        cpanel: true,
        oneClickInstall: true,
        freeDomain: true,
        migration: true,
        prioritySupport: false
      },
      popular: true
    },
    {
      name: 'Business',
      monthlyPrice: 8.99,
      yearlyPrice: 89.99,
      description: 'Advanced hosting for high-traffic websites',
      features: {
        websites: 'Unlimited',
        storage: '500 GB',
        bandwidth: 'Unlimited',
        databases: 'Unlimited',
        emailAccounts: 'Unlimited',
        ssl: true,
        backups: true,
        support: '24/7',
        cpanel: true,
        oneClickInstall: true,
        freeDomain: true,
        migration: true,
        prioritySupport: true
      },
      popular: false
    },
    {
      name: 'Enterprise',
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      description: 'Maximum performance and resources for large-scale projects',
      features: {
        websites: 'Unlimited',
        storage: '1 TB',
        bandwidth: 'Unlimited',
        databases: 'Unlimited',
        emailAccounts: 'Unlimited',
        ssl: true,
        backups: true,
        support: '24/7',
        cpanel: true,
        oneClickInstall: true,
        freeDomain: true,
        migration: true,
        prioritySupport: true
      },
      popular: false
    }
  ];

  const featureLabels = [
    { key: 'websites', label: 'Websites', icon: Globe },
    { key: 'storage', label: 'SSD Storage', icon: Database },
    { key: 'bandwidth', label: 'Bandwidth', icon: Zap },
    { key: 'databases', label: 'Databases', icon: Database },
    { key: 'emailAccounts', label: 'Email Accounts', icon: Mail },
    { key: 'ssl', label: 'Free SSL Certificate', icon: Lock },
    { key: 'backups', label: 'Daily Backups', icon: Shield },
    { key: 'support', label: 'Support', icon: HeadphonesIcon },
    { key: 'cpanel', label: 'cPanel Control Panel', icon: Server },
    { key: 'oneClickInstall', label: 'One-Click App Installer', icon: Zap },
    { key: 'freeDomain', label: 'Free Domain (1st Year)', icon: Globe },
    { key: 'migration', label: 'Free Website Migration', icon: ArrowRight },
    { key: 'prioritySupport', label: 'Priority Support', icon: Clock }
  ];

  const getPrice = (plan) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan) => {
    if (billingCycle === 'yearly') {
      const monthlyTotal = plan.monthlyPrice * 12;
      const yearlyTotal = plan.yearlyPrice;
      return Math.round(((monthlyTotal - yearlyTotal) / monthlyTotal) * 100);
    }
    return 0;
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
            Choose Your Hosting Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Start with our affordable plans and scale as your business grows. 
            All plans include our 99.9% uptime guarantee and 24/7 expert support.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                billingCycle === 'yearly'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Save up to 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`card p-6 relative ${plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${getPrice(plan)}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 ml-1">
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>
                {billingCycle === 'yearly' && getSavings(plan) > 0 && (
                  <p className="text-green-600 text-sm mt-2">
                    Save {getSavings(plan)}% with yearly billing
                  </p>
                )}
              </div>

              <Link
                to="/register"
                className="btn-primary w-full flex items-center justify-center mb-6"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              <div className="space-y-3">
                {featureLabels.map((feature) => (
                  <div key={feature.key} className="flex items-center">
                    {plan.features[feature.key] ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                    )}
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {feature.label}: {plan.features[feature.key] === true ? 'Yes' : plan.features[feature.key]}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Detailed Feature Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                    Features
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureLabels.map((feature, index) => (
                  <tr key={feature.key} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''}>
                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        <feature.icon className="w-4 h-4 mr-2 text-primary-600" />
                        {feature.label}
                      </div>
                    </td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-4 px-4 text-center">
                        {plan.features[feature.key] ? (
                          <span className="text-green-600 font-medium">
                            {plan.features[feature.key] === true ? '✓' : plan.features[feature.key]}
                          </span>
                        ) : (
                          <span className="text-red-500">✗</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Choose your plan and get your website online in minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary">
              Start Your Free Trial
            </Link>
            <Link to="/contact" className="btn-outline">
              Contact Sales Team
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HostingPlans;
