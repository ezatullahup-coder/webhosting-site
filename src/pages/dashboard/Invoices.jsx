import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  DollarSign,
  Calendar,
  Receipt,
  Plus
} from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
  import { useToast } from '../../contexts/ToastContext';

const Invoices = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
    const { showToast } = useToast();

  // Mock invoices data
  const invoices = [
    {
      id: 'INV-2025-001',
      date: '2025-08-13',
      dueDate: '2025-08-27',
      amount: 49.99,
      status: 'Paid',
      service: 'Basic Hosting',
      paymentMethod: 'Credit Card',
      paidDate: '2025-08-13'
    },
    {
      id: 'INV-2025-002',
      date: '2025-08-15',
      dueDate: '2025-09-15',
      amount: 99.99,
      status: 'Unpaid',
      service: 'Professional Hosting',
      paymentMethod: null,
      paidDate: null
    },
    {
      id: 'INV-2025-003',
      date: '2025-08-10',
      dueDate: '2025-08-24',
      amount: 12.99,
      status: 'Paid',
      service: 'Domain Registration',
      paymentMethod: 'PayPal',
      paidDate: '2025-08-10'
    },
    {
      id: 'INV-2025-004',
      date: '2025-07-15',
      dueDate: '2025-08-15',
      amount: 24.99,
      status: 'Overdue',
      service: 'Email Hosting',
      paymentMethod: null,
      paidDate: null
    },
    {
      id: 'INV-2025-005',
      date: '2025-08-01',
      dueDate: '2025-08-31',
      amount: 149.99,
      status: 'Pending',
      service: 'Business Hosting',
      paymentMethod: null,
      paidDate: null
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Paid', label: 'Paid' },
    { value: 'Unpaid', label: 'Unpaid' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Overdue', label: 'Overdue' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Unpaid':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Pending':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'Overdue':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'Unpaid':
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'Overdue':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDaysRemaining = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTotalAmount = () => invoices.reduce((total, invoice) => total + invoice.amount, 0);
  const getPaidAmount = () => invoices.filter(i => i.status === 'Paid').reduce((t, i) => t + i.amount, 0);
  const getUnpaidAmount = () => invoices.filter(i => i.status !== 'Paid').reduce((t, i) => t + i.amount, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading invoices...</p>
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
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invoices</h1>
              <p className="text-gray-600 dark:text-gray-400">View and manage your billing invoices</p>
            </div>
            <button onClick={() => showToast({ title: 'Pay Outstanding', description: 'Redirecting to payment (mock)...', type: 'info' })} className="btn-primary w-full sm:w-auto flex items-center justify-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Pay Outstanding
            </button>
          </div>
        </header>

        <main className="flex-1 min-w-0 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="card p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Paid</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">${getPaidAmount().toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="card p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Outstanding</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">${getUnpaidAmount().toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="card p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Receipt className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Invoices</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{invoices.length}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Filters and Search */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="card p-4 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center flex-wrap">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="text" placeholder="Search invoices by ID or service..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  </div>
                </div>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* Invoices Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Invoice</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Service</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Due Date</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredInvoices.map((invoice, index) => (
                      <motion.tr key={invoice.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-primary-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{invoice.id}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(invoice.date)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{invoice.service}</div>
                          {invoice.paymentMethod && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">Paid via {invoice.paymentMethod}</div>
                          )}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">${invoice.amount}</div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                            {getStatusIcon(invoice.status)}
                            <span className="ml-1">{invoice.status}</span>
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{formatDate(invoice.dueDate)}</div>
                          {invoice.status !== 'Paid' && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">{calculateDaysRemaining(invoice.dueDate)} days {calculateDaysRemaining(invoice.dueDate) < 0 ? 'overdue' : 'remaining'}</div>
                          )}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button onClick={() => showToast({ title: 'View invoice', description: `${invoice.id}`, type: 'info' })} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button onClick={() => showToast({ title: 'Download', description: `${invoice.id} PDF (mock)`, type: 'success' })} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                              <Download className="w-4 h-4" />
                            </button>
                            {invoice.status !== 'Paid' && (
                              <button onClick={() => showToast({ title: 'Pay invoice', description: `${invoice.id} (mock)`, type: 'info' })} className="p-1 text-primary-600 hover:text-primary-700 transition-colors duration-200">
                                <CreditCard className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Invoices;
