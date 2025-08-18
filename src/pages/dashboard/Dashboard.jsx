import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Globe, 
  CreditCard, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Activity,
  Users,
  Database,
  Shield
} from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - in real app, this would come from API
  const stats = [
    {
      title: 'Active Services',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: Server,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Total Domains',
      value: '8',
      change: '+1',
      changeType: 'positive',
      icon: Globe,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Monthly Revenue',
      value: '$299.99',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Uptime',
      value: '99.9%',
      change: '+0.1%',
      changeType: 'positive',
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  const recentServices = [
    {
      id: 1,
      name: 'Basic Hosting',
      domain: 'example.com',
      status: 'Active',
      uptime: '99.9%',
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      name: 'Professional Hosting',
      domain: 'business.com',
      status: 'Active',
      uptime: '99.8%',
      lastUpdated: '1 day ago'
    },
    {
      id: 3,
      name: 'Domain Registration',
      domain: 'newdomain.net',
      status: 'Pending',
      uptime: 'N/A',
      lastUpdated: '3 days ago'
    }
  ];

  const recentInvoices = [
    {
      id: 101,
      amount: 49.99,
      status: 'Paid',
      date: '2025-08-10',
      service: 'Basic Hosting'
    },
    {
      id: 102,
      amount: 99.99,
      status: 'Unpaid',
      date: '2025-08-15',
      service: 'Professional Hosting'
    },
    {
      id: 103,
      amount: 12.99,
      status: 'Paid',
      date: '2025-08-12',
      service: 'Domain Registration'
    }
  ];

  const systemAlerts = [
    {
      type: 'warning',
      message: 'SSL certificate expires in 30 days for example.com',
      time: '2 hours ago'
    },
    {
      type: 'info',
      message: 'Backup completed successfully for all services',
      time: '1 day ago'
    },
    {
      type: 'success',
      message: 'Domain newdomain.net has been activated',
      time: '3 days ago'
    }
  ];

  const quickActions = [
    {
      name: 'Add Domain',
      description: 'Register a new domain name',
      icon: Globe,
      color: 'bg-blue-500',
      action: () => console.log('Add Domain clicked')
    },
    {
      name: 'Upgrade Plan',
      description: 'Upgrade your hosting plan',
      icon: TrendingUp,
      color: 'bg-green-500',
      action: () => console.log('Upgrade Plan clicked')
    },
    {
      name: 'SSL Certificate',
      description: 'Secure your website with SSL',
      icon: Shield,
      color: 'bg-purple-500',
      action: () => console.log('SSL Certificate clicked')
    },
    {
      name: 'Create Database',
      description: 'Set up a new database',
      icon: Database,
      color: 'bg-orange-500',
      action: () => console.log('Create Database clicked')
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Suspended':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'Suspended':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Activity className="w-5 h-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <DashboardSidebar 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
      />
      
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back! Here's what's happening with your services.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                <Activity className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className={`text-sm font-medium ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                          from last month
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <button
                    key={action.name}
                    onClick={action.action}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all duration-200 text-left group"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {action.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {action.description}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="lg:col-span-2 card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Services
                  </h2>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentServices.map((service) => (
                    <div key={service.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-4 min-w-0">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                          <Server className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {service.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 break-words">
                            {service.domain}
                          </p>
                        </div>
                      </div>
                      <div className="w-full sm:w-auto text-left sm:text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                          {getStatusIcon(service.status)}
                          <span className="ml-1">{service.status}</span>
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Uptime: {service.uptime}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {service.lastUpdated}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Recent Invoices */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="card p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Recent Invoices
                    </h2>
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {recentInvoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            ${invoice.amount}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {invoice.service}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            invoice.status === 'Paid' 
                              ? 'text-green-600 bg-green-100 dark:bg-green-900/20' 
                              : 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
                          }`}>
                            {invoice.status}
                          </span>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {invoice.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* System Alerts */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="card p-6"
                >
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    System Alerts
                  </h2>
                  <div className="space-y-3">
                    {systemAlerts.map((alert, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-white">
                            {alert.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {alert.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
