import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Globe, 
  Shield, 
  Database, 
  Mail, 
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Download,
  Settings
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';

const Services = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const { showToast } = useToast();

  // Mock services data
  const services = [
    { id: 1, name: 'Basic Hosting', type: 'Web Hosting', domain: 'example.com', startDate: '2025-01-15', endDate: '2026-01-15', price: 49.99, status: 'Active', uptime: '99.9%', lastBackup: '2025-08-12', sslStatus: 'Valid', diskUsage: '2.5 GB', bandwidth: '45 GB' },
    { id: 2, name: 'Professional Hosting', type: 'Web Hosting', domain: 'business.com', startDate: '2025-03-20', endDate: '2026-03-20', price: 99.99, status: 'Active', uptime: '99.8%', lastBackup: '2025-08-12', sslStatus: 'Valid', diskUsage: '8.2 GB', bandwidth: '120 GB' },
    { id: 3, name: 'example.com', type: 'Domain', domain: 'example.com', startDate: '2025-01-15', endDate: '2026-01-15', price: 12.99, status: 'Active', uptime: 'N/A', lastBackup: 'N/A', sslStatus: 'Valid', diskUsage: 'N/A', bandwidth: 'N/A' },
    { id: 4, name: 'business.com', type: 'Domain', domain: 'business.com', startDate: '2025-03-20', endDate: '2026-03-20', price: 12.99, status: 'Active', uptime: 'N/A', lastBackup: 'N/A', sslStatus: 'Valid', diskUsage: 'N/A', bandwidth: 'N/A' },
    { id: 5, name: 'SSL Certificate', type: 'SSL', domain: 'example.com', startDate: '2025-01-15', endDate: '2026-01-15', price: 0, status: 'Active', uptime: 'N/A', lastBackup: 'N/A', sslStatus: 'Valid', diskUsage: 'N/A', bandwidth: 'N/A' },
    { id: 6, name: 'Email Hosting', type: 'Email', domain: 'example.com', startDate: '2025-02-10', endDate: '2026-02-10', price: 24.99, status: 'Pending', uptime: 'N/A', lastBackup: 'N/A', sslStatus: 'Pending', diskUsage: 'N/A', bandwidth: 'N/A' },
  ];

  const serviceTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'Web Hosting', label: 'Web Hosting' },
    { value: 'Domain', label: 'Domain' },
    { value: 'SSL', label: 'SSL Certificate' },
    { value: 'Email', label: 'Email Hosting' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Active', label: 'Active' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Suspended', label: 'Suspended' },
    { value: 'Expired', label: 'Expired' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || service.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    const matchesType = typeFilter === 'all' || service.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Suspended': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'Expired': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <CheckCircle className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Suspended': return <AlertTriangle className="w-4 h-4" />;
      case 'Expired': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Web Hosting': return <Server className="w-5 h-5" />;
      case 'Domain': return <Globe className="w-5 h-5" />;
      case 'SSL': return <Shield className="w-5 h-5" />;
      case 'Email': return <Mail className="w-5 h-5" />;
      default: return <Server className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Web Hosting': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'Domain': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'SSL': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'Email': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const calculateDaysRemaining = (endDate) => Math.ceil((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <DashboardSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Services</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your hosting services, domains, and SSL certificates</p>
            </div>
            <button onClick={() => showToast({ title: 'Add Service', description: 'Opening service creation (mock)...', type: 'info' })} className="btn-primary w-full sm:w-auto flex items-center justify-center">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </button>
          </div>
        </header>

        <main className="flex-1 min-w-0 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="card p-4 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row flex-wrap">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="text" placeholder="Search services or domains..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 flex-wrap">
                  <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    {serviceTypes.map(t => (<option key={t.value} value={t.value}>{t.label}</option>))}
                  </select>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    {statusOptions.map(s => (<option key={s.value} value={s.value}>{s.label}</option>))}
                  </select>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Service</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Domain</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Expires</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredServices.map((service, index) => (
                      <motion.tr key={service.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${getTypeColor(service.type)}`}>
                                {getTypeIcon(service.type)}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{service.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{service.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{service.domain}</div>
                          {service.type === 'Web Hosting' && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">Uptime: {service.uptime}</div>
                          )}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                            {getStatusIcon(service.status)}<span className="ml-1">{service.status}</span>
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{formatDate(service.endDate)}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{calculateDaysRemaining(service.endDate)} days left</div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">${service.price}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">per year</div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => showToast({ title: 'Viewing', description: `${service.name}`, type: 'info' })} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => showToast({ title: 'Edit service', description: `${service.name} (mock)`, type: 'success' })} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => showToast({ title: 'Settings opened', description: `${service.name} (mock)`, type: 'info' })} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"><Settings className="w-4 h-4" /></button>
                        <button onClick={() => showToast({ title: 'More actions', description: `${service.name} (mock)`, type: 'info' })} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"><MoreVertical className="w-4 h-4" /></button>
                      </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredServices.length === 0 && (
                <div className="text-center py-12">
                  <Server className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No services found</h3>
                  <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-3"><Server className="w-6 h-6 text-blue-600" /></div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{services.filter(s => s.type === 'Web Hosting').length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Web Hosting</div>
              </div>
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-3"><Globe className="w-6 h-6 text-green-600" /></div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{services.filter(s => s.type === 'Domain').length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Domains</div>
              </div>
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-3"><Shield className="w-6 h-6 text-purple-600" /></div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{services.filter(s => s.type === 'SSL').length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">SSL Certificates</div>
              </div>
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mx-auto mb-3"><Mail className="w-6 h-6 text-orange-600" /></div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{services.filter(s => s.type === 'Email').length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Email Services</div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Services;
